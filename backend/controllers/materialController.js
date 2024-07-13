const Material = require("../models/material");
const Riwayat = require("../models/riwayat");

// Mendapatkan semua material
const getAllMaterial = async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.json(materials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Mendapatkan material berdasarkan ID
const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Membuat material baru
const createMaterial = async (req, res) => {
  try {
    const { nama, satuan, jumlah } = req.body;
    const material = await Material.create({
      nama,
      satuan,
      jumlah,
    });

    // Menambahkan riwayat
    await Riwayat.create({
      deskripsi: `Material ${nama} ditambahkan.`,
      jenis: "Material Bertambah",
    });

    res.status(201).json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Memperbarui material
const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, satuan } = req.body;
    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Menambahkan riwayat
    await Riwayat.create({
      deskripsi: `Material ${material.nama} diupdate.`,
      jenis: "Material Diupdate",
    });

    await material.update({
      nama: nama || material.nama,
      satuan: satuan || material.satuan,
    });
    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Menghapus material
const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Menambahkan riwayat
    await Riwayat.create({
      deskripsi: `Material ${material.nama} dihapus.`,
      jenis: "Material Dihapus",
    });

    await material.destroy();
    res.json({ message: "Material deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const tambahJumlah = async (req, res) => {
  try {
    const { id } = req.params;
    const { jumlah } = req.body;
    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    material.jumlah += jumlah;

    // Menambahkan riwayat
    await Riwayat.create({
      deskripsi: `Jumlah material ${material.nama} ditambahkan sebanyak ${jumlah}.`,
      jenis: "Material Bertambah",
    });

    await material.save();
    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Mengurangi jumlah material
const kurangiJumlah = async (req, res) => {
  try {
    const { id } = req.params;
    const { jumlah } = req.body;
    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    if (material.jumlah < jumlah) {
      return res.status(400).json({ message: "Not enough materials" });
    }
    material.jumlah -= jumlah;

    // Menambahkan riwayat
    await Riwayat.create({
      deskripsi: `Jumlah material ${material.nama} dikurangi sebanyak ${jumlah}.`,
      jenis: "Material Berkurang",
    });

    await material.save();
    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllMaterial,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  tambahJumlah,
  kurangiJumlah,
};
