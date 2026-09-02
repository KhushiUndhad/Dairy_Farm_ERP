const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    invoiceNo: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    customer: {
      type: String,
      required: true,
      trim: true,
    },

    saleType: {
      type: String,
      default: "Retail",
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    paid: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentMethod: {
      type: String,
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sale", saleSchema);