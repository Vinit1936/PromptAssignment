import { showToast } from "../components/toast.js";

const connections = [
  {
    id: 1,
    name: "Priya Menon",
    company: "Razorpay",
    role: "Senior Recruiter",
    message: "Loved your profile for our design system team.",
    time: "2h ago",
    status: "pending",
    type: "inbound",
  },
  {
    id: 2,
    name: "Rahul Desai",
    company: "Zepto",
    role: "Hiring Manager",
    message: "We are building a new growth squad.",
    time: "5h ago",
    status: "replied",
    type: "inbound",
  },
  {
    id: 3,
    name: "Meera Gupta",
    company: "Swiggy",
    role: "Talent Partner",
    message: "Let’s chat about platform roles.",
    time: "1d ago",
    status: "connected",
    type: "inbound",
  },
  {
    id: 4,
    name: "Aria Lane",
    company: "Stripe",
    role: "Recruiter",
    message: "Your ML experience fits our team.",
    time: "3d ago",
    status: "declined",
    type: "outbound",
  },
  {
    id: 5,
    name: "Leo Chen",
    company: "Figma",
    role: "Design Recruiter",
    message: "Interested in exploring IC roles?",
    time: "1w ago",
    status: "pending",
    type: "mutual",
  },
];

const drawer = document.querySelector(".drawer");

const renderList = (filterType = "inbound", statusFilter = "all") => {
  const list = document.querySelector("[data-connection-list]");
  if (!list) return;
  const filtered = connections.filter(
    (c) =>
      (filterType === "mutual" ? c.type === "mutual" : c.type === filterType) &&
      (statusFilter === "all" || c.status === statusFilter),
  );
  list.innerHTML = filtered
    .map(
      (c) => `
    <article class="connection-card animate-fade-up" data-id="${c.id}">
      <div class="connection-meta">
        <div class="avatar" style="background:#111827"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(c.name)}&backgroundColor=transparent" alt="${c.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}" /></div>
        <div>
          <div style="font-weight:700">${c.name}</div>
          <div class="text-secondary">${c.company} · ${c.role}</div>
          <div class="text-muted" style="margin-top:4px">${c.message}</div>
        </div>
      </div>
      <div class="connection-actions">
        <span class="status ${c.status}">${labelFor(c.status)}</span>
        <button class="btn btn-outline" data-open="${c.id}">Reply</button>
      </div>
    </article>`,
    )
    .join("");
  list.querySelectorAll("[data-open]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openDrawer(btn.dataset.open);
    }),
  );
  list
    .querySelectorAll(".connection-card")
    .forEach((card) =>
      card.addEventListener("click", () => openDrawer(card.dataset.id)),
    );
};

const labelFor = (status) =>
  ({
    pending: "Pending",
    replied: "Replied",
    connected: "Connected",
    declined: "Declined",
  })[status] || status;

const openDrawer = (id) => {
  drawer?.classList.add("active");
  const item = connections.find((c) => c.id === Number(id));
  if (!item) return;
  drawer.querySelector("[data-thread-title]").textContent =
    `${item.name} · ${item.company}`;
  const thread = drawer.querySelector("[data-thread]");
  thread.innerHTML = `
    <div class="bubble">${item.message}</div>
    <div class="bubble me">Thanks for reaching out! Let’s connect this week.</div>`;
};

const bindTabs = () => {
  document.querySelectorAll("[data-connections-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll("[data-connections-tab]")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderList(
        tab.dataset.connectionsTab,
        document.querySelector(".pill.active")?.dataset.status || "all",
      );
    });
  });
};

const bindFilters = () => {
  document.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document
        .querySelectorAll(".pill")
        .forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const activeTab =
        document.querySelector("[data-connections-tab].active")?.dataset
          .connectionsTab || "inbound";
      renderList(activeTab, pill.dataset.status);
    });
  });
};

const bindDrawerClose = () => {
  document
    .querySelector("[data-drawer-close]")
    ?.addEventListener("click", () => drawer?.classList.remove("active"));
  document
    .querySelector("[data-reply-form]")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast({ message: "Reply sent.", type: "success" });
      drawer?.classList.remove("active");
    });
};

document.addEventListener("DOMContentLoaded", () => {
  bindTabs();
  bindFilters();
  bindDrawerClose();
  renderList("inbound", "all");
});
