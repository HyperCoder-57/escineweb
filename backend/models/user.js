const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationCode: {
      type: DataTypes.STRING, // Aquí guardamos el código de 6 dígitos
    },
    verificationCodeExpires: {
      type: DataTypes.DATE, // Aquí guardamos hasta cuándo es válido el código
    },
  }, {
    timestamps: true,
    tableName: 'Users',
  });

  User.associate = (models) => {
    User.hasMany(models.Reservation, { foreignKey: 'userId' });
    User.hasMany(models.Review, { foreignKey: 'userId' });
  };

  return User;
};