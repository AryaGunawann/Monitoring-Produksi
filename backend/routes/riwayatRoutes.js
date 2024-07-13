const express = require("express");
const router = express.Router();
const riwayatController = require("../controllers/riwayatController");

router.get("/", riwayatController.getAllRiwayat);

module.exports = router;
