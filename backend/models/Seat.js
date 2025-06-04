const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Seat = sequelize.define('Seat', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  showtimeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  row: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  col: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'reserved'),
    defaultValue: 'available',
  },
});

module.exports = Seat;