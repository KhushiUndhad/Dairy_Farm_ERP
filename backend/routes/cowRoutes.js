const express = require("express");
const router = express.Router();

const Cow = require("../models/Cow");

// ========================================
// GET ALL COWS
// ========================================

router.get("/", async (req, res) => {
  try {
    const cows = await Cow.find().sort({
      createdAt: -1,
    });

    res.status(200).json(cows);
  } catch (error) {
    console.error("GET COWS ERROR:", error);

    res.status(500).json({
      message: "Failed to load cows",
      error: error.message,
    });
  }
});

// ========================================
// ADD NEW COW
// ========================================

router.post("/", async (req, res) => {
  try {
    console.log("ADD COW REQUEST:");
    console.log(req.body);

    const {
      name,
      breed,
      age,
      milk,
    } = req.body;

    // VALIDATION
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Cow name is required",
      });
    }

    if (!breed || !breed.trim()) {
      return res.status(400).json({
        message: "Breed is required",
      });
    }

    if (
      age === undefined ||
      age === null ||
      age === ""
    ) {
      return res.status(400).json({
        message: "Age is required",
      });
    }

    if (
      milk === undefined ||
      milk === null ||
      String(milk).trim() === ""
    ) {
      return res.status(400).json({
        message: "Milk production is required",
      });
    }

    // CREATE COW
    const newCow = new Cow({
      name: name.trim(),
      breed: breed.trim(),
      age: Number(age),
      milk: String(milk).trim(),
    });

    // SAVE TO MONGODB
    const savedCow = await newCow.save();

    console.log(
      "COW SAVED SUCCESSFULLY:",
      savedCow
    );

    res.status(201).json(savedCow);
  } catch (error) {
    console.error("ADD COW ERROR:", error);

    res.status(500).json({
      message: "Failed to save cow",
      error: error.message,
    });
  }
});

// ========================================
// UPDATE COW
// ========================================

router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      breed,
      age,
      milk,
    } = req.body;

    if (!name || !breed || age === "" || !milk) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const updatedCow =
      await Cow.findByIdAndUpdate(
        req.params.id,
        {
          name: name.trim(),
          breed: breed.trim(),
          age: Number(age),
          milk: String(milk).trim(),
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedCow) {
      return res.status(404).json({
        message: "Cow not found",
      });
    }

    res.status(200).json(updatedCow);
  } catch (error) {
    console.error(
      "UPDATE COW ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to update cow",
      error: error.message,
    });
  }
});

// ========================================
// DELETE COW
// ========================================

router.delete("/:id", async (req, res) => {
  try {
    const deletedCow =
      await Cow.findByIdAndDelete(
        req.params.id
      );

    if (!deletedCow) {
      return res.status(404).json({
        message: "Cow not found",
      });
    }

    res.status(200).json({
      message: "Cow deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE COW ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to delete cow",
      error: error.message,
    });
  }
});

module.exports = router;