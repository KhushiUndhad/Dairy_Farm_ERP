const mongoose = require("mongoose");

const milkProductionSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },

    cow: {
      type: String,
      required: true,
      trim: true,
    },

    cowName: {
      type: String,
      required: true,
      trim: true,
    },

    morning: {
      type: Number,
      required: true,
      min: 0,
    },

    evening: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MilkProduction",
  milkProductionSchema
);