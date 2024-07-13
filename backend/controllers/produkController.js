const Produk = require("../models/produk");
const Material = require("../models/material");
const Riwayat = require("../models/riwayat");

// Mendapatkan semua produk
const getAllProduk = async (req, res) => {
  try {
    const produk = await Produk.findAll({ include: "material_pendukung" });
    res.json(produk);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// Mendapatkan produk berdasarkan ID
const getProdukById = async (req, res) => {
  try {
    const { id } = req.params;
    const produk = await Produk.findByPk(id);
    if (!produk) {
      return res.status(404).json({ message: "Produk not found" });
    }
    res.json(produk);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createProduk = async (req, res) => {
  try {
    const { nama, berat, jumlah_total, material_pendukung } = req.body;

    // Hitung total material yang dibutuhkan
    const totalMaterialDibutuhkan = material_pendukung.reduce(
      (acc, cur) => acc + cur.jumlah,
      0
    );

    // Cek apakah jumlah material yang tersedia cukup
    const materialYangTersedia = await Material.findAll({
      where: {
        id: material_pendukung.map((m) => m.id),
      },
    });
    const totalMaterialTersedia = materialYangTersedia.reduce(
      (acc, cur) => acc + cur.jumlah,
      0
    );

    if (totalMaterialTersedia < totalMaterialDibutuhkan) {
      return res.status(400).json({ message: "Material tersebut kurang" });
    }

    // Buat produk jika material cukup
    const produk = await Produk.create({
      nama,
      berat,
      jumlah_total,
    });

    // Tambahkan material pendukung ke produk
    await produk.addMaterial_pendukung(materialYangTersedia);

    // Kurangi jumlah material yang digunakan
    for (const material of materialYangTersedia) {
      await material.update({
        jumlah:
          material.jumlah -
          material_pendukung.find((mp) => mp.id === material.id).jumlah,
      });
    }

    // Tambahkan riwayat pembuatan produk
    await Riwayat.create({
      deskripsi: `Produk ${nama} Bertambah dengan jumlah total ${jumlah_total}.`,
      jenis: "Produk Bertambah",
    });

    res.status(201).json(produk);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Memperbarui produk
const updateProduk = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, berat, material_pendukung } = req.body;

    const produk = await Produk.findByPk(id);
    if (!produk) {
      return res.status(404).json({ message: "Produk not found" });
    }

    // Update produk
    await produk.update({
      nama: nama || produk.nama,
      berat: berat || produk.berat,
    });

    if (material_pendukung && Array.isArray(material_pendukung)) {
      const materials = await Material.findAll({
        where: {
          id: material_pendukung,
        },
      });

      // Set the association with material pendukung
      await produk.setMaterials(materials);
    }

    // Log riwayat
    await Riwayat.create({
      deskripsi: `Produk ${produk.nama} diperbarui.`,
      jenis: "Produk Diperbarui",
    });

    res.json(produk);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Menghapus produk
const deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;
    const produk = await Produk.findByPk(id);
    if (!produk) {
      return res.status(404).json({ message: "Produk not found" });
    }
    await produk.destroy();
    res.json({ message: "Produk deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Menambahkan jumlah produk
const tambahJumlah = async (req, res) => {
  try {
    const { id } = req.params;
    const { jumlah, material_pendukung } = req.body;

    // Pastikan material_pendukung memiliki nilai yang valid
    if (
      !material_pendukung ||
      !Array.isArray(material_pendukung) ||
      material_pendukung.length === 0
    ) {
      return res.status(400).json({
        message:
          "Material pendukung harus berupa array yang tidak boleh kosong",
      });
    }

    // Ambil produk berdasarkan ID
    const produk = await Produk.findByPk(id);

    if (!produk) {
      return res.status(404).json({ message: "Produk not found" });
    }

    // Hitung total material yang dibutuhkan
    const totalMaterialDibutuhkan = material_pendukung.reduce(
      (acc, cur) => acc + cur.jumlah,
      0
    );

    // Ambil semua material yang diperlukan berdasarkan ID
    const materials = await Material.findAll({
      where: {
        id: material_pendukung.map((m) => m.id),
      },
    });

    // Pastikan semua material ditemukan
    if (materials.length !== material_pendukung.length) {
      return res
        .status(404)
        .json({ message: "One or more materials not found" });
    }

    // Cek apakah jumlah material yang tersedia cukup
    const totalMaterialTersedia = materials.reduce(
      (acc, cur) => acc + cur.jumlah,
      0
    );

    if (totalMaterialTersedia < totalMaterialDibutuhkan) {
      return res.status(400).json({ message: "Material tersebut kurang" });
    }

    // Tambahkan jumlah ke produk yang ada
    produk.jumlah_total += jumlah;
    await produk.save();

    // Kurangi jumlah material yang digunakan
    for (const mat of material_pendukung) {
      const material = materials.find((m) => m.id === mat.id);
      if (material) {
        // Kurangi jumlah material yang digunakan
        await material.update({
          jumlah: material.jumlah - mat.jumlah,
        });
      } else {
        return res
          .status(404)
          .json({ message: `Material with ID '${mat.id}' not found` });
      }
    }

    // Buat riwayat
    await Riwayat.create({
      deskripsi: `Jumlah Produk ${produk.nama} ditambahkan sebanyak ${jumlah}.`,
      jenis: "Produk Bertambah",
    });

    res.json(produk);
  } catch (err) {
    console.error("Error adding product quantity:", err);
    res.status(500).send("Server Error");
  }
};

// Mengurangi jumlah produk
const kurangiJumlah = async (req, res) => {
  try {
    const { id } = req.params;
    const { jumlah } = req.body;
    const produk = await Produk.findByPk(id);
    if (!produk) {
      return res.status(404).json({ message: "Produk not found" });
    }
    if (produk.jumlah_total < jumlah) {
      return res.status(400).json({ message: "Not enough products" });
    }

    await Riwayat.create({
      deskripsi: `Jumlah Produk ${produk.nama} dikurangi sebanyak ${produk.jumlah_total}`,
      jenis: "Produk Berkurang",
    });

    produk.jumlah_total -= jumlah;
    await produk.save();
    res.json(produk);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
  tambahJumlah,
  kurangiJumlah,
};
