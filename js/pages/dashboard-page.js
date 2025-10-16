// Dashboard Page Module
const DashboardPage = {
  render() {
    return `
      <div class="page-content">
        <h1 class="page-title">Dashboard</h1>
        
        <div class="kpi-grid">
          <div class="stat-card">
            <div class="stat-card-content">
              <div class="stat-label">Ventas Totales</div>
              <div class="stat-value">$47,850.00</div>
              <div class="stat-change positive">↑ 12% vs mes anterior</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card-content">
              <div class="stat-label">Pedidos</div>
              <div class="stat-value">234</div>
              <div class="stat-change positive">↑ 8% vs mes anterior</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card-content">
              <div class="stat-label">Clientes Activos</div>
              <div class="stat-value">1,289</div>
              <div class="stat-change positive">↑ 5% vs mes anterior</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card-content">
              <div class="stat-label">Productos en Stock</div>
              <div class="stat-value">856</div>
              <div class="stat-change negative">↓ 3% vs mes anterior</div>
            </div>
          </div>
        </div>

        <div class="section-container">
          <h2 class="section-title">Últimos Pedidos</h2>
          <div class="table-header">
            <input type="text" class="search-input" placeholder="Buscar pedidos..." />
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Pedido ID</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Productos</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody id="orders-table-body">
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  init() {
    const ordersData = [
      {
        id: "#ORD-001",
        customer: "Carlos Hernández",
        amount: "$2,450.00",
        items: "Laptop Dell XPS, Mouse Logitech",
        status: "completed",
        date: "Hace 30 min",
      },
      {
        id: "#ORD-002",
        customer: "Marina García",
        amount: "$1,285.50",
        items: 'Monitor LG 27", Teclado Mecánico',
        status: "completed",
        date: "Hace 1 hora",
      },
      {
        id: "#ORD-003",
        customer: "Roberto Díaz",
        amount: "$845.99",
        items: "Auriculares Sony WH-1000",
        status: "processing",
        date: "Hace 2 horas",
      },
      {
        id: "#ORD-004",
        customer: "Andrea López",
        amount: "$3,120.00",
        items: "Workstation ThinkPad P1, Dock USB-C",
        status: "completed",
        date: "Hace 3 horas",
      },
      {
        id: "#ORD-005",
        customer: "Juan Martínez",
        amount: "$560.75",
        items: "Hub USB 3.0, Cables HDMI",
        status: "pending",
        date: "Hace 4 horas",
      },
      {
        id: "#ORD-006",
        customer: "Sofia Rodríguez",
        amount: "$2,890.00",
        items: "Monitor Ultrawide ASUS, Stand Ajustable",
        status: "completed",
        date: "Hace 5 horas",
      },
    ];

    const tableBody = document.getElementById("orders-table-body");
    if (tableBody) {
      ordersData.forEach((order) => {
        const statusBadgeClass =
          order.status === "completed"
            ? "active"
            : order.status === "processing"
            ? "warning"
            : "pending";
        const statusText =
          order.status === "completed"
            ? "Completado"
            : order.status === "processing"
            ? "Procesando"
            : "Pendiente";

        const row = document.createElement("tr");
        row.innerHTML = `
          <td><strong>${order.id}</strong></td>
          <td>${order.customer}</td>
          <td><strong>${order.amount}</strong></td>
          <td style="font-size: 12px; color: var(--text-secondary);">${order.items}</td>
          <td><span class="badge ${statusBadgeClass}">${statusText}</span></td>
          <td>${order.date}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  },
};
