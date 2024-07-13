const { DataTypes, Model } = require("sequelize");
const db = require("../database");
const Packing = require("./packing");

class Shipping extends Model {}

Shipping.init(
  {
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tanggal_pengiriman: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    packingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Packing,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("proses", "pending", "dikirim", "selesai"),
      defaultValue: "Proses",
    },
  },
  {
    sequelize: db,
    modelName: "Shipping",
  }
);

Shipping.belongsTo(Packing, { foreignKey: "packingId" });
Packing.hasMany(Shipping, { foreignKey: "packingId" });

module.exports = Shipping;
