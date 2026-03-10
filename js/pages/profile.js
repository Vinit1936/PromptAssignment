import { mockTalent } from "../data/mockTalent.js";
import { showToast } from "../components/toast.js";
import { openModal, closeModal } from "../components/modal.js";

const qs = new URLSearchParams(window.location.search);
const id = Number(qs.get("id")) || 1;
const profile = mockTalent.find((t) => t.id === id) || mockTalent[0];

const fillProfile = () => {
  document.querySelector("[data-name]").textContent = profile.name;
  document.querySelector("[data-title]").textContent =
    `${profile.title} · ${profile.experienceYears} years experience`;
  document.querySelector("[data-location]").textContent = profile.location;
  const avatarEl = document.querySelector("[data-avatar]");
  avatarEl.innerHTML = `<img src="https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(profile.name)}&backgroundColor=transparent" alt="${profile.avatarInitials}" />`;
  avatarEl.style.background = profile.avatarColor;
  document.querySelector("[data-tagline]").textContent =
    profile.tagline || profile.bio;
  document.querySelector("[data-bio]").textContent = profile.bio;
  document.querySelector("[data-availability]").textContent =
    profile.availabilityLabel;

  const socialLinks = document.querySelector("[data-socials]");
  if (socialLinks) {
    socialLinks.querySelector("[data-github]").style.display = profile.socials
      .github
      ? "grid"
      : "none";
    socialLinks.querySelector("[data-github]").href =
      profile.socials.github || "#";
    socialLinks.querySelector("[data-linkedin]").style.display = profile.socials
      .linkedin
      ? "grid"
      : "none";
    socialLinks.querySelector("[data-linkedin]").href =
      profile.socials.linkedin || "#";
    socialLinks.querySelector("[data-website]").style.display = profile.socials
      .website
      ? "grid"
      : "none";
    socialLinks.querySelector("[data-website]").href =
      profile.socials.website || "#";
  }

  const skillsEl = document.querySelector("[data-skills]");
  const skillGroups = [
    {
      title: "Frontend",
      color: "chip--blue",
      skills: profile.skills.filter((s) =>
        ["React", "TypeScript", "CSS", "Figma", "Vue"].includes(s),
      ),
    },
    {
      title: "Backend",
      color: "chip--green",
      skills: profile.skills.filter((s) =>
        [
          "Node.js",
          "PostgreSQL",
          "Redis",
          "Go",
          "Kafka",
          "AWS",
          "NestJS",
        ].includes(s),
      ),
    },
    {
      title: "Tools",
      color: "chip--purple",
      skills: profile.skills.filter((s) =>
        ["Git", "Docker", "AWS", "CI/CD", "Figma"].includes(s),
      ),
    },
  ];
  if (skillsEl) {
    skillsEl.innerHTML = skillGroups
      .map((group) => {
        if (!group.skills.length) return "";
        const chips = group.skills
          .map((s) => `<span class="chip ${group.color}">${s}</span>`)
          .join("");
        return `<div style="margin-bottom:8px"><div class="text-secondary" style="margin-bottom:6px">${group.title}</div><div class="chip-grid">${chips}</div></div>`;
      })
      .join("");
  }

  const expEl = document.querySelector("[data-experience]");
  if (expEl) {
    expEl.innerHTML = profile.experience
      .map(
        (e) => `<div class="timeline__item animate-slide-left">
      <div class="timeline__title">${e.role} @ ${e.company}</div>
      <div class="text-muted">${e.start} – ${e.end}</div>
      <ul class="why__points">${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
    </div>`,
      )
      .join("");
  }

  const projectsEl = document.querySelector("[data-projects]");
  if (projectsEl) {
    projectsEl.innerHTML = profile.projects
      .map(
        (p) => `<div class="project-card animate-fade-up">
      <div style="font-weight:700">${p.name}</div>
      <p class="text-secondary" style="margin:6px 0">${p.description}</p>
      <div class="chip-grid">${p.stack.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
      <div class="social-links" style="margin-top:8px">
        <a href="${p.github}" aria-label="GitHub"><img src="assets/icons/github.svg" width="16" height="16" alt=""></a>
        <a href="${p.live}" aria-label="Live"><img src="assets/icons/globe.svg" width="16" height="16" alt=""></a>
      </div>
    </div>`,
      )
      .join("");
  }

  const prefEl = document.querySelector("[data-preferences]");
  if (prefEl)
    prefEl.innerHTML = profile.preferences
      .map((p) => `<span class="chip">${p}</span>`)
      .join("");

  const eduEl = document.querySelector("[data-education]");
  if (eduEl) eduEl.textContent = profile.education;
};

const bindReachOut = () => {
  const form = document.querySelector("[data-reachout-form]");
  const message = form?.querySelector("textarea");
  const counter = form?.querySelector("[data-counter]");
  message?.addEventListener("input", () => {
    if (counter) counter.textContent = `${message.value.length}/500`;
  });
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast({
      message: "Message sent! They'll be notified shortly.",
      type: "success",
    });
    closeModal("reachout-modal");
  });

  document
    .querySelector("[data-reachout-btn]")
    ?.addEventListener("click", () => openModal("reachout-modal"));
};

document.addEventListener("DOMContentLoaded", () => {
  fillProfile();
  bindReachOut();
});
