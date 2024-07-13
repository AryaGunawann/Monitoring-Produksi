const { DataTypes } = require("sequelize");
const db = require("../database");

const Jabatan = db.define(
  "Jabatan",
  {
    nama_jabatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gapok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tunjangan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uang_makan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "jabatans",
  }
);

module.exports = Jabatan;
