const Product = require("../models/Product");

// ======================================================
// GET ALL PRODUCTS
// ======================================================

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "Get Products Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Server error while loading products",
      error: error.message,
    });
  }
};

// ======================================================
// GET SINGLE PRODUCT
// ======================================================

const getProductById = async (req, res) => {
  try {
    const product =
      await Product.findOne({
        _id: req.params.id,
        isActive: true,
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "Get Product Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Server error while loading product",
      error: error.message,
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  getProducts,
  getProductById,
};