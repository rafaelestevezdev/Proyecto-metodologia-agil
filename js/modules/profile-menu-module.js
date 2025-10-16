/**
 * Profile Menu Module
 * Responsabilidad única: Manejar el menú de perfil del usuario
 */

export const ProfileMenuModule = {
  /**
   * Inicializa el menú de perfil
   */
  init(currentUser) {
    this.setupMenuToggle();
    this.updateUserInfo(currentUser);
    this.setupClickOutside();
  },

  /**
   * Configura el toggle del menú de perfil
   */
  setupMenuToggle() {
    const profileToggle = document.getElementById("profile-toggle");
    const profileDropdown = document.getElementById("profile-dropdown");

    if (profileToggle && profileDropdown) {
      profileToggle.addEventListener("click", () => {
        profileDropdown.classList.toggle("active");
      });

      // Cerrar menú al hacer click en items (excepto logout)
      const menuItems = profileDropdown.querySelectorAll(".profile-menu-item");
      menuItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          if (item.id !== "logout-btn-menu") {
            e.preventDefault();
            profileDropdown.classList.remove("active");
          }
        });
      });
    }
  },

  /**
   * Actualiza la información del usuario en el menú
   */
  updateUserInfo(currentUser) {
    if (currentUser) {
      const nameElement = document.getElementById("profile-name");
      const emailElement = document.getElementById("profile-email");

      if (nameElement) nameElement.textContent = currentUser.username;
      if (emailElement)
        emailElement.textContent = currentUser.email || "admin@sistema.local";
    }
  },

  /**
   * Cierra el menú al hacer click fuera
   */
  setupClickOutside() {
    const profileDropdown = document.getElementById("profile-dropdown");
    const profileMenuContainer = document.querySelector(
      ".profile-menu-container"
    );

    if (profileMenuContainer && profileDropdown) {
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".profile-menu-container")) {
          profileDropdown.classList.remove("active");
        }
      });
    }
  },

  /**
   * Cierra el menú de perfil
   */
  closeMenu() {
    const profileDropdown = document.getElementById("profile-dropdown");
    if (profileDropdown) {
      profileDropdown.classList.remove("active");
    }
  },
};
