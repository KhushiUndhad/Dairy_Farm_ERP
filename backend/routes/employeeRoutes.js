const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");

// ========================================
// GET ALL EMPLOYEES
// ========================================

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find()
      .sort({ createdAt: -1 });

    res.status(200).json(employees);
  } catch (error) {
    console.error(
      "GET EMPLOYEES ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to load employees",
      error: error.message,
    });
  }
});

// ========================================
// ADD EMPLOYEE
// ========================================

router.post("/", async (req, res) => {
  try {
    console.log(
      "ADD EMPLOYEE:",
      req.body
    );

    const {
      employeeId,
      name,
      phone,
      role,
      salary,
      joiningDate,
      status,
    } = req.body;

    // REQUIRED VALIDATION

    if (!employeeId) {
      return res.status(400).json({
        message: "Employee ID is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Employee name is required",
      });
    }

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    if (!role) {
      return res.status(400).json({
        message: "Role is required",
      });
    }

    if (
      salary === undefined ||
      salary === null ||
      salary === ""
    ) {
      return res.status(400).json({
        message: "Salary is required",
      });
    }

    if (!joiningDate) {
      return res.status(400).json({
        message: "Joining date is required",
      });
    }

    // CREATE EMPLOYEE

    const employee =
      new Employee({
        employeeId:
          employeeId.trim(),

        name:
          name.trim(),

        phone:
          phone.trim(),

        role:
          role.trim(),

        salary:
          Number(salary),

        joiningDate,

        status:
          status || "Active",
      });

    const savedEmployee =
      await employee.save();

    console.log(
      "EMPLOYEE SAVED:",
      savedEmployee
    );

    res.status(201).json(
      savedEmployee
    );
  } catch (error) {
    console.error(
      "ADD EMPLOYEE ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to save employee",
      error: error.message,
    });
  }
});

// ========================================
// UPDATE EMPLOYEE
// ========================================

router.put("/:id", async (req, res) => {
  try {
    const {
      employeeId,
      name,
      phone,
      role,
      salary,
      joiningDate,
      status,
    } = req.body;

    const updatedEmployee =
      await Employee.findByIdAndUpdate(
        req.params.id,
        {
          employeeId:
            employeeId.trim(),

          name:
            name.trim(),

          phone:
            phone.trim(),

          role:
            role.trim(),

          salary:
            Number(salary),

          joiningDate,

          status:
            status || "Active",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedEmployee) {
      return res.status(404).json({
        message:
          "Employee not found",
      });
    }

    res.status(200).json(
      updatedEmployee
    );
  } catch (error) {
    console.error(
      "UPDATE EMPLOYEE ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update employee",
      error: error.message,
    });
  }
});

// ========================================
// DELETE EMPLOYEE
// ========================================

router.delete(
  "/:id",
  async (req, res) => {
    try {
      const deletedEmployee =
        await Employee.findByIdAndDelete(
          req.params.id
        );

      if (!deletedEmployee) {
        return res.status(404).json({
          message:
            "Employee not found",
        });
      }

      res.status(200).json({
        message:
          "Employee deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE EMPLOYEE ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to delete employee",
        error: error.message,
      });
    }
  }
);

module.exports = router;