/**
 * Evaluates password strength based on multiple criteria
 * @param {string} password - Password to evaluate
 * @returns {{level: string, text: string}} Strength level and text
 */
export function evaluatePasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score < 3) return { level: "weak", text: "Débil" };
  if (score < 5) return { level: "medium", text: "Media" };
  return { level: "strong", text: "Fuerte" };
}

/**
 * Updates UI to display password strength
 * @param {string} password - Password to validate
 * @param {HTMLElement} strengthElement - Container element
 * @param {HTMLElement} fillElement - Progress bar element
 * @param {HTMLElement} textElement - Text display element
 */
export function validatePasswordStrength(
  password,
  strengthElement,
  fillElement,
  textElement
) {
  if (!password) {
    strengthElement.classList.remove("visible");
    return;
  }

  const { level, text } = evaluatePasswordStrength(password);
  strengthElement.classList.add("visible");

  fillElement.className = `strength-fill ${level}`;
  textElement.textContent = text;
  textElement.className = `strength-text ${level}`;
}

/**
 * Toggles password visibility in input field
 * @param {HTMLInputElement} passwordInput - Password input field
 * @param {HTMLElement} toggleIcon - Toggle icon element
 */
export function togglePasswordVisibility(passwordInput, toggleIcon) {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  toggleIcon.classList.toggle("fa-eye-slash", isPassword);
  toggleIcon.classList.toggle("fa-eye", !isPassword);
}
