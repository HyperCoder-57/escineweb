const express = require('express');
const { check, query } = require('express-validator');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/movies', [
  query('releaseYear_gte').optional().isInt({ min: 1900, max: 2100 }).withMessage('releaseYear_gte debe ser un año válido entre 1900 y 2100'),
  query('limit').optional().isInt({ min: 1 }).withMessage('limit debe ser un número positivo'),
], movieController.getAllMovies);

router.get('/movies/search', [
  check('query').optional().trim().escape(),
], movieController.searchMovies);

router.get('/movies/:id', movieController.getMovieById);

module.exports = router;