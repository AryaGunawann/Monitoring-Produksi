const Shipping = require("../models/shipping");
const Packing = require("../models/packing");
const Produk = require("../models/produk");

// Controller untuk membuat shipping baru
exports.createShipping = async (req, res) => {
  const { packingId, jumlah } = req.body;

  try {
    // Cek apakah packing dengan ID yang diberikan ada
    const packing = await Packing.findByPk(packingId);
    if (!packing) {
      return res.status(404).json({ error: "Packing tidak ditemukan" });
    }

    // Cek apakah jumlah packing mencukupi untuk shipping
    if (packing.jumlah < jumlah) {
      return res
        .status(400)
        .json({ error: "Jumlah packing tidak mencukupi untuk shipping" });
    }

    // Buat shipping baru
    const shipping = await Shipping.create({
      jumlah,
      packingId: packing.id,
      status: "Proses",
    });

    // Kurangi jumlah packing
    packing.jumlah -= jumlah;
    await packing.save();

    // Mengembalikan response sukses
    return res.status(201).json(shipping);
  } catch (error) {
    console.error("Error creating shipping:", error);
    return res.status(500).json({ error: "Gagal membuat shipping" });
  }
};

// Controller untuk mendapatkan semua data shipping
exports.getAllShipping = async (req, res) => {
  try {
    const allShipping = await Shipping.findAll({
      include: [
        {
          model: Packing,
          include: [
            {
              model: Produk,
              attributes: ["nama"],
            },
          ],
        },
      ],
    });
    res.json(allShipping);
  } catch (error) {
    console.error("Error getting all shipping:", error);
    res.status(500).json({ error: "Gagal mendapatkan semua data shipping" });
  }
};

// Controller untuk mendapatkan data shipping berdasarkan ID
exports.getShippingById = async (req, res) => {
  const { id } = req.params;

  try {
    const shipping = await Shipping.findByPk(id, {
      include: [
        {
          model: Packing,
          include: [
            {
              model: Produk,
              attributes: ["nama"],
            },
          ],
        },
      ],
    });

    if (!shipping) {
      return res.status(404).json({ error: "Shipping tidak ditemukan" });
    }

    const result = {
      ...shipping.toJSON(),
      packingJumlah: shipping.Packing.jumlah,
      produkNama: shipping.Packing.Produk.nama,
    };

    res.json(result);
  } catch (error) {
    console.error("Error getting shipping by ID:", error);
    res.status(500).json({ error: "Gagal mendapatkan data shipping" });
  }
};

// Controller untuk memperbarui data shipping
exports.updateShipping = async (req, res) => {
  const { id } = req.params;
  const { jumlah } = req.body;

  try {
    const shipping = await Shipping.findByPk(id);
    if (!shipping) {
      return res.status(404).json({ error: "Shipping tidak ditemukan" });
    }

    await shipping.update({ jumlah });

    res.json(shipping);
  } catch (error) {
    console.error("Error updating shipping:", error);
    res.status(500).json({ error: "Gagal memperbarui data shipping" });
  }
};

// Controller untuk menghapus shipping berdasarkan ID
exports.deleteShipping = async (req, res) => {
  const { id } = req.params;

  try {
    const shipping = await Shipping.findByPk(id);
    if (!shipping) {
      return res.status(404).json({ error: "Shipping tidak ditemukan" });
    }

    await shipping.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting shipping:", error);
    return res.status(500).json({ error: "Gagal menghapus shipping" });
  }
};

// Controller untuk memperbarui status shipping
exports.updateShippingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const shipping = await Shipping.findByPk(id);
    if (!shipping) {
      return res.status(404).json({ error: "Shipping tidak ditemukan" });
    }

    // Validasi status yang diperbolehkan
    if (!["proses", "pending", "dikirim", "selesai"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Status yang diberikan tidak valid" });
    }

    await shipping.update({ status });

    // Dapatkan shipping yang diperbarui dari database
    const updatedShipping = await Shipping.findByPk(id);

    res.json(updatedShipping); // Mengembalikan shipping yang diperbarui
  } catch (error) {
    console.error("Error updating shipping status:", error);
    res.status(500).json({ error: "Gagal memperbarui status shipping" });
  }
};
