const express = require("express");

const customerAuth =
  require("../middleware/customerAuth");

const {
  getCustomerSales,
} = require(
  "../controllers/customerSaleController"
);

const router = express.Router();

router.get(
  "/sales",
  customerAuth,
  getCustomerSales
);

module.exports = router;