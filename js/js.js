////////////////////////////////////////////////////////////////
// appear
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

////////////////////////////////////////////////////////////////
// bar
var chartDom = document.getElementById('chart');

function createBarChart() {

    var myChart = echarts.init(chartDom);
    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data/*xaxis*/: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', 'Overall'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Citations',
                type: 'bar',
                barWidth: '60%',
                data/*yaxis*/: [1, 7, 10, 21, 34, 69, 48, { value: 190, itemStyle: { color: '#a90000' } },],
                itemStyle: {
                    borderRadius: 3,
                    borderWidth: 1,
                    color: '#3498db',
                    borderType: 'solid',
                    //borderColor: '#73c0de',
                },
                animationDelay: function (idx) {
                    return idx * 500;
                }
            }
        ]
    };

    option && myChart.setOption(option);
}

const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            createBarChart();
            chartObserver.disconnect()
        }
    });
});

chartObserver.observe(chartDom);

////////////////////////////////////////////////////////////////
// modals
// Get the button that opens the modal
var btn = document.querySelectorAll(".modal-button");

// All page modals
var modals = document.querySelectorAll('.modal');

// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close");

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// When the user clicks the button, open the modal
for (var i = 0; i < btn.length; i++) {
  btn[i].onclick = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = "block";

    disableScroll();
  }
}

// When the user clicks on <span> (x), close the modal
for (var i = 0; i < spans.length; i++) {
  spans[i].onclick = function () {
    for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
    }
    enableScroll();
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
    }
    enableScroll();
  }
}

function copyCitation(el) {

  var bib = el.parentElement.previousElementSibling.innerHTML;
  navigator.clipboard.writeText(bib);

  new Notify({
    status: 'success',
    title: 'Copied to clipboard!',
    text: '',
    effect: 'fade',
    speed: 300,
    customClass: '',
    customIcon: '',
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 3000,
    gap: 20,
    distance: 20,
    type: 3,
    position: 'right top'
  })
}

////////////////////////////////////////////////////////////////
// particles
document.addEventListener("DOMContentLoaded", function () {
    new particlesJS("lead", {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: !0,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "polygon",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: .5,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 1,
                    opacity_min: .1,
                    sync: !1
                }
            },
            size: {
                value: 3,
                random: !0,
                anim: {
                    enable: !1,
                    speed: 19.18081918081918,
                    size_min: .1,
                    sync: !1
                }
            },
            line_linked: {
                enable: !0,
                distance: 150,
                color: "#ffffff",
                opacity: .4,
                width: 1
            },
            nb: 80
        }
    })
}, !1);

////////////////////////////////////////////////////////////////
// sliding images
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


////////////////////////////////////////////////////////////////
// scripts.min.js
! function (n) {
    n("html").removeClass("no-js"), n("header a").click(function (e) {
        if (!n(this).hasClass("no-scroll")) {
            e.preventDefault();
            var t = n(this).attr("href"),
                i = n(t).offset().top;
            n("html, body").animate({
                scrollTop: i + "px"
            }, +Math.abs(window.pageYOffset - n(t).offset().top)), n("header").hasClass("active") && n("header, body").removeClass("active")
        }
    }), n("#to-top").click(function () {
        n("html, body").animate({
            scrollTop: 0
        }, 500)
    }), n("#lead-down span").click(function () {
        var e = n("#lead").next().offset().top;
        n("html, body").animate({
            scrollTop: e + "px"
        }, 500)
    }), n("#experience-timeline").each(function () {
        $this = n(this), $userContent = $this.children("div"), $userContent.each(function () {
            n(this).addClass("vtimeline-content").wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>')
        }), $this.find(".vtimeline-point").each(function () {
            n(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>')
        }), $this.find(".vtimeline-content").each(function () {
            var e = n(this).data("date");
            e && n(this).parent().prepend('<span class="vtimeline-date">' + e + "</span>")
        })
    }), n("#mobile-menu-open").click(function () {
        n("header, body").addClass("active")
    }), n("#mobile-menu-close").click(function () {
        n("header, body").removeClass("active")
    }), n("#view-more-projects").click(function (e) {
        e.preventDefault(), n(this).fadeOut(300, function () {
            n("#more-projects").fadeIn(300)
        })
    })
}(jQuery);