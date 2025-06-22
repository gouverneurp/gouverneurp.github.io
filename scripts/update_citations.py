import os
import sys
import requests
import argparse
import fileinput
from git import Repo
from pathlib import Path

#-------------------------------------------------------------------------------------------------------
# File manipulation
#-------------------------------------------------------------------------------------------------------
def replace_all(file, searchExp, replaceExp):
    for line in fileinput.input(file, inplace=1):
        if searchExp in line:
            line = line.replace(searchExp,replaceExp)
        sys.stdout.write(line)

def get_citations_file(file):
    return get_line_with(file, expression= "data/*xaxis*/"), get_line_with(file, expression= "data/*yaxis*/")

def get_line_with(file, expression):
    f = open(file, "r")
    for line in f:
        if expression in line:
            return line

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

def get_citations_googlescholar(user):
    params = {
        "engine": "google_scholar_author",
        "author_id": user,
        "api_key": os.environ["SERPAPI_KEY"],
    }

    res = requests.get("https://serpapi.com/search", params=params)
    years_citation = res.json()["cited_by"]["graph"]

    years = []
    citations = []

    for i in years_citation:
        years.append(i["year"])
        citations.append(i["citations"])

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

    # Initiate the parser
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--push", help="Push changes without asking.", action="store_true")

    # Read arguments from the command line
    args = parser.parse_args()

    # check if javascript file has changes from git repository
    script_file = Path("js/js.js")
    is_changed = git_changed(file= script_file)
    if is_changed:
        raise Exception(f"'{script_file}' has uncommited changes. Please commit or remove them and rerun the script!")

    # get new citation count from profile
    years, citations = get_citations_googlescholar(user= 'VsHUNwgAAAAJ')
    
    # transform to needed string
    years.append("Overall")
    years = f"                data/*xaxis*/: {years},\n"
    overall_citations = sum([i for i in citations])
    citations = "                data/*yaxis*/: ["+ ", ".join([str(i) for i in citations]) +", { value: "+ str(overall_citations) +", itemStyle: { color: '#a90000' } },],\n"

    # get old citation count
    years_old, citations_old = get_citations_file(file= script_file)

    if (years == years_old) and (citations == citations_old):
        print("Retrieved citations are equal to the old ones. Values are not updated.")
        quit()

    # update local javascript file with new values
    replace_all(file= script_file, searchExp= years_old, replaceExp= years)
    replace_all(file= script_file, searchExp= citations_old, replaceExp= citations)

    # display old and new and ask user whether to perform update
    print("Old years: ", years_old)
    print("Old citations: ", citations_old)
    print("Years: ", years)
    print("Citations: ", citations)
    
    if (args.push is False):
        should_continue = query_yes_no("Do you want to push the changes?")
    else:
        should_continue = True

    if (should_continue is False):
        quit()

    # git commit + push
    git_push(files= [script_file], message= "Updated citations")

    print("End of script")