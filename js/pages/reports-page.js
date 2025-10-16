// Reports Page Module
const ReportsPage = {
  render() {
    return `
      <div class="page-content">
        <h1 class="page-title">Reportes</h1>

        <div class="reports-filters">
          <select id="report-type" class="filter-select">
            <option value="sales">Reporte de Ventas</option>
            <option value="products">Reporte de Productos</option>
            <option value="customers">Reporte de Clientes</option>
            <option value="inventory">Reporte de Inventario</option>
          </select>
          <input type="date" id="report-date-from" />
          <span>-</span>
          <input type="date" id="report-date-to" />
          <button class="btn btn-primary" id="generate-report-btn">Generar Reporte</button>
          <button class="btn btn-secondary" id="export-report-btn">📥 Exportar CSV</button>
        </div>

        <div class="reports-container">
          <div class="section-container">
            <h2 class="section-title">Resumen de Ventas</h2>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">$47,850.00</div>
                <div class="stat-label">Ingresos Totales</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">234</div>
                <div class="stat-label">Pedidos</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">$204.50</div>
                <div class="stat-label">Ticket Promedio</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">1,289</div>
                <div class="stat-label">Clientes Totales</div>
              </div>
            </div>
          </div>

          <div class="section-container">
            <h2 class="section-title">Top 10 Productos Más Vendidos</h2>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>Producto</th>
                  <th>Unidades Vendidas</th>
                  <th>Ingresos</th>
                  <th>% del Total</th>
                </tr>
              </thead>
              <tbody id="top-products">
              </tbody>
            </table>
          </div>

          <div class="section-container">
            <h2 class="section-title">Top 5 Categorías</h2>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Ventas</th>
                  <th>Ingresos</th>
                  <th>% del Total</th>
                </tr>
              </thead>
              <tbody id="top-categories">
              </tbody>
            </table>
          </div>

          <div class="section-container">
            <h2 class="section-title">Análisis de Inventario</h2>
            <div class="inventory-grid">
              <div class="inventory-item">
                <h4>Productos en Stock</h4>
                <div class="inventory-value">856</div>
              </div>
              <div class="inventory-item low-stock">
                <h4>Bajo Stock</h4>
                <div class="inventory-value">23</div>
              </div>
              <div class="inventory-item out-of-stock">
                <h4>Agotados</h4>
                <div class="inventory-value">8</div>
              </div>
              <div class="inventory-item">
                <h4>Valor Total Inventario</h4>
                <div class="inventory-value">$142,530.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const topProductsData = [
      {
        position: 1,
        name: "Laptop Dell XPS 13",
        units: 89,
        revenue: "$115,911.11",
        percentage: "24.2%",
      },
      {
        position: 2,
        name: "Monitor LG 27 4K",
        units: 67,
        revenue: "$23,449.33",
        percentage: "4.9%",
      },
      {
        position: 3,
        name: "Mouse Logitech MX Master",
        units: 124,
        revenue: "$12,399.76",
        percentage: "2.6%",
      },
      {
        position: 4,
        name: "Auriculares Sony WH-1000",
        units: 56,
        revenue: "$19,599.44",
        percentage: "4.1%",
      },
      {
        position: 5,
        name: "Teclado Mecánico Corsair",
        units: 45,
        revenue: "$6,749.55",
        percentage: "1.4%",
      },
      {
        position: 6,
        name: "Monitor Ultrawide ASUS",
        units: 32,
        revenue: "$22,399.68",
        percentage: "4.7%",
      },
      {
        position: 7,
        name: "Hub USB-C Belkin",
        units: 178,
        revenue: "$14,239.22",
        percentage: "3.0%",
      },
      {
        position: 8,
        name: "Dock USB-C ThinkPad",
        units: 28,
        revenue: "$6,999.72",
        percentage: "1.5%",
      },
      {
        position: 9,
        name: "Webcam Logitech 4K",
        units: 52,
        revenue: "$4,159.48",
        percentage: "0.9%",
      },
      {
        position: 10,
        name: "Cable HDMI Premium",
        units: 234,
        revenue: "$2,991.66",
        percentage: "0.6%",
      },
    ];

    const topCategoriesData = [
      {
        category: "Laptops",
        sales: 256,
        revenue: "$285,900.00",
        percentage: "59.7%",
      },
      {
        category: "Monitores",
        sales: 89,
        revenue: "$89,500.00",
        percentage: "18.7%",
      },
      {
        category: "Periféricos",
        sales: 412,
        revenue: "$78,200.00",
        percentage: "16.3%",
      },
      {
        category: "Accesorios",
        sales: 234,
        revenue: "$18,400.00",
        percentage: "3.8%",
      },
      {
        category: "Auriculares",
        sales: 145,
        revenue: "$38,950.00",
        percentage: "8.1%",
      },
    ];

    const topProducts = document.getElementById("top-products");
    topProductsData.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><strong>${product.position}</strong></td>
        <td>${product.name}</td>
        <td>${product.units}</td>
        <td>${product.revenue}</td>
        <td>${product.percentage}</td>
      `;
      topProducts.appendChild(row);
    });

    const topCategories = document.getElementById("top-categories");
    topCategoriesData.forEach((category) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><strong>${category.category}</strong></td>
        <td>${category.sales}</td>
        <td>${category.revenue}</td>
        <td>${category.percentage}</td>
      `;
      topCategories.appendChild(row);
    });

    // Manejadores de botones
    const generateReportBtn = document.getElementById("generate-report-btn");
    const exportReportBtn = document.getElementById("export-report-btn");

    if (generateReportBtn) {
      generateReportBtn.addEventListener("click", () => {
        alert("Reporte generado exitosamente. (Este es un dato de prueba)");
      });
    }

    if (exportReportBtn) {
      exportReportBtn.addEventListener("click", () => {
        alert("Reporte exportado a CSV. (Descarga iniciada)");
      });
    }
  },
};
