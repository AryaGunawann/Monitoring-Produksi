const { DataTypes, Model } = require("sequelize");
const db = require("../database");
const Produk = require("./produk");

class Packing extends Model {}

Packing.init(
  {
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tanggal_packing: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    produkId: {
      type: DataTypes.INTEGER,
      references: {
        model: Produk,
        key: "id",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Packing",
  }
);

Packing.belongsTo(Produk, { foreignKey: "produkId" });

module.exports = Packing;
