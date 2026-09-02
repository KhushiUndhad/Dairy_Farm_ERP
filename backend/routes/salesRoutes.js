const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");

// ========================================
// GET ALL SALES
// ========================================
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });

    res.status(200).json(sales);
  } catch (error) {
    console.error("GET SALES ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch sales",
      error: error.message,
    });
  }
});

// ========================================
// ADD NEW SALE
// ========================================
router.post("/", async (req, res) => {
  try {
    console.log("SALE REQUEST:", req.body);

    const {
      invoiceNo,
      date,
      customer,
      saleType,
      quantity,
      price,
      paid,
      paymentMethod,
      notes,
    } = req.body;

    // Required fields
    if (!invoiceNo) {
      return res.status(400).json({
        message: "Invoice number is required",
      });
    }

    if (!date) {
      return res.status(400).json({
        message: "Sale date is required",
      });
    }

    if (!customer) {
      return res.status(400).json({
        message: "Customer is required",
      });
    }

    const qty = Number(quantity);
    const salePrice = Number(price);
    const paidAmount = Number(paid || 0);

    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    if (isNaN(salePrice) || salePrice <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (isNaN(paidAmount) || paidAmount < 0) {
      return res.status(400).json({
        message: "Paid amount is invalid",
      });
    }

    // Calculate total
    const total = qty * salePrice;

    // Prevent overpayment
    if (paidAmount > total) {
      return res.status(400).json({
        message: "Paid amount cannot be greater than total amount",
      });
    }

    // Calculate payment status
    let paymentStatus = "Pending";

    if (paidAmount >= total) {
      paymentStatus = "Paid";
    } else if (paidAmount > 0) {
      paymentStatus = "Partial";
    }

    const sale = new Sale({
      invoiceNo,
      date,
      customer,
      saleType: saleType || "Retail",
      quantity: qty,
      price: salePrice,
      total,
      paid: paidAmount,
      paymentMethod: paymentMethod || "Cash",
      paymentStatus,
      notes: notes || "",
    });

    const savedSale = await sale.save();

    console.log("SALE SAVED:", savedSale);

    res.status(201).json(savedSale);
  } catch (error) {
    console.error("ADD SALE ERROR:", error);

    res.status(500).json({
      message: "Failed to save sale",
      error: error.message,
    });
  }
});

// ========================================
// UPDATE SALE
// ========================================
router.put("/:id", async (req, res) => {
  try {
    const {
      invoiceNo,
      date,
      customer,
      saleType,
      quantity,
      price,
      paid,
      paymentMethod,
      notes,
    } = req.body;

    const qty = Number(quantity);
    const salePrice = Number(price);
    const paidAmount = Number(paid || 0);

    const total = qty * salePrice;

    let paymentStatus = "Pending";

    if (paidAmount >= total) {
      paymentStatus = "Paid";
    } else if (paidAmount > 0) {
      paymentStatus = "Partial";
    }

    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      {
        invoiceNo,
        date,
        customer,
        saleType: saleType || "Retail",
        quantity: qty,
        price: salePrice,
        total,
        paid: paidAmount,
        paymentMethod: paymentMethod || "Cash",
        paymentStatus,
        notes: notes || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSale) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    res.status(200).json(updatedSale);
  } catch (error) {
    console.error("UPDATE SALE ERROR:", error);

    res.status(500).json({
      message: "Failed to update sale",
      error: error.message,
    });
  }
});

// ========================================
// DELETE SALE
// ========================================
router.delete("/:id", async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);

    if (!deletedSale) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    res.status(200).json({
      message: "Sale deleted successfully",
    });
  } catch (error) {
    console.error("DELETE SALE ERROR:", error);

    res.status(500).json({
      message: "Failed to delete sale",
      error: error.message,
    });
  }
});

module.exports = router;