const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      default: "",
      trim: true,
    },

    employeeName: {
      type: String,
      default: "",
      trim: true,
    },

    employeeEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "Casual Leave",
        "Sick Leave",
        "Earned Leave",
        "Emergency Leave",
        "Other",
      ],
    },

    from: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
      min: 1,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Leave", leaveSchema);