import { loginUser } from "./auth.js";
import { togglePasswordVisibility } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("errorMessage");
  const togglePassword = document.getElementById("togglePassword");

  if (!loginForm) return;

  // Toggle password visibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () =>
      togglePasswordVisibility(passwordInput, togglePassword)
    );
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Attempt login with enhanced validation
    const result = loginUser(username, password);

    if (result.success) {
      showSuccess(result.message + " Redirecting...");

      // Redirect to modern dashboard (works for both admin and regular users)
      setTimeout(() => {
        window.location.href = "dashboard-modern.html"; // Modern dashboard for all users
      }, 1000);
    } else {
      showError(result.message);
    }
  });

  function showError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.classList.remove("hidden", "success");
      errorMessage.style.backgroundColor = "#ffebee";
      errorMessage.style.color = "#c62828";
    }
  }

  function showSuccess(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.classList.remove("hidden");
      errorMessage.classList.add("success");
      errorMessage.style.backgroundColor = "#e8f5e8";
      errorMessage.style.color = "#2e7d2e";
    }
  }
});
