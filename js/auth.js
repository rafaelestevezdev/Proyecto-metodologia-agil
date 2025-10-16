/**
 * Enhanced Authentication Module
 * Handles user registration, login, and session management using localStorage
 */

// Storage keys
const USERS_KEY = "users";
const SESSION_KEY = "currentUser";

/**
 * Initializes the authentication system with admin account
 * Admin credentials are unique and protected
 */
export function initAuth() {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  // Ensure admin account always exists and cannot be modified
  const adminExists = users.find(
    (user) => user.username === "administrator" || user.role === "admin"
  );
  if (!adminExists) {
    users.push({
      username: "administrator",
      password: "Admin@2025Secure",
      role: "admin",
      email: "admin@sistema.local",
      fullName: "Administrador del Sistema",
      createdAt: new Date().toISOString(),
      isSystemAdmin: true,
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

/**
 * Validates user input for registration/login
 * @param {string} username - Username to validate
 * @param {string} password - Password to validate
 * @param {string} email - Email to validate (optional for login)
 * @returns {object} Validation result with success flag and message
 */
export function validateInput(username, password, email = null) {
  // Check for empty fields
  if (!username || !password) {
    return { success: false, message: "Username and password are required." };
  }

  if (email !== null && !email) {
    return { success: false, message: "Email is required." };
  }

  // Username validation
  if (username.length < 3) {
    return {
      success: false,
      message: "Username must be at least 3 characters long.",
    };
  }

  if (username.length > 20) {
    return {
      success: false,
      message: "Username must be less than 20 characters.",
    };
  }

  // Password validation
  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  // Email validation (if provided)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  return { success: true, message: "Validation passed." };
}

/**
 * Registers a new user in the system
 * @param {string} username - Username
 * @param {string} password - Password
 * @param {string} email - Email address
 * @returns {object} Registration result with success flag and message
 */
export function registerUser(username, password, email) {
  // Validate input
  const validation = validateInput(username, password, email);
  if (!validation.success) {
    return validation;
  }

  // Prevent admin username registration
  if (username.toLowerCase() === "admin") {
    return {
      success: false,
      message: "The username 'admin' is reserved and cannot be registered.",
    };
  }

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  // Check for duplicate username
  if (
    users.some((user) => user.username.toLowerCase() === username.toLowerCase())
  ) {
    return {
      success: false,
      message: "Username already exists. Please choose a different username.",
    };
  }

  // Check for duplicate email
  if (
    users.some(
      (user) => user.email && user.email.toLowerCase() === email.toLowerCase()
    )
  ) {
    return {
      success: false,
      message: "Email already registered. Please use a different email.",
    };
  }

  // Create new user
  const newUser = {
    username: username.trim(),
    password: password,
    email: email.trim().toLowerCase(),
    role: "user",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return { success: true, message: "User registered successfully!" };
}

/**
 * Authenticates a user and creates session
 * @param {string} username - Username to authenticate
 * @param {string} password - Password to verify
 * @returns {object} Login result with success flag, message, and user data
 */
export function loginUser(username, password) {
  // Validate input
  const validation = validateInput(username, password);
  if (!validation.success) {
    return validation;
  }

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  // Find user (case-insensitive username)
  const user = users.find(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid username or password." };
  }

  // Create session
  const sessionData = {
    username: user.username,
    email: user.email,
    role: user.role,
    loginTime: new Date().toISOString(),
  };

  sessionStorage.setItem("loggedIn", "true");
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

  return {
    success: true,
    message: "Login successful!",
    user: sessionData,
  };
}

/**
 * Gets current logged-in user data
 * @returns {object|null} User data or null if not logged in
 */
export function getCurrentUser() {
  const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
  if (!isLoggedIn) return null;

  const userData = sessionStorage.getItem(SESSION_KEY);
  return userData ? JSON.parse(userData) : null;
}

/**
 * Logs out the current user
 */
export function logoutUser() {
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Checks if user is authenticated
 * @returns {boolean} True if user is logged in
 */
export function isAuthenticated() {
  return sessionStorage.getItem("loggedIn") === "true";
}

/**
 * Gets all users (for admin purposes)
 * @returns {array} Array of users (passwords excluded for security)
 */
export function getAllUsers() {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  return users.map((user) => ({
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  }));
}
