function highlightMenu() {
    let navLinks = [];
    let coords = [];
    let activeLink = null;
    function setCoords() {
      return [].map.call(navLinks, val => {
        const href = val.getAttribute("href");
        const section = document.querySelector(href);
        return [section.offsetTop, section.offsetTop + section.offsetHeight];
      });
    }
    function highlightActiveLink(e) {
      let active = false;
      for (let i = 0; i < coords.length; i++) {
        let coord = coords[i];
        if (pageYOffset >= coord[0] && pageYOffset < coord[1]) {
          if (activeLink !== navLinks[i]) {
            activeLink && activeLink.classList.remove("nav-link-active");
            activeLink = navLinks[i];
            activeLink.classList.add("nav-link-active");
          }
          active = true;
          break;
        }
      }
      if (!active) {
        activeLink && activeLink.classList.remove("nav-link-active");
        activeLink = null;
      }
    }
    function update(e) {
      navLinks = document.querySelectorAll("#navbar .nav-link");
      coords = setCoords();
      activeLink = null;
      highlightActiveLink();
    }
    function init() {
      navLinks = document.querySelectorAll("#navbar .nav-link");
      coords = setCoords();
      highlightActiveLink();
      window.addEventListener("scroll", highlightActiveLink);
      window.addEventListener("resize", update);
    }
    function destroy() {
      navLinks = [];
      coords = [];
      window.removeEventListener("scroll", highlightActiveLink);
      window.removeEventListener("resize", update);
    }
    return { init, update, destroy };
  }
  const highlighter = highlightMenu();
  highlighter.init();
