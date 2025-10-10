import { getCurrentUser, logoutUser, isAuthenticated } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  const userDisplay = document.getElementById("userDisplay");

  // Check authentication
  if (!isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  // Get current user data
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Display user information
  if (userDisplay) {
    userDisplay.innerHTML = `
      <h3>Welcome, ${currentUser.username}!</h3>
      <p><strong>Email:</strong> ${currentUser.email}</p>
      <p><strong>Role:</strong> ${currentUser.role}</p>
      <p><strong>Login Time:</strong> ${new Date(
        currentUser.loginTime
      ).toLocaleString()}</p>
    `;
  }

  // Logout functionality
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser();
      window.location.href = "login.html";
    });
  }
});
