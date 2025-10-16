document.addEventListener("DOMContentLoaded", () => {
  // --- Verificar autenticación y rol ---
  const checkAuth = () => {
    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      window.location.href = "login.html";
      return false;
    }

    // Verificar que sea usuario administrativo
    const currentUserData = sessionStorage.getItem("currentUser");
    if (currentUserData) {
      try {
        const currentUser = JSON.parse(currentUserData);
        if (currentUser.role !== "admin") {
          // Si no es admin, redirigir a la tienda
          window.location.href = "tienda-productos.html";
          return false;
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        window.location.href = "login.html";
        return false;
      }
    } else {
      window.location.href = "login.html";
      return false;
    }

    return true;
  };

  if (!checkAuth()) return;

  // --- Get current user data ---
  const getCurrentUserData = () => {
    const currentUserData = sessionStorage.getItem("currentUser");
    if (currentUserData) {
      try {
        return JSON.parse(currentUserData);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  // --- Update profile menu with user info ---
  const updateProfileMenu = () => {
    const currentUser = getCurrentUserData();
    if (currentUser) {
      document.getElementById("profile-name").textContent =
        currentUser.username;
      document.getElementById("profile-email").textContent =
        currentUser.email || "admin@sistema.local";
    }
  };

  updateProfileMenu();

  // --- Profile Menu Toggle ---
  const profileToggle = document.getElementById("profile-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");

  if (profileToggle && profileDropdown) {
    profileToggle.addEventListener("click", () => {
      profileDropdown.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".profile-menu-container")) {
        profileDropdown.classList.remove("active");
      }
    });

    // Close menu when clicking on items
    const menuItems = profileDropdown.querySelectorAll(".profile-menu-item");
    menuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (item.id !== "logout-btn-menu") {
          e.preventDefault();
          profileDropdown.classList.remove("active");
        }
      });
    });
  }

  // --- Logout Modal Confirmation ---
  const logoutModalOverlay = document.getElementById("logout-modal-overlay");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const modalConfirmLogoutBtn = document.getElementById(
    "modal-confirm-logout-btn"
  );

  const openLogoutModal = () => {
    if (logoutModalOverlay) {
      logoutModalOverlay.classList.add("active");
      // Close profile dropdown if open
      if (profileDropdown) {
        profileDropdown.classList.remove("active");
      }
    }
  };

  const closeLogoutModal = () => {
    if (logoutModalOverlay) {
      logoutModalOverlay.classList.remove("active");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
  };

  // --- Logout ---
  const logoutBtn = document.getElementById("logout-btn");
  const logoutBtnMenu = document.getElementById("logout-btn-menu");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openLogoutModal();
    });
  }

  if (logoutBtnMenu) {
    logoutBtnMenu.addEventListener("click", (e) => {
      e.preventDefault();
      openLogoutModal();
    });
  }

  // Modal button handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeLogoutModal);
  }

  if (modalCancelBtn) {
    modalCancelBtn.addEventListener("click", closeLogoutModal);
  }

  if (modalConfirmLogoutBtn) {
    modalConfirmLogoutBtn.addEventListener("click", handleLogout);
  }

  // Close modal when clicking outside
  if (logoutModalOverlay) {
    logoutModalOverlay.addEventListener("click", (e) => {
      if (e.target === logoutModalOverlay) {
        closeLogoutModal();
      }
    });
  }

  // --- Sample Data ---
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Peter Jones",
      email: "peter.jones@example.com",
      role: "Viewer",
      status: "Active",
    },
    {
      id: 4,
      name: "Mary Johnson",
      email: "mary.j@example.com",
      role: "Editor",
      status: "Active",
    },
    {
      id: 5,
      name: "Chris Lee",
      email: "chris.lee@example.com",
      role: "Viewer",
      status: "Pending",
    },
    {
      id: 6,
      name: "Anna Williams",
      email: "anna.w@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 7,
      name: "Tom Brown",
      email: "tom.brown@example.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 8,
      name: "Linda Davis",
      email: "linda.d@example.com",
      role: "Viewer",
      status: "Active",
    },
    {
      id: 9,
      name: "James Wilson",
      email: "james.w@example.com",
      role: "Editor",
      status: "Active",
    },
    {
      id: 10,
      name: "Patricia Miller",
      email: "pat.m@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 11,
      name: "Robert Taylor",
      email: "rob.t@example.com",
      role: "Viewer",
      status: "Pending",
    },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    values: [65, 59, 80, 81, 56, 55, 40],
  };

  // --- DOM Elements ---
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const themeToggle = document.getElementById("theme-toggle");
  const tableBody = document.querySelector("#data-table tbody");
  const tableHeaders = document.querySelectorAll("#data-table th");
  const paginationContainer = document.getElementById("pagination");
  const addItemBtn = document.getElementById("add-item-btn");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const itemForm = document.getElementById("item-form");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const chartCanvas = document.getElementById("main-chart");

  // --- State ---
  let tableData = [...sampleData];
  let currentPage = 1;
  const rowsPerPage = 5;
  let sortColumn = "name";
  let sortDirection = "asc";

  // --- Sidebar Toggle ---
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    document.body.classList.toggle("sidebar-collapsed");
    // Redraw chart after transition to get correct width
    setTimeout(drawMainChart, 300);
  });

  mobileNavToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // --- Theme Toggle ---
  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    // Redraw chart with new theme colors
    drawMainChart();
  };

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    localStorage.setItem("dashboard-theme", currentTheme);
    applyTheme(currentTheme);
  });

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("dashboard-theme") || "light";
  applyTheme(savedTheme);

  // --- Table Logic ---
  const sortData = () => {
    tableData.sort((a, b) => {
      const valA = a[sortColumn].toUpperCase();
      const valB = b[sortColumn].toUpperCase();
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const renderTable = () => {
    tableBody.innerHTML = "";
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = tableData.slice(start, end);

    paginatedData.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.role}</td>
                <td><span class="status status-${item.status.toLowerCase()}">${
        item.status
      }</span></td>
            `;
      tableBody.appendChild(row);
    });
  };

  const renderPagination = () => {
    paginationContainer.innerHTML = "";
    const pageCount = Math.ceil(tableData.length / rowsPerPage);

    // Prev button
    const prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.classList.add("btn");
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
        renderPagination();
      }
    });
    paginationContainer.appendChild(prevButton);

    // Page numbers (simplified)
    const pageInfo = document.createElement("span");
    pageInfo.textContent = `Page ${currentPage} of ${pageCount}`;
    paginationContainer.appendChild(pageInfo);

    // Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add("btn");
    nextButton.disabled = currentPage === pageCount;
    nextButton.addEventListener("click", () => {
      if (currentPage < pageCount) {
        currentPage++;
        renderTable();
        renderPagination();
      }
    });
    paginationContainer.appendChild(nextButton);
  };

  tableHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const column = header.dataset.sort;
      if (sortColumn === column) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortColumn = column;
        sortDirection = "asc";
      }
      sortData();
      renderTable();
    });
  });

  // --- Modal Logic ---
  const openModal = () => modalOverlay.classList.add("active");
  const closeModal = () => {
    modalOverlay.classList.remove("active");
    itemForm.reset();
    emailError.textContent = "";
  };

  addItemBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // --- Form Validation ---
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  itemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = itemForm.name.value;
    const email = itemForm.email.value;
    const role = itemForm.role.value;

    if (!validateEmail(email)) {
      emailError.textContent = "Please enter a valid email address.";
      return;
    }
    emailError.textContent = "";

    const newItem = {
      id: tableData.length + 1,
      name,
      email,
      role,
      status: "Pending",
    };

    tableData.unshift(newItem); // Add to the beginning
    currentPage = 1; // Reset to first page
    sortData();
    renderTable();
    renderPagination();
    closeModal();
    showToast(`Item "${name}" added successfully!`);
  });

  // --- Toast Notification ---
  const showToast = (message) => {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // --- Chart.js (Simple Canvas Chart) ---
  const drawMainChart = () => {
    const ctx = chartCanvas.getContext("2d");
    const container = chartCanvas.parentElement;
    chartCanvas.width = container.clientWidth;
    chartCanvas.height = container.clientHeight;

    const isDarkMode = document.body.classList.contains("dark-mode");
    const gridColor = isDarkMode ? "#343A40" : "#E9ECEF";
    const textColor = isDarkMode ? "#E9ECEF" : "#212529";
    const pointColor = "#788176"; // Sage
    const lineColor = "#CCB999"; // Rusk

    const padding = 40;
    const chartWidth = chartCanvas.width - padding * 2;
    const chartHeight = chartCanvas.height - padding * 2;
    const numXLabels = chartData.labels.length;
    const numYLabels = 5;
    const maxValue = Math.max(...chartData.values);

    ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
    ctx.font = "12px Inter";

    // Draw Y-axis grid lines and labels
    for (let i = 0; i <= numYLabels; i++) {
      const y = padding + (i * chartHeight) / numYLabels;
      const label = Math.round(maxValue - (i * maxValue) / numYLabels);
      ctx.fillStyle = textColor;
      ctx.fillText(label, padding - 25, y + 4);

      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.strokeStyle = gridColor;
      ctx.stroke();
    }

    // Draw X-axis labels
    for (let i = 0; i < numXLabels; i++) {
      const x = padding + (i * chartWidth) / (numXLabels - 1);
      ctx.fillStyle = textColor;
      ctx.fillText(chartData.labels[i], x - 10, chartHeight + padding + 20);
    }

    // Draw line
    ctx.beginPath();
    ctx.moveTo(
      padding,
      padding + chartHeight - (chartData.values[0] / maxValue) * chartHeight
    );
    for (let i = 1; i < chartData.values.length; i++) {
      const x = padding + (i * chartWidth) / (numXLabels - 1);
      const y =
        padding + chartHeight - (chartData.values[i] / maxValue) * chartHeight;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw points
    for (let i = 0; i < chartData.values.length; i++) {
      const x = padding + (i * chartWidth) / (numXLabels - 1);
      const y =
        padding + chartHeight - (chartData.values[i] / maxValue) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = pointColor;
      ctx.fill();
    }
  };

  // --- Initial Render ---
  sortData();
  renderTable();
  renderPagination();
  drawMainChart();

  // Redraw chart on window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawMainChart, 200);
  });
});
