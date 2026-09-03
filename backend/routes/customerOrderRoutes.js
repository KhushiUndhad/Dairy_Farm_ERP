const express = require("express");

const customerAuth =
  require("../middleware/customerAuth");

const {
  getCustomerOrders,
} = require(
  "../controllers/customerOrderController"
);

const router = express.Router();

router.get(
  "/orders",
  customerAuth,
  getCustomerOrders
);

module.exports = router;