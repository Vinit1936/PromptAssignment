export function bindTabs() {
  document.querySelectorAll("[data-tabs]").forEach((tabsRoot) => {
    const tabs = tabsRoot.querySelectorAll("[data-tab]");
    const panels = tabsRoot.querySelectorAll("[data-tab-panel]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) =>
          t.classList.toggle("active", t.dataset.tab === target),
        );
        panels.forEach((panel) =>
          panel.classList.toggle("active", panel.dataset.tabPanel === target),
        );
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", bindTabs);
