const express = require("express");

const {
  registerCustomer,
  loginCustomer,
} = require("../controllers/customerAuthController");

const router = express.Router();

// ========================================
// CUSTOMER AUTH ROUTES
// ========================================

// POST /api/customer-auth/register
router.post("/register", registerCustomer);

// POST /api/customer-auth/login
router.post("/login", loginCustomer);

module.exports = router;