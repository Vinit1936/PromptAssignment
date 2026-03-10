const themeStorageKey = "talentdeck-theme";

const applyTheme = (theme) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.dataset.mode = theme;
    const label = toggle.querySelector(".sr-only");
    if (label)
      label.textContent = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  }
};

const getPreferredTheme = () => {
  const stored = localStorage.getItem(themeStorageKey);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initTheme = () => {
  const current = getPreferredTheme();
  applyTheme(current);
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    localStorage.setItem(themeStorageKey, next);
    applyTheme(next);
  });
};

document.addEventListener("DOMContentLoaded", initTheme);
