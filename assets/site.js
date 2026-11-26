// CreatorCue website: mobile menu + the hero prompter settling onto its reading line. No dependencies.
(function () {
  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 861px)").addEventListener("change", function (m) { if (m.matches) setOpen(false); });
  }

  // Hero: place the headline on the reading line, like the app's prompt.
  var prompter = document.querySelector(".prompter");
  if (!prompter) return;
  var win = prompter.querySelector(".prompter-window");
  var track = prompter.querySelector(".prompter-track");
  var current = prompter.querySelector("h1");
  var marker = prompter.querySelector(".reading-line");
  function place() {
    var readAt = Math.round(win.clientHeight * 0.24);
    track.style.setProperty("--settle", (readAt - current.offsetTop) + "px");
    marker.style.top = readAt + "px";
    marker.style.height = current.offsetHeight + "px";
  }
  place();
  // One orchestrated moment: the script scrolls up once and stops on the headline.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    prompter.classList.add("start");
    requestAnimationFrame(function () { requestAnimationFrame(function () { prompter.classList.remove("start"); }); });
  }
  var t;
  window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(place, 80); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
})();
