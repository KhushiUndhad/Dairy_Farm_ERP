const express = require("express");
const router = express.Router();

const MilkProduction = require("../models/MilkProduction");

// ========================================
// GET ALL MILK PRODUCTION
// ========================================

router.get("/", async (req, res) => {
  try {
    const records = await MilkProduction.find().sort({
      createdAt: -1,
    });

    res.status(200).json(records);
  } catch (error) {
    console.error(
      "GET MILK PRODUCTION ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to load milk production",
      error: error.message,
    });
  }
});

// ========================================
// ADD MILK PRODUCTION
// ========================================

router.post("/", async (req, res) => {
  try {
    console.log(
      "ADD MILK PRODUCTION:",
      req.body
    );

    const {
      date,
      cow,
      cowName,
      morning,
      evening,
      price,
    } = req.body;

    // VALIDATION

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    if (!cow) {
      return res.status(400).json({
        message: "Cow is required",
      });
    }

    if (!cowName) {
      return res.status(400).json({
        message: "Cow name is required",
      });
    }

    if (
      morning === undefined ||
      morning === null ||
      morning === ""
    ) {
      return res.status(400).json({
        message: "Morning production is required",
      });
    }

    if (
      evening === undefined ||
      evening === null ||
      evening === ""
    ) {
      return res.status(400).json({
        message: "Evening production is required",
      });
    }

    if (
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return res.status(400).json({
        message: "Price is required",
      });
    }

    // CREATE RECORD

    const production =
      new MilkProduction({
        date: date.trim(),
        cow: cow.trim(),
        cowName: cowName.trim(),
        morning: Number(morning),
        evening: Number(evening),
        price: Number(price),
      });

    // SAVE

    const savedProduction =
      await production.save();

    console.log(
      "MILK PRODUCTION SAVED:",
      savedProduction
    );

    res.status(201).json(
      savedProduction
    );
  } catch (error) {
    console.error(
      "ADD MILK PRODUCTION ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to save milk production",
      error: error.message,
    });
  }
});

// ========================================
// UPDATE MILK PRODUCTION
// ========================================

router.put("/:id", async (req, res) => {
  try {
    const {
      date,
      cow,
      cowName,
      morning,
      evening,
      price,
    } = req.body;

    const updatedProduction =
      await MilkProduction.findByIdAndUpdate(
        req.params.id,
        {
          date: date.trim(),
          cow: cow.trim(),
          cowName: cowName.trim(),
          morning: Number(morning),
          evening: Number(evening),
          price: Number(price),
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduction) {
      return res.status(404).json({
        message:
          "Milk production record not found",
      });
    }

    res.status(200).json(
      updatedProduction
    );
  } catch (error) {
    console.error(
      "UPDATE MILK ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update milk production",
      error: error.message,
    });
  }
});

// ========================================
// DELETE MILK PRODUCTION
// ========================================

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduction =
      await MilkProduction.findByIdAndDelete(
        req.params.id
      );

    if (!deletedProduction) {
      return res.status(404).json({
        message:
          "Milk production record not found",
      });
    }

    res.status(200).json({
      message:
        "Milk production deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE MILK ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to delete milk production",
      error: error.message,
    });
  }
});

module.exports = router;