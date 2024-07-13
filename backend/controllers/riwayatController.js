const Riwayat = require("../models/riwayat");

// Mendapatkan semua riwayat
const getAllRiwayat = async (req, res) => {
  try {
    const riwayat = await Riwayat.findAll();
    res.json(riwayat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllRiwayat,
};
