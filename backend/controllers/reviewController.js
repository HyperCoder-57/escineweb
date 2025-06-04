const { Review, User } = require('../models');
const { validationResult } = require('express-validator');

exports.createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { movieId, rating, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.create({
      movieId,
      userId,
      rating,
      comment,
    });

    res.status(201).json({ message: 'Reseña creada con éxito', review });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear reseña' });
  }
};

exports.getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { movieId: req.params.movieId },
      include: [{ model: User, attributes: ['name'] }],
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
};