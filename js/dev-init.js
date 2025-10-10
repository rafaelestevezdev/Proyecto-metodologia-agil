/**
 * System Initialization
 * Initializes the authentication system with required admin account
 */

import { initAuth } from "./auth.js";

const DEV_MODE = true; // Set to false in production

/**
 * Initialize the authentication system
 */
function initializeSystem() {
  // Always initialize auth system (creates admin account)
  initAuth();

  if (DEV_MODE) {
    console.log("🔧 Development mode active");
    console.log("� System initialized with admin account:");
    console.log("   - Username: admin");
    console.log("   - Password: admin123");
    console.log("   - Role: admin");
    console.log("");
    console.log(
      "ℹ️  Regular users can register through the registration form."
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeSystem();
});
