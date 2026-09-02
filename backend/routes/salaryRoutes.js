const express = require("express");
const router = express.Router();

const Salary = require("../models/Salary");

// ========================================
// GET ALL SALARIES
// GET /api/salaries
// ========================================

router.get("/", async (req, res) => {
  try {
    const salaries = await Salary.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: salaries.length,
      salaries: salaries,
    });
  } catch (error) {
    console.error(
      "Get salaries error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch salaries",
      error: error.message,
    });
  }
});

// ========================================
// GET SALARY BY ID
// GET /api/salaries/:id
// ========================================

router.get("/:id", async (req, res) => {
  try {
    const salary = await Salary.findById(
      req.params.id
    );

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: "Salary record not found",
      });
    }

    res.status(200).json({
      success: true,
      salary: salary,
    });
  } catch (error) {
    console.error(
      "Get salary error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch salary",
      error: error.message,
    });
  }
});

// ========================================
// ADD SALARY
// POST /api/salaries
// ========================================

router.post("/", async (req, res) => {
  try {
    const {
      employeeId,
      employeeName,
      month,
      basicSalary,
      allowances,
      deductions,
      paymentDate,
      status,
    } = req.body;

    // ------------------------------------
    // VALIDATION
    // ------------------------------------

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    if (!employeeName) {
      return res.status(400).json({
        success: false,
        message: "Employee name is required",
      });
    }

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Month is required",
      });
    }

    if (
      basicSalary === undefined ||
      basicSalary === null ||
      basicSalary === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Basic salary is required",
      });
    }

    const basic =
      Number(basicSalary) || 0;

    const allowance =
      Number(allowances) || 0;

    const deduction =
      Number(deductions) || 0;

    // ------------------------------------
    // CALCULATE NET SALARY
    // ------------------------------------

    let netSalary =
      basic +
      allowance -
      deduction;

    if (netSalary < 0) {
      netSalary = 0;
    }

    // ------------------------------------
    // CREATE SALARY
    // ------------------------------------

    const salary = new Salary({
      employeeId: employeeId.trim(),

      employeeName:
        employeeName.trim(),

      month: month.trim(),

      basicSalary: basic,

      allowances: allowance,

      deductions: deduction,

      netSalary: netSalary,

      paymentDate:
        paymentDate || "",

      status:
        status || "Pending",
    });

    const savedSalary =
      await salary.save();

    res.status(201).json({
      success: true,
      message:
        "Salary added successfully",

      salary: savedSalary,
    });
  } catch (error) {
    console.error(
      "Add salary error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to add salary",
      error: error.message,
    });
  }
});

// ========================================
// UPDATE SALARY
// PUT /api/salaries/:id
// ========================================

router.put("/:id", async (req, res) => {
  try {
    const {
      employeeId,
      employeeName,
      month,
      basicSalary,
      allowances,
      deductions,
      paymentDate,
      status,
    } = req.body;

    // ------------------------------------
    // FIND SALARY
    // ------------------------------------

    const salary =
      await Salary.findById(
        req.params.id
      );

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: "Salary record not found",
      });
    }

    // ------------------------------------
    // VALIDATION
    // ------------------------------------

    if (
      employeeId !== undefined &&
      !employeeId
    ) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    if (
      employeeName !== undefined &&
      !employeeName
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Employee name is required",
      });
    }

    if (
      month !== undefined &&
      !month
    ) {
      return res.status(400).json({
        success: false,
        message: "Month is required",
      });
    }

    // ------------------------------------
    // UPDATE VALUES
    // ------------------------------------

    if (employeeId !== undefined) {
      salary.employeeId =
        employeeId.trim();
    }

    if (employeeName !== undefined) {
      salary.employeeName =
        employeeName.trim();
    }

    if (month !== undefined) {
      salary.month =
        month.trim();
    }

    if (
      basicSalary !== undefined
    ) {
      salary.basicSalary =
        Number(basicSalary) || 0;
    }

    if (
      allowances !== undefined
    ) {
      salary.allowances =
        Number(allowances) || 0;
    }

    if (
      deductions !== undefined
    ) {
      salary.deductions =
        Number(deductions) || 0;
    }

    if (
      paymentDate !== undefined
    ) {
      salary.paymentDate =
        paymentDate;
    }

    if (status !== undefined) {
      salary.status = status;
    }

    // ------------------------------------
    // RECALCULATE NET SALARY
    // ------------------------------------

    salary.netSalary =
      Number(salary.basicSalary || 0) +
      Number(salary.allowances || 0) -
      Number(salary.deductions || 0);

    if (salary.netSalary < 0) {
      salary.netSalary = 0;
    }

    // ------------------------------------
    // SAVE
    // ------------------------------------

    const updatedSalary =
      await salary.save();

    res.status(200).json({
      success: true,
      message:
        "Salary updated successfully",

      salary: updatedSalary,
    });
  } catch (error) {
    console.error(
      "Update salary error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update salary",
      error: error.message,
    });
  }
});

// ========================================
// DELETE SALARY
// DELETE /api/salaries/:id
// ========================================

router.delete("/:id", async (req, res) => {
  try {
    const salary =
      await Salary.findById(
        req.params.id
      );

    if (!salary) {
      return res.status(404).json({
        success: false,
        message: "Salary record not found",
      });
    }

    await Salary.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Salary deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete salary error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete salary",
      error: error.message,
    });
  }
});

module.exports = router;