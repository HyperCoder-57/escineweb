const { sendUserMessage } = require('../utils/email');

exports.sendContactMessage = async (req, res) => {
  try {
    console.log('Recibida solicitud POST /api/contact con datos:', req.body);
    const { name, email, message } = req.body;


    if (!name || !email || !message) {
      console.log('Validación fallida:', { name, email, message });
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    console.log('Enviando mensaje de usuario...');
    const success = await sendUserMessage(name, email, message);
    if (!success) {
      throw new Error('Fallo al enviar el correo');
    }


    const Contact = req.app.get('models').Contact;
    console.log('Guardando en base de datos...', { Contact: typeof Contact === 'function' ? 'Factory' : 'Model' });
    const contact = await Contact.create({ name, email, message, timestamp: new Date() });

    console.log('Respuesta exitosa preparada.');
    res.status(200).json({ message: 'Mensaje enviado con éxito. Te responderemos pronto.' });
  } catch (error) {
    console.error('Error en sendContactMessage:', error);
    res.status(500).json({ error: 'Error al procesar el mensaje. Intenta de nuevo.', details: error.message });
  }
};