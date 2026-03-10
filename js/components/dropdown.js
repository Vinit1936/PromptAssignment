export function bindDropdowns() {
  document.querySelectorAll("[data-dropdown-toggle]").forEach((toggle) => {
    const menu = document.getElementById(toggle.dataset.dropdownToggle);
    if (!menu) return;
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target))
        menu.classList.remove("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", bindDropdowns);
