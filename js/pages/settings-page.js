// Settings Page Module
const SettingsPage = {
  render() {
    return `
      <div class="page-content">
        <h1 class="page-title">Configuración</h1>

        <div class="settings-container">
          <div class="settings-section">
            <h2 class="settings-section-title">Configuración General</h2>
            <div class="settings-group">
              <label class="setting-item">
                <span>Nombre de la Tienda</span>
                <input type="text" id="store-name" value="TechStore Admin" />
              </label>
              <label class="setting-item">
                <span>Email de Contacto</span>
                <input type="email" id="store-email" value="admin@techstore.com" />
              </label>
              <label class="setting-item">
                <span>Teléfono de Soporte</span>
                <input type="tel" id="store-phone" value="+34 900 123 456" />
              </label>
            </div>
          </div>

          <div class="settings-section">
            <h2 class="settings-section-title">Configuración de Tienda</h2>
            <div class="settings-group">
              <label class="setting-item checkbox">
                <input type="checkbox" id="enable-notifications" checked />
                <span>Habilitar Notificaciones por Email</span>
              </label>
              <label class="setting-item checkbox">
                <input type="checkbox" id="auto-backup" checked />
                <span>Copia de Seguridad Automática</span>
              </label>
              <label class="setting-item">
                <span>Moneda por Defecto</span>
                <select id="default-currency">
                  <option value="USD">USD - Dólar Americano</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - Libra Esterlina</option>
                </select>
              </label>
              <label class="setting-item">
                <span>Zona Horaria</span>
                <select id="timezone">
                  <option value="UTC">UTC</option>
                  <option value="Europe/Madrid">Europe/Madrid</option>
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </label>
            </div>
          </div>

          <div class="settings-section">
            <h2 class="settings-section-title">Seguridad</h2>
            <div class="settings-group">
              <div class="setting-item">
                <span>Cambiar Contraseña</span>
                <button class="btn btn-secondary" id="change-password-btn">Cambiar</button>
              </div>
              <label class="setting-item checkbox">
                <input type="checkbox" id="two-factor-auth" checked />
                <span>Autenticación de Dos Factores (2FA)</span>
              </label>
              <label class="setting-item checkbox">
                <input type="checkbox" id="login-alerts" checked />
                <span>Alertas de Acceso</span>
              </label>
            </div>
          </div>

          <div class="settings-section">
            <h2 class="settings-section-title">Base de Datos</h2>
            <div class="settings-group">
              <div class="setting-item">
                <span>Última Copia de Seguridad:</span>
                <strong>2025-10-15 14:30:00</strong>
              </div>
              <div class="button-group">
                <button class="btn btn-secondary" id="backup-btn">💾 Hacer Copia de Seguridad</button>
                <button class="btn btn-secondary" id="restore-btn">↩️ Restaurar Copia</button>
              </div>
            </div>
          </div>

          <div class="settings-section">
            <h2 class="settings-section-title">Peligroso</h2>
            <div class="settings-group">
              <div class="setting-item">
                <span>Eliminar Todos los Datos</span>
                <button class="btn btn-danger" id="reset-all-btn">Eliminar Todo</button>
              </div>
            </div>
          </div>

          <div class="settings-actions">
            <button class="btn btn-primary" id="save-settings-btn">💾 Guardar Cambios</button>
            <button class="btn btn-secondary" id="cancel-settings-btn">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Modal para cambiar contraseña -->
      <div class="modal" id="password-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Cambiar Contraseña</h2>
            <button class="modal-close" id="close-password-modal">&times;</button>
          </div>
          <form id="password-form" class="modal-body">
            <div class="form-group">
              <label>Contraseña Actual</label>
              <input type="password" id="current-password" placeholder="Ingresa tu contraseña actual" required />
            </div>
            <div class="form-group">
              <label>Nueva Contraseña</label>
              <input type="password" id="new-password" placeholder="Ingresa la nueva contraseña" required />
            </div>
            <div class="form-group">
              <label>Confirmar Contraseña</label>
              <input type="password" id="confirm-password" placeholder="Confirma la nueva contraseña" required />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="cancel-password-btn">Cancelar</button>
              <button type="submit" class="btn btn-primary">Cambiar Contraseña</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  init() {
    // Manejadores de configuración
    const changePasswordBtn = document.getElementById("change-password-btn");
    const passwordModal = document.getElementById("password-modal");
    const closePasswordModal = document.getElementById("close-password-modal");
    const cancelPasswordBtn = document.getElementById("cancel-password-btn");
    const passwordForm = document.getElementById("password-form");

    if (changePasswordBtn) {
      changePasswordBtn.addEventListener("click", () => {
        passwordModal.classList.add("active");
      });
    }

    if (closePasswordModal) {
      closePasswordModal.addEventListener("click", () => {
        passwordModal.classList.remove("active");
      });
    }

    if (cancelPasswordBtn) {
      cancelPasswordBtn.addEventListener("click", () => {
        passwordModal.classList.remove("active");
      });
    }

    if (passwordForm) {
      passwordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Contraseña cambiada exitosamente");
        passwordForm.reset();
        passwordModal.classList.remove("active");
      });
    }

    if (passwordModal) {
      passwordModal.addEventListener("click", (e) => {
        if (e.target === passwordModal) {
          passwordModal.classList.remove("active");
        }
      });
    }

    // Otros botones
    const saveSettingsBtn = document.getElementById("save-settings-btn");
    const cancelSettingsBtn = document.getElementById("cancel-settings-btn");
    const backupBtn = document.getElementById("backup-btn");
    const restoreBtn = document.getElementById("restore-btn");
    const resetAllBtn = document.getElementById("reset-all-btn");

    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener("click", () => {
        alert("Configuración guardada exitosamente");
      });
    }

    if (cancelSettingsBtn) {
      cancelSettingsBtn.addEventListener("click", () => {
        alert("Cambios cancelados");
      });
    }

    if (backupBtn) {
      backupBtn.addEventListener("click", () => {
        alert(
          "Copia de seguridad iniciada. Esto puede tomar algunos minutos..."
        );
      });
    }

    if (restoreBtn) {
      restoreBtn.addEventListener("click", () => {
        if (
          confirm(
            "¿Estás seguro de que quieres restaurar los datos? Esta acción no se puede deshacer."
          )
        ) {
          alert(
            "Restauración iniciada. El sistema se reiniciará cuando termine."
          );
        }
      });
    }

    if (resetAllBtn) {
      resetAllBtn.addEventListener("click", () => {
        if (
          confirm(
            "⚠️ ADVERTENCIA: Esta acción eliminará TODOS los datos de forma permanente. ¿Estás completamente seguro?"
          )
        ) {
          if (confirm("Última confirmación: ¿Deseas continuar?")) {
            alert("Datos eliminados. El sistema ha sido reiniciado.");
          }
        }
      });
    }
  },
};
