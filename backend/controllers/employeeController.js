const Employee = require("../models/employee");
const Jabatan = require("../models/jabatan");

// Mendapatkan semua employee
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({ include: Jabatan });
    res.status(200).json({
      code: 200,
      status: "success",
      data: employees,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Mendapatkan employee berdasarkan ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id, { include: Jabatan });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      code: 200,
      status: "success",
      data: employee,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Mendapatkan employee berdasarkan NIK
const getEmployeeByNik = async (req, res) => {
  try {
    const { nik } = req.params;
    const employee = await Employee.findOne({
      where: { nik },
      include: Jabatan,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      code: 200,
      status: "success",
      data: employee,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Mendapatkan employee berdasarkan nama
const getEmployeeByName = async (req, res) => {
  try {
    const { nama } = req.params;
    const employee = await Employee.findOne({
      where: { nama },
      include: Jabatan,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      code: 200,
      status: "success",
      data: employee,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Membuat employee baru
const createEmployee = async (req, res) => {
  try {
    const {
      nik,
      nama,
      tanggal_lahir,
      tempat_lahir,
      jenis_kelamin,
      agama,
      alamat,
      tanggal_bergabung,
      jabatan_id,
      email,
      no_tlpn,
    } = req.body;
    const employee = await Employee.create({
      nik,
      nama,
      tanggal_lahir,
      tempat_lahir,
      jenis_kelamin,
      agama,
      alamat,
      tanggal_bergabung,
      jabatan_id,
      email,
      no_tlpn,
    });
    res.status(201).json({
      code: 201,
      status: "created",
      data: employee,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Memperbarui employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nik,
      nama,
      tanggal_lahir,
      tempat_lahir,
      jenis_kelamin,
      agama,
      alamat,
      tanggal_bergabung,
      jabatan_id,
      email,
      no_tlpn,
    } = req.body;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.update({
      nik: nik || employee.nik,
      nama: nama || employee.nama,
      tanggal_lahir: tanggal_lahir || employee.tanggal_lahir,
      tempat_lahir: tempat_lahir || employee.tempat_lahir,
      jenis_kelamin: jenis_kelamin || employee.jenis_kelamin,
      agama: agama || employee.agama,
      alamat: alamat || employee.alamat,
      tanggal_bergabung: tanggal_bergabung || employee.tanggal_bergabung,
      jabatan_id: jabatan_id || employee.jabatan_id,
      email: email || employee.email,
      no_tlpn: no_tlpn || employee.no_tlpn,
    });
    res.status(200).json({
      code: 200,
      status: "success",
      data: employee,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Menghapus employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.destroy();
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getEmployeeByNik,
  getEmployeeByName,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
