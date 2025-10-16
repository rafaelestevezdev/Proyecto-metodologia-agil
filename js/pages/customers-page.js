// Customers Page Module
const CustomersPage = {
  render() {
    return `
      <div class="page-content">
        <div class="page-header">
          <h1 class="page-title">Clientes</h1>
          <button class="btn btn-primary" id="add-customer-btn">+ Nuevo Cliente</button>
        </div>

        <div class="section-container">
          <div class="table-header">
            <input type="text" class="search-input" placeholder="Buscar clientes..." id="customers-search" />
            <select id="status-filter-customers" class="filter-select">
              <option value="">Todos</option>
              <option value="vip">VIP</option>
              <option value="regular">Regular</option>
              <option value="new">Nuevo</option>
            </select>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Compras</th>
                <th>Total Gastado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="customers-list">
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal para agregar/editar cliente -->
      <div class="modal" id="customer-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Nuevo Cliente</h2>
            <button class="modal-close" id="close-customer-modal">&times;</button>
          </div>
          <form id="customer-form" class="modal-body">
            <div class="form-group">
              <label>Nombre Completo</label>
              <input type="text" id="customer-name" placeholder="Ej: Juan Pérez" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Email</label>
                <input type="email" id="customer-email" placeholder="correo@ejemplo.com" required />
              </div>
              <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" id="customer-phone" placeholder="+34 600 123 456" required />
              </div>
            </div>
            <div class="form-group">
              <label>Dirección</label>
              <input type="text" id="customer-address" placeholder="Calle Principal 123" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Ciudad</label>
                <input type="text" id="customer-city" placeholder="Madrid" required />
              </div>
              <div class="form-group">
                <label>Código Postal</label>
                <input type="text" id="customer-zip" placeholder="28001" required />
              </div>
            </div>
            <div class="form-group">
              <label>Estado</label>
              <select id="customer-status">
                <option value="new">Nuevo</option>
                <option value="regular">Regular</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="cancel-customer-btn">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar Cliente</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  init() {
    const customersData = [
      {
        id: "CLI-001",
        name: "Carlos Hernández",
        email: "carlos@email.com",
        phone: "+34 600 123 456",
        purchases: 8,
        totalSpent: "$12,450.00",
        status: "vip",
        joinDate: "2024-01-15",
      },
      {
        id: "CLI-002",
        name: "Marina García",
        email: "marina@email.com",
        phone: "+34 601 234 567",
        purchases: 5,
        totalSpent: "$5,285.50",
        status: "regular",
        joinDate: "2024-03-20",
      },
      {
        id: "CLI-003",
        name: "Roberto Díaz",
        email: "roberto@email.com",
        phone: "+34 602 345 678",
        purchases: 12,
        totalSpent: "$18,945.99",
        status: "vip",
        joinDate: "2023-06-10",
      },
      {
        id: "CLI-004",
        name: "Andrea López",
        email: "andrea@email.com",
        phone: "+34 603 456 789",
        purchases: 3,
        totalSpent: "$3,120.00",
        status: "new",
        joinDate: "2025-09-01",
      },
      {
        id: "CLI-005",
        name: "Juan Martínez",
        email: "juan@email.com",
        phone: "+34 604 567 890",
        purchases: 2,
        totalSpent: "$560.75",
        status: "new",
        joinDate: "2025-08-15",
      },
      {
        id: "CLI-006",
        name: "Sofia Rodríguez",
        email: "sofia@email.com",
        phone: "+34 605 678 901",
        purchases: 10,
        totalSpent: "$22,890.00",
        status: "vip",
        joinDate: "2023-11-05",
      },
    ];

    const customersList = document.getElementById("customers-list");
    const renderCustomers = () => {
      customersList.innerHTML = "";
      customersData.forEach((customer) => {
        const statusClass =
          customer.status === "vip"
            ? "active"
            : customer.status === "regular"
            ? "warning"
            : "pending";
        const statusText =
          customer.status === "vip"
            ? "VIP"
            : customer.status === "regular"
            ? "Regular"
            : "Nuevo";

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.id}</td>
          <td><strong>${customer.name}</strong></td>
          <td>${customer.email}</td>
          <td>${customer.phone}</td>
          <td>${customer.purchases}</td>
          <td><strong>${customer.totalSpent}</strong></td>
          <td><span class="badge ${statusClass}">${statusText}</span></td>
          <td>
            <button class="btn-icon view-customer-btn" title="Ver">👁️</button>
            <button class="btn-icon edit-customer-btn" title="Editar">✏️</button>
            <button class="btn-icon delete-customer-btn" title="Eliminar">🗑️</button>
          </td>
        `;
        customersList.appendChild(row);
      });
    };

    renderCustomers();

    // Manejador para abrir modal de nuevo cliente
    const addCustomerBtn = document.getElementById("add-customer-btn");
    const customerModal = document.getElementById("customer-modal");
    const closeCustomerModal = document.getElementById("close-customer-modal");
    const cancelCustomerBtn = document.getElementById("cancel-customer-btn");
    const customerForm = document.getElementById("customer-form");

    if (addCustomerBtn) {
      addCustomerBtn.addEventListener("click", () => {
        customerForm.reset();
        customerModal.classList.add("active");
      });
    }

    if (closeCustomerModal) {
      closeCustomerModal.addEventListener("click", () => {
        customerModal.classList.remove("active");
      });
    }

    if (cancelCustomerBtn) {
      cancelCustomerBtn.addEventListener("click", () => {
        customerModal.classList.remove("active");
      });
    }

    if (customerForm) {
      customerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Cliente guardado exitosamente");
        customerForm.reset();
        customerModal.classList.remove("active");
      });
    }

    // Cerrar modal al hacer clic fuera
    if (customerModal) {
      customerModal.addEventListener("click", (e) => {
        if (e.target === customerModal) {
          customerModal.classList.remove("active");
        }
      });
    }
  },
};
