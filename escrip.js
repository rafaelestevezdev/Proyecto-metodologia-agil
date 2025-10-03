/**
 * Sistema de Login - JavaScript
 *
 * Este script maneja la funcionalidad del formulario de login,
 * incluyendo validación de credenciales y redirección.
 */

// Base de datos simulada de usuarios registrados
const USERS_DATABASE = [
  { username: "admin", password: "1234", name: "Administrador" },
  { username: "usuario1", password: "pass123", name: "Usuario Demo" },
  { username: "test", password: "test123", name: "Usuario Test" },
  { username: "demo", password: "demo123", name: "Usuario Demo" },
];

// Variable para rastrear el usuario actual en validación
let currentValidatingUser = null;

// Referencias a elementos del DOM
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");
const loginButton = document.querySelector(".login-btn");
const togglePassword = document.getElementById("togglePassword");
const passwordStrength = document.getElementById("passwordStrength");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");
const usernameValidation = document.getElementById("usernameValidation");
const passwordValidation = document.getElementById("passwordValidation");

/**
 * Función para mostrar mensajes de error
 * @param {string} message - Mensaje de error a mostrar
 */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");

  // Agregar efecto de shake a la caja de login
  const loginBox = document.querySelector(".login-box");
  loginBox.style.animation = "shake 0.5s ease-in-out";

  // Remover la animación después de que termine
  setTimeout(() => {
    loginBox.style.animation = "";
  }, 500);
}

/**
 * Función para ocultar mensajes de error
 */
function hideError() {
  errorMessage.classList.add("hidden");
}

/**
 * Función para verificar si un usuario existe en la base de datos
 * @param {string} username - Nombre de usuario a verificar
 * @returns {Object|null} - Usuario encontrado o null
 */
function findUser(username) {
  return USERS_DATABASE.find((user) => user.username === username) || null;
}

/**
 * Función para validar el nombre de usuario en tiempo real
 * @param {string} username - Nombre de usuario a validar
 */
function validateUsername(username) {
  const minLength = 3;
  const maxLength = 20;
  const validChars = /^[a-zA-Z0-9_]+$/;

  if (!username) {
    showValidationMessage(usernameValidation, "", "");
    currentValidatingUser = null;
    return false;
  }

  if (username.length < minLength) {
    showValidationMessage(
      usernameValidation,
      `Mínimo ${minLength} caracteres`,
      "warning"
    );
    currentValidatingUser = null;
    return false;
  }

  if (username.length > maxLength) {
    showValidationMessage(
      usernameValidation,
      `Máximo ${maxLength} caracteres`,
      "error"
    );
    currentValidatingUser = null;
    return false;
  }

  if (!validChars.test(username)) {
    showValidationMessage(
      usernameValidation,
      "Solo letras, números y guiones bajos",
      "error"
    );
    currentValidatingUser = null;
    return false;
  }

  // Verificar si el usuario está registrado
  const user = findUser(username);
  if (user) {
    currentValidatingUser = user;
    showValidationMessage(
      usernameValidation,
      "✓ Usuario registrado",
      "success"
    );

    // Si hay contraseña ingresada, revalidarla
    if (passwordInput.value) {
      validatePasswordForUser(passwordInput.value, user);
    }
    return true;
  } else {
    currentValidatingUser = null;
    showValidationMessage(
      usernameValidation,
      "✗ Usuario no registrado",
      "error"
    );

    // Limpiar validación de contraseña si el usuario no existe
    if (passwordInput.value) {
      showValidationMessage(
        passwordValidation,
        "Primero ingresa un usuario válido",
        "warning"
      );
    }
    return false;
  }
}

/**
 * Función para evaluar la seguridad de la contraseña
 * @param {string} password - Contraseña a evaluar
 * @returns {Object} - Objeto con nivel y puntuación
 */
function evaluatePasswordStrength(password) {
  if (!password) {
    return { level: "", score: 0, text: "" };
  }

  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    longLength: password.length >= 12,
  };

  // Calcular puntuación
  if (checks.length) score += 2;
  if (checks.lowercase) score += 1;
  if (checks.uppercase) score += 1;
  if (checks.numbers) score += 1;
  if (checks.symbols) score += 2;
  if (checks.longLength) score += 1;

  // Determinar nivel
  if (score <= 3) {
    return { level: "weak", score, text: "Débil" };
  } else if (score <= 6) {
    return { level: "medium", score, text: "Media" };
  } else {
    return { level: "strong", score, text: "Fuerte" };
  }
}

