const CustomerPortalUser = require("../models/CustomerPortalUser");

const customerAccountMiddleware = async (req, res, next) => {
  try {
    if (!req.customer) {
      return res.status(401).json({
        success: false,
        message: "Customer authentication required",
      });
    }

    const customer = await CustomerPortalUser.findById(
      req.customer.id
    ).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer account not found",
      });
    }

    if (customer.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your customer account is inactive",
      });
    }

    req.customerAccount = customer;

    next();
  } catch (error) {
    console.error(
      "Customer Account Middleware Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to load customer account",
      error: error.message,
    });
  }
};

module.exports = customerAccountMiddleware;