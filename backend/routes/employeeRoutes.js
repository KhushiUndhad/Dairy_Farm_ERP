const express = require("express");

const Employee = require("../models/Employee");
const User = require("../models/User");

const router = express.Router();

// ======================================================
// GET ALL EMPLOYEES
// GET /api/employees
// ======================================================

router.get("/", async (req, res) => {
  try {
    const employees =
      await Employee.find()
        .sort({ createdAt: -1 });

    return res.status(200).json(
      employees
    );
  } catch (error) {
    console.error(
      "GET EMPLOYEES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load employees",
      error: error.message,
    });
  }
});

// ======================================================
// GET EMPLOYEE BY ID
// GET /api/employees/:id
// ======================================================

router.get(
  "/:id",
  async (req, res) => {
    try {
      const employee =
        await Employee.findById(
          req.params.id
        );

      if (!employee) {
        return res.status(404).json({
          success: false,
          message:
            "Employee not found",
        });
      }

      return res.status(200).json(
        employee
      );
    } catch (error) {
      console.error(
        "GET EMPLOYEE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load employee",
        error: error.message,
      });
    }
  }
);

// ======================================================
// ADD EMPLOYEE FROM ADMIN PANEL
// POST /api/employees
// ======================================================

router.post("/", async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      phone,
      role,
      salary,
      joiningDate,
      status,
    } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message:
          "Employee ID is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message:
          "Employee name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message:
          "Employee email is required",
      });
    }

    if (!phone) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number is required",
      });
    }

    if (!role) {
      return res.status(400).json({
        success: false,
        message:
          "Employee role is required",
      });
    }

    if (
      salary === undefined ||
      salary === null ||
      salary === ""
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Salary is required",
      });
    }

    if (!joiningDate) {
      return res.status(400).json({
        success: false,
        message:
          "Joining date is required",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const existingEmployee =
      await Employee.findOne({
        $or: [
          {
            employeeId:
              employeeId.trim(),
          },
          {
            email:
              normalizedEmail,
          },
        ],
      });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message:
          "Employee ID or email already exists",
      });
    }

    const employee =
      new Employee({
        employeeId:
          employeeId.trim(),

        name:
          name.trim(),

        email:
          normalizedEmail,

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

    return res.status(201).json(
      savedEmployee
    );
  } catch (error) {
    console.error(
      "ADD EMPLOYEE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to save employee",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE EMPLOYEE
// PUT /api/employees/:id
// ======================================================

router.put(
  "/:id",
  async (req, res) => {
    try {
      const {
        employeeId,
        name,
        email,
        phone,
        role,
        salary,
        joiningDate,
        status,
      } = req.body;

      if (
        !employeeId ||
        !name ||
        !email ||
        !phone ||
        !role ||
        salary === "" ||
        salary === undefined ||
        !joiningDate
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Required employee fields are missing",
        });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      const duplicate =
        await Employee.findOne({
          $or: [
            {
              employeeId:
                employeeId.trim(),
            },
            {
              email:
                normalizedEmail,
            },
          ],
          _id: {
            $ne: req.params.id,
          },
        });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message:
            "Employee ID or email already exists",
        });
      }

      const updatedEmployee =
        await Employee.findByIdAndUpdate(
          req.params.id,
          {
            employeeId:
              employeeId.trim(),

            name:
              name.trim(),

            email:
              normalizedEmail,

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
          success: false,
          message:
            "Employee not found",
        });
      }

      return res.status(200).json(
        updatedEmployee
      );
    } catch (error) {
      console.error(
        "UPDATE EMPLOYEE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update employee",
        error: error.message,
      });
    }
  }
);

// ======================================================
// DELETE EMPLOYEE
// DELETE /api/employees/:id
// ======================================================

router.delete(
  "/:id",
  async (req, res) => {
    try {
      const employee =
        await Employee.findById(
          req.params.id
        );

      if (!employee) {
        return res.status(404).json({
          success: false,
          message:
            "Employee not found",
        });
      }

      // Delete admin employee record
      await Employee.findByIdAndDelete(
        req.params.id
      );

      // Delete corresponding employee login
      await User.findOneAndDelete({
        email: employee.email,
        role: "employee",
      });

      return res.status(200).json({
        success: true,
        message:
          "Employee deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE EMPLOYEE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete employee",
        error: error.message,
      });
    }
  }
);

module.exports = router;