import { showToast } from "../components/toast.js";

const guardAuth = () => {
  const user = localStorage.getItem("talentdeck_user");
  if (!user) {
    // Hide the body content immediately, then smoothly redirect
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease";
    setTimeout(() => {
      window.location.replace("login.html");
    }, 100);
    return false;
  }
  return true;
};

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const AVATAR_URL =
  "https://api.dicebear.com/7.x/notionists/svg?seed=Arjun&backgroundColor=transparent";

const renderGreeting = () => {
  const el = document.querySelector("[data-greeting]");
  const dateEl = document.querySelector("[data-date]");
  const user = localStorage.getItem("talentdeck_user");
  let name = "Arjun";
  if (user) {
    try {
      name = JSON.parse(user).name || name;
    } catch {}
  }
  if (el) el.textContent = `${greeting()}, ${name}.`;
  if (dateEl)
    dateEl.textContent = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
};

const bindQuickActions = () => {
  document.querySelectorAll("[data-quick]").forEach((card) => {
    card.addEventListener("click", () =>
      showToast({
        message: `${card.dataset.quick} clicked`,
        type: "info",
        duration: 2000,
      }),
    );
  });
};

const bindSidebar = () => {
  const links = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll("[data-section]");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const target = link.dataset.sidebarTarget;
      if (target) {
        sections.forEach((s) => {
          s.style.display = s.dataset.section === target ? "block" : "none";
        });
      } else if (link.textContent.trim() === "Logout") {
        localStorage.removeItem("talentdeck_user");
        showToast({ message: "Logged out", type: "info", duration: 1500 });
        setTimeout(() => {
          window.location = "index.html";
        }, 800);
      }
    });
  });
};

const renderAnalyticsChart = () => {
  const canvas = document.querySelector("[data-views-chart]");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = (canvas.width = canvas.parentElement.offsetWidth);
  const h = (canvas.height = 200);
  const data = [32, 45, 38, 52, 68, 55, 72, 85, 78, 92, 88, 105, 98, 112];
  const max = Math.max(...data);
  const stepX = w / (data.length - 1);

  ctx.clearRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--border")
      .trim() || "#e4e4e7";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 4; i++) {
    const y = (h / 4) * i + 20;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  gradient.addColorStop(
    0,
    isDark ? "rgba(250,250,250,0.12)" : "rgba(0,0,0,0.06)",
  );
  gradient.addColorStop(1, "transparent");

  ctx.beginPath();
  ctx.moveTo(0, h);
  data.forEach((val, i) => {
    const x = i * stepX;
    const y = h - (val / max) * (h - 30) - 10;
    if (i === 0) ctx.lineTo(x, y);
    else {
      const prevX = (i - 1) * stepX;
      const prevY = h - (data[i - 1] / max) * (h - 30) - 10;
      const cpx = (prevX + x) / 2;
      ctx.bezierCurveTo(cpx, prevY, cpx, y, x, y);
    }
  });
  ctx.lineTo(w, h);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = i * stepX;
    const y = h - (val / max) * (h - 30) - 10;
    if (i === 0) ctx.moveTo(x, y);
    else {
      const prevX = (i - 1) * stepX;
      const prevY = h - (data[i - 1] / max) * (h - 30) - 10;
      const cpx = (prevX + x) / 2;
      ctx.bezierCurveTo(cpx, prevY, cpx, y, x, y);
    }
  });
  ctx.strokeStyle = isDark ? "#fafafa" : "#18181b";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Dots
  data.forEach((val, i) => {
    const x = i * stepX;
    const y = h - (val / max) * (h - 30) - 10;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "#fafafa" : "#18181b";
    ctx.fill();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (!guardAuth()) return;
  document.body.style.opacity = "1";
  renderGreeting();
  bindQuickActions();
  bindSidebar();
  setTimeout(renderAnalyticsChart, 200);
  window.addEventListener("resize", renderAnalyticsChart);
});
