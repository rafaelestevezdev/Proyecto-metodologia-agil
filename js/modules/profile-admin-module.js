/**
 * Módulo de Perfil del Administrador
 * Gestiona la visualización y actualización de datos del perfil
 */

const ProfileAdminModule = {
  /**
   * Obtiene los datos del administrador desde sessionStorage
   */
  getAdminData() {
    const sessionData = sessionStorage.getItem("currentUser");
    if (!sessionData) {
      return {
        name: "Administrador",
        email: "admin@sistema.local",
        role: "Administrador del Sistema",
        joinDate: new Date().toLocaleDateString("es-ES"),
        lastLogin: new Date().toLocaleString("es-ES"),
        status: "En línea",
        phone: "+34 912 345 678",
        department: "Gestión de Sistemas",
      };
    }

    const user = JSON.parse(sessionData);
    return {
      name: user.name || "Administrador",
      email: user.email || "admin@sistema.local",
      role: "Administrador del Sistema",
      joinDate: user.joinDate || new Date().toLocaleDateString("es-ES"),
      lastLogin: new Date().toLocaleString("es-ES"),
      status: "En línea",
      phone: user.phone || "+34 912 345 678",
      department: user.department || "Gestión de Sistemas",
    };
  },

  /**
   * Genera una foto de perfil moderna con gradiente y iniciales
   */
  generateProfileImage() {
    const admin = this.getAdminData();
    const initials = admin.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    // Crear canvas para generar la imagen
    const canvas = document.createElement("canvas");
    canvas.width = 150;
    canvas.height = 150;

    const ctx = canvas.getContext("2d");

    // Gradiente de fondo moderno (Indigo a Púrpura)
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#6366f1"); // Indigo
    gradient.addColorStop(1, "#a855f7"); // Púrpura

    // Fondo redondeado
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, 25);
    ctx.fill();

    // Sombra interna sutil
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, 25);
    ctx.stroke();

    // Texto (iniciales)
    ctx.font = "bold 60px Poppins, sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 10;
    ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL();
  },

  /**
   * Actualiza la foto de perfil en el header
   */
  updateProfileImage() {
    const profileImages = document.querySelectorAll(
      ".profile-avatar, .profile-avatar-large"
    );
    const imageUrl = this.generateProfileImage();

    profileImages.forEach((img) => {
      img.src = imageUrl;
    });
  },

  /**
   * Actualiza la información del perfil en el dropdown
   */
  updateProfileInfo() {
    const admin = this.getAdminData();

    // Actualizar nombre y email en dropdown
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");

    if (profileName) profileName.textContent = admin.name;
    if (profileEmail) profileEmail.textContent = admin.email;
  },

  /**
   * Abre el modal de perfil completo
   */
  openProfileModal() {
    const admin = this.getAdminData();

    const modalHTML = `
      <div class="profile-modal-overlay active" id="profile-modal-overlay">
        <div class="profile-modal">
          <div class="profile-modal-header">
            <h2>Perfil del Administrador</h2>
            <button class="modal-close" onclick="ProfileAdminModule.closeProfileModal()">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="profile-modal-content">
            <div class="profile-card-main">
              <div class="profile-avatar-container">
                <img src="${this.generateProfileImage()}" alt="Perfil" class="profile-avatar-modal" />
                <div class="status-badge online">
                  <span>En línea</span>
                </div>
              </div>
              
              <div class="profile-details">
                <h3>${admin.name}</h3>
                <p class="role-text">${admin.role}</p>
                <p class="email-text">${admin.email}</p>
              </div>
            </div>

            <div class="profile-sections">
              <div class="profile-section">
                <h4>Información de Contacto</h4>
                <div class="info-row">
                  <span class="info-label">Teléfono:</span>
                  <span class="info-value">${admin.phone}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Correo:</span>
                  <span class="info-value">${admin.email}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Departamento:</span>
                  <span class="info-value">${admin.department}</span>
                </div>
              </div>

              <div class="profile-section">
                <h4>Información del Sistema</h4>
                <div class="info-row">
                  <span class="info-label">Rol:</span>
                  <span class="info-value">${admin.role}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Miembro desde:</span>
                  <span class="info-value">${admin.joinDate}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Último acceso:</span>
                  <span class="info-value">${admin.lastLogin}</span>
                </div>
              </div>

              <div class="profile-section">
                <h4>Acciones</h4>
                <div class="profile-actions">
                  <button class="btn btn-primary" onclick="ProfileAdminModule.openEditProfile()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Editar Perfil
                  </button>
                  <button class="btn btn-secondary" onclick="ProfileAdminModule.changePassword()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Eliminar modal anterior si existe
    const existingModal = document.getElementById("profile-modal-overlay");
    if (existingModal) existingModal.remove();

    // Agregar nuevo modal
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Cerrar modal al hacer clic fuera
    document
      .getElementById("profile-modal-overlay")
      .addEventListener("click", (e) => {
        if (e.target.id === "profile-modal-overlay") {
          this.closeProfileModal();
        }
      });
  },

  /**
   * Cierra el modal de perfil
   */
  closeProfileModal() {
    const modal = document.getElementById("profile-modal-overlay");
    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => modal.remove(), 300);
    }
  },

  /**
   * Abre el modal de edición de perfil
   */
  openEditProfile() {
    console.log("Abrir modal de edición de perfil");
    alert("Función de edición de perfil disponible próximamente");
  },

  /**
   * Abre el modal de cambio de contraseña
   */
  changePassword() {
    console.log("Cambiar contraseña");
    alert("Función de cambio de contraseña disponible próximamente");
  },

  /**
   * Inicializa el módulo
   */
  init() {
    this.updateProfileImage();
    this.updateProfileInfo();

    // Agregar event listener al botón "Mi Perfil"
    const profileMenuItem = document.querySelector(".profile-menu-item");
    if (profileMenuItem) {
      profileMenuItem.addEventListener("click", (e) => {
        e.preventDefault();
        this.openProfileModal();
      });
    }
  },
};

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  ProfileAdminModule.init();
});
