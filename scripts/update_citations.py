import os
import sys
import fileinput
from git import Repo
from pathlib import Path
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen

#-------------------------------------------------------------------------------------------------------
# File manipulation
#-------------------------------------------------------------------------------------------------------
def replace_all(file, searchExp, replaceExp):
    for line in fileinput.input(file, inplace=1):
        if searchExp in line:
            line = line.replace(searchExp,replaceExp)
        sys.stdout.write(line)

def get_citations_file(file):
    f = open(file, "r")
    for line in f:
        if "data/*yaxis*/" in line:
            citations = line

        if "data/*xaxis*/" in line:
            years = line
    return years, citations

#-------------------------------------------------------------------------------------------------------
# User interaction
#-------------------------------------------------------------------------------------------------------
def query_yes_no(question, default="yes"):
    """Ask a yes/no question via raw_input() and return their answer.

    "question" is a string that is presented to the user.
    "default" is the presumed answer if the user just hits <Enter>.
            It must be "yes" (the default), "no" or None (meaning
            an answer is required of the user).

    The "answer" return value is True for "yes" or False for "no".
    """
    valid = {"yes": True, "y": True, "ye": True, "no": False, "n": False}
    if default is None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("invalid default answer: '%s'" % default)

    while True:
        sys.stdout.write(question + prompt)
        choice = input().lower()
        if default is not None and choice == "":
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            sys.stdout.write("Please respond with 'yes' or 'no' " "(or 'y' or 'n').\n")

#-------------------------------------------------------------------------------------------------------
# Git
#-------------------------------------------------------------------------------------------------------
def git_changed(file, repo_path= "."):
    repo = Repo(repo_path)
    changed = [Path(item.a_path) for item in repo.index.diff(None)]
    return file in changed

def get_citations_googlescholar(user, headers= None):
    url = f'https://scholar.google.de/citations?user={user}&hl=en'

    if headers is None:
        USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64; rv:27.0) Gecko/20100101 Firefox/27.0'
        headers = {'User-Agent': USER_AGENT}

    req = Request(url)
    for header in headers:
        req.add_header(header, headers[header])
    response = urlopen(req)

    if response.getcode() != 200:
        raise ValueError(f"Url request error for url '{url}' with code '{response.reason}'.")
    
    content = response.read()

    years = []
    citations = []
    for tag in BeautifulSoup(content, "html.parser").find_all(class_="gsc_md_hist_w")[0].contents[0].contents:
        if "gsc_g_t" in tag.attrs["class"]:
            years.append(tag.text)
        if "gsc_g_a" in tag.attrs["class"]:
            citations.append(tag.contents[0].text)

    return years, citations

def git_push(files, message, repo_path= "."):
    repo = Repo(repo_path)
    repo.index.add([str(file) for file in files])
    repo.index.commit(message)
    origin = repo.remote('origin')
    origin.push()

#-------------------------------------------------------------------------------------------------------
# Main
#-------------------------------------------------------------------------------------------------------
if __name__ == '__main__':
    # Set working directory to main directory of repository
    os.chdir(Path(sys.path[0]).parent)

    # check if "bar.js" has changes from git repository
    script_file = Path("js/bar.js")
    is_changed = git_changed(file= script_file)
    if is_changed:
        raise Exception(f"'{script_file}' has uncommited changes. Please commit or remove them and rerun the script!")

    # get new citation count from profile
    years, citations = get_citations_googlescholar(user= 'VsHUNwgAAAAJ')
    
    # transform to needed string
    years.append("Overall")
    years = f"                data/*xaxis*/: {years},\n"
    overall_citations = sum([int(i) for i in citations])
    citations = "                data/*yaxis*/: ["+ ", ".join(citations) +", { value: "+ str(overall_citations) +", itemStyle: { color: '#a90000' } },],\n"

    # get old citation count
    years_old, citations_old = get_citations_file(file= script_file)

    if (years == years_old) and (citations == citations_old):
        print("Retrieved citations are equal to the old ones. Values are not updated.")
        quit()

    # update local "bar.js" with new values
    replace_all(file= script_file, searchExp= years_old, replaceExp= years)
    replace_all(file= script_file, searchExp= citations_old, replaceExp= citations)

    # display old and new and ask user whether to perform update
    print("Old years: ", years_old)
    print("Old citations: ", citations_old)
    print("Years: ", years)
    print("Citations: ", citations)
    should_continue = query_yes_no("Do you want to push the changes?")

    if should_continue is False:
        quit()

    # git commit + push
    git_push(files= [script_file], message= "Updated citations")

    print("End of script")