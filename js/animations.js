const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.1 },
);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(
      ".animate-fade-up, .animate-fade-in, .animate-slide-left, .animate-slide-right",
    )
    .forEach((el) => observer.observe(el));

  const staggerGroups = document.querySelectorAll("[data-stagger]");
  staggerGroups.forEach((group) => {
    group.querySelectorAll(":scope > *").forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.07}s`;
      child.classList.add("animate-fade-up");
      observer.observe(child);
    });
  });
});
