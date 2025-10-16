/**
 * Dashboard Main Module
 * Responsabilidad única: Orquestar la inicialización de todos los módulos
 */

import { AuthModule } from "./modules/auth-module.js";
import { ProfileMenuModule } from "./modules/profile-menu-module.js";
import { LogoutModalModule } from "./modules/logout-modal-module.js";
import { ThemeModule } from "./modules/theme-module.js";
import { SidebarModule } from "./modules/sidebar-module.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Verificar autenticación
  if (!AuthModule.checkAuth()) return;

  // 2. Inicializar módulos
  const currentUser = AuthModule.getCurrentUser();

  // 3. Tema
  ThemeModule.init();

  // 4. Menú de Perfil
  ProfileMenuModule.init(currentUser);

  // 5. Modal de Logout
  LogoutModalModule.init(() => {
    ProfileMenuModule.closeMenu();
    AuthModule.logout();
  });

  // 6. Sidebar y Navegación
  SidebarModule.init();
});
