const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_monitoring", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
