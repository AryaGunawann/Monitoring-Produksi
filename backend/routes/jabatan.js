const express = require("express");
const router = express.Router();
const {
  getAllJabatan,
  getJabatanById,
  createJabatan,
  updateJabatan,
  deleteJabatan,
} = require("../controllers/jabatanController");

router.get("/", getAllJabatan);
router.get("/:id", getJabatanById);
router.post("/", createJabatan);
router.put("/:id", updateJabatan);
router.delete("/:id", deleteJabatan);

module.exports = router;
