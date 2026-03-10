import { mockTalent } from "../data/mockTalent.js";

const state = {
  search: "",
  roles: new Set(),
  skills: new Set(),
  experience: "",
  availabilityNow: false,
  location: "",
  openTo: new Set(),
  sort: "recent",
  visible: 9,
};

const roleMap = {
  "Frontend Dev": "frontend",
  "Backend Dev": "backend",
  Designer: "design",
  PM: "pm",
  "Data Scientist": "data",
  DevOps: "devops",
  "Mobile Dev": "mobile",
  "Full Stack": "fullstack",
};

const availabilityLabel = {
  open: { text: "Open", class: "availability--open" },
  casual: { text: "Casually Looking", class: "availability--casual" },
  unavailable: { text: "Not Available", class: "availability--unavailable" },
};

const grid = document.querySelector(".talent-grid");
const countLabel = document.querySelector("[data-count]");
const loadMoreBtn = document.querySelector("[data-load-more]");

function applyFilters() {
  let results = [...mockTalent];
  if (state.search) {
    const q = state.search.toLowerCase();
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.skills.some((s) => s.toLowerCase().includes(q)) ||
        t.title.toLowerCase().includes(q),
    );
  }
  if (state.roles.size) {
    results = results.filter((t) => state.roles.has(t.category));
  }
  if (state.skills.size) {
    results = results.filter((t) => t.skills.some((s) => state.skills.has(s)));
  }
  if (state.experience) {
    const ranges = {
      junior: [0, 2],
      mid: [2, 5],
      senior: [5, 8],
      staff: [8, 99],
    };
    const [min, max] = ranges[state.experience];
    results = results.filter(
      (t) => t.experienceYears >= min && t.experienceYears < max,
    );
  }
  if (state.availabilityNow) {
    results = results.filter((t) => t.availability === "open");
  }
  if (state.location) {
    const loc = state.location.toLowerCase();
    results = results.filter((t) => t.location.toLowerCase().includes(loc));
  }
  if (state.openTo.size) {
    results = results.filter((t) =>
      t.engagementType.some((et) => state.openTo.has(et)),
    );
  }
  if (state.sort === "views") results = results.slice().reverse();
  if (state.sort === "rated") results = results; // placeholder
  render(results.slice(0, state.visible));
  updateCount(results.length);
  toggleLoadMore(results.length);
}

function updateCount(total) {
  if (countLabel) countLabel.textContent = `Showing ${total} professionals`;
}

function toggleLoadMore(total) {
  if (!loadMoreBtn) return;
  loadMoreBtn.style.display = state.visible < total ? "inline-flex" : "none";
}

function render(list) {
  if (!grid) return;
  grid.innerHTML = "";
  list.forEach((t) => {
    const badge = availabilityLabel[t.availability];
    const skills = t.skills
      .slice(0, 5)
      .map((s) => `<span class="chip">${s}</span>`)
      .join("");
    const card = document.createElement("article");
    card.className = "card talent-card";
    card.innerHTML = `
      <div class="talent-card__header">
        <div class="avatar" style="background:${t.avatarColor}"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(t.name)}&backgroundColor=transparent" alt="${t.avatarInitials}" /></div>
        <div>
          <div style="font-weight:700">${t.name}</div>
          <div class="text-secondary">${t.title}</div>
        </div>
        <span class="availability ${badge.class}">${badge.text}</span>
      </div>
      <div class="skill-list">${skills}${t.skills.length > 5 ? `<span class="chip">+${t.skills.length - 5} more</span>` : ""}</div>
      <p class="text-secondary" style="line-height:1.4">${t.bio.slice(0, 120)}...</p>
      <div class="flex-between">
        <div class="text-muted" style="display:flex;align-items:center;gap:6px">
          <img src="assets/icons/pin.svg" alt="" width="16" height="16" aria-hidden="true">${t.location}
        </div>
        <button class="btn btn-outline" onclick="window.location='profile.html?id=${t.id}'" aria-label="View ${t.name} profile">View Profile</button>
      </div>
    `;
    card.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "button") return;
      window.location = `profile.html?id=${t.id}`;
    });
    grid.appendChild(card);
  });
}

function bindControls() {
  const searchInput = document.querySelector('[data-filter="search"]');
  searchInput?.addEventListener("input", (e) => {
    state.search = e.target.value.trim();
    applyFilters();
  });

  document.querySelectorAll("[data-filter-role]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const val = roleMap[cb.value];
      cb.checked ? state.roles.add(val) : state.roles.delete(val);
      applyFilters();
    });
  });

  document.querySelectorAll("[data-filter-skill]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const skill = chip.dataset.filterSkill;
      if (state.skills.has(skill)) state.skills.delete(skill);
      else state.skills.add(skill);
      chip.classList.toggle("active");
      applyFilters();
    });
  });

  document.querySelectorAll('[name="experience"]')?.forEach((radio) => {
    radio.addEventListener("change", () => {
      state.experience = radio.value;
      applyFilters();
    });
  });

  const availToggle = document.querySelector('[data-filter="availability"]');
  availToggle?.addEventListener("change", (e) => {
    state.availabilityNow = e.target.checked;
    applyFilters();
  });

  const locationInput = document.querySelector('[data-filter="location"]');
  locationInput?.addEventListener("input", (e) => {
    state.location = e.target.value.trim();
    applyFilters();
  });

  document.querySelectorAll("[data-filter-open]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const val = cb.value;
      cb.checked ? state.openTo.add(val) : state.openTo.delete(val);
      applyFilters();
    });
  });

  const sortSelect = document.querySelector("[data-sort]");
  sortSelect?.addEventListener("change", (e) => {
    state.sort = e.target.value;
    applyFilters();
  });

  loadMoreBtn?.addEventListener("click", () => {
    state.visible += 6;
    applyFilters();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindControls();
  applyFilters();
});