/**
 * Función para mostrar el indicador de seguridad
 * @param {string} password - Contraseña a evaluar
 */
function showPasswordStrength(password) {
  const strength = evaluatePasswordStrength(password);

  if (!password) {
    passwordStrength.classList.remove("visible");
    return;
  }

  passwordStrength.classList.add("visible");

  // Remover clases anteriores
  strengthFill.classList.remove("weak", "medium", "strong");
  strengthText.classList.remove("weak", "medium", "strong");

  if (strength.level) {
    strengthFill.classList.add(strength.level);
    strengthText.classList.add(strength.level);
    strengthText.textContent = strength.text;
  }
}

/**
 * Función para validar contraseña con el usuario específico
 * @param {string} password - Contraseña a validar
 * @param {Object} user - Usuario para validar la contraseña
 */
function validatePasswordForUser(password, user) {
  if (!password) {
    showValidationMessage(passwordValidation, "", "");
    return false;
  }

  if (!user) {
    showValidationMessage(
      passwordValidation,
      "Primero ingresa un usuario válido",
      "warning"
    );
    return false;
  }

  if (password.length < 4) {
    showValidationMessage(passwordValidation, "Mínimo 4 caracteres", "error");
    return false;
  }

  // Verificar si la contraseña coincide con el usuario
  if (password === user.password) {
    showValidationMessage(
      passwordValidation,
      "✓ Contraseña correcta",
      "success"
    );
    return true;
  } else {
    showValidationMessage(
      passwordValidation,
      "✗ Contraseña no coincide con el usuario",
      "error"
    );
    return false;
  }
}

/**
 * Función para validar contraseña en tiempo real
 * @param {string} password - Contraseña a validar
 */
function validatePassword(password) {
  const strength = evaluatePasswordStrength(password);

  if (!password) {
    showValidationMessage(passwordValidation, "", "");
    return false;
  }

  // Si hay un usuario validado, verificar la contraseña con ese usuario
  if (currentValidatingUser) {
    return validatePasswordForUser(password, currentValidatingUser);
  }

  // Si no hay usuario, solo validar formato
  if (password.length < 4) {
    showValidationMessage(passwordValidation, "Mínimo 4 caracteres", "error");
    return false;
  }

  if (strength.level === "weak") {
    showValidationMessage(
      passwordValidation,
      "Usa mayúsculas, números y símbolos",
      "warning"
    );
  } else if (strength.level === "medium") {
    showValidationMessage(passwordValidation, "Buena contraseña", "success");
  } else {
    showValidationMessage(
      passwordValidation,
      "¡Excelente contraseña!",
      "success"
    );
  }

  return true;
}

/**
 * Función para mostrar mensajes de validación
 * @param {HTMLElement} element - Elemento donde mostrar el mensaje
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje (error, success, warning)
 */
function showValidationMessage(element, message, type) {
  element.textContent = message;
  element.className = `validation-message ${type}`;
}

/**
 * Función para alternar visibilidad de contraseña
 */
