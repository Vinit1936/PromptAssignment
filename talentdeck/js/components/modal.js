export function bindModals() {
  const overlays = document.querySelectorAll(".modal-overlay");
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  document.querySelectorAll("[data-modal-open]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.modalOpen));
  });

  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.dataset.modalClose));
  });
}

export function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add("active");
}

export function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", bindModals);
