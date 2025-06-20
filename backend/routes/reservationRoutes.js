const express = require('express');
const router = express.Router();
const { getSeats, reserveSeat } = require('../controllers/reservationController');
const auth = require('../middleware/authMiddleware');
const { check } = require('express-validator');

router.get('/seats', getSeats);
router.post('/reserve', [
  auth,
  check('movieId').isInt(),
  check('showtimeId').isInt(),
  check('seatId').isInt(),
], reserveSeat);

module.exports = router;