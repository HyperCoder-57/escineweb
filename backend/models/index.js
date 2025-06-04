const sequelize = require('../config/db.config');
const Movie = require('./movie');
const User = require('./user');
const Reservation = require('./reservation');
const Seat = require('./Seat');
const Showtime = require('./showtime');
const Contact = require('./Contact');
const Review = require('./Review');

const db = {
  sequelize,
  Movie,
  User,
  Reservation,
  Seat,
  Showtime,
  Contact,
  Review,
};

// Definir relaciones
Movie.hasMany(Showtime, { foreignKey: 'movieId' });
Showtime.belongsTo(Movie, { foreignKey: 'movieId' });

Showtime.hasMany(Seat, { foreignKey: 'showtimeId' });
Seat.belongsTo(Showtime, { foreignKey: 'showtimeId' });

Movie.hasMany(Reservation, { foreignKey: 'movieId' });
User.hasMany(Reservation, { foreignKey: 'userId' });
Seat.hasOne(Reservation, { foreignKey: 'seatId' });
Reservation.belongsTo(Movie, { foreignKey: 'movieId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });
Reservation.belongsTo(Seat, { foreignKey: 'seatId' });

Movie.hasMany(Review, { foreignKey: 'movieId' });
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(Movie, { foreignKey: 'movieId' });
Review.belongsTo(User, { foreignKey: 'userId' });

module.exports = db;