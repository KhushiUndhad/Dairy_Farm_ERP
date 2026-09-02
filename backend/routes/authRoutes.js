const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

// ========================================
// EMPLOYEE REGISTER
// ========================================

router.post(
  "/employee-register",
  async (req, res) => {
    try {
      console.log(
        "REGISTER REQUEST:",
        req.body
      );

      const {
        name,
        email,
        phone,
        department,
        password,
        confirmPassword,
      } = req.body;

      // Check required fields
      if (
        !name ||
        !email ||
        !phone ||
        !department ||
        !password ||
        !confirmPassword
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all fields.",
        });
      }

      // Check password
      if (
        password !== confirmPassword
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Passwords do not match.",
        });
      }

      // Check password length
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 6 characters.",
        });
      }

      const cleanEmail = email
        .trim()
        .toLowerCase();

      // Check existing employee
      const existingUser =
        await User.findOne({
          email: cleanEmail,
        });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message:
            "Email already registered.",
        });
      }

      // Hash password
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // Create employee
      const employee =
        await User.create({
          name: name.trim(),
          email: cleanEmail,
          phone: phone.trim(),
          department:
            department.trim(),
          password:
            hashedPassword,
          role: "employee",
        });

      console.log(
        "EMPLOYEE SAVED:",
        employee._id
      );

      return res.status(201).json({
        success: true,
        message:
          "Employee registered successfully.",

        user: {
          id: employee._id,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          department:
            employee.department,
          role: employee.role,
        },
      });
    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Employee registration failed.",
        error: error.message,
      });
    }
  }
);

// ========================================
// EMPLOYEE LOGIN
// ========================================

router.post(
  "/employee-login",
  async (req, res) => {
    try {
      console.log(
        "LOGIN REQUEST:",
        req.body.email
      );

      const {
        email,
        password,
      } = req.body;

      // Check fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message:
            "Email and password are required.",
        });
      }

      const cleanEmail = email
        .trim()
        .toLowerCase();

      // Find employee
      const employee =
        await User.findOne({
          email: cleanEmail,
          role: "employee",
        });

      if (!employee) {
        console.log(
          "EMPLOYEE NOT FOUND:",
          cleanEmail
        );

        return res.status(401).json({
          success: false,
          message:
            "Invalid email or password.",
        });
      }

      // Compare password
      const passwordMatch =
        await bcrypt.compare(
          password,
          employee.password
        );

      if (!passwordMatch) {
        console.log(
          "PASSWORD DOES NOT MATCH"
        );

        return res.status(401).json({
          success: false,
          message:
            "Invalid email or password.",
        });
      }

      // Create JWT
      const token =
        jwt.sign(
          {
            id: employee._id.toString(),
            email: employee.email,
            role: employee.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

      console.log(
        "LOGIN SUCCESS:",
        employee.email
      );

      return res.status(200).json({
        success: true,
        message:
          "Employee login successful.",

        token,

        user: {
          id: employee._id,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          department:
            employee.department,
          role: employee.role,
        },
      });
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Employee login failed.",
        error: error.message,
      });
    }
  }
);

module.exports = router;