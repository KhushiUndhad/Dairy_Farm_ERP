const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

// ===============================
// GET ALL CUSTOMERS
// ===============================
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.status(200).json(customers);
  } catch (error) {
    console.error("GET CUSTOMERS ERROR:", error);

    res.status(500).json({
      message: "Failed to load customers",
      error: error.message,
    });
  }
});

// ===============================
// ADD CUSTOMER
// ===============================
router.post("/", async (req, res) => {
  try {
    console.log("ADD CUSTOMER:", req.body);

    const {
      customerId,
      name,
      phone,
      email,
      address,
      customerType,
      balance,
      joiningDate,
      status,
    } = req.body;

    if (!customerId) {
      return res.status(400).json({
        message: "Customer ID is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Customer name is required",
      });
    }

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    if (!joiningDate) {
      return res.status(400).json({
        message: "Joining date is required",
      });
    }

    const customer = new Customer({
      customerId: customerId.trim(),
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "",
      address: address ? address.trim() : "",
      customerType: customerType || "Regular",
      balance: balance ? Number(balance) : 0,
      joiningDate,
      status: status || "Active",
    });

    const savedCustomer = await customer.save();

    console.log("CUSTOMER SAVED:", savedCustomer);

    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error("ADD CUSTOMER ERROR:", error);

    res.status(500).json({
      message: "Failed to save customer",
      error: error.message,
    });
  }
});

// ===============================
// UPDATE CUSTOMER
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const {
      customerId,
      name,
      phone,
      email,
      address,
      customerType,
      balance,
      joiningDate,
      status,
    } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        customerId: customerId.trim(),
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : "",
        address: address ? address.trim() : "",
        customerType: customerType || "Regular",
        balance: balance ? Number(balance) : 0,
        joiningDate,
        status: status || "Active",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("UPDATE CUSTOMER ERROR:", error);

    res.status(500).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
});

// ===============================
// DELETE CUSTOMER
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(
      req.params.id
    );

    if (!deletedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CUSTOMER ERROR:", error);

    res.status(500).json({
      message: "Failed to delete customer",
      error: error.message,
    });
  }
});

module.exports = router;