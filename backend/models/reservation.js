const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    showtimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'cancelled'),
      defaultValue: 'confirmed',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Reservations',
    timestamps: true,
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.Movie, { foreignKey: 'movieId', as: 'movie' });
    Reservation.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Reservation.belongsTo(models.Seat, { foreignKey: 'seatId', as: 'seat' });
    Reservation.belongsTo(models.Showtime, { foreignKey: 'showtimeId', as: 'showtime' });
  };

  return Reservation;
};