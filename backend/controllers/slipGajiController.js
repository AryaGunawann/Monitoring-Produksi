const SlipGaji = require("../models/slipGaji");
const Employee = require("../models/employee");
const Jabatan = require("../models/jabatan");

// Mendapatkan semua slip gaji
const getAllSlipGaji = async (req, res) => {
  try {
    const slipGajis = await SlipGaji.findAll({ include: Employee });
    res.status(200).json({
      code: 200,
      status: "success",
      data: slipGajis,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Mendapatkan slip gaji berdasarkan ID
const getSlipGajiById = async (req, res) => {
  try {
    const { id } = req.params;
    const slipGaji = await SlipGaji.findByPk(id, { include: Employee });
    if (!slipGaji) {
      return res.status(404).json({ message: "Slip Gaji not found" });
    }
    res.status(200).json({
      code: 200,
      status: "success",
      data: slipGaji,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createSlipGaji = async (req, res) => {
  try {
    const { periode_tahun, periode_bulan, employee_id, potongan, kasbon } =
      req.body;

    // Cari employee dan jabatan terkait
    const employee = await Employee.findByPk(employee_id, {
      include: Jabatan,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const { gapok, tunjangan, uang_makan } = employee.Jabatan;

    // Hitung gaji bersih
    const gaji_bersih = gapok + tunjangan + uang_makan - potongan - kasbon;

    // Buat slip gaji
    const slipGaji = await SlipGaji.create({
      periode_tahun,
      periode_bulan,
      employee_id,
      potongan,
      kasbon,
      gaji_bersih,
    });

    res.status(201).json(slipGaji);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Memperbarui slip gaji
const updateSlipGaji = async (req, res) => {
  try {
    const { id } = req.params;
    const { periode_tahun, periode_bulan, employee_id, potongan, kasbon } =
      req.body;
    const slipGaji = await SlipGaji.findByPk(id);
    if (!slipGaji) {
      return res.status(404).json({ message: "Slip Gaji not found" });
    }
    await slipGaji.update({
      periode_tahun: periode_tahun || slipGaji.periode_tahun,
      periode_bulan: periode_bulan || slipGaji.periode_bulan,
      employee_id: employee_id || slipGaji.employee_id,
      potongan: potongan || slipGaji.potongan,
      kasbon: kasbon || slipGaji.kasbon,
    });
    res.status(200).json({
      code: 200,
      status: "success",
      data: slipGaji,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Menghapus slip gaji
const deleteSlipGaji = async (req, res) => {
  try {
    const { id } = req.params;
    const slipGaji = await SlipGaji.findByPk(id);
    if (!slipGaji) {
      return res.status(404).json({ message: "Slip Gaji not found" });
    }
    await slipGaji.destroy();
    res.status(200).json({ message: "Slip Gaji deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllSlipGaji,
  getSlipGajiById,
  createSlipGaji,
  updateSlipGaji,
  deleteSlipGaji,
};
