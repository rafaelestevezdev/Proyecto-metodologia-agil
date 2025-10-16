// Navigation Manager - Carga dinámica de módulos
const NavigationManager = {
  currentPage: "dashboard",
  pages: {
    dashboard: DashboardPage,
    products: ProductsPage,
    categories: CategoriesPage,
    orders: OrdersPage,
    customers: CustomersPage,
    reports: ReportsPage,
    settings: SettingsPage,
  },

  init() {
    this.setupNavigation();
    this.loadPage("dashboard");
  },

  setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        this.loadPage(page);

        // Actualizar enlace activo
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        // Cerrar sidebar en móvil
        const sidebar = document.getElementById("sidebar");
        if (sidebar && window.innerWidth <= 768) {
          sidebar.classList.remove("active");
        }
      });
    });
  },

  loadPage(pageName) {
    const page = this.pages[pageName];
    if (!page) {
      console.error(`Página ${pageName} no encontrada`);
      return;
    }

    const mainElement = document.querySelector("main");
    if (!mainElement) {
      console.error("Elemento main no encontrado");
      return;
    }

    // Renderizar la página
    mainElement.innerHTML = page.render();

    // Inicializar los eventos de la página
    if (page.init && typeof page.init === "function") {
      page.init();
    }

    this.currentPage = pageName;
    window.scrollTo(0, 0);
  },
};

// Inicializar cuando el DOM está listo
document.addEventListener("DOMContentLoaded", function () {
  // Esperar a que todos los módulos estén cargados
  const checkModulesLoaded = setInterval(() => {
    if (
      typeof DashboardPage !== "undefined" &&
      typeof ProductsPage !== "undefined" &&
      typeof CategoriesPage !== "undefined" &&
      typeof OrdersPage !== "undefined" &&
      typeof CustomersPage !== "undefined" &&
      typeof ReportsPage !== "undefined" &&
      typeof SettingsPage !== "undefined"
    ) {
      clearInterval(checkModulesLoaded);
      NavigationManager.init();
    }
  }, 100);
});
