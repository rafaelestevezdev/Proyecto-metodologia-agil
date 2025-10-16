import { isAuthenticated, getCurrentUser } from "./auth.js";

/**
 * Enhanced authentication check for protected pages
 */
export function checkAuth() {
  const isDashboardPage = window.location.pathname.includes("dashboard");

  if (isDashboardPage && !isAuthenticated()) {
    window.location.href = "login.html";
    return false;
  }

  return true;
}

/**
 * Redirect authenticated users away from login/register pages
 */
export function redirectIfAuthenticated() {
  const authPaths = ["login.html", "index.html", "/"];
  const currentPath = window.location.pathname;
  const isAuthPage = authPaths.some((path) => currentPath.endsWith(path));

  if (isAuthPage && isAuthenticated()) {
    const user = getCurrentUser();
    if (user) {
      if (user.role === "admin") {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "tienda-productos.html";
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  redirectIfAuthenticated();
});
