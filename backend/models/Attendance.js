const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    day: {
      type: String,
      required: true,
    },

    checkIn: {
      type: String,
      default: "--",
    },

    checkOut: {
      type: String,
      default: "--",
    },

    hours: {
      type: String,
      default: "--",
    },

    status: {
      type: String,
      enum: ["Present", "Late", "Leave", "Absent"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);