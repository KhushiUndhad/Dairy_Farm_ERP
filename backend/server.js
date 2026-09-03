const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// ======================================================
// DATABASE CONNECTIONS
// ======================================================

// Admin Panel Database
// Database Name: dairy_farm_erp
const connectDB = require("./config/db");

// Customer Panel Database
// Database Name: user
const {
  connectCustomerPanelDB,
} = require("./config/customerPanelDb");

// ======================================================
// CREATE EXPRESS APP
// ======================================================

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: "http://localhost:5173",

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ======================================================
// HOME / SERVER TEST
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dairy Farm ERP Backend Running",
    adminDatabase: "dairy_farm_erp",
    customerPanelDatabase: "user",
  });
});

// ======================================================
// ADMIN / EMPLOYEE AUTHENTICATION
// ======================================================

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// ======================================================
// COW MANAGEMENT
// ======================================================

app.use(
  "/api/cows",
  require("./routes/cowRoutes")
);

// ======================================================
// MILK PRODUCTION
// ======================================================

app.use(
  "/api/milk-production",
  require("./routes/milkRoutes")
);

// ======================================================
// EMPLOYEE MANAGEMENT
// ======================================================

app.use(
  "/api/employees",
  require("./routes/employeeRoutes")
);

// ======================================================
// ADMIN CUSTOMER MANAGEMENT
// ======================================================

app.use(
  "/api/customers",
  require("./routes/customerRoutes")
);

// ======================================================
// ADMIN SALES
// ======================================================

app.use(
  "/api/sales",
  require("./routes/salesRoutes")
);

// ======================================================
// ATTENDANCE
// ======================================================

app.use(
  "/api/attendance",
  require("./routes/attendanceRoutes")
);

// ======================================================
// LEAVE
// ======================================================

app.use(
  "/api/leaves",
  require("./routes/leaveRoutes")
);

// ======================================================
// SALARY
// ======================================================

app.use(
  "/api/salaries",
  require("./routes/salaryRoutes")
);

// ======================================================
// WORK
// ======================================================

app.use(
  "/api/work",
  require("./routes/workRoutes")
);

// ======================================================
// ADMIN ORDERS
// ======================================================

app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

// ======================================================
// ADMIN PAYMENTS
// ======================================================

app.use(
  "/api/payments",
  require("./routes/paymentRoutes")
);

// ======================================================
// ADMIN DASHBOARD
// ======================================================

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

// ======================================================
// EMPLOYEE PROFILE
// ======================================================

app.use(
  "/api/profile",
  require("./routes/profileRoutes")
);

// ======================================================
//                  CUSTOMER PANEL
// ======================================================
//
// Customer Panel uses:
//
// 1. user
//    Customer login account
//
// 2. dairy_farm_erp
//    Customer business data
//
// ======================================================

// ======================================================
// CUSTOMER AUTHENTICATION
// ======================================================
//
// POST /api/customer-auth/register
// POST /api/customer-auth/login
//
// ======================================================

app.use(
  "/api/customer-auth",
  require("./routes/customerAuthRoutes")
);

// ======================================================
// CUSTOMER PRODUCTS
// ======================================================
//
// GET /api/products
//
// Customer can view available dairy products.
//
// IMPORTANT:
// This route is required by:
// CustomerProducts.jsx
//
// ======================================================

app.use(
  "/api/products",
  require("./routes/productRoutes")
);

// ======================================================
// CUSTOMER PROFILE
// ======================================================
//
// GET /api/customer/profile
// PUT /api/customer/profile
//
// ======================================================

app.use(
  "/api/customer",
  require("./routes/customerProfileRoutes")
);

// ======================================================
// CUSTOMER DASHBOARD
// ======================================================
//
// GET /api/customer-panel/dashboard
//
// ======================================================

app.use(
  "/api/customer-panel",
  require("./routes/customerPanelRoutes")
);

// ======================================================
// CUSTOMER SALES
// ======================================================
//
// GET /api/customer/sales
// GET /api/customer/sales/:id
//
// ======================================================

app.use(
  "/api/customer",
  require("./routes/customerSaleRoutes")
);

// ======================================================
// CUSTOMER PAYMENTS
// ======================================================
//
// GET /api/customer/payments
// GET /api/customer/payments/:id
//
// ======================================================

app.use(
  "/api/customer",
  require("./routes/customerPaymentRoutes")
);

// ======================================================
// CUSTOMER ORDERS
// ======================================================
//
// GET /api/customer/orders
// POST /api/customer/orders
// GET /api/customer/orders/:id
//
// ======================================================

app.use(
  "/api/customer",
  require("./routes/customerOrderRoutes")
);

// ======================================================
// 404 API HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use(
  (err, req, res, next) => {
    console.error(
      "SERVER ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
);

// ======================================================
// SERVER PORT
// ======================================================

const PORT =
  process.env.PORT || 5000;

// ======================================================
// START SERVER
// ======================================================

const startServer = async () => {
  try {

    // --------------------------------------------------
    // Connect Admin Database
    // --------------------------------------------------

    await connectDB();

    // --------------------------------------------------
    // Connect Customer Panel Database
    // --------------------------------------------------

    await connectCustomerPanelDB();

    // --------------------------------------------------
    // Start Express Server
    // --------------------------------------------------

    app.listen(
      PORT,
      () => {

        console.log("");

        console.log(
          "=========================================="
        );

        console.log(
          "     DAIRY FARM ERP BACKEND STARTED"
        );

        console.log(
          "=========================================="
        );

        console.log(
          `Server: http://localhost:${PORT}`
        );

        console.log(
          "Admin Database: dairy_farm_erp"
        );

        console.log(
          "Customer Panel Database: user"
        );

        console.log(
          "Customer Products: /api/products"
        );

        console.log(
          "Customer Auth: /api/customer-auth"
        );

        console.log(
          "=========================================="
        );

        console.log("");
      }
    );

  } catch (error) {

    console.error("");

    console.error(
      "=========================================="
    );

    console.error(
      "     SERVER START ERROR"
    );

    console.error(
      "=========================================="
    );

    console.error(
      error.message
    );

    console.error("");

    process.exit(1);
  }
};

// ======================================================
// RUN SERVER
// ======================================================

startServer();