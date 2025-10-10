import { registerUser } from "./auth.js";
import { validatePasswordStrength, togglePasswordVisibility } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("errorMessage");
  const togglePassword = document.getElementById("togglePassword");

  if (!registerForm) return;

  // Toggle password visibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () =>
      togglePasswordVisibility(passwordInput, togglePassword)
    );
  }

  // Password strength indicator
  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      const strengthElement = document.getElementById("passwordStrength");
      const fillElement = document.getElementById("strengthFill");
      const textElement = document.getElementById("strengthText");

      if (strengthElement && fillElement && textElement) {
        validatePasswordStrength(
          passwordInput.value,
          strengthElement,
          fillElement,
          textElement
        );
      }
    });
  }

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Attempt registration with enhanced validation
    const result = registerUser(username, password, email);

    if (result.success) {
      showSuccess(result.message + " Redirecting to login...");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
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
