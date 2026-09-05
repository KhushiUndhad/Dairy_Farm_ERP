
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const CustomerPortalUser = require("../models/CustomerPortalUser");
const Customer = require("../models/Customer");


// ======================================================
// GENERATE UNIQUE CUSTOMER ID
// ======================================================

const generateCustomerId = async () => {
  let customerNumber = 1;

  while (true) {

    const customerId =
      `CUS${String(customerNumber).padStart(3, "0")}`;

    // Check customer portal database
    const portalCustomer =
      await CustomerPortalUser.findOne({
        customerId,
      });

    // Check admin database
    const adminCustomer =
      await Customer.findOne({
        customerId,
      });

    // If ID does not exist anywhere, use it
    if (!portalCustomer && !adminCustomer) {
      return customerId;
    }

    customerNumber++;
  }
};


// ======================================================
// CUSTOMER REGISTER
// ======================================================

router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        phone,
        password,
        confirmPassword,
        address,
      } = req.body;


      // ==================================================
      // VALIDATION
      // ==================================================

      if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword
      ) {

        return res.status(400).json({
          success: false,
          message:
            "All required fields are required.",
        });

      }


      const cleanName =
        name.trim();

      const cleanEmail =
        email.trim().toLowerCase();

      const cleanPhone =
        phone.trim();

      const cleanAddress =
        address
          ? address.trim()
          : "";


      // ==================================================
      // NAME VALIDATION
      // ==================================================

      if (cleanName.length < 2) {

        return res.status(400).json({
          success: false,
          message:
            "Name must contain at least 2 characters.",
        });

      }


      // ==================================================
      // EMAIL VALIDATION
      // ==================================================

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!emailRegex.test(cleanEmail)) {

        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid email address.",
        });

      }


      // ==================================================
      // PHONE VALIDATION
      // ==================================================

      const phoneRegex =
        /^[0-9]{10}$/;


      if (!phoneRegex.test(cleanPhone)) {

        return res.status(400).json({
          success: false,
          message:
            "Phone number must contain exactly 10 digits.",
        });

      }


      // ==================================================
      // PASSWORD VALIDATION
      // ==================================================

      if (password.length < 6) {

        return res.status(400).json({
          success: false,
          message:
            "Password must contain at least 6 characters.",
        });

      }


      if (password !== confirmPassword) {

        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match.",
        });

      }


      // ==================================================
      // CHECK CUSTOMER PORTAL EMAIL
      // ==================================================

      const existingPortalCustomer =
        await CustomerPortalUser.findOne({
          email: cleanEmail,
        });


      if (existingPortalCustomer) {

        return res.status(409).json({
          success: false,
          message:
            "A customer account with this email already exists.",
        });

      }


      // ==================================================
      // CHECK ADMIN CUSTOMER EMAIL
      // ==================================================

      const existingAdminCustomer =
        await Customer.findOne({
          email: cleanEmail,
        });


      if (existingAdminCustomer) {

        return res.status(409).json({
          success: false,
          message:
            "A customer with this email already exists.",
        });

      }


      // ==================================================
      // GENERATE UNIQUE CUSTOMER ID
      // ==================================================

      const customerId =
        await generateCustomerId();


      console.log(
        "Generated Customer ID:",
        customerId
      );


      // ==================================================
      // HASH PASSWORD
      // ==================================================

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );


      // ==================================================
      // CREATE CUSTOMER PORTAL USER
      // ==================================================

      const newPortalCustomer =
        new CustomerPortalUser({

          customerId,

          name:
            cleanName,

          email:
            cleanEmail,

          phone:
            cleanPhone,

          password:
            hashedPassword,

          role:
            "customer",

          status:
            "active",

        });


      await newPortalCustomer.save();


      // ==================================================
      // CREATE ADMIN CUSTOMER RECORD
      // ==================================================

      try {

        const newCustomer =
          new Customer({

            customerId,

            name:
              cleanName,

            phone:
              cleanPhone,

            email:
              cleanEmail,

            address:
              cleanAddress,

            customerType:
              "Regular",

            balance:
              0,

            joiningDate:
              new Date(),

            status:
              "Active",

          });


        await newCustomer.save();


        // ==================================================
        // SUCCESS
        // ==================================================

        return res.status(201).json({

          success: true,

          message:
            "Customer registered successfully.",

          customer: {

            id:
              newCustomer._id,

            customerId:
              newCustomer.customerId,

            name:
              newCustomer.name,

            email:
              newCustomer.email,

            phone:
              newCustomer.phone,

            address:
              newCustomer.address,

            customerType:
              newCustomer.customerType,

            balance:
              newCustomer.balance,

            joiningDate:
              newCustomer.joiningDate,

            status:
              newCustomer.status,

          },

        });

      } catch (customerError) {

        // =================================================
        // ROLLBACK CUSTOMER PORTAL ACCOUNT
        // =================================================

        await CustomerPortalUser.findByIdAndDelete(
          newPortalCustomer._id
        );

        throw customerError;
      }


    } catch (error) {

      console.error(
        "Customer Register Error:",
        error
      );


      // ==================================================
      // DUPLICATE KEY ERROR
      // ==================================================

      if (error.code === 11000) {

        return res.status(409).json({

          success: false,

          message:
            "Customer ID or email already exists. Please try again.",

        });

      }


      // ==================================================
      // SERVER ERROR
      // ==================================================

      return res.status(500).json({

        success: false,

        message:
          "Server error during customer registration.",

        error:
          error.message,

      });

    }

  }
);


// ======================================================
// CUSTOMER LOGIN
// ======================================================

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;


      // ==================================================
      // VALIDATION
      // ==================================================

      if (!email || !password) {

        return res.status(400).json({

          success: false,

          message:
            "Email and password are required.",

        });

      }


      const cleanEmail =
        email.trim().toLowerCase();


      // ==================================================
      // FIND CUSTOMER
      // ==================================================

      const customer =
        await CustomerPortalUser.findOne({
          email: cleanEmail,
        });


      if (!customer) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password.",

        });

      }


      // ==================================================
      // CHECK STATUS
      // ==================================================

      if (
        customer.status &&
        customer.status !== "active"
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Your customer account is inactive.",

        });

      }


      // ==================================================
      // CHECK PASSWORD
      // ==================================================

      const passwordValid =
        await bcrypt.compare(
          password,
          customer.password
        );


      if (!passwordValid) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password.",

        });

      }


      // ==================================================
      // CREATE JWT
      // ==================================================

      const token =
        jwt.sign(

          {
            id:
              customer._id,

            customerId:
              customer.customerId,

            email:
              customer.email,

            role:
              "customer",
          },

          process.env.JWT_SECRET ||
            "dairy_farm_erp_secret_2026",

          {
            expiresIn:
              "1d",
          }

        );


      // ==================================================
      // RESPONSE
      // ==================================================

      return res.status(200).json({

        success: true,

        message:
          "Customer login successful.",

        token,

        customer: {

          id:
            customer._id,

          customerId:
            customer.customerId,

          name:
            customer.name,

          email:
            customer.email,

          phone:
            customer.phone,

          role:
            customer.role,

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
          "Server error during customer login.",

        error:
          error.message,

      });

    }

  }
);


module.exports = router;
