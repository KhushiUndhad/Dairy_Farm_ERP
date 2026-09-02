const mongoose = require("mongoose");

const employeeSchema =
  new mongoose.Schema(
    {
      employeeId: {
        type: String,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        required: true,
      },

      salary: {
        type: Number,
        required: true,
        min: 0,
      },

      joiningDate: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Active",
          "Inactive",
        ],
        default: "Active",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Employee",
    employeeSchema
  );