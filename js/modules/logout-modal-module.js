/**
 * Logout Modal Module
 * Responsabilidad única: Manejar la modal de confirmación de logout
 */

export const LogoutModalModule = {
  /**
   * Inicializa la modal de logout
   */
  init(onConfirm) {
    this.onConfirm = onConfirm;
    this.setupEventListeners();
  },

  /**
   * Configura los event listeners de la modal
   */
  setupEventListeners() {
    const logoutBtnMenu = document.getElementById("logout-btn-menu");
    const logoutBtn = document.getElementById("logout-btn");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalCancelBtn = document.getElementById("modal-cancel-btn");
    const modalConfirmLogoutBtn = document.getElementById(
      "modal-confirm-logout-btn"
    );
    const logoutModalOverlay = document.getElementById("logout-modal-overlay");

    // Abrir modal
    if (logoutBtnMenu) {
      logoutBtnMenu.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    }

    // Cerrar modal
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", () => this.close());
    }

    if (modalCancelBtn) {
      modalCancelBtn.addEventListener("click", () => this.close());
    }

    // Confirmar logout
    if (modalConfirmLogoutBtn) {
      modalConfirmLogoutBtn.addEventListener("click", () => {
        if (this.onConfirm) this.onConfirm();
      });
    }

    // Cerrar modal al hacer click fuera
    if (logoutModalOverlay) {
      logoutModalOverlay.addEventListener("click", (e) => {
        if (e.target === logoutModalOverlay) {
          this.close();
        }
      });
    }
  },

  /**
   * Abre la modal
   */
  open() {
    const modal = document.getElementById("logout-modal-overlay");
    if (modal) {
      modal.classList.add("active");
    }
  },

  /**
   * Cierra la modal
   */
  close() {
    const modal = document.getElementById("logout-modal-overlay");
    if (modal) {
      modal.classList.remove("active");
    }
  },
};
