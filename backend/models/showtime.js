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
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Branches',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    indexes: [
      { // Índice único compuesto
        unique: true,
        fields: ['branchId', 'movieId', 'date', 'time'], // Añadimos branchId a la unicidad
        name: 'idx_unique_showtime'
      }
    ]
  });

  Showtime.associate = (models) => {
    Showtime.belongsTo(models.Movie, { foreignKey: 'movieId' });
    Showtime.belongsTo(models.Branch, { foreignKey: 'branchId' }); // Nueva relación
    Showtime.hasMany(models.Seat, { foreignKey: 'showtimeId' });
  };

  return Showtime;
};