const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

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
    ],
    credentials: true,
  })
);

app.use(express.json());

// ========================================
// DATABASE
// ========================================

connectDB();

// ========================================
// HOME
// ========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Dairy Farm ERP Backend Running",
    database: "dairy_farm_erp",
  });
});

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
// INVENTORY MANAGEMENT
// ========================================

app.use(
  "/api/inventory",
  require("./routes/inventoryRoutes")
);

app.use(
  "/api/sales",
  require("./routes/salesRoutes")
);
app.use(
  "/api/reports",
  require("./routes/reportsRoutes")
);
app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});