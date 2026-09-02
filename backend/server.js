const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

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

// ========================================
// DATABASE CONNECTION
// ========================================

connectDB();

// ========================================
// HOME / SERVER TEST
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Dairy Farm ERP Backend Running",

    database:
      process.env.MONGO_URI ||
      "MongoDB",
  });
});

// ========================================
// AUTHENTICATION
// ========================================

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// ========================================
// COW MANAGEMENT
// ========================================

app.use(
  "/api/cows",
  require("./routes/cowRoutes")
);

// ========================================
// MILK PRODUCTION
// ========================================

app.use(
  "/api/milk-production",
  require("./routes/milkRoutes")
);

// ========================================
// EMPLOYEE MANAGEMENT
// ========================================

app.use(
  "/api/employees",
  require("./routes/employeeRoutes")
);

// ========================================
// CUSTOMER MANAGEMENT
// ========================================

app.use(
  "/api/customers",
  require("./routes/customerRoutes")
);

// ========================================
// SALES
// ========================================

app.use(
  "/api/sales",
  require("./routes/salesRoutes")
);

// ========================================
// ATTENDANCE
// ========================================

app.use(
  "/api/attendance",
  require("./routes/attendanceRoutes")
);

// ========================================
// LEAVE
// ========================================

app.use(
  "/api/leaves",
  require("./routes/leaveRoutes")
);

// ========================================
// SALARY
// ========================================

app.use(
  "/api/salaries",
  require("./routes/salaryRoutes")
);

// ========================================
// WORK
// ========================================

app.use(
  "/api/work",
  require("./routes/workRoutes")
);

// ========================================
// ORDERS
// ========================================

app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

// ========================================
// PAYMENTS
// ========================================

app.use(
  "/api/payments",
  require("./routes/paymentRoutes")
);

// ========================================
// DASHBOARD
// ========================================

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

// ========================================
// PROFILE
// ========================================

app.use(
  "/api/profile",
  require("./routes/profileRoutes")
);

app.use(
  "/api/salaries",
  require("./routes/salaryRoutes")
);
// ========================================
// 404 API HANDLER
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message:
      `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ========================================
// ERROR HANDLER
// ========================================

app.use(
  (err, req, res, next) => {
    console.error(
      "SERVER ERROR:",
      err
    );

    res.status(500).json({
      success: false,

      message:
        "Internal server error",

      error:
        err.message,
    });
  }
);

// ========================================
// START SERVER
// ========================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});