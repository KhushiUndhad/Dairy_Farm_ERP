const express = require("express");
const Work = require("../models/Work");

const router = express.Router();

// ========================================
// GET ALL WORK RECORDS
// ========================================

router.get("/", async (req, res) => {
  try {
    const works = await Work.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: works,
    });
  } catch (error) {
    console.error("Get Work Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch work records",
      error: error.message,
    });
  }
});

// ========================================
// ADD WORK
// ========================================

router.post("/", async (req, res) => {
  try {
    const work = await Work.create(req.body);

    res.status(201).json({
      success: true,
      message: "Work added successfully",
      data: work,
    });
  } catch (error) {
    console.error("Add Work Error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to add work",
      error: error.message,
    });
  }
});

// ========================================
// GET WORK BY ID
// ========================================

router.get("/:id", async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work record not found",
      });
    }

    res.json({
      success: true,
      data: work,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid work ID",
      error: error.message,
    });
  }
});

// ========================================
// UPDATE WORK
// ========================================

router.put("/:id", async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work record not found",
      });
    }

    res.json({
      success: true,
      message: "Work updated successfully",
      data: work,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update work",
      error: error.message,
    });
  }
});

// ========================================
// DELETE WORK
// ========================================

router.delete("/:id", async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(
      req.params.id
    );

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work record not found",
      });
    }

    res.json({
      success: true,
      message: "Work deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete work",
      error: error.message,
    });
  }
});

module.exports = router;