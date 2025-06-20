const express = require('express');
const router = express.Router();
const { getSeats, reserveSeat, reserveMultipleSeats, createTemporaryReservation, deleteTemporaryReservation, getTemporaryReservations } = require('../controllers/reservationController');
const auth = require('../middleware/authMiddleware');
const { check } = require('express-validator');

router.get('/seats', getSeats);
router.get('/temporary', getTemporaryReservations); // Nuevo endpoint GET

router.post('/reserve', [
  auth,
  check('movieId').isInt(),
  check('seatId').isInt(),
], reserveSeat);
router.post('/reserve-multiple', [
  auth,
  check('movieId').isInt(),
  check('showtimeId').isInt(),
  check('seatIds').isArray(),
], reserveMultipleSeats);
router.post('/temporary', [
  auth,
  check('showtimeId').isInt(),
  check('seatIds').isArray(),
], createTemporaryReservation);
router.delete('/temporary', [
  auth,
  check('showtimeId').isInt(),
  check('seatIds').isArray(),
], deleteTemporaryReservation);

module.exports = router;