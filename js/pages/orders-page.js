// Orders Page Module
const OrdersPage = {
  render() {
    return `
      <div class="page-content">
        <h1 class="page-title">Pedidos</h1>

        <div class="section-container">
          <div class="table-header">
            <input type="text" class="search-input" placeholder="Buscar pedidos..." id="orders-search" />
            <select id="status-filter" class="filter-select">
              <option value="">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="processing">Procesando</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>Pedido ID</th>
                <th>Cliente</th>
                <th>Monto Total</th>
                <th>Productos</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="orders-list">
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal para ver detalles del pedido -->
      <div class="modal" id="order-details-modal">
        <div class="modal-content order-modal">
          <div class="modal-header">
            <h2>Detalles del Pedido</h2>
            <button class="modal-close" id="close-order-modal">&times;</button>
          </div>
          <div class="modal-body" id="order-details-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="print-order-btn">🖨️ Imprimir</button>
            <button type="button" class="btn btn-secondary" id="close-order-details-btn">Cerrar</button>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const ordersData = [
      {
        id: "#ORD-001",
        customer: "Carlos Hernández",
        email: "carlos@email.com",
        amount: "$2,450.00",
        items: [
          { name: "Laptop Dell XPS", qty: 1, price: "$1,899.99" },
          { name: "Mouse Logitech", qty: 1, price: "$99.99" },
          { name: "Hub USB-C", qty: 1, price: "$79.99" },
        ],
        status: "completed",
        date: "2025-10-15",
        shippingAddress: "Calle Principal 123, Ciudad",
      },
      {
        id: "#ORD-002",
        customer: "Marina García",
        email: "marina@email.com",
        amount: "$1,285.50",
        items: [
          { name: 'Monitor LG 27"', qty: 1, price: "$349.99" },
          { name: "Teclado Mecánico", qty: 1, price: "$149.99" },
          { name: "Soporte Monitor", qty: 1, price: "$29.99" },
        ],
        status: "completed",
        date: "2025-10-14",
        shippingAddress: "Avenida Central 456, Ciudad",
      },
      {
        id: "#ORD-003",
        customer: "Roberto Díaz",
        email: "roberto@email.com",
        amount: "$845.99",
        items: [
          { name: "Auriculares Sony WH-1000", qty: 1, price: "$349.99" },
          { name: "Cable Audio 3.5mm", qty: 2, price: "$12.99" },
        ],
        status: "processing",
        date: "2025-10-13",
        shippingAddress: "Calle del Comercio 789, Ciudad",
      },
      {
        id: "#ORD-004",
        customer: "Andrea López",
        email: "andrea@email.com",
        amount: "$3,120.00",
        items: [
          { name: "Workstation ThinkPad P1", qty: 1, price: "$2,299.99" },
          { name: "Dock USB-C", qty: 1, price: "$249.99" },
          { name: "Software Suite", qty: 1, price: "$299.99" },
        ],
        status: "completed",
        date: "2025-10-12",
        shippingAddress: "Plaza Mayor 321, Ciudad",
      },
      {
        id: "#ORD-005",
        customer: "Juan Martínez",
        email: "juan@email.com",
        amount: "$560.75",
        items: [
          { name: "Hub USB 3.0", qty: 1, price: "$79.99" },
          { name: "Cables HDMI", qty: 3, price: "$19.99" },
        ],
        status: "pending",
        date: "2025-10-11",
        shippingAddress: "Parque Industrial 654, Ciudad",
      },
      {
        id: "#ORD-006",
        customer: "Sofia Rodríguez",
        email: "sofia@email.com",
        amount: "$2,890.00",
        items: [
          { name: "Monitor Ultrawide ASUS", qty: 1, price: "$699.99" },
          { name: "Stand Ajustable", qty: 1, price: "$249.99" },
          { name: "Cables DP", qty: 2, price: "$24.99" },
        ],
        status: "completed",
        date: "2025-10-10",
        shippingAddress: "Zona Residencial 111, Ciudad",
      },
    ];

    const ordersList = document.getElementById("orders-list");
    const renderOrders = () => {
      ordersList.innerHTML = "";
      ordersData.forEach((order) => {
        const statusClass =
          order.status === "completed"
            ? "active"
            : order.status === "processing"
            ? "warning"
            : order.status === "pending"
            ? "pending"
            : "danger";
        const statusText =
          order.status === "completed"
            ? "Completado"
            : order.status === "processing"
            ? "Procesando"
            : order.status === "pending"
            ? "Pendiente"
            : "Cancelado";

        const itemsList = order.items.map((item) => item.name).join(", ");

        const row = document.createElement("tr");
        row.innerHTML = `
          <td><strong>${order.id}</strong></td>
          <td>${order.customer}</td>
          <td><strong>${order.amount}</strong></td>
          <td style="font-size: 12px; color: var(--text-secondary); max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${itemsList}</td>
          <td><span class="badge ${statusClass}">${statusText}</span></td>
          <td>${order.date}</td>
          <td>
            <button class="btn-icon view-order-btn" data-order-id="${order.id}" title="Ver detalles">👁️</button>
            <button class="btn-icon edit-order-btn" title="Editar">✏️</button>
          </td>
        `;
        ordersList.appendChild(row);
      });

      // Agregar eventos a los botones de ver detalles
      document.querySelectorAll(".view-order-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const orderId = e.target.getAttribute("data-order-id");
          const order = ordersData.find((o) => o.id === orderId);
          if (order) {
            showOrderDetails(order);
          }
        });
      });
    };

    const showOrderDetails = (order) => {
      const modal = document.getElementById("order-details-modal");
      const detailsBody = document.getElementById("order-details-body");

      let itemsHtml = order.items
        .map(
          (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${item.price}</td>
        </tr>
      `
        )
        .join("");

      detailsBody.innerHTML = `
        <div class="order-details">
          <div class="details-row">
            <div class="details-col">
              <h4>Información del Pedido</h4>
              <p><strong>ID:</strong> ${order.id}</p>
              <p><strong>Fecha:</strong> ${order.date}</p>
              <p><strong>Estado:</strong> <span class="badge">${order.status}</span></p>
            </div>
            <div class="details-col">
              <h4>Información del Cliente</h4>
              <p><strong>Nombre:</strong> ${order.customer}</p>
              <p><strong>Email:</strong> ${order.email}</p>
              <p><strong>Dirección:</strong> ${order.shippingAddress}</p>
            </div>
          </div>

          <h4 style="margin-top: 20px; margin-bottom: 10px;">Productos</h4>
          <table class="data-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="order-total" style="margin-top: 20px; text-align: right; padding-top: 20px; border-top: 1px solid var(--border-color);">
            <p style="font-size: 18px; font-weight: 700;"><strong>Total:</strong> ${order.amount}</p>
          </div>
        </div>
      `;

      modal.classList.add("active");
    };

    renderOrders();

    // Manejadores de modal
    const orderModal = document.getElementById("order-details-modal");
    const closeOrderModal = document.getElementById("close-order-modal");
    const closeOrderDetailsBtn = document.getElementById(
      "close-order-details-btn"
    );
    const printOrderBtn = document.getElementById("print-order-btn");

    if (closeOrderModal) {
      closeOrderModal.addEventListener("click", () => {
        orderModal.classList.remove("active");
      });
    }

    if (closeOrderDetailsBtn) {
      closeOrderDetailsBtn.addEventListener("click", () => {
        orderModal.classList.remove("active");
      });
    }

    if (printOrderBtn) {
      printOrderBtn.addEventListener("click", () => {
        window.print();
      });
    }

    if (orderModal) {
      orderModal.addEventListener("click", (e) => {
        if (e.target === orderModal) {
          orderModal.classList.remove("active");
        }
      });
    }
  },
};
