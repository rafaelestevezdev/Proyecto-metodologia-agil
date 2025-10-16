/**
 * User Shop Module
 * Handles user-specific shop functionality, profile menu, and authentication
 */

/**
 * Initialize the user shop module
 * Sets up profile menu, logout functionality, and user data display
 */
export function initUserShop() {
  console.log("🚀 Inicializando user-shop-module...");
  setupProfileToggle();
  setupLogout();
  updateUserInfo();
  console.log("✅ user-shop-module inicializado correctamente");
}

/**
 * Get current logged-in user from session
 * @returns {object|null} User data or null if not logged in
 */
function getCurrentUser() {
  const userSession = sessionStorage.getItem("currentUser");
  return userSession ? JSON.parse(userSession) : null;
}

/**
 * Update user information in the header
 */
function updateUserInfo() {
  const user = getCurrentUser();
  if (!user) return;

  const profileNameEl = document.getElementById("profile-name");
  const profileEmailEl = document.getElementById("profile-email");

  if (profileNameEl) profileNameEl.textContent = user.username || "Usuario";
  if (profileEmailEl) profileEmailEl.textContent = user.email || "sin email";
}

/**
 * Setup profile toggle - Same as admin dashboard
 */
function setupProfileToggle() {
  const profileToggle = document.getElementById("profile-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");

  console.log("🔍 Setup Profile Toggle:");
  console.log("  - profileToggle:", profileToggle);
  console.log("  - profileDropdown:", profileDropdown);

  if (!profileToggle || !profileDropdown) {
    console.error("❌ No se encontraron elementos del perfil!");
    return;
  }

  // Toggle profile dropdown
  profileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle("active");
    console.log(
      "👤 Toggle perfil - active:",
      profileDropdown.classList.contains("active")
    );
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !profileDropdown.contains(e.target) &&
      !profileToggle.contains(e.target)
    ) {
      profileDropdown.classList.remove("active");
      console.log("👤 Dropdown cerrado (click fuera)");
    }
  });

  console.log("✅ Profile toggle configurado");
}

/**
 * Setup logout functionality - Same as admin dashboard
 */
function setupLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  const logoutModal = document.getElementById("logout-modal");
  const logoutConfirmBtn = document.getElementById("logout-confirm-btn");
  const logoutCancelBtn = document.getElementById("logout-cancel-btn");

  console.log("🔍 Setup Logout:");
  console.log("  - logoutBtn:", logoutBtn);
  console.log("  - logoutModal:", logoutModal);
  console.log("  - logoutConfirmBtn:", logoutConfirmBtn);
  console.log("  - logoutCancelBtn:", logoutCancelBtn);

  if (!logoutBtn) {
    console.error("❌ No se encontró el botón de logout!");
    return;
  }

  function showLogoutModal(e) {
    console.log("🚪 Mostrando modal de logout...");
    if (e) e.preventDefault();
    logoutModal.classList.add("active");
    console.log("✅ Modal de logout mostrado");
  }

  function closeLogoutModal() {
    console.log("❌ Cerrando modal de logout...");
    logoutModal.classList.remove("active");
  }

  function performLogout() {
    console.log("🔒 Ejecutando logout...");
    closeLogoutModal();
    const loadingOverlay = document.getElementById("logoutLoadingOverlay");
    if (loadingOverlay) {
      loadingOverlay.classList.remove("hidden");
      console.log("⏳ Loading overlay mostrado");
    }
    setTimeout(() => {
      console.log("🧹 Limpiando sesión...");
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("loggedIn");
      sessionStorage.removeItem("cartTemp");
      localStorage.removeItem("darkMode");
      console.log("🔄 Redirigiendo a index.html...");
      window.location.href = "index.html";
    }, 1000);
  }

  logoutBtn.addEventListener("click", showLogoutModal);
  console.log("✅ Listener agregado a logout-btn");

  if (logoutConfirmBtn) {
    logoutConfirmBtn.addEventListener("click", performLogout);
    console.log("✅ Listener agregado a logout-confirm-btn");
  }

  if (logoutCancelBtn) {
    logoutCancelBtn.addEventListener("click", closeLogoutModal);
    console.log("✅ Listener agregado a logout-cancel-btn");
  }

  console.log("✅ Logout configurado completamente");
}

/**
 * Display user profile modal
 */
function showUserProfile() {
  const user = getCurrentUser();
  if (!user) return;

  const modal = document.getElementById("profile-modal");
  const modalContent = document.getElementById("profile-modal-content");

  if (!modalContent) return;

  const createdDate = new Date(user.createdAt).toLocaleDateString("es-ES");

  modalContent.innerHTML = `
    <div class="profile-view">
      <div class="profile-section">
        <h3>Información Personal</h3>
        <div class="profile-item">
          <label>Nombre de Usuario</label>
          <p>${user.username}</p>
        </div>
        <div class="profile-item">
          <label>Correo Electrónico</label>
          <p>${user.email}</p>
        </div>
        <div class="profile-item">
          <label>Tipo de Cuenta</label>
          <p>${user.role === "admin" ? "Administrador" : "Usuario Regular"}</p>
        </div>
        <div class="profile-item">
          <label>Miembro desde</label>
          <p>${createdDate}</p>
        </div>
      </div>
    </div>
  `;

  openModal(modal);
}

