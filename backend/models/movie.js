const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
    },
  });

  // Definir asociaciones
  Movie.associate = (models) => {
    Movie.hasMany(models.Showtime, { foreignKey: 'movieId', as: 'Showtimes' });
  };

  return Movie;
};

