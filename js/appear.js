// --------------------------------------------------------
// animations to "fly in" elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('showScroll');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hiddenScroll');
hiddenElements.forEach((el) => observer.observe(el));

// --------------------------------------------------------
// code to hide "grab images" help button on click
const images = document.querySelectorAll('.image');
const imageHelper = document.getElementById("image-helper");
const imageTrack = document.getElementById("image-track");

window.addEventListener('mouseup', imageMaybeMoved);

images.forEach((image) => {
    image.addEventListener('click', imageMaybeMoved);
    image.addEventListener('touchend', imageMaybeMoved);
    image.addEventListener('mousemove', imageMaybeMoved);
});

function imageMaybeMoved() {
    // check if imagetrack was moved
    let percentage = imageTrack.getAttribute("data-percentage");
    if (percentage < 0) {
        // hide the button
        imageHelper.classList.add('hiddenIcon');
        // remove thejump from the images
        images.forEach((image) => {
            image.classList.remove('active-jump');
            image.removeEventListener('click', imageMaybeMoved);
            image.removeEventListener('touchend', imageMaybeMoved);
            image.removeEventListener('mousemove', imageMaybeMoved);
        });
        window.removeEventListener('mouseup', imageMaybeMoved);
    }
}