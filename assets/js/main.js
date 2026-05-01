// Theme initialization (Jupiter is a dark variant; jupiter-toggle.js adds `jupiter` class)
if (
  localStorage.theme === "dark" ||
  localStorage.theme === "jupiter" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// Theme toggle function
function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById("theme-icon");

  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    html.classList.remove("jupiter");
    localStorage.theme = "light";
    if (themeIcon) {
      themeIcon.setAttribute("data-lucide", "moon");
    }
  } else {
    html.classList.add("dark");
    localStorage.theme = "dark";
    if (themeIcon) {
      themeIcon.setAttribute("data-lucide", "star");
    }
  }

  // Re-initialize icons in case the theme icon was updated
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

/** Used when navigating from another page to Home + section without putting # in the URL */
const BW_HOME_SCROLL_ID_KEY = "bw-home-scroll-id";

function pathIsHome(pathname) {
  return pathname === "/" || pathname === "/index.html";
}

function sameDocumentHomeNav(pathA, pathB) {
  return pathA === pathB || (pathIsHome(pathA) && pathIsHome(pathB));
}

// Wire up the theme toggle and initialize Lucide icons after the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  let scrolledFromPending = false;
  if (pathIsHome(window.location.pathname)) {
    const pendingId = sessionStorage.getItem(BW_HOME_SCROLL_ID_KEY);
    if (pendingId) {
      sessionStorage.removeItem(BW_HOME_SCROLL_ID_KEY);
      const pendingTarget = document.getElementById(pendingId);
      if (pendingTarget) {
        pendingTarget.scrollIntoView({ behavior: "smooth" });
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
        scrolledFromPending = true;
      }
    }
  }

  // If we landed on the page with a hash (e.g. "/#services"), scroll to it
  // and then remove the hash from the address bar.
  if (!scrolledFromPending) {
    const hash = window.location.hash;
    if (hash && hash !== "#") {
      const targetId = hash.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    }
  }

  const themeToggleButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleTheme);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) {
      return;
    }

    const raw = link.getAttribute("href");
    if (!raw || raw === "#") {
      return;
    }

    if (raw.startsWith("/#")) {
      let url;
      try {
        url = new URL(raw, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || !url.hash || url.hash === "#") {
        return;
      }

      const fromAnotherPageToHome =
        pathIsHome(url.pathname) && !pathIsHome(window.location.pathname);

      if (fromAnotherPageToHome) {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        const targetAttr = link.getAttribute("target");
        if (targetAttr && targetAttr !== "_self") {
          return;
        }

        event.preventDefault();
        sessionStorage.setItem(BW_HOME_SCROLL_ID_KEY, url.hash.slice(1));
        window.location.assign("/");
        return;
      }

      if (sameDocumentHomeNav(url.pathname, window.location.pathname)) {
        const targetId = url.hash.slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
          history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          );
        }
      }
      return;
    }

    if (!raw.startsWith("#")) {
      return;
    }

    const targetId = raw.slice(1);
    if (!targetId) {
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  });

  if (themeIcon) {
    const html = document.documentElement;
    const icon = html.classList.contains("jupiter")
      ? "sun"
      : html.classList.contains("dark")
        ? "star"
        : "moon";
    themeIcon.setAttribute("data-lucide", icon);
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.add("is-open");
    if (mobileMenuBtn) mobileMenuBtn.classList.add("is-open");
  }

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove("is-open");
    if (mobileMenuBtn) mobileMenuBtn.classList.remove("is-open");
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.contains("is-open") ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
});
