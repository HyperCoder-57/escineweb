const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Showtime = sequelize.define('Showtime', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Showtime;