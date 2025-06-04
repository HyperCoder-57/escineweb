const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');
const { check } = require('express-validator');

router.post('/', [
  check('name').notEmpty(),
  check('email').isEmail(),
  check('message').notEmpty(),
], submitContact);

module.exports = router;