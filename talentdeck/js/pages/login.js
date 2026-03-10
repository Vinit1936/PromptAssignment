import { showToast } from "../components/toast.js";

const tabs = document.querySelectorAll("[data-auth-tab]");
const panels = document.querySelectorAll("[data-auth-panel]");

const switchTab = (target) => {
  tabs.forEach((t) =>
    t.classList.toggle("active", t.dataset.authTab === target),
  );
  panels.forEach((p) =>
    p.classList.toggle("active", p.dataset.authPanel === target),
  );
};

const bindTabs = () => {
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => switchTab(tab.dataset.authTab)),
  );
};

const bindStrength = () => {
  const pwd = document.querySelector("[data-password]");
  const fill = document.querySelector(".strength__fill");
  pwd?.addEventListener("input", () => {
    const val = pwd.value;
    const score = Math.min(1, val.length / 12);
    fill.style.width = `${Math.max(score * 100, 20)}%`;
    fill.style.background =
      score > 0.7 ? "#16a34a" : score > 0.4 ? "#ca8a04" : "#dc2626";
  });
};

const bindRoleCards = () => {
  document.querySelectorAll(".role-card").forEach((card) => {
    card.addEventListener("click", () => {
      document
        .querySelectorAll(".role-card")
        .forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
};

const togglePassword = () => {
  document.querySelectorAll("[data-eye]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      input.type = input.type === "password" ? "text" : "password";
    });
  });
};

const bindForms = () => {
  document.querySelector("[data-signin]")?.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("talentdeck_user", JSON.stringify({ name: "Arjun" }));
    showToast({ message: "Signed in", type: "success" });
    window.location = "dashboard.html";
  });
  document.querySelector("[data-signup]")?.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("talentdeck_user", JSON.stringify({ name: "Arjun" }));
    showToast({ message: "Account created", type: "success" });
    window.location = "dashboard.html";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  bindTabs();
  bindStrength();
  bindRoleCards();
  togglePassword();
  bindForms();
  switchTab("signin");
});
