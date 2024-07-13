const { DataTypes } = require("sequelize");
const db = require("../database");

const Material = db.define("Material", {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  satuan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Material;
