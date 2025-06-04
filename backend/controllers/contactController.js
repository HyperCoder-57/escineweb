const { Contact } = require('../models');
const { sendEmail } = require('../utils/email');
const { validationResult } = require('express-validator');

exports.submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, message } = req.body;
    const contact = await Contact.create({ name, email, message });

    await sendEmail({
      to: email,
      subject: 'Gracias por contactarnos',
      text: `Hola ${name},\n\nGracias por tu mensaje: "${message}". Te responderemos pronto.\n\nEsCine`,
    });

    res.status(201).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
};