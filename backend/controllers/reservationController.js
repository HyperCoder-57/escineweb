const { Seat, Reservation, Movie, Showtime } = require('../models');
const { validationResult } = require('express-validator');
const sequelize = require('../config/db.config');

exports.getSeats = async (req, res) => {
  try {
    const { showtimeId } = req.query;
    const seats = await Seat.findAll({ where: { showtimeId } });
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener asientos' });
  }
};

exports.reserveSeat = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { movieId, showtimeId, seatId } = req.body;
    const userId = req.user.id;

    const showtime = await Showtime.findByPk(showtimeId);
    if (!showtime || showtime.movieId !== parseInt(movieId)) {
      return res.status(400).json({ error: 'Horario o película inválida' });
    }

    const seat = await Seat.findByPk(seatId);
    if (!seat || seat.status === 'reserved') {
      return res.status(400).json({ error: 'Asiento no disponible' });
    }

    await sequelize.transaction(async (t) => {
      await seat.update({ status: 'reserved' }, { transaction: t });
      await Reservation.create({
        movieId,
        userId,
        showtimeId,
        seatId,
      }, { transaction: t });
    });

    res.status(201).json({ message: 'Reserva creada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al reservar asiento' });
  }
};