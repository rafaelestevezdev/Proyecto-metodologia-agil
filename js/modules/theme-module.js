/**
 * Theme Module
 * Responsabilidad única: Manejar el tema claro/oscuro
 */

export const ThemeModule = {
  STORAGE_KEY: "dashboard-theme",
  DARK_CLASS: "dark-mode",

  /**
   * Inicializa el módulo de tema
   */
  init() {
    this.loadSavedTheme();
    this.setupThemeToggle();
  },

  /**
   * Carga el tema guardado
   */
  loadSavedTheme() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) || "light";
    this.applyTheme(savedTheme);
  },

  /**
   * Configura el botón de toggle de tema
   */
  setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const currentTheme = document.body.classList.contains(this.DARK_CLASS)
          ? "light"
          : "dark";
        this.applyTheme(currentTheme);
        localStorage.setItem(this.STORAGE_KEY, currentTheme);
      });
    }
  },

  /**
   * Aplica el tema
   */
  applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add(this.DARK_CLASS);
    } else {
      document.body.classList.remove(this.DARK_CLASS);
    }
  },
};
