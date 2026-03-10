import { showToast } from "../components/toast.js";

function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const bindStats = () => {
  const stats = document.querySelectorAll("[data-stat-target]");
  if (!stats.length) return;
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.statTarget, 10);
          animateCounter(entry.target, target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  stats.forEach((el) => statObserver.observe(el));
};

const initHeroAnimation = () => {
  document.querySelectorAll(".hero [data-animate]").forEach((el, idx) => {
    setTimeout(() => el.classList.add("in-view"), 100 + idx * 120);
  });
};

const bindCTAs = () => {
  const browse = document.querySelector("[data-browse-cta]");
  if (browse)
    browse.addEventListener("click", () =>
      showToast({
        message: "Browse featured profiles below.",
        type: "info",
        duration: 2500,
      }),
    );
};

document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimation();
  bindStats();
  bindCTAs();
});
