/**
 * MODERN DASHBOARD - JavaScript Module
 * Handles authentication, user interface, and Quick Calc functionality
 */

import { getCurrentUser, isAuthenticated, logoutUser } from "./auth.js";

/**
 * Dashboard Class - Main controller for dashboard functionality
 */
class Dashboard {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  /**
   * Initialize the dashboard
   */
  async init() {
    try {
      // Check authentication
      if (!this.checkAuthentication()) {
        return;
      }

      // Load user data
      this.loadUserData();

      // Setup event listeners
      this.setupEventListeners();

      // Initialize Quick Calc
      this.initQuickCalc();

      // Add fade-in animation
      this.addLoadingAnimation();

      console.log("✅ Dashboard initialized successfully");
    } catch (error) {
      console.error("❌ Dashboard initialization failed:", error);
      this.handleError("Failed to initialize dashboard");
    }
  }

  /**
   * Check if user is authenticated and redirect if not
   */
  checkAuthentication() {
    if (!isAuthenticated()) {
      alert("⚠️ Session expired. Please login again.");
      window.location.href = "login.html";
      return false;
    }

    this.currentUser = getCurrentUser();
    if (!this.currentUser) {
      alert("❌ Unable to load user data. Please login again.");
      window.location.href = "login.html";
      return false;
    }

    return true;
  }

  /**
   * Load and display user data in the dashboard
   */
  loadUserData() {
    try {
      // Update user name in header
      const userNameElement = document.getElementById("userName");
      if (userNameElement) {
        userNameElement.textContent = this.currentUser.username;
      }

      // Update profile information
      const profileNameElement = document.getElementById("profileName");
      if (profileNameElement) {
        profileNameElement.textContent = this.currentUser.username;
      }

      const userRoleElement = document.getElementById("userRole");
      if (userRoleElement) {
        const roleText =
          this.currentUser.role === "admin" ? "Administrator" : "User";
        userRoleElement.textContent = roleText;

        // Add admin styling if user is admin
        if (this.currentUser.role === "admin") {
          userRoleElement.style.color = "#dc3545";
          userRoleElement.style.fontWeight = "600";
        }
      }

      // Update profile avatar with user initial
      const profileAvatar = document.querySelector(".profile-avatar i");
      if (profileAvatar && this.currentUser.username) {
        profileAvatar.textContent = this.currentUser.username
          .charAt(0)
          .toUpperCase();
      }

      console.log("✅ User data loaded successfully");
    } catch (error) {
      console.error("❌ Failed to load user data:", error);
    }
  }

