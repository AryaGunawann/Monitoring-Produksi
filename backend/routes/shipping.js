const express = require("express");
const router = express.Router();
const shippingController = require("../controllers/shippingController");

// Route untuk mendapatkan semua data shipping
router.get("/", shippingController.getAllShipping);

// Route untuk mendapatkan data shipping berdasarkan ID
router.get("/:id", shippingController.getShippingById);

// Route untuk membuat data shipping baru
router.post("/", shippingController.createShipping);

// Route untuk memperbarui data shipping
router.put("/:id", shippingController.updateShipping);

router.put("/:id/status", shippingController.updateShippingStatus);

// Route untuk menghapus data shipping
router.delete("/:id", shippingController.deleteShipping);

module.exports = router;
