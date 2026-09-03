const mongoose = require("mongoose");

const {
  customerPanelConnection,
} = require("../config/customerPanelDb");

// ======================================================
// CUSTOMER ACCOUNT SCHEMA
// ======================================================
//
// Database:
// user
//
// Collection:
// customeraccounts
//
// This model is ONLY for Customer Panel login/profile.
//
// DO NOT use the Admin Customer.js model here.
//
// ======================================================

const customerAccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    pincode: {
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
    collection: "customeraccounts",
  }
);


// ======================================================
// EXPORT
// ======================================================

module.exports =
  customerPanelConnection.model(
    "CustomerAccount",
    customerAccountSchema
  );