  /**
   * Setup event listeners for dashboard interactions
   */
  setupEventListeners() {
    // Logout button functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleLogout();
      });
    }

    // KPI card interactions
    this.setupKPIInteractions();

    // Chart bar interactions
    this.setupChartInteractions();

    console.log("✅ Event listeners setup complete");
  }

  /**
   * Setup KPI card hover effects and interactions
   */
  setupKPIInteractions() {
    const kpiCards = document.querySelectorAll(".kpi-card");
    kpiCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        const kpiLabels = ["Tasks", "Projects", "Hours", "Productivity"];
        const kpiValues = ["24", "8", "42", "87%"];
        alert(
          `📊 ${kpiLabels[index]} Details:\n\nCurrent Value: ${
            kpiValues[index]
          }\nTrend: Positive\nLast Updated: ${new Date().toLocaleString()}`
        );
      });
    });
  }

  /**
   * Setup chart bar interactions with sample data
   */
  setupChartInteractions() {
    const bars = document.querySelectorAll(".bar");
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const values = [12, 16, 9, 18, 14, 17, 19];

    bars.forEach((bar, index) => {
      bar.addEventListener("mouseenter", () => {
        bar.style.transform = "scaleX(1.2)";
        bar.title = `${days[index]}: ${values[index]} tasks completed`;
      });

      bar.addEventListener("mouseleave", () => {
        bar.style.transform = "scaleX(1)";
      });

      bar.addEventListener("click", () => {
        alert(
          `📈 ${days[index]} Statistics:\n\nTasks Completed: ${
            values[index]
          }\nCompletion Rate: ${Math.round(
            (values[index] / 20) * 100
          )}%\nAverage Time: ${Math.round(Math.random() * 3 + 1)} hours`
        );
      });
    });
  }

  /**
   * Initialize Quick Calc functionality
   */
  initQuickCalc() {
    const calcForm = document.getElementById("calcForm");
    if (calcForm) {
      calcForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.performCalculation();
      });
    }

    // Add real-time calculation on input change
    const inputs = calcForm.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (this.areAllFieldsFilled()) {
          this.performCalculation();
        }
      });
    });

    console.log("✅ Quick Calc initialized");
  }

  /**
   * Check if all calculator fields are filled
   */
  areAllFieldsFilled() {
    const valueA = document.getElementById("valueA").value;
    const operator = document.getElementById("operator").value;
    const valueB = document.getElementById("valueB").value;

    return valueA !== "" && operator !== "" && valueB !== "";
  }

  /**
   * Perform mathematical calculation
   */
  performCalculation() {
    try {
      // Get input values
      const valueA = parseFloat(document.getElementById("valueA").value);
      const operator = document.getElementById("operator").value;
      const valueB = parseFloat(document.getElementById("valueB").value);

      // Validate inputs
      if (isNaN(valueA) || isNaN(valueB)) {
        this.showCalculationError("Please enter valid numbers");
        return;
      }

      if (!operator) {
        this.showCalculationError("Please select an operator");
        return;
      }

      // Perform calculation
      let result;
      switch (operator) {
        case "+":
          result = valueA + valueB;
          break;
        case "-":
          result = valueA - valueB;
          break;
        case "*":
          result = valueA * valueB;
          break;
        case "/":
          if (valueB === 0) {
            this.showCalculationError("Division by zero is not allowed");
            return;
          }
          result = valueA / valueB;
          break;
        default:
          this.showCalculationError("Invalid operator selected");
          return;
      }

      // Display result
      this.showCalculationResult(result, valueA, operator, valueB);
      this.hideCalculationError();
    } catch (error) {
      console.error("Calculation error:", error);
      this.showCalculationError("An error occurred during calculation");
    }
  }

  /**
   * Display calculation result
   */
  showCalculationResult(result, valueA, operator, valueB) {
    const resultElement = document.getElementById("resultValue");
    if (resultElement) {
      // Format result based on type
      let formattedResult;
      if (Number.isInteger(result)) {
        formattedResult = result.toString();
      } else {
        formattedResult = result.toFixed(6).replace(/\.?0+$/, "");
      }

      resultElement.textContent = formattedResult;
      resultElement.title = `${valueA} ${operator} ${valueB} = ${formattedResult}`;

      // Add animation
      resultElement.style.transform = "scale(1.1)";
      setTimeout(() => {
        resultElement.style.transform = "scale(1)";
      }, 200);
    }
  }

  /**
   * Show calculation error
   */
  showCalculationError(message) {
    const errorElement = document.getElementById("calcError");
    const errorText = document.getElementById("errorText");

    if (errorElement && errorText) {
      errorText.textContent = message;
      errorElement.style.display = "flex";

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        this.hideCalculationError();
      }, 5000);
    }
  }

  /**
   * Hide calculation error
   */
  hideCalculationError() {
    const errorElement = document.getElementById("calcError");
    if (errorElement) {
      errorElement.style.display = "none";
    }
  }

  /**
   * Handle user logout
   */
  handleLogout() {
    const confirmLogout = confirm("🚪 Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        logoutUser();
        alert("✅ Logged out successfully");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Logout error:", error);
        alert("❌ Error during logout. Please try again.");
      }
    }
  }

  /**
   * Add loading animation to dashboard elements
   */
  addLoadingAnimation() {
    const animatedElements = document.querySelectorAll(
      ".user-profile-card, .kpi-card, .data-visualization, .quick-calc"
    );
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("fade-in");
      }, index * 100);
    });
  }

  /**
   * Handle general errors
   */
  handleError(message) {
    console.error("Dashboard Error:", message);
    alert(`❌ ${message}`);
  }
}

/**
 * Utility Functions
 */

/**
 * Format number with commas
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Generate random KPI data (for demo purposes)
 */
function generateRandomKPIData() {
  return {
    tasks: Math.floor(Math.random() * 50) + 10,
    projects: Math.floor(Math.random() * 15) + 3,
    hours: Math.floor(Math.random() * 80) + 20,
    productivity: Math.floor(Math.random() * 30) + 70,
  };
}

/**
 * Initialize Dashboard when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the dashboard
  const dashboard = new Dashboard();

  // Add global error handler
  window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);
  });

  // Add visibility change handler to check authentication when user returns
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !isAuthenticated()) {
      alert("⚠️ Your session has expired. Please login again.");
      window.location.href = "login.html";
    }
  });
});

// Export for testing purposes
export { Dashboard };
