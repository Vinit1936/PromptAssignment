/**
 * Navbar auth-state handler.
 * If user is logged in (localStorage talentdeck_user), replaces "Sign In"
 * link with user avatar + name across all pages.
 */
const AVATAR_URL =
  "https://api.dicebear.com/7.x/notionists/svg?seed=Arjun&backgroundColor=transparent";

const initNavAuth = () => {
  const user = localStorage.getItem("talentdeck_user");
  const signInLinks = document.querySelectorAll(
    '.nav-actions .btn-primary[href="login.html"]',
  );

  if (user) {
    let parsed;
    try {
      parsed = JSON.parse(user);
    } catch {
      parsed = { name: "User" };
    }
    const name = parsed.name || "User";

    signInLinks.forEach((link) => {
      const navUser = document.createElement("a");
      navUser.href = "dashboard.html";
      navUser.className = "nav-user";
      navUser.innerHTML = `
        <div class="nav-user__avatar">
          <img src="${AVATAR_URL}" alt="${name}" />
        </div>
        <span class="nav-user__name">${name}</span>
      `;
      link.replaceWith(navUser);
    });
  }
};

document.addEventListener("DOMContentLoaded", initNavAuth);
