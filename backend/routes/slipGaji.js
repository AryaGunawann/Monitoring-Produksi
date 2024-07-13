const express = require("express");
const router = express.Router();
const {
  getAllSlipGaji,
  getSlipGajiById,
  createSlipGaji,
  updateSlipGaji,
  deleteSlipGaji,
} = require("../controllers/slipGajiController");

router.get("/", getAllSlipGaji);
router.get("/:id", getSlipGajiById);
router.post("/", createSlipGaji);
router.put("/:id", updateSlipGaji);
router.delete("/:id", deleteSlipGaji);

module.exports = router;
