// packingController.js
const Packing = require("../models/packing");
const Produk = require("../models/produk");

// Controller untuk membuat packing baru
exports.createPacking = async (req, res) => {
  const { produkId, jumlah } = req.body;

  try {
    // Cek apakah produk dengan ID yang diberikan ada
    const produk = await Produk.findByPk(produkId);
    if (!produk) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    if (produk.jumlah < jumlah) {
      return res.status(400).json({
        error: "jumlah produk tidak mencukupi untuk melakukan packing",
      });
    }

    // Buat packing baru
    const packing = await Packing.create({
      jumlah,
      produkId: produk.id, // Pastikan disetel dengan produkId yang valid
    });

    // Kurangi jumlah produk
    produk.jumlah_total -= jumlah;
    await produk.save();

    // Mengembalikan response sukses
    return res.status(201).json(packing);
  } catch (error) {
    console.error("Error creating packing:", error);
    return res.status(500).json({ error: "Gagal membuat packing" });
  }
};

// Controller untuk menghapus packing berdasarkan ID
exports.deletePacking = async (req, res) => {
  const { id } = req.params;

  try {
    // Cari packing berdasarkan ID
    const packing = await Packing.findByPk(id);
    if (!packing) {
      return res.status(404).json({ error: "Packing tidak ditemukan" });
    }

    // Hapus packing
    await packing.destroy();

    // Mengembalikan response sukses
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting packing:", error);
    return res.status(500).json({ error: "Gagal menghapus packing" });
  }
};

// Controller untuk mendapatkan semua data packing
exports.getAllPacking = async (req, res) => {
  try {
    const allPacking = await Packing.findAll({
      include: [
        {
          model: Produk,
          attributes: ["nama", "jumlah_total"],
        },
      ],
    });
    res.json(allPacking);
  } catch (error) {
    console.error("Error getting all packing:", error);
    res.status(500).json({ error: "Gagal mendapatkan semua data packing" });
  }
};

// Controller untuk mendapatkan data packing berdasarkan ID
exports.getPackingById = async (req, res) => {
  const { id } = req.params;

  try {
    const packing = await Packing.findByPk(id);
    if (!packing) {
      return res.status(404).json({ error: "Packing tidak ditemukan" });
    }
    res.json(packing);
  } catch (error) {
    console.error("Error getting packing by ID:", error);
    res.status(500).json({ error: "Gagal mendapatkan data packing" });
  }
};

// Controller untuk memperbarui data packing
exports.updatePacking = async (req, res) => {
  const { id } = req.params;
  const { jumlah } = req.body;

  try {
    const packing = await Packing.findByPk(id);
    if (!packing) {
      return res.status(404).json({ error: "Packing tidak ditemukan" });
    }

    await packing.update({ jumlah });

    res.json(packing);
  } catch (error) {
    console.error("Error updating packing:", error);
    res.status(500).json({ error: "Gagal memperbarui data packing" });
  }
};
