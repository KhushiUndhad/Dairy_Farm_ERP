const mongoose = require("mongoose");

const {
  customerPanelConnection,
} = require("../config/customerPanelDb");

const customerPortalUserSchema =
  new mongoose.Schema(
    {
      customerId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

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

      role: {
        type: String,
        default: "customer",
        enum: ["customer"],
      },

      status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"],
      },
    },
    {
      timestamps: true,
      collection: "customerportalusers",
    }
  );

module.exports =
  customerPanelConnection.model(
    "CustomerPortalUser",
    customerPortalUserSchema
  );