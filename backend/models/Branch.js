const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Branch = sequelize.define('Branch', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Cada sucursal tiene un nombre único
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  });

  Branch.associate = (models) => {
    Branch.hasMany(models.Showtime, { foreignKey: 'branchId' }); // Una sucursal tiene muchos horarios
  };

  return Branch;
};