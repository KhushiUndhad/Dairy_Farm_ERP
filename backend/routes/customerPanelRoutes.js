const express = require("express");

const customerAuth =
  require("../middleware/customerAuth");

const {
  getCustomerDashboard,
} = require(
  "../controllers/customerDashboardController"
);

const router = express.Router();

router.get(
  "/dashboard",
  customerAuth,
  getCustomerDashboard
);

module.exports = router;