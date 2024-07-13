const express = require("express");
const router = express.Router();
const produkController = require("../controllers/produkController");

router.get("/", produkController.getAllProduk);
router.get("/:id", produkController.getProdukById);
router.post("/", produkController.createProduk);
router.put("/:id", produkController.updateProduk);
router.delete("/:id", produkController.deleteProduk);
router.put("/tambah/:id", produkController.tambahJumlah);
router.put("/kurang/:id", produkController.kurangiJumlah);

module.exports = router;
