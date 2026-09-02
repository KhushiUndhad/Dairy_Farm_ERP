const express = require("express");
const router = express.Router();

const Inventory = require("../models/Inventory");

// ========================================
// GET ALL INVENTORY
// ========================================

router.get("/", async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({
      createdAt: -1,
    });

    res.status(200).json(inventory);
  } catch (error) {
    console.error("GET INVENTORY ERROR:", error);

    res.status(500).json({
      message: "Failed to load inventory",
      error: error.message,
    });
  }
});

// ========================================
// ADD INVENTORY
// ========================================

router.post("/", async (req, res) => {
  try {
    console.log("ADD INVENTORY:", req.body);

    const {
      itemCode,
      itemName,
      category,
      quantity,
      unit,
      minStock,
      price,
      supplier,
      lastUpdated,
    } = req.body;

    if (!itemCode) {
      return res.status(400).json({
        message: "Item code is required",
      });
    }

    if (!itemName) {
      return res.status(400).json({
        message: "Item name is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    if (
      quantity === undefined ||
      quantity === null ||
      quantity === ""
    ) {
      return res.status(400).json({
        message: "Quantity is required",
      });
    }

    if (!unit) {
      return res.status(400).json({
        message: "Unit is required",
      });
    }

    if (!lastUpdated) {
      return res.status(400).json({
        message: "Last updated date is required",
      });
    }

    const inventory = new Inventory({
      itemCode: itemCode.trim(),
      itemName: itemName.trim(),
      category: category.trim(),
      quantity: Number(quantity),
      unit: unit.trim(),
      minStock: Number(minStock || 0),
      price: Number(price || 0),
      supplier: supplier
        ? supplier.trim()
        : "",
      lastUpdated,
    });

    const savedInventory =
      await inventory.save();

    console.log(
      "INVENTORY SAVED:",
      savedInventory
    );

    res.status(201).json(savedInventory);
  } catch (error) {
    console.error(
      "ADD INVENTORY ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to save inventory",
      error: error.message,
    });
  }
});

// ========================================
// UPDATE INVENTORY
// ========================================

router.put("/:id", async (req, res) => {
  try {
    const {
      itemCode,
      itemName,
      category,
      quantity,
      unit,
      minStock,
      price,
      supplier,
      lastUpdated,
    } = req.body;

    const updatedInventory =
      await Inventory.findByIdAndUpdate(
        req.params.id,
        {
          itemCode: itemCode.trim(),
          itemName: itemName.trim(),
          category: category.trim(),
          quantity: Number(quantity),
          unit: unit.trim(),
          minStock: Number(minStock || 0),
          price: Number(price || 0),
          supplier: supplier
            ? supplier.trim()
            : "",
          lastUpdated,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedInventory) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json(
      updatedInventory
    );
  } catch (error) {
    console.error(
      "UPDATE INVENTORY ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to update inventory",
      error: error.message,
    });
  }
});

// ========================================
// DELETE INVENTORY
// ========================================

router.delete("/:id", async (req, res) => {
  try {
    const deletedInventory =
      await Inventory.findByIdAndDelete(
        req.params.id
      );

    if (!deletedInventory) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json({
      message:
        "Inventory item deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE INVENTORY ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to delete inventory",
      error: error.message,
    });
  }
});

module.exports = router;