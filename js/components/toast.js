const ensureToastContainer = () => {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  return container;
};

export function showToast({ message, type = "info", duration = 4000 }) {
  const container = ensureToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<div>${message}</div>`;
  const remove = () => toast.remove();
  toast.addEventListener("click", remove);
  container.appendChild(toast);
  setTimeout(remove, duration);
}
