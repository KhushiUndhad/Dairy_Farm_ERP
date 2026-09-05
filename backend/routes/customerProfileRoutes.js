const express = require("express");

const CustomerPortalUser = require("../models/CustomerPortalUser");

const customerAuthMiddleware =
  require("../middleware/customerAuthMiddleware");

const router = express.Router();


// ========================================
// GET CUSTOMER PROFILE
// ========================================

router.get(
  "/profile",
  customerAuthMiddleware,
  async (req, res) => {
    try {
      const customer =
        await CustomerPortalUser.findById(
          req.customer.id
        ).select("-password");

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer account not found",
        });
      }

      return res.status(200).json({
        success: true,
        customer,
      });

    } catch (error) {
      console.error(
        "Get Customer Profile Error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "Server error while loading profile",
        error: error.message,
      });
    }
  }
);


// ========================================
// UPDATE CUSTOMER PROFILE
// ========================================

router.put(
  "/profile",
  customerAuthMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        phone,
      } = req.body;

      const customer =
        await CustomerPortalUser.findById(
          req.customer.id
        );

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer account not found",
        });
      }

      if (name !== undefined) {
        customer.name = name.trim();
      }

      if (phone !== undefined) {
        customer.phone = phone.trim();
      }

      await customer.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",

        customer: {
          id: customer._id,
          customerId: customer.customerId,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          role: customer.role,
          status: customer.status,
        },
      });

    } catch (error) {
      console.error(
        "Update Customer Profile Error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "Server error while updating profile",
        error: error.message,
      });
    }
  }
);


module.exports = router;