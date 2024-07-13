// routes/packing.js
const express = require("express");
const router = express.Router();
const packingController = require("../controllers/packingController");

// Route untuk mendapatkan semua data packing
router.get("/", packingController.getAllPacking);

// Route untuk mendapatkan data packing berdasarkan ID
router.get("/:id", packingController.getPackingById);

// Route untuk membuat data packing baru
router.post("/", packingController.createPacking);

// Route untuk memperbarui data packing
router.put("/:id", packingController.updatePacking);

// Route untuk menghapus data packing
router.delete("/:id", packingController.deletePacking);

module.exports = router;
