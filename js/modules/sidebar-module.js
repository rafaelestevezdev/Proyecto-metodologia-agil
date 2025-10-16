/**
 * Sidebar Navigation Module
 * Responsabilidad única: Manejar la navegación del sidebar
 */

export const SidebarModule = {
  currentView: "dashboard",

  /**
   * Vistas disponibles con sus configuraciones
   */
  views: {
    dashboard: {
      title: "Dashboard",
      icon: "🏠",
      render: () => SidebarModule.renderDashboard(),
    },
    analytics: {
      title: "Analytics",
      icon: "📊",
      render: () => SidebarModule.renderAnalytics(),
    },
    users: {
      title: "Usuarios",
      icon: "👥",
      render: () => SidebarModule.renderUsers(),
    },
    content: {
      title: "Contenido",
      icon: "✏️",
      render: () => SidebarModule.renderContent(),
    },
    settings: {
      title: "Configuración",
      icon: "⚙️",
      render: () => SidebarModule.renderSettings(),
    },
  },

  /**
   * Inicializa el módulo del sidebar
   */
  init() {
    this.setupSidebarToggle();
    this.setupSidebarLinks();
    this.renderDashboard();
  },

  /**
   * Configura el toggle del sidebar
   */
  setupSidebarToggle() {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const mobileNavToggle = document.getElementById("mobile-nav-toggle");
    const sidebar = document.getElementById("sidebar");

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        sidebar?.classList.toggle("collapsed");
      });
    }

    if (mobileNavToggle) {
      mobileNavToggle.addEventListener("click", () => {
        sidebar?.classList.toggle("collapsed");
      });
    }
  },

  /**
   * Configura los links del sidebar
   */
  setupSidebarLinks() {
    const sidebarMenu = document.querySelector(".sidebar-menu");
    if (!sidebarMenu) return;

    const links = sidebarMenu.querySelectorAll("a");
    links.forEach((link, index) => {
      const viewKey = Object.keys(this.views)[index];
      if (viewKey) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          this.switchView(viewKey);
        });
      }
    });
  },

  /**
   * Cambia la vista actual
   */
  switchView(viewKey) {
    if (!this.views[viewKey]) return;

    this.currentView = viewKey;
    this.updateActiveLink(viewKey);
    this.views[viewKey].render();
  },

  /**
   * Actualiza el link activo en el sidebar
   */
  updateActiveLink(viewKey) {
    const sidebarMenu = document.querySelector(".sidebar-menu");
    if (!sidebarMenu) return;

    const links = sidebarMenu.querySelectorAll("a");
    links.forEach((link) => link.classList.remove("active"));

    const viewIndex = Object.keys(this.views).indexOf(viewKey);
    if (links[viewIndex]) {
      links[viewIndex].classList.add("active");
    }
  },

  /**
   * Renderiza el Dashboard
   */
  renderDashboard() {
    const main = document.querySelector("main");
    if (!main) return;

    main.innerHTML = `
      <div class="kpi-grid">
        <div class="card">
          <h3>Revenue</h3>
          <p>$12,450</p>
          <div class="sparkline" id="spark-revenue"></div>
        </div>
        <div class="card">
          <h3>Orders</h3>
          <p>890</p>
          <div class="sparkline" id="spark-orders"></div>
        </div>
        <div class="card">
          <h3>Growth</h3>
          <p>+28%</p>
          <div class="sparkline" id="spark-growth"></div>
        </div>
        <div class="card">
          <h3>Users</h3>
          <p>2,456</p>
          <div class="sparkline" id="spark-users"></div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px;">
        <div class="card">
          <h3>Sales Chart</h3>
          <canvas id="sales-chart" style="max-height: 300px;"></canvas>
        </div>
        <div class="card">
          <h3>Distribution</h3>
          <canvas id="distribution-chart" style="max-height: 300px;"></canvas>
        </div>
      </div>

      <div class="card" style="margin-top: 24px;">
        <h3>Recent Orders</h3>
        <table id="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <div class="table-pagination" id="table-pagination"></div>
      </div>
    `;

    // Renderizar gráficos después de que el DOM esté listo
    requestAnimationFrame(() => {
      this.renderCharts();
      this.populateTable();
    });
  },

  /**
   * Renderiza Analytics
   */
  renderAnalytics() {
    const main = document.querySelector("main");
    if (!main) return;

    main.innerHTML = `
      <div class="card">
        <h2>📊 Analítica</h2>
        <div style="padding: 40px; text-align: center;">
          <h3>Estadísticas del Sistema</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
            <div style="background: var(--bg); padding: 20px; border-radius: 8px;">
              <div style="font-size: 2rem; font-weight: bold; color: var(--sage);">1,234</div>
              <div>Visitas Hoy</div>
            </div>
            <div style="background: var(--bg); padding: 20px; border-radius: 8px;">
              <div style="font-size: 2rem; font-weight: bold; color: var(--rusk);">856</div>
              <div>Usuarios Activos</div>
            </div>
            <div style="background: var(--bg); padding: 20px; border-radius: 8px;">
              <div style="font-size: 2rem; font-weight: bold; color: var(--pipe);">$45,280</div>
              <div>Ingresos</div>
            </div>
            <div style="background: var(--bg); padding: 20px; border-radius: 8px;">
              <div style="font-size: 2rem; font-weight: bold; color: #27ae60;">94.5%</div>
              <div>Tasa Conversión</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza Users
   */
  renderUsers() {
    const main = document.querySelector("main");
    if (!main) return;

    main.innerHTML = `
      <div class="card">
        <h2>👥 Gestión de Usuarios</h2>
        <div style="padding: 20px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
            <div style="background: var(--bg); padding: 20px; border-radius: 8px; border-left: 4px solid var(--sage);">
              <div style="font-size: 1.5rem; font-weight: bold;">2,456</div>
              <div style="opacity: 0.7;">Total de Usuarios</div>
              <div style="font-size: 0.9rem; color: #27ae60; margin-top: 8px;">↑ 12% este mes</div>
            </div>
            <div style="background: var(--bg); padding: 20px; border-radius: 8px; border-left: 4px solid var(--rusk);">
              <div style="font-size: 1.5rem; font-weight: bold;">1,823</div>
              <div style="opacity: 0.7;">Usuarios Activos</div>
              <div style="font-size: 0.9rem; color: #e74c3c; margin-top: 8px;">↓ 5% este mes</div>
            </div>
            <div style="background: var(--bg); padding: 20px; border-radius: 8px; border-left: 4px solid var(--pipe);">
              <div style="font-size: 1.5rem; font-weight: bold;">633</div>
              <div style="opacity: 0.7;">Nuevos Usuarios</div>
              <div style="font-size: 0.9rem; color: #27ae60; margin-top: 8px;">↑ 28% este mes</div>
            </div>
          </div>

          <h3 style="margin-top: 30px;">Últimos Usuarios Registrados</h3>
          <table id="users-table" style="width: 100%; margin-top: 15px; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-color);">
                <th style="text-align: left; padding: 10px;">Usuario</th>
                <th style="text-align: left; padding: 10px;">Email</th>
                <th style="text-align: left; padding: 10px;">Registro</th>
                <th style="text-align: left; padding: 10px;">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px;">Juan Pérez</td>
                <td style="padding: 10px;">juan@example.com</td>
                <td style="padding: 10px;">2025-10-14</td>
                <td style="padding: 10px;"><span style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">Activo</span></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px;">María García</td>
                <td style="padding: 10px;">maria@example.com</td>
                <td style="padding: 10px;">2025-10-13</td>
                <td style="padding: 10px;"><span style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">Activo</span></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px;">Carlos López</td>
                <td style="padding: 10px;">carlos@example.com</td>
                <td style="padding: 10px;">2025-10-12</td>
                <td style="padding: 10px;"><span style="background: #95a5a6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">Inactivo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza Content
   */
  renderContent() {
    const main = document.querySelector("main");
    if (!main) return;

    main.innerHTML = `
      <div class="card">
        <h2>✏️ Gestión de Contenido</h2>
        <div style="padding: 20px;">
          <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button style="background: var(--sage); color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer;">+ Crear Nuevo</button>
            <button style="background: var(--bg); color: var(--text-color); padding: 10px 20px; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">Filtrar</button>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-color);">
                <th style="text-align: left; padding: 10px;">Título</th>
                <th style="text-align: left; padding: 10px;">Autor</th>
                <th style="text-align: left; padding: 10px;">Fecha</th>
                <th style="text-align: left; padding: 10px;">Estado</th>
                <th style="text-align: left; padding: 10px;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px;">Introducción al Dashboard</td>
                <td style="padding: 10px;">Admin</td>
                <td style="padding: 10px;">2025-10-15</td>
                <td style="padding: 10px;"><span style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">Publicado</span></td>
                <td style="padding: 10px;"><button style="background: var(--sage); color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Editar</button></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px;">Guía de Uso</td>
                <td style="padding: 10px;">Admin</td>
                <td style="padding: 10px;">2025-10-14</td>
                <td style="padding: 10px;"><span style="background: #f39c12; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">Borrador</span></td>
                <td style="padding: 10px;"><button style="background: var(--sage); color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Editar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza Settings
   */
  renderSettings() {
    const main = document.querySelector("main");
    if (!main) return;

    main.innerHTML = `
      <div class="card">
        <h2>⚙️ Configuración del Sistema</h2>
        <div style="padding: 20px;">
          <div style="max-width: 600px;">
            <h3>Configuración General</h3>
            <div style="margin: 20px 0; padding: 15px; background: var(--bg); border-radius: 8px;">
              <label style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
                <span>Modo Oscuro</span>
                <input type="checkbox" id="dark-mode-toggle" />
              </label>
            </div>

            <div style="margin: 20px 0; padding: 15px; background: var(--bg); border-radius: 8px;">
              <label style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
                <span>Notificaciones Push</span>
                <input type="checkbox" checked />
              </label>
            </div>

            <div style="margin: 20px 0; padding: 15px; background: var(--bg); border-radius: 8px;">
              <label style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
                <span>Iniciar sesión automáticamente</span>
                <input type="checkbox" />
              </label>
            </div>

            <h3 style="margin-top: 30px;">Seguridad</h3>
            <div style="margin: 20px 0; padding: 15px; background: var(--bg); border-radius: 8px;">
              <button style="background: var(--sage); color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; width: 100%;">Cambiar Contraseña</button>
            </div>

            <div style="margin: 20px 0; padding: 15px; background: var(--bg); border-radius: 8px;">
              <button style="background: var(--rusk); color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; width: 100%;">Limpiar Cache</button>
            </div>

            <div style="margin-top: 40px; padding: 20px; background: #ffe6e6; border-radius: 8px; border-left: 4px solid var(--pipe);">
              <h4 style="color: var(--pipe); margin: 0 0 10px 0;">Zona de Peligro</h4>
              <p style="margin: 0 0 15px 0; font-size: 0.9rem;">Eliminar toda la información del sistema</p>
              <button style="background: var(--pipe); color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer;">Resetear Sistema</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renderiza los gráficos
   */
  renderCharts() {
    // Sales Chart
    const salesCtx = document.getElementById("sales-chart");
    if (salesCtx && typeof Chart !== "undefined") {
      new Chart(salesCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Sales",
              data: [12, 19, 3, 5, 2, 3],
              borderColor: "rgb(120, 129, 118)",
              backgroundColor: "rgba(120, 129, 118, 0.1)",
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
        },
      });
    }

    // Distribution Chart
    const distCtx = document.getElementById("distribution-chart");
    if (distCtx && typeof Chart !== "undefined") {
      new Chart(distCtx, {
        type: "doughnut",
        data: {
          labels: ["Product A", "Product B", "Product C"],
          datasets: [
            {
              data: [30, 25, 45],
              backgroundColor: ["#788176", "#CCB999", "#5E1803"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom" } },
        },
      });
    }
  },

  /**
   * Llena la tabla de datos
   */
  populateTable() {
    const tbody = document.querySelector("#data-table tbody");
    if (!tbody) return;

    const sampleData = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Editor",
        status: "Inactive",
      },
      {
        id: 3,
        name: "Peter Jones",
        email: "peter.jones@example.com",
        role: "Viewer",
        status: "Active",
      },
    ];

    tbody.innerHTML = sampleData
      .map(
        (item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.role}</td>
        <td><span style="background: ${
          item.status === "Active" ? "#27ae60" : "#95a5a6"
        }; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">${
          item.status
        }</span></td>
      </tr>
    `
      )
      .join("");
  },
};
