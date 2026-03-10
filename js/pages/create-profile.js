import { showToast } from "../components/toast.js";

const steps = Array.from(document.querySelectorAll("[data-step]"));
let currentStep = 0;

const updateStepper = () => {
  steps.forEach((step, idx) => {
    step.classList.toggle("active", idx === currentStep);
    step.classList.toggle("slide-in", idx === currentStep);
    step.classList.toggle("slide-out", idx < currentStep);
  });
  document.querySelectorAll("[data-stepper-item]").forEach((item, idx) => {
    item.classList.toggle("active", idx === currentStep);
    item.classList.toggle("completed", idx < currentStep);
  });
  document.querySelectorAll("[data-stepper-line]").forEach((line, idx) => {
    line.classList.toggle("completed", idx < currentStep);
  });
};

const next = () => {
  if (currentStep < steps.length - 1) currentStep += 1;
  updateStepper();
};
const prev = () => {
  if (currentStep > 0) currentStep -= 1;
  updateStepper();
};

const bindNav = () => {
  document.querySelector("[data-next]")?.addEventListener("click", next);
  document.querySelector("[data-prev]")?.addEventListener("click", prev);
};

const bindTagInputs = () => {
  document.querySelectorAll("[data-tag-input]").forEach((wrapper) => {
    const input = wrapper.querySelector("input");
    const bucket = wrapper.querySelector("[data-tags]");
    const tags = new Set();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim()) {
        e.preventDefault();
        const value = input.value.trim();
        if (!tags.has(value)) {
          tags.add(value);
          const chip = document.createElement("span");
          chip.className = "chip";
          chip.textContent = value;
          chip.addEventListener("click", () => {
            tags.delete(value);
            chip.remove();
          });
          bucket.appendChild(chip);
        }
        input.value = "";
      }
    });
  });
};

const bindPublish = () => {
  const publish = document.querySelector("[data-publish]");
  publish?.addEventListener("click", (e) => {
    e.preventDefault();
    publish.disabled = true;
    publish.textContent = "Publishing...";
    launchConfetti();
    setTimeout(() => {
      showToast({ message: "Profile published!", type: "success" });
      localStorage.setItem(
        "talentdeck_user",
        JSON.stringify({ name: "Arjun" }),
      );
      window.location = "dashboard.html";
    }, 1800);
  });
};

const launchConfetti = () => {
  const host = document.querySelector(".confetti");
  if (!host) return;
  host.innerHTML = "";
  for (let i = 0; i < 20; i += 1) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.bottom = "0";
    piece.style.background = i % 2 === 0 ? "#000" : "#2563eb";
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    host.appendChild(piece);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  updateStepper();
  bindNav();
  bindTagInputs();
  bindPublish();
});
