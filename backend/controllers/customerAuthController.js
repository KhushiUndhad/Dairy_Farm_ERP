const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const CustomerAccount = require("../models/CustomerAccount");

// ======================================================
// CUSTOMER REGISTER
// ======================================================

const registerCustomer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = req.body;

    // --------------------------------------------------
    // Validation
    // --------------------------------------------------

    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, phone and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    if (
      confirmPassword &&
      password !== confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    // --------------------------------------------------
    // Check Existing Customer Account
    // --------------------------------------------------

    const existingCustomer =
      await CustomerAccount.findOne({
        email: normalizedEmail,
      });

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message:
          "Customer account already exists with this email",
      });
    }

    // --------------------------------------------------
    // Hash Password
    // --------------------------------------------------

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // --------------------------------------------------
    // Create Customer Account
    // --------------------------------------------------

    const customer =
      await CustomerAccount.create({
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        password: hashedPassword,
      });

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(201).json({
      success: true,
      message:
        "Customer registered successfully",

      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });

  } catch (error) {
    console.error(
      "Customer Register Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error during customer registration",
      error: error.message,
    });
  }
};


// ======================================================
// CUSTOMER LOGIN
// ======================================================

const loginCustomer = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // --------------------------------------------------
    // Validation
    // --------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    // --------------------------------------------------
    // Find Customer Account
    // --------------------------------------------------

    const customer =
      await CustomerAccount.findOne({
        email: normalizedEmail,
      });

    if (!customer) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    // --------------------------------------------------
    // Active Check
    // --------------------------------------------------

    if (!customer.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "Customer account is inactive",
      });
    }

    // --------------------------------------------------
    // Password Check
    // --------------------------------------------------

    const passwordMatch =
      await bcrypt.compare(
        password,
        customer.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    // --------------------------------------------------
    // JWT TOKEN
    // --------------------------------------------------

    const token = jwt.sign(
      {
        id: customer._id.toString(),
        email: customer.email,
        role: "customer",
      },

      process.env.JWT_SECRET ||
        "dairy_farm_customer_secret_2026",

      {
        expiresIn: "7d",
      }
    );

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(200).json({
      success: true,

      message:
        "Customer login successful",

      token,

      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
      },
    });

  } catch (error) {
    console.error(
      "Customer Login Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error during customer login",
      error: error.message,
    });
  }
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {
  registerCustomer,
  loginCustomer,
};