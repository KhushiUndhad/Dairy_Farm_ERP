const mongoose = require("mongoose");

const customerPanelConnection = mongoose.createConnection(
  process.env.CUSTOMER_MONGO_URI ||
    "mongodb://127.0.0.1:27017/user"
);

customerPanelConnection.on("connected", () => {
  console.log("====================================");
  console.log("CUSTOMER DATABASE CONNECTED");
  console.log("Database: user");
  console.log("====================================");
});

customerPanelConnection.on("error", (error) => {
  console.error(
    "Customer MongoDB Error:",
    error.message
  );
});

const connectCustomerPanelDB = async () => {
  try {
    await customerPanelConnection.asPromise();

    console.log("Customer Panel Database Ready");
  } catch (error) {
    console.error(
      "Customer Panel Database Connection Failed:",
      error.message
    );

    process.exit(1);
  }
};

module.exports = {
  customerPanelConnection,
  connectCustomerPanelDB,
};