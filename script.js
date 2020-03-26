// event handling

const click = (selector, callback) => {
  document.querySelector(selector).addEventListener("click", callback);
};

const ready = callback => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

// Element.closest() polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// playback handler
const playpause = el => {
  var teaching = el.getElementsByClassName("audio")[0];
  var button = el.getElementsByClassName("playpause")[0];
  if (!teaching.paused && !teaching.ended) {
    teaching.pause();
    button.classList.remove("pause");
    button.classList.add("play");
  } else if (teaching.paused) {
    teaching.play();
    button.classList.remove("play");
    button.classList.add("pause");
  }
};

// DOM ready
ready(() => {
  // look for a click on a play button
  document.querySelectorAll(".playpause").forEach(item => {
    item.addEventListener("click", event => {
      playpause(event.target.closest(".controls"));
    });
  });

  // pause existing teachings before starting new ones
  document.addEventListener(
    "play",
    function(e) {
      var allteachings = document.getElementsByTagName("audio");
      for (var i = 0, len = allteachings.length; i < len; i++) {
        if (allteachings[i] != e.target) {
          allteachings[i].pause();

          var button = allteachings[i].parentElement.getElementsByClassName(
            "playpause"
          )[0];
          button.classList.remove("pause");
          button.classList.add("play");
        }
      }
    },
    true
  );
});
