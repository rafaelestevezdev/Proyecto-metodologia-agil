// Cart management
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in header
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Product rendering
function renderProducts(category = "all") {
  console.log("Rendering products for category:", category);
  const productGrid = document.getElementById("product-grid");
  if (!productGrid) {
    console.log("Product grid not found");
    return;
  }
  console.log("Products array:", products);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button class="button button-primary" onclick="addToCart(${
              product.id
            })">
                Add to Cart
            </button>
        </div>
    `
    )
    .join("");
}

// Filter button functionality
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");
      // Filter products
      renderProducts(button.dataset.category);
    });
  });
}

// Cart functionality
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  // Save to localStorage and update UI
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("¡Producto agregado al carrito!");
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function updateQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId);
  if (!item) return;

  if (newQuantity <= 0) {
    removeFromCart(productId);
  } else {
    item.quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }
}

// Render cart items
function renderCartItems() {
  const cartContainer = document.getElementById("cart-items-container");
  const cartTotal = document.getElementById("cart-total");
  if (!cartContainer || !cartTotal) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${
                  item.id
                }, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${
                  item.id
                }, ${item.quantity + 1})">+</button>
            </div>
            <button class="button button-secondary" onclick="removeFromCart(${
              item.id
            })">Remove</button>
        </div>
    `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

// Handle WhatsApp checkout
function handleWhatsAppCheckout() {
  // Get current user info from session
  const userSession = sessionStorage.getItem("currentUser");
  const user = userSession ? JSON.parse(userSession) : null;

  // WhatsApp Business number (replace with actual number)
  const phoneNumber = "+1234567890"; // Replace con tu número real

  const message = `*Pedido desde Nexus Web*\n\n`;
  const userData = user
    ? `*Cliente:* ${user.username}\n*Email:* ${user.email}\n\n`
    : "";
  const items = cart
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name} ($${(
          item.price * item.quantity
        ).toFixed(2)})`
    )
    .join("\n");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const footer = `\n\n*Total: $${total.toFixed(
    2
  )}*\n\nPor favor confirma tu pedido y detalles de envío.`;

  const fullMessage = message + userData + items + footer;
  const encodedMessage = encodeURIComponent(fullMessage);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
}

// Handle contact form submission
function handleContactForm(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  // Here you would typically send this data to a server
  alert("¡Gracias por tu mensaje! Te responderemos pronto.");
  form.reset();
}

// Smooth scroll function
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");
  const targetPosition = document.querySelector(targetId).offsetTop - 100; // Subtract header height
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}

// Modal functionality
function openCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.add("active");
  renderCartItems();
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Close modal when clicking outside
function handleModalClick(e) {
  if (e.target.id === "cart-modal") {
    closeCartModal();
  }
}

// Initialize page
console.log("Setting up DOMContentLoaded listener...");
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  // Setup smooth scroll
  const scrollLink = document.querySelector(".scroll-link");
  if (scrollLink) {
    scrollLink.addEventListener("click", smoothScroll);
  }

  // Cart modal setup
  const cartTrigger = document.getElementById("cart-trigger");
  const closeModalBtn = document.querySelector(".close-modal");
  const modal = document.getElementById("cart-modal");

  if (cartTrigger) {
    cartTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openCartModal();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeCartModal);
  }

  if (modal) {
    modal.addEventListener("click", handleModalClick);
  }

  // Update cart count
  updateCartCount();

  // Set up filter buttons if on home page
  setupFilterButtons();

  // Render products if on home page
  renderProducts("all");

  // Render cart items if on cart page
  renderCartItems();

  // Set up checkout button if on cart page
  const checkoutButton = document.getElementById("checkout-whatsapp");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", handleWhatsAppCheckout);
  }

  // Set up clear cart button if on cart page
  const clearCartButton = document.getElementById("clear-cart");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    });
  }

  // Set up contact form if on contact page
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }
});
