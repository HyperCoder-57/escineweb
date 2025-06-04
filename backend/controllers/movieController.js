const { Movie, Showtime } = require('../models');

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({ include: [{ model: Showtime }] });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, { include: [{ model: Showtime }] });
    if (!movie) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la película' });
  }
};