function togglePasswordVisibility() {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Cambiar icono
  if (type === "text") {
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
}

/**
 * Función para validar las credenciales
 * @param {string} username - Nombre de usuario ingresado
 * @param {string} password - Contraseña ingresada
 * @returns {Object} - Objeto con resultado de validación y usuario
 */
function validateCredentials(username, password) {
  const user = findUser(username);

  if (!user) {
    return {
      valid: false,
      message: "Usuario no registrado en el sistema",
      user: null,
    };
  }

  if (user.password !== password) {
    return {
      valid: false,
      message: "La contraseña no coincide con el usuario",
      user: null,
    };
  }

  return {
    valid: true,
    message: "Credenciales correctas",
    user: user,
  };
}

/**
 * Función para simular carga del botón
 */
function setLoadingState(isLoading) {
  if (isLoading) {
    loginButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
    loginButton.disabled = true;
  } else {
    loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
    loginButton.disabled = false;
  }
}

/**
 * Función principal de manejo del login
 * @param {Event} event - Evento del formulario
 */
async function handleLogin(event) {
  // Prevenir el envío normal del formulario
  event.preventDefault();

  // Ocultar mensajes de error previos
  hideError();

  // Obtener valores de los campos
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Validar que los campos no estén vacíos
  if (!username || !password) {
    showError("Por favor, completa todos los campos.");
    return;
  }

  // Mostrar estado de carga
  setLoadingState(true);

  // Simular una pequeña demora para mejor UX
  setTimeout(() => {
    // Validar credenciales
    const validation = validateCredentials(username, password);

    if (validation.valid) {
      // Login exitoso
      console.log("✓ Login exitoso para el usuario:", username);

      // Mostrar mensaje de éxito
      errorMessage.classList.add("success");
      errorMessage.textContent = `¡Bienvenido ${validation.user.name}! Redirigiendo...`;
      errorMessage.classList.remove("hidden");

      // Guardar datos del usuario en sessionStorage
      sessionStorage.setItem("loggedUser", JSON.stringify(validation.user));

      // Redirigir al dashboard después de 1.5 segundos
      setTimeout(() => {
        // Redirigir a dashboard.html
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      // Login fallido
      console.log("✗ Intento de login fallido:", validation.message);
      setLoadingState(false);
      showError(validation.message);

      // Limpiar el campo de contraseña por seguridad
      passwordInput.value = "";
      passwordInput.focus();

      // Actualizar validaciones visuales
      if (!findUser(username)) {
        showValidationMessage(
          usernameValidation,
          "✗ Usuario no registrado",
          "error"
        );
      } else {
        showValidationMessage(
          passwordValidation,
          "✗ Contraseña incorrecta",
          "error"
        );
      }
    }
  }, 800); // Simular tiempo de procesamiento
}

/**
 * Función para manejar la tecla Enter en los campos
 * @param {KeyboardEvent} event - Evento de teclado
 */
function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    loginForm.dispatchEvent(new Event("submit"));
  }
}

// Event Listeners

// Evento principal del formulario
loginForm.addEventListener("submit", handleLogin);

// Validación en tiempo real del nombre de usuario
usernameInput.addEventListener("input", (e) => {
  hideError();
  validateUsername(e.target.value);
});

// Validación en tiempo real de la contraseña
passwordInput.addEventListener("input", (e) => {
  hideError();
  const password = e.target.value;
  validatePassword(password);
  showPasswordStrength(password);
});

// Eventos para manejar Enter en los campos
usernameInput.addEventListener("keypress", handleKeyPress);
passwordInput.addEventListener("keypress", handleKeyPress);

// Event listener para mostrar/ocultar contraseña
togglePassword.addEventListener("click", togglePasswordVisibility);

// Limpiar validaciones cuando se hace focus
usernameInput.addEventListener("focus", () => {
  if (!usernameInput.value) {
    showValidationMessage(usernameValidation, "", "");
  }
});

passwordInput.addEventListener("focus", () => {
  if (!passwordInput.value) {
    showValidationMessage(passwordValidation, "", "");
    passwordStrength.classList.remove("visible");
  }
});

// Ocultar indicadores cuando se pierde el focus si está vacío
passwordInput.addEventListener("blur", () => {
  if (!passwordInput.value) {
    passwordStrength.classList.remove("visible");
    showValidationMessage(passwordValidation, "", "");
  }
});

// Limpiar la clase success del errorMessage cuando el usuario empieza a escribir
usernameInput.addEventListener("input", () => {
  errorMessage.classList.remove("success");
});

passwordInput.addEventListener("input", () => {
  errorMessage.classList.remove("success");
});

// Agregar animación de shake para errores
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Inyectar los keyframes en el documento
const styleSheet = document.createElement("style");
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);

// Marcar la caja como cargada después de la animación inicial
setTimeout(() => {
  const loginBox = document.querySelector(".login-box");
  if (loginBox) {
    loginBox.classList.add("loaded");
  }
}, 600);

// Mensaje de bienvenida en consola
console.log("🔐 Sistema de Login inicializado correctamente");
console.log("👤 Usuario de prueba: admin");
console.log("🔑 Contraseña de prueba: 1234");
console.log("✨ UI mejorada y optimizada");
