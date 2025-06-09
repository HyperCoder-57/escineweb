const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  // Opcional: Definir asociaciones si las hay (e.g., con User)
  Contact.associate = (models) => {
    // Ejemplo: si Contact estuviera relacionado con User
    // Contact.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Contact;
};