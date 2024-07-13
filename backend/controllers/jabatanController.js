const Jabatan = require("../models/jabatan");

// Mendapatkan semua jabatan
const getAllJabatan = async (req, res) => {
  try {
    const jabatans = await Jabatan.findAll();
    res.status(200).json({
      code: 200,
      status: "success",
      data: jabatans,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Mendapatkan jabatan berdasarkan ID
const getJabatanById = async (req, res) => {
  try {
    const { id } = req.params;
    const jabatan = await Jabatan.findByPk(id);
    if (!jabatan) {
      return res.status(404).json({ message: "Jabatan not found" });
    }
    res.status(200).json({
      code: 200,
      status: "success",
      data: jabatan,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Membuat jabatan baru
const createJabatan = async (req, res) => {
  try {
    const { nama_jabatan, gapok, tunjangan, uang_makan } = req.body;
    const jabatan = await Jabatan.create({
      nama_jabatan,
      gapok,
      tunjangan,
      uang_makan,
    });
    res.status(201).json({
      code: 201,
      status: "created",
      data: jabatan,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Memperbarui jabatan
const updateJabatan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_jabatan, gapok, tunjangan, uang_makan } = req.body;
    const jabatan = await Jabatan.findByPk(id);
    if (!jabatan) {
      return res.status(404).json({ message: "Jabatan not found" });
    }
    await jabatan.update({
      nama_jabatan: nama_jabatan || jabatan.nama_jabatan,
      gapok: gapok || jabatan.gapok,
      tunjangan: tunjangan || jabatan.tunjangan,
      uang_makan: uang_makan || jabatan.uang_makan,
    });
    res.status(200).json({
      code: 200,
      status: "success",
      data: jabatan,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Menghapus jabatan
const deleteJabatan = async (req, res) => {
  try {
    const { id } = req.params;
    const jabatan = await Jabatan.findByPk(id);
    if (!jabatan) {
      return res.status(404).json({ message: "Jabatan not found" });
    }
    await jabatan.destroy();
    res.status(200).json({ message: "Jabatan deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllJabatan,
  getJabatanById,
  createJabatan,
  updateJabatan,
  deleteJabatan,
};
