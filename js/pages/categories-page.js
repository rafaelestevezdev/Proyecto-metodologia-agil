// Categories Page Module
const CategoriesPage = {
  render() {
    return `
      <div class="page-content">
        <div class="page-header">
          <h1 class="page-title">Categorías</h1>
          <button class="btn btn-primary" id="add-category-btn">+ Nueva Categoría</button>
        </div>

        <div class="categories-grid" id="categories-grid">
        </div>
      </div>

      <!-- Modal para agregar/editar categoría -->
      <div class="modal" id="category-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Nueva Categoría</h2>
            <button class="modal-close" id="close-category-modal">&times;</button>
          </div>
          <form id="category-form" class="modal-body">
            <div class="form-group">
              <label>Nombre de la Categoría</label>
              <input type="text" id="category-name" placeholder="Ej: Laptops Gamer" required />
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <textarea id="category-description" placeholder="Descripción de la categoría..." rows="4"></textarea>
            </div>
            <div class="form-group">
              <label>Ícono (Emoji)</label>
              <input type="text" id="category-icon" placeholder="Ej: 💻" maxlength="1" required />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="cancel-category-btn">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar Categoría</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  init() {
    const categoriesData = [
      {
        id: "CAT-001",
        name: "Laptops",
        icon: "💻",
        products: 45,
        description: "Computadoras portátiles de todas las marcas",
      },
      {
        id: "CAT-002",
        name: "Monitores",
        icon: "🖥️",
        products: 28,
        description: "Pantallas para PC de diferentes tamaños",
      },
      {
        id: "CAT-003",
        name: "Periféricos",
        icon: "🖱️",
        products: 52,
        description: "Mouse, teclados, webcams y más",
      },
      {
        id: "CAT-004",
        name: "Accesorios",
        icon: "🔌",
        products: 38,
        description: "Cables, adaptadores y accesorios varios",
      },
      {
        id: "CAT-005",
        name: "Auriculares",
        icon: "🎧",
        products: 22,
        description: "Auriculares inalámbricos y con cable",
      },
      {
        id: "CAT-006",
        name: "Almacenamiento",
        icon: "💾",
        products: 18,
        description: "SSD, HDD y dispositivos de almacenamiento",
      },
    ];

    const categoriesGrid = document.getElementById("categories-grid");
    const renderCategories = () => {
      categoriesGrid.innerHTML = "";
      categoriesData.forEach((category) => {
        const card = document.createElement("div");
        card.className = "category-card";
        card.innerHTML = `
          <div class="category-icon">${category.icon}</div>
          <h3 class="category-name">${category.name}</h3>
          <p class="category-description">${category.description}</p>
          <div class="category-stats">
            <span class="stat">${category.products} productos</span>
          </div>
          <div class="category-actions">
            <button class="btn-icon edit-category-btn" title="Editar">✏️</button>
            <button class="btn-icon delete-category-btn" title="Eliminar">🗑️</button>
          </div>
        `;
        categoriesGrid.appendChild(card);
      });
    };

    renderCategories();

    // Manejador para abrir modal de nueva categoría
    const addCategoryBtn = document.getElementById("add-category-btn");
    const categoryModal = document.getElementById("category-modal");
    const closeCategoryModal = document.getElementById("close-category-modal");
    const cancelCategoryBtn = document.getElementById("cancel-category-btn");
    const categoryForm = document.getElementById("category-form");

    if (addCategoryBtn) {
      addCategoryBtn.addEventListener("click", () => {
        categoryForm.reset();
        categoryModal.classList.add("active");
      });
    }

    if (closeCategoryModal) {
      closeCategoryModal.addEventListener("click", () => {
        categoryModal.classList.remove("active");
      });
    }

    if (cancelCategoryBtn) {
      cancelCategoryBtn.addEventListener("click", () => {
        categoryModal.classList.remove("active");
      });
    }

    if (categoryForm) {
      categoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Categoría guardada exitosamente");
        categoryForm.reset();
        categoryModal.classList.remove("active");
      });
    }

    // Cerrar modal al hacer clic fuera
    if (categoryModal) {
      categoryModal.addEventListener("click", (e) => {
        if (e.target === categoryModal) {
          categoryModal.classList.remove("active");
        }
      });
    }
  },
};
