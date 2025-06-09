require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Desactivar logs para prod
    dialectOptions: {
      connectTimeout: 10000,
      client_encoding: 'UTF8', // Forzar UTF8
    },
  }
);
module.exports = sequelize;