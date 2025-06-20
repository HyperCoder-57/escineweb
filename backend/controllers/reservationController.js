const { Seat, Reservation, Movie, Showtime, User } = require('../models');
const { validationResult } = require('express-validator');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db.config.js');
const { setTimeout } = require('timers/promises');

exports.getSeats = async (req, res) => {
  try {
    const { showtimeId } = req.query;
    if (!showtimeId) {
      return res.status(400).json({ error: 'Se requiere el parámetro showtimeId' });
    }

    const seats = await Seat.findAll({
      where: { showtimeId: parseInt(showtimeId) },
      attributes: ['id', 'row', 'col', 'status'],
    });

    if (!seats || seats.length === 0) {
      return res.status(404).json({ error: 'No se encontraron asientos para el showtimeId proporcionado' });
    }

    res.status(200).json(seats);
  } catch (error) {
    console.error('Error al obtener asientos:', error);
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
      const reservation = await Reservation.create({
        movieId,
        userId,
        showtimeId,
        seatId,
      }, { transaction: t });

      await User.update(
        { reservations: Sequelize.fn('array_append', Sequelize.col('reservations'), reservation.id) },
        { where: { id: userId }, transaction: t }
      );
    });

    res.status(201).json({ message: 'Reserva creada con éxito', reservationId: reservation.id });
  } catch (error) {
    console.error('Error al reservar asiento:', error);
    res.status(500).json({ error: 'Error al reservar asiento' });
  }
};

exports.reserveMultipleSeats = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { movieId, showtimeId, seatIds } = req.body;
    const userId = req.user.id;

    const showtime = await Showtime.findByPk(showtimeId);
    if (!showtime || showtime.movieId !== parseInt(movieId)) {
      return res.status(400).json({ error: 'Horario o película inválida' });
    }

    const seats = await Seat.findAll({ where: { id: seatIds, showtimeId, status: 'available' } });
    if (seats.length !== seatIds.length) {
      return res.status(400).json({ error: 'Uno o más asientos no están disponibles' });
    }

    await sequelize.transaction(async (t) => {
      await Seat.update(
        { status: 'reserved' },
        { where: { id: seatIds }, transaction: t }
      );
      const reservations = await Promise.all(seatIds.map(seatId =>
        Reservation.create({
          movieId,
          userId,
          showtimeId,
          seatId,
          status: 'confirmed',
        }, { transaction: t })
      ));

      await User.update(
        { reservations: Sequelize.fn('array_cat', Sequelize.col('reservations'), Sequelize.literal(`ARRAY[${reservations.map(r => r.id).join(',')}]`)) },
        { where: { id: userId }, transaction: t }
      );
    });

    res.status(201).json({ message: 'Reservas creadas con éxito', reservationIds: reservations.map(r => r.id) });
  } catch (error) {
    console.error('Error al reservar asientos:', error);
    res.status(500).json({ error: 'Error al reservar asientos' });
  }
};

exports.createTemporaryReservation = async (req, res) => {
  try {
    const { showtimeId, seatIds, userId } = req.body;
    if (!showtimeId || !seatIds || !userId) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' });
    }

    const seats = await Seat.findAll({ where: { id: seatIds, showtimeId, status: 'available' } });
    if (seats.length !== seatIds.length) {
      return res.status(400).json({ error: 'Uno o más asientos no están disponibles' });
    }

    await sequelize.transaction(async (t) => {
      await Seat.update(
        { status: 'temporary' },
        { where: { id: seatIds }, transaction: t }
      );
      const reservations = await Promise.all(seatIds.map(seatId =>
        Reservation.create({
          movieId: seats[0].movieId, // Asumimos que los asientos están asociados a la misma película
          userId,
          showtimeId,
          seatId,
          status: 'temporary',
        }, { transaction: t })
      ));

      // Liberar asientos después de 5 minutos
      setTimeout(5 * 60 * 1000).then(async () => {
        await sequelize.transaction(async (t2) => {
          await Seat.update(
            { status: 'available' },
            { where: { id: seatIds, status: 'temporary' }, transaction: t2 }
          );
          await Reservation.destroy({
            where: { showtimeId, seatId: seatIds, status: 'temporary' },
            transaction: t2,
          });
          console.log(`Reservas temporales liberadas para showtimeId: ${showtimeId}, seatIds: ${seatIds}`);
        });
      });
    });

    res.status(201).json({ message: 'Reserva temporal creada', seatIds });
  } catch (error) {
    console.error('Error al crear reserva temporal:', error);
    res.status(500).json({ error: 'Error al crear reserva temporal' });
  }
};

exports.deleteTemporaryReservation = async (req, res) => {
  try {
    const { showtimeId, seatIds, userId } = req.body;
    if (!showtimeId || !seatIds || !userId) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' });
    }

    await sequelize.transaction(async (t) => {
      await Seat.update(
        { status: 'available' },
        { where: { id: seatIds, showtimeId, status: 'temporary' }, transaction: t }
      );
      await Reservation.destroy({
        where: { showtimeId, seatId: seatIds, userId, status: 'temporary' },
        transaction: t,
      });
    });

    res.status(200).json({ message: 'Reserva temporal eliminada' });
  } catch (error) {
    console.error('Error al eliminar reserva temporal:', error);
    res.status(500).json({ error: 'Error al eliminar reserva temporal' });
  }
};

exports.getTemporaryReservations = async (req, res) => {
  const Op = Sequelize.Op; // Importar Op
  try {
    const { showtimeId } = req.query;
    if (!showtimeId) {
      return res.status(400).json({ error: 'Se requiere el parámetro showtimeId' });
    }

    const temporaryReservations = await Reservation.findAll({
      where: {
        showtimeId: parseInt(showtimeId),
        status: 'temporary',
      },
      include: [
        {
          model: Seat,
          attributes: ['id', 'row', 'col', 'status'],
          required: true, // Solo incluir reservas con asientos válidos
        },
      ],
    });

    const reservedSeats = temporaryReservations.map(reservation => ({
      id: reservation.Seat.id,
      row: reservation.Seat.row,
      col: reservation.Seat.col,
      status: reservation.Seat.status,
    }));

    res.status(200).json(reservedSeats);
  } catch (error) {
    console.error('Error al obtener reservas temporales:', error);
    res.status(500).json({ error: 'Error al obtener reservas temporales' });
  }
};