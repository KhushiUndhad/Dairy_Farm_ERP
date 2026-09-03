const jwt = require("jsonwebtoken");

const Customer = require("../models/Customer");

const customerAuthMiddleware = async (req, res, next) => {
  try {
    // ======================================================
    // GET AUTHORIZATION HEADER
    // ======================================================

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Customer authentication required",
      });
    }

    // ======================================================
    // CHECK BEARER TOKEN
    // ======================================================

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    // ======================================================
    // VERIFY JWT
    // ======================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ======================================================
    // CHECK CUSTOMER ROLE
    // ======================================================

    if (decoded.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Customer access only",
      });
    }

    // ======================================================
    // FIND CUSTOMER
    // ======================================================
    //
    // Customer login account is stored in:
    // user database
    //
    // Customer model MUST use customerPanelConnection.
    //

    let customer = null;

    if (decoded.id) {
      customer = await Customer.findById(decoded.id)
        .select("-password")
        .lean();
    }

    // ======================================================
    // FALLBACK FIND BY EMAIL
    // ======================================================

    if (!customer && decoded.email) {
      customer = await Customer.findOne({
        email: decoded.email.toLowerCase(),
      })
        .select("-password")
        .lean();
    }

    // ======================================================
    // CUSTOMER NOT FOUND
    // ======================================================

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer account not found",
      });
    }

    // ======================================================
    // CHECK ACTIVE ACCOUNT
    // ======================================================

    if (customer.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "Customer account is inactive",
      });
    }

    // ======================================================
    // SAVE CUSTOMER IN REQUEST
    // ======================================================

    req.customer = customer;

    next();

  } catch (error) {

    console.error(
      "Customer Authentication Error:",
      error.message
    );

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid customer token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Customer session expired. Please login again",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Customer authentication failed",
      error: error.message,
    });
  }
};

module.exports = customerAuthMiddleware;