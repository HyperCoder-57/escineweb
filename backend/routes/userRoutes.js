const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/UserController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/register', [
  check('name').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
], register);
router.post('/login', [
  check('email').isEmail(),
  check('password').notEmpty(),
], login);
router.get('/profile', auth, getProfile);

module.exports = router;