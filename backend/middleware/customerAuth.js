const jwt = require("jsonwebtoken");

const CustomerPortalUser =
  require("../models/CustomerPortalUser");

const customerAuth = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message:
          "Customer authorization token is required",
      });
    }

    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    if (decoded.role !== "customer") {
      return res.status(403).json({
        success: false,
        message:
          "Customer access only",
      });
    }

    const customerUser =
      await CustomerPortalUser.findOne({
        _id: decoded.id,
        customerId: decoded.customerId,
      });

    if (!customerUser) {
      return res.status(401).json({
        success: false,
        message:
          "Customer account not found",
      });
    }

    if (
      customerUser.status !== "active"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Customer account is inactive",
      });
    }

    req.customerUser = customerUser;

    next();
  } catch (error) {
    console.error(
      "Customer Auth Error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired customer token",
    });
  }
};

module.exports = customerAuth;