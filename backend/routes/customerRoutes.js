const express = require("express");

const Customer = require("../models/Customer");

const router = express.Router();

// ======================================================
// GET ALL CUSTOMERS
// GET /api/customers
// ======================================================

router.get("/", async (req, res) => {
  try {
    const customers =
      await Customer.find()
        .sort({ createdAt: -1 });

    return res.status(200).json(
      customers
    );
  } catch (error) {
    console.error(
      "GET CUSTOMERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load customers",
      error: error.message,
    });
  }
});

// ======================================================
// GET CUSTOMER BY ID
// GET /api/customers/:id
// ======================================================

router.get(
  "/:id",
  async (req, res) => {
    try {
      const customer =
        await Customer.findById(
          req.params.id
        );

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            "Customer not found",
        });
      }

      return res.status(200).json(
        customer
      );
    } catch (error) {
      console.error(
        "GET CUSTOMER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load customer",
        error: error.message,
      });
    }
  }
);

// ======================================================
// ADD CUSTOMER FROM ADMIN PANEL
// POST /api/customers
// ======================================================

router.post("/", async (req, res) => {
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

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message:
          "Customer ID is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message:
          "Customer name is required",
      });
    }

    if (!phone) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number is required",
      });
    }

    if (!joiningDate) {
      return res.status(400).json({
        success: false,
        message:
          "Joining date is required",
      });
    }

    const existingId =
      await Customer.findOne({
        customerId:
          customerId.trim(),
      });

    if (existingId) {
      return res.status(400).json({
        success: false,
        message:
          "Customer ID already exists",
      });
    }

    const customer =
      new Customer({
        customerId:
          customerId.trim(),

        name:
          name.trim(),

        phone:
          phone.trim(),

        email:
          email
            ? email.trim().toLowerCase()
            : "",

        address:
          address
            ? address.trim()
            : "",

        customerType:
          customerType ||
          "Regular",

        balance:
          balance === "" ||
          balance === undefined
            ? 0
            : Number(balance),

        joiningDate,

        status:
          status || "Active",
      });

    const savedCustomer =
      await customer.save();

    return res.status(201).json(
      savedCustomer
    );
  } catch (error) {
    console.error(
      "ADD CUSTOMER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to save customer",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE CUSTOMER
// PUT /api/customers/:id
// ======================================================

router.put(
  "/:id",
  async (req, res) => {
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

      if (
        !customerId ||
        !name ||
        !phone ||
        !joiningDate
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Required customer fields are missing",
        });
      }

      const updatedCustomer =
        await Customer.findByIdAndUpdate(
          req.params.id,
          {
            customerId:
              customerId.trim(),

            name:
              name.trim(),

            phone:
              phone.trim(),

            email:
              email
                ? email.trim().toLowerCase()
                : "",

            address:
              address
                ? address.trim()
                : "",

            customerType:
              customerType ||
              "Regular",

            balance:
              balance === "" ||
              balance === undefined
                ? 0
                : Number(balance),

            joiningDate,

            status:
              status || "Active",
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedCustomer) {
        return res.status(404).json({
          success: false,
          message:
            "Customer not found",
        });
      }

      return res.status(200).json(
        updatedCustomer
      );
    } catch (error) {
      console.error(
        "UPDATE CUSTOMER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update customer",
        error: error.message,
      });
    }
  }
);

// ======================================================
// DELETE CUSTOMER
// DELETE /api/customers/:id
// ======================================================

router.delete(
  "/:id",
  async (req, res) => {
    try {
      const deletedCustomer =
        await Customer.findByIdAndDelete(
          req.params.id
        );

      if (!deletedCustomer) {
        return res.status(404).json({
          success: false,
          message:
            "Customer not found",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Customer deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE CUSTOMER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete customer",
        error: error.message,
      });
    }
  }
);

module.exports = router;