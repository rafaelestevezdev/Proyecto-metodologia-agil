/**
 * Configuration File for Nexus Web Store
 * Centralized configuration for user shop functionality
 */

export const CONFIG = {
  // WhatsApp Configuration
  whatsapp: {
    // Replace with your WhatsApp Business number
    businessNumber: "+1234567890",
    // Message template can be customized here
    messageTemplate: {
      header: "*Pedido desde Nexus Web*",
      clientSection: true,
      includeTimestamp: true,
    },
  },

  // User Interface
  ui: {
    // Cart modal animation duration (ms)
    modalAnimationDuration: 300,
    // Profile menu animation duration (ms)
    profileMenuAnimationDuration: 200,
    // Cart count update debounce (ms)
    cartUpdateDebounce: 100,
  },

  // Validation Rules
  validation: {
    username: {
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_-]+$/,
    },
    password: {
      minLength: 6,
      requireNumbers: false,
      requireSpecialChars: false,
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },

  // Storage Configuration
  storage: {
    cartKey: "cart",
    userKey: "currentUser",
    usersListKey: "users",
    sessionKey: "loggedIn",
  },

  // Product Configuration
  products: {
    categories: ["all", "laptops", "pcs", "phones", "accessories"],
    imageDirectory: "assets/images/",
    currency: "USD",
    currencySymbol: "$",
  },

  // Feature Flags
  features: {
    enableWishlist: false,
    enableProductReviews: false,
    enableOrderTracking: false,
    enableAccountDeletion: true,
    enableProfileEditing: true,
  },

  // API Endpoints (if backend is added)
  api: {
    baseURL: "https://api.example.com",
    endpoints: {
      checkout: "/api/checkout",
      orders: "/api/orders",
      users: "/api/users",
    },
  },

  // Messages (Internationalization)
  messages: {
    es: {
      success: {
        productAdded: "¡Producto agregado al carrito!",
        profileUpdated: "Perfil actualizado correctamente",
        logoutSuccess: "Sesión cerrada",
      },
      error: {
        productNotFound: "Producto no encontrado",
        invalidEmail: "Correo electrónico inválido",
        emailExists: "Este correo ya está registrado",
      },
      cart: {
        empty: "Tu carrito está vacío",
        total: "Total",
        checkout: "Comprar por WhatsApp",
      },
      profile: {
        viewProfile: "Ver Perfil",
        editProfile: "Editar Perfil",
        myOrders: "Mis Pedidos",
        settings: "Configuración",
        logout: "Cerrar Sesión",
      },
    },
  },

  // Theme Colors
  theme: {
    primary: "#6366f1", // Indigo
    primaryLight: "#818cf8",
    primaryDark: "#4f46e5",
    success: "#10b981", // Green
    warning: "#f59e0b", // Amber
    danger: "#ef4444", // Red
    background: "#0f172a", // Dark blue
    backgroundSecondary: "#0a0e27",
    text: "#e2e8f0", // Light gray
    textSecondary: "#cbd5e1",
  },

  // Logging Configuration
  logging: {
    enabled: true,
    level: "info", // "debug", "info", "warn", "error"
  },
};

/**
 * Helper function to get configuration value
 * @param {string} path - Dot-notation path (e.g., 'whatsapp.businessNumber')
 * @returns {*} Configuration value
 */
export function getConfig(path) {
  return path.split(".").reduce((obj, key) => obj?.[key], CONFIG);
}

/**
 * Helper function to update configuration
 * @param {string} path - Dot-notation path
 * @param {*} value - New value
 */
export function setConfig(path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  let obj = CONFIG;

  for (const key of keys) {
    obj = obj[key] = obj[key] || {};
  }

  obj[lastKey] = value;
}

export default CONFIG;
