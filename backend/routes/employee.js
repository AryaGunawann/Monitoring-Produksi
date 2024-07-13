const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  getEmployeeByNik,
  getEmployeeByName,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.get("/nik/:nik", getEmployeeByNik);
router.get("/name/:nama", getEmployeeByName);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
