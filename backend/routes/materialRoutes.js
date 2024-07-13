const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");

router.get("/", materialController.getAllMaterial);
router.get("/:id", materialController.getMaterialById);
router.post("/", materialController.createMaterial);
router.put("/:id", materialController.updateMaterial);
router.delete("/:id", materialController.deleteMaterial);
router.put("/tambah/:id", materialController.tambahJumlah);
router.put("/kurang/:id", materialController.kurangiJumlah);

module.exports = router;
