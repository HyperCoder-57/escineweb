const express = require('express');
const router = express.Router();
const { createReview, getReviewsByMovie } = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');   
const { check } = require('express-validator');

router.post('/', [
  auth,
  check('movieId').isInt(),
  check('rating').isInt({ min: 1, max: 5 }),
], createReview);
router.get('/:movieId', getReviewsByMovie);

module.exports = router;