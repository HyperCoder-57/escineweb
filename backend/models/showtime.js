const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Showtime = sequelize.define('Showtime', {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Movies',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: { // Corregido de 'room' a 'time'
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Showtime.associate = (models) => {
    Showtime.belongsTo(models.Movie, { foreignKey: 'movieId' });
    Showtime.hasMany(models.Seat, { foreignKey: 'showtimeId' });
  };

  return Showtime;
};