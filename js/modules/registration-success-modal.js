/**
 * Registration Success Modal Module
 * Handles the display of a success modal when a user successfully registers
 * with smooth animation transition from registration form to login
 */

export const RegistrationSuccessModal = {
  /**
   * Create and show the registration success modal
   * @param {string} username - The newly registered username
   * @param {Function} callback - Callback function after modal closes
   */
  show(username, callback) {
    // Create modal container
    const modalContainer = document.createElement("div");
    modalContainer.className = "registration-success-modal-overlay";
    modalContainer.id = "registrationSuccessOverlay";

    // Create modal content
    const modalContent = document.createElement("div");
    modalContent.className = "registration-success-modal";

    // Create success icon with animation
    const iconContainer = document.createElement("div");
    iconContainer.className = "success-icon-container";
    iconContainer.innerHTML = `
      <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;

    // Create heading
    const heading = document.createElement("h2");
    heading.className = "success-heading";
    heading.textContent = "¡Cuenta Creada Exitosamente!";

    // Create description
    const description = document.createElement("p");
    description.className = "success-description";
    description.innerHTML = `Tu cuenta ha sido registrada correctamente.<br>Ahora puedes iniciar sesión con tus credenciales.`;

    // Create username display
    const usernameDisplay = document.createElement("div");
    usernameDisplay.className = "username-display";
    usernameDisplay.innerHTML = `
      <label>Tu usuario:</label>
      <div class="username-value">${this._escapeHtml(username)}</div>
    `;

    // Create button container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "modal-button-container";

    // Create continue button
    const continueBtn = document.createElement("button");
    continueBtn.className = "continue-button";
    continueBtn.textContent = "Continuar al Login";

    // Add click event to continue button
    continueBtn.addEventListener("click", () => {
      this.hide(() => {
        if (callback) callback();
      });
    });

    // Assemble modal
    buttonContainer.appendChild(continueBtn);
    modalContent.appendChild(iconContainer);
    modalContent.appendChild(heading);
    modalContent.appendChild(description);
    modalContent.appendChild(usernameDisplay);
    modalContent.appendChild(buttonContainer);

    // Add click to overlay to close
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        this.hide(() => {
          if (callback) callback();
        });
      }
    });

    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    // Trigger animation
    setTimeout(() => {
      modalContainer.classList.add("show");
      modalContent.classList.add("show");
    }, 10);
  },

  /**
   * Hide the registration success modal
   * @param {Function} callback - Callback after modal is hidden
   */
  hide(callback) {
    const overlay = document.getElementById("registrationSuccessOverlay");
    if (!overlay) return;

    const modal = overlay.querySelector(".registration-success-modal");

    // Remove animation classes
    overlay.classList.remove("show");
    if (modal) modal.classList.remove("show");

    // Remove from DOM after animation
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 300);
  },

  /**
   * Escape HTML to prevent XSS
   * @private
   */
  _escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  },
};
