const { Op } = require('sequelize');
const db = require('../models');

const movieController = {
  getAllMovies: async (req, res) => {
    try {
      const { releaseYear_gte, limit } = req.query;
      const where = releaseYear_gte ? { releaseYear: { [Op.gte]: releaseYear_gte } } : {};
      const movies = await db.Movie.findAll({
        where, // Aplicar el filtro de where
        limit: limit ? parseInt(limit) : undefined, // Soporte para limit
        include: [{ model: db.Showtime, as: 'Showtimes' }],
      });
      res.json(movies);
    } catch (error) {
      console.error('Error en getAllMovies:', error);
      res.status(500).json({ message: 'Error al obtener películas', error: error.message });
    }
  },

  getMovieById: async (req, res) => {
    try {
      const movie = await db.Movie.findByPk(req.params.id, {
        include: [{ model: db.Showtime, as: 'Showtimes' }],
      });
      if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
      res.json(movie);
    } catch (error) {
      console.error('Error en getMovieById:', error);
      res.status(500).json({ message: 'Error al obtener película', error: error.message });
    }
  },

  searchMovies: async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) return res.status(400).json({ message: 'Se requiere un término de búsqueda' });

      const movies = await db.Movie.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${query}%` } },
            { genre: { [Op.iLike]: `%${query}%` } },
          ],
        },
        include: [{ model: db.Showtime, as: 'Showtimes' }],
      });
      res.json(movies);
    } catch (error) {
      console.error('Error en searchMovies:', error);
      res.status(500).json({ message: 'Error al buscar películas', error: error.message });
    }
  },
};

module.exports = movieController;