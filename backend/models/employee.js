const { DataTypes } = require("sequelize");
const db = require("../database");
const Jabatan = require("./jabatan");

const Employee = db.define(
  "Employee",
  {
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM("laki-laki", "perempuan"),
      allowNull: false,
    },
    agama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_bergabung: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    jabatan_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Jabatan,
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    no_tlpn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Employee.belongsTo(Jabatan, { foreignKey: "jabatan_id" });

module.exports = Employee;
