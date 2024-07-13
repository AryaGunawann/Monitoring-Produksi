const { DataTypes } = require("sequelize");
const db = require("../database");
const Material = require("./material");

const Produk = db.define("Produk", {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  berat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jumlah_total: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

Produk.belongsToMany(Material, {
  through: "MaterialProduk",
  as: "material_pendukung",
});

module.exports = Produk;
