const setActiveNav = () => {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const target = link.getAttribute("href");
    link.classList.toggle(
      "active",
      target === path || (path === "" && target === "index.html"),
    );
  });
};

const handleNavbarScroll = () => {
  const navbar = document.querySelector(".nav-dock");
  if (!navbar) return;
  const compact = window.scrollY > 8;
  navbar.classList.toggle("nav-dock--compact", compact);
};

const bindMobileDock = () => {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".mobile-dock__item").forEach((item) => {
    const target = item.getAttribute("href");
    item.classList.toggle(
      "active",
      target === path || (path === "" && target === "index.html"),
    );
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  bindMobileDock();
  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
});
