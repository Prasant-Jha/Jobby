require("dotenv").config(); // Load .env variables
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres", // Change to "mysql" if using MySQL
  port: process.env.DB_PORT,
  logging: false, // Disable query logging
});

module.exports = sequelize;
