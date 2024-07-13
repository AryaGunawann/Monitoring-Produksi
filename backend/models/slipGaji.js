const { DataTypes } = require("sequelize");
const db = require("../database");
const Employee = require("./employee");

const SlipGaji = db.define("SlipGaji", {
  periode_tahun: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  periode_bulan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  potongan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  kasbon: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  gaji_bersih: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Employee.hasMany(SlipGaji, { foreignKey: "employee_id" });
SlipGaji.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = SlipGaji;
