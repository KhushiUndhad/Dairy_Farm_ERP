const mongoose = require("mongoose");

// ======================================================
// ADMIN PANEL DATABASE CONNECTION
// ======================================================
//
// Database Name:
// dairy_farm_erp
//
// All Admin Panel business data is stored here.
//
// ======================================================

const connectDB = async () => {
  try {

    const mongoURI =
      process.env.ADMIN_MONGO_URI ||
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/dairy_farm_erp";


    // --------------------------------------------------
    // Connect MongoDB
    // --------------------------------------------------

    const connection =
      await mongoose.connect(mongoURI);


    // --------------------------------------------------
    // Success Message
    // --------------------------------------------------

    console.log(
      "Admin MongoDB Connected Successfully"
    );

    console.log(
      "Admin Database Name:",
      connection.connection.name
    );

  } catch (error) {

    console.error(
      "Admin MongoDB Connection Error:",
      error.message
    );

    throw error;
  }
};


// ======================================================
// EXPORT
// ======================================================

module.exports = connectDB;