const express = require("express");
const Payment = require("../models/Payment");

const router = express.Router();

// ========================================
// GET ALL PAYMENTS
// ========================================

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error("Get Payments Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
});

// ========================================
// ADD PAYMENT
// ========================================

router.post("/", async (req, res) => {
  try {
    const payment = await Payment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Payment added successfully",
      data: payment,
    });
  } catch (error) {
    console.error("Add Payment Error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to add payment",
      error: error.message,
    });
  }
});

// ========================================
// GET PAYMENT BY ID
// ========================================

router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid payment ID",
      error: error.message,
    });
  }
});

// ========================================
// UPDATE PAYMENT
// ========================================

router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update payment",
      error: error.message,
    });
  }
});

// ========================================
// DELETE PAYMENT
// ========================================

router.delete("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete payment",
      error: error.message,
    });
  }
});

module.exports = router;