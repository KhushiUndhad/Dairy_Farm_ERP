const express = require("express");

const router = express.Router();

const {
  getCustomerProfile,
  updateCustomerProfile,
} = require(
  "../controllers/customerProfileController"
);

const customerAuthMiddleware =
  require(
    "../middleware/customerAuthMiddleware"
  );

// ======================================================
// GET CUSTOMER PROFILE
// ======================================================

router.get(
  "/profile",
  customerAuthMiddleware,
  getCustomerProfile
);

// ======================================================
// UPDATE CUSTOMER PROFILE
// ======================================================

router.put(
  "/profile",
  customerAuthMiddleware,
  updateCustomerProfile
);

module.exports = router;