/**
 * Display edit profile form
 */
function showEditProfile() {
  const user = getCurrentUser();
  if (!user) return;

  const modal = document.getElementById("profile-modal");
  const modalContent = document.getElementById("profile-modal-content");

  if (!modalContent) return;

  modalContent.innerHTML = `
    <div class="profile-edit">
      <form id="edit-profile-form">
        <div class="form-group">
          <label for="edit-username">Nombre de Usuario</label>
          <input type="text" id="edit-username" name="username" value="${user.username}" disabled>
          <small>El nombre de usuario no puede ser modificado</small>
        </div>
        <div class="form-group">
          <label for="edit-email">Correo Electrónico</label>
          <input type="email" id="edit-email" name="email" value="${user.email}" required>
        </div>
        <div class="form-group">
          <label for="edit-password">Nueva Contraseña (opcional)</label>
          <input type="password" id="edit-password" name="password" placeholder="Dejar en blanco para no cambiar">
        </div>
        <div class="form-actions">
          <button type="submit" class="button button-primary">Guardar Cambios</button>
          <button type="button" class="button button-secondary" onclick="document.getElementById('profile-modal').classList.remove('active')">Cancelar</button>
        </div>
      </form>
    </div>
  `;

  const form = document.getElementById("edit-profile-form");
  form.addEventListener("submit", handleEditProfile);

  openModal(modal);
}

/**
 * Handle profile edit form submission
 */
function handleEditProfile(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  if (!email) {
    alert("El correo electrónico es requerido");
    return;
  }

  const user = getCurrentUser();
  if (!user) return;

  // Get all users
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((u) => u.username === user.username);

  if (userIndex === -1) return;

  // Check if email already exists (excluding current user)
  const emailExists = users.some(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.username !== user.username
  );

  if (emailExists) {
    alert("Este correo electrónico ya está registrado");
    return;
  }

  // Update user data
  users[userIndex].email = email.toLowerCase();
  if (password && password.length >= 6) {
    users[userIndex].password = password;
  } else if (password && password.length > 0) {
    alert("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  // Save to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Update session
  user.email = email.toLowerCase();
  sessionStorage.setItem("currentUser", JSON.stringify(user));

  alert("Perfil actualizado correctamente");
  updateUserInfo();
  document.getElementById("profile-modal").classList.remove("active");
}

/**
 * Display user orders (empty state for now)
 */
function showUserOrders() {
  const modal = document.getElementById("profile-modal");
  const modalContent = document.getElementById("profile-modal-content");

  if (!modalContent) return;

  modalContent.innerHTML = `
    <div class="orders-view">
      <div class="empty-state">
        <i class="fas fa-box"></i>
        <h3>Mis Pedidos</h3>
        <p>Aún no tienes pedidos realizados</p>
        <p class="hint">Tus pedidos aparecerán aquí después de realizar una compra</p>
      </div>
    </div>
  `;

  openModal(modal);
}

/**
 * Display user settings
 */
function showSettings() {
  const user = getCurrentUser();
  if (!user) return;

  const modal = document.getElementById("profile-modal");
  const modalContent = document.getElementById("profile-modal-content");

  if (!modalContent) return;

  modalContent.innerHTML = `
    <div class="settings-view">
      <div class="settings-section">
        <h3>Preferencias</h3>
        <div class="settings-item">
          <label>
            <input type="checkbox" id="email-notifications" checked>
            Recibir notificaciones por correo
          </label>
        </div>
        <div class="settings-item">
          <label>
            <input type="checkbox" id="newsletter" checked>
            Suscribirse al newsletter
          </label>
        </div>
      </div>
      <div class="settings-section danger-zone">
        <h3>Zona de Peligro</h3>
        <button id="delete-account-btn" class="button button-danger">
          Eliminar Cuenta
        </button>
      </div>
      <div class="form-actions">
        <button type="button" class="button button-primary" onclick="document.getElementById('profile-modal').classList.remove('active')">Cerrar</button>
      </div>
    </div>
  `;

  const deleteBtn = document.getElementById("delete-account-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", handleDeleteAccount);
  }

  openModal(modal);
}

/**
 * Handle account deletion
 */
function handleDeleteAccount() {
  const user = getCurrentUser();
  if (!user) return;

  if (
    confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no puede deshacerse."
    )
  ) {
    // Get all users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Remove user from list
    const filteredUsers = users.filter((u) => u.username !== user.username);
    localStorage.setItem("users", JSON.stringify(filteredUsers));

    // Clear session
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("currentUser");

    alert("Tu cuenta ha sido eliminada exitosamente");
    window.location.href = "index.html";
  }
}

/**
 * Open modal with animation
 */
function openModal(modal) {
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

/**
 * Close modal and cleanup
 */
function closeModal(modal) {
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/**
 * Setup modal close handlers
 */
document.addEventListener("DOMContentLoaded", () => {
  const profileModal = document.getElementById("profile-modal");
  const profileCloseBtn = profileModal?.querySelector(".close-modal");

  if (profileCloseBtn && profileModal) {
    profileCloseBtn.addEventListener("click", () => {
      closeModal(profileModal);
    });

    profileModal.addEventListener("click", (e) => {
      if (e.target === profileModal) {
        closeModal(profileModal);
      }
    });
  }

  // Initialize module
  initUserShop();
});
