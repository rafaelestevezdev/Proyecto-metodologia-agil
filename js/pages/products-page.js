// Products Page Module
const ProductsPage = {
  render() {
    return `
      <div class="page-content">
        <div class="page-header">
          <h1 class="page-title">Productos</h1>
          <button class="btn btn-primary" id="add-product-btn">+ Nuevo Producto</button>
        </div>

        <div class="section-container">
          <div class="table-header">
            <input type="text" class="search-input" placeholder="Buscar productos..." id="product-search" />
            <select id="category-filter" class="filter-select">
              <option value="">Todas las categorías</option>
              <option value="laptops">Laptops</option>
              <option value="monitores">Monitores</option>
              <option value="perifericos">Periféricos</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="products-table-body">
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal para agregar/editar producto -->
      <div class="modal" id="product-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Nuevo Producto</h2>
            <button class="modal-close" id="close-product-modal">&times;</button>
          </div>
          <form id="product-form" class="modal-body">
            <div class="form-group">
              <label>Nombre del Producto</label>
              <input type="text" id="product-name" placeholder="Ej: Laptop Dell XPS 13" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Categoría</label>
                <select id="product-category" required>
                  <option value="laptops">Laptops</option>
                  <option value="monitores">Monitores</option>
                  <option value="perifericos">Periféricos</option>
                  <option value="accesorios">Accesorios</option>
                </select>
              </div>
              <div class="form-group">
                <label>Precio</label>
                <input type="number" id="product-price" placeholder="0.00" step="0.01" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Stock</label>
                <input type="number" id="product-stock" placeholder="0" required />
              </div>
              <div class="form-group">
                <label>SKU</label>
                <input type="text" id="product-sku" placeholder="SKU-001" required />
              </div>
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea id="product-description" placeholder="Descripción del producto..." rows="4"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="cancel-product-btn">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar Producto</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  init() {
    const productsData = [
      {
        id: "PRD-001",
        name: "Laptop Dell XPS 13",
        category: "Laptops",
        price: "$1,299.99",
        stock: 15,
        status: "active",
      },
      {
        id: "PRD-002",
        name: "Monitor LG 27 4K",
        category: "Monitores",
        price: "$349.99",
        stock: 8,
        status: "active",
      },
      {
        id: "PRD-003",
        name: "Mouse Logitech MX Master",
        category: "Periféricos",
        price: "$99.99",
        stock: 25,
        status: "active",
      },
      {
        id: "PRD-004",
        name: "Teclado Mecánico Corsair",
        category: "Periféricos",
        price: "$149.99",
        stock: 5,
        status: "low-stock",
      },
      {
        id: "PRD-005",
        name: "Auriculares Sony WH-1000",
        category: "Periféricos",
        price: "$349.99",
        stock: 12,
        status: "active",
      },
      {
        id: "PRD-006",
        name: "Hub USB-C Belkin",
        category: "Accesorios",
        price: "$79.99",
        stock: 0,
        status: "out-of-stock",
      },
    ];

    const tableBody = document.getElementById("products-table-body");
    const renderTable = () => {
      tableBody.innerHTML = "";
      productsData.forEach((product) => {
        const statusClass =
          product.status === "active"
            ? "active"
            : product.status === "low-stock"
            ? "warning"
            : "danger";
        const statusText =
          product.status === "active"
            ? "Disponible"
            : product.status === "low-stock"
            ? "Bajo Stock"
            : "Agotado";

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.id}</td>
          <td><strong>${product.name}</strong></td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>${product.stock}</td>
          <td><span class="badge ${statusClass}">${statusText}</span></td>
          <td>
            <button class="btn-icon edit-product-btn" title="Editar">✏️</button>
            <button class="btn-icon delete-product-btn" title="Eliminar">🗑️</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    };

    renderTable();

    // Manejador para abrir modal de nuevo producto
    const addProductBtn = document.getElementById("add-product-btn");
    const productModal = document.getElementById("product-modal");
    const closeProductModal = document.getElementById("close-product-modal");
    const cancelProductBtn = document.getElementById("cancel-product-btn");
    const productForm = document.getElementById("product-form");

    if (addProductBtn) {
      addProductBtn.addEventListener("click", () => {
        productForm.reset();
        productModal.classList.add("active");
      });
    }

    if (closeProductModal) {
      closeProductModal.addEventListener("click", () => {
        productModal.classList.remove("active");
      });
    }

    if (cancelProductBtn) {
      cancelProductBtn.addEventListener("click", () => {
        productModal.classList.remove("active");
      });
    }

    if (productForm) {
      productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Producto guardado exitosamente");
        productForm.reset();
        productModal.classList.remove("active");
      });
    }

    // Cerrar modal al hacer clic fuera
    if (productModal) {
      productModal.addEventListener("click", (e) => {
        if (e.target === productModal) {
          productModal.classList.remove("active");
        }
      });
    }
  },
};
