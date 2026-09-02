const express = require("express");

const User = require("../models/User");

const router = express.Router();

/*
========================================
GET EMPLOYEE PROFILE
========================================
GET
/api/profile/:employeeId
*/

router.get("/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;

    console.log(
      "GET PROFILE REQUEST:",
      employeeId
    );

    const employee = await User.findById(employeeId)
      .select("-password");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee profile fetched successfully",
      user: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        role: employee.role,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
      },
    });

  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch employee profile",
      error: error.message,
    });
  }
});


/*
========================================
UPDATE EMPLOYEE PROFILE
========================================
PUT
/api/profile/:employeeId
*/

router.put("/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;

    const {
      name,
      email,
      phone,
      department,
    } = req.body;

    console.log(
      "UPDATE PROFILE REQUEST:",
      employeeId
    );

    if (
      !name ||
      !email ||
      !phone ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all profile fields",
      });
    }

    const cleanEmail =
      email.trim().toLowerCase();

    // Check whether another user already uses this email
    const existingUser =
      await User.findOne({
        email: cleanEmail,
        _id: { $ne: employeeId },
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered by another user",
      });
    }

    const employee =
      await User.findByIdAndUpdate(
        employeeId,
        {
          name: name.trim(),
          email: cleanEmail,
          phone: phone.trim(),
          department: department.trim(),
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    console.log(
      "PROFILE UPDATED:",
      employee.email
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        role: employee.role,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
      },
    });

  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update employee profile",
      error: error.message,
    });
  }
});


module.exports = router;