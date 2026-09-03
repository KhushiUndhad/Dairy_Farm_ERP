const mongoose = require("mongoose");

const customerDB = mongoose.createConnection(
  process.env.CUSTOMER_MONGO_URI ||
    "mongodb://127.0.0.1:27017/user"
);

customerDB.on("connected", () => {
  console.log("====================================");
  console.log("CUSTOMER DATABASE CONNECTED");
  console.log(
    "Database:",
    customerDB.name
  );
  console.log("====================================");
});

customerDB.on("error", (error) => {
  console.error(
    "Customer MongoDB Connection Error:",
    error.message
  );
});

module.exports = customerDB;