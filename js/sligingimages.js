const track = document.getElementById("image-track");

track.addEventListener("mousedown", (event) => {
  handleOnDown(event);
});

track.addEventListener("touchstart", (event) => {
  handleOnDown(event.touches[0]);
});

function handleOnDown(event) {
  track.dataset.mouseDownAt = event.clientX;
}

const handleOnUp = () => {
  if (track.dataset.percentage === undefined || track.dataset.percentage === 0) {
    return
  }
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  let imageTrack = document.getElementById('image-track')
  let numberImages = imageTrack.children.length - 1;
  let imageWidth = imageTrack.lastElementChild.width;
  let trackWidth = imageWidth * numberImages

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    percentage = -(mouseDelta / trackWidth),
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -1);

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translateX(${nextPercentage * trackWidth}px)`
  }, { duration: 1200, fill: "forwards" });

  for (const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage * 100}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
