const express = require("express");

const Attendance = require("../models/Attendance");

const router = express.Router();

/*
========================================
GET ALL ATTENDANCE
========================================
*/
router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("employeeId", "name email employeeId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Attendance GET Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
========================================
GET EMPLOYEE ATTENDANCE
========================================
*/
router.get("/employee/:employeeId", async (req, res) => {
  try {
    const attendance = await Attendance.find({
      employeeId: req.params.employeeId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Employee Attendance Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
========================================
CREATE ATTENDANCE
========================================
*/
router.post("/", async (req, res) => {
  try {
    const {
      employeeId,
      date,
      day,
      checkIn,
      checkOut,
      hours,
      status,
    } = req.body;

    if (!employeeId || !date || !day) {
      return res.status(400).json({
        success: false,
        message: "Employee ID, date and day are required",
      });
    }

    const attendance = await Attendance.create({
      employeeId,
      date,
      day,
      checkIn: checkIn || "--",
      checkOut: checkOut || "--",
      hours: hours || "--",
      status: status || "Present",
    });

    res.status(201).json({
      success: true,
      message: "Attendance saved successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Attendance POST Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/*
========================================
UPDATE ATTENDANCE
========================================
*/
router.put("/:id", async (req, res) => {
  try {
    const attendance =
      await Attendance.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.json({
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/*
========================================
DELETE ATTENDANCE
========================================
*/
router.delete("/:id", async (req, res) => {
  try {
    const attendance =
      await Attendance.findByIdAndDelete(
        req.params.id
      );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;