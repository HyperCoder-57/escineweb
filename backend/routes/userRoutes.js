const express = require('express');
const { body, validationResult } = require('express-validator');
const { register, verifyEmail, login, getProfile } = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


const validateRegister = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
];


router.post('/users/register', validateRegister, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  register(req, res);
});

router.post('/users/login', validateLogin, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  login(req, res);
});

router.get('/users/verify/:code', verifyEmail);

router.get('/users/profile', authMiddleware, getProfile);

module.exports = router;