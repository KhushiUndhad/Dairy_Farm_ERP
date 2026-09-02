const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      trim: true,
    },

    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    month: {
      type: String,
      required: true,
      trim: true,
    },

    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },

    allowances: {
      type: Number,
      default: 0,
      min: 0,
    },

    deductions: {
      type: Number,
      default: 0,
      min: 0,
    },

    netSalary: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentDate: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Automatically calculate net salary
salarySchema.pre("save", function (next) {
  this.netSalary =
    Number(this.basicSalary || 0) +
    Number(this.allowances || 0) -
    Number(this.deductions || 0);

  if (this.netSalary < 0) {
    this.netSalary = 0;
  }

  next();
});

module.exports = mongoose.model("Salary", salarySchema);