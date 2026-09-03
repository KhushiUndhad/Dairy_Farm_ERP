const express = require("express");

const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

const router = express.Router();

// ======================================================
// GET ALL PRODUCTS
// ======================================================
//
// GET /api/products
//
// Used by Customer Products page.
//
// ======================================================

router.get(
  "/",
  getProducts
);

// ======================================================
// GET PRODUCT BY ID
// ======================================================
//
// GET /api/products/:id
//
// ======================================================

router.get(
  "/:id",
  getProductById
);

// ======================================================
// EXPORT ROUTER
// ======================================================

module.exports = router;