const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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

  Seat.associate = (models) => {
    Seat.belongsTo(models.Showtime, { foreignKey: 'showtimeId' });
    Seat.hasOne(models.Reservation, { foreignKey: 'seatId' });
  };

  return Seat;
};