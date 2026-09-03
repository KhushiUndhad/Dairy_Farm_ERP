const express = require("express");

const customerAuth =
  require("../middleware/customerAuth");

const {
  getCustomerPayments,
} = require(
  "../controllers/customerPaymentController"
);

const router = express.Router();

router.get(
  "/payments",
  customerAuth,
  getCustomerPayments
);

module.exports = router;