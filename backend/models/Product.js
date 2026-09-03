const mongoose = require("mongoose");

// ======================================================
// PRODUCT MODEL
// ======================================================
//
// Database:
// dairy_farm_erp
//
// Collection:
// products
//
// This model is used by the Customer Panel to display
// dairy products available for purchase.
//
// ======================================================

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      default: "Litre",
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);