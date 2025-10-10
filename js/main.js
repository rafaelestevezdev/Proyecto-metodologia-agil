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
  const isAuthPage =
    window.location.pathname.includes("login.html") ||
    window.location.pathname.includes("register.html");

  if (isAuthPage && isAuthenticated()) {
    const user = getCurrentUser();
    if (user) {
      if (user.role === "admin") {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "dashboard-simple.html";
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  redirectIfAuthenticated();
});
