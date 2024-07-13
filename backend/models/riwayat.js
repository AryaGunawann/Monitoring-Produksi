const { DataTypes } = require("sequelize");
const db = require("../database");

const Riwayat = db.define("Riwayat", {
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jenis: {
    type: DataTypes.ENUM(
      "Produk Bertambah",
      "Material Bertambah",
      "Produk Berkurang",
      "Material Berkurang",
      "Produk Dikemas",
      "Produk Shipping"
    ),
    allowNull: false,
  },
});

module.exports = Riwayat;
