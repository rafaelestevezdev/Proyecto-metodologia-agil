/**
 * Authentication Module
 * Responsabilidad única: Manejar autenticación y autorización
 */

export const AuthModule = {
  /**
   * Verifica si el usuario está autenticado y es admin
   */
  checkAuth() {
    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      window.location.href = "login.html";
      return false;
    }

    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      window.location.href = "login.html";
      return false;
    }

    if (currentUser.role !== "admin") {
      window.location.href = "tienda-productos.html";
      return false;
    }

    return true;
  },

  /**
   * Obtiene los datos del usuario actual
   */
  getCurrentUser() {
    const currentUserData = sessionStorage.getItem("currentUser");
    if (currentUserData) {
      try {
        return JSON.parse(currentUserData);
      } catch (e) {
        console.error("Error parsing user data:", e);
        return null;
      }
    }
    return null;
  },

  /**
   * Ejecuta el logout
   */
  logout() {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
  },
};
