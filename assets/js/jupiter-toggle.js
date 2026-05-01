// 3-way Theme Toggle Logic (Light -> Dark -> Jupiter)

// Initialize Jupiter theme on load if it's set
if (localStorage.theme === "jupiter") {
  document.documentElement.classList.add("dark");
  document.documentElement.classList.add("jupiter");
} else {
  document.documentElement.classList.remove("jupiter");
}

function handleThreeWayToggle() {
  const html = document.documentElement;
  const themeIcon = document.getElementById("theme-icon");

  // Current state
  const isDark = html.classList.contains("dark");
  const isJupiter = html.classList.contains("jupiter");

  if (!isDark && !isJupiter) {
    // Light -> Default Dark
    html.classList.add("dark");
    localStorage.theme = "dark";
    // On dark: show star (next click goes to Jupiter)
    if (themeIcon) {
      themeIcon.setAttribute("data-lucide", "star");
    }
  } else if (isDark && !isJupiter) {
    // Default Dark -> Jupiter
    html.classList.add("jupiter");
    localStorage.theme = "jupiter";
    // On Jupiter: show sun (next click returns to light)
    if (themeIcon) {
      themeIcon.setAttribute("data-lucide", "sun");
    }
  } else {
    // Jupiter -> Light
    html.classList.remove("dark");
    html.classList.remove("jupiter");
    localStorage.theme = "light";
    // On light: show moon (next click goes to dark)
    if (themeIcon) {
      themeIcon.setAttribute("data-lucide", "moon");
    }
  }

  // Re-initialize icons in case the theme icon was updated
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const originalButton = document.getElementById("theme-toggle");

  if (originalButton) {
    // Clone the button to remove the 2-way toggle event listener attached by main.js
    const newButton = originalButton.cloneNode(true);
    originalButton.parentNode.replaceChild(newButton, originalButton);

    // Attach our new 3-way toggle listener
    newButton.addEventListener("click", handleThreeWayToggle);

    // Initialize the icon based on the current state
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
      const isDark = document.documentElement.classList.contains("dark");
      const isJupiter = document.documentElement.classList.contains("jupiter");

      if (isJupiter) {
        themeIcon.setAttribute("data-lucide", "sun");
      } else if (isDark) {
        themeIcon.setAttribute("data-lucide", "star");
      } else {
        themeIcon.setAttribute("data-lucide", "moon");
      }
    }

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }
});
