const nodemailer = require('nodemailer');


const transporterVerification = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'verify.escine@gmail.com',
    pass: 'npqy pune rmzx wncw',
  },
});


const transporterContact = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'verify.escine@gmail.com',
    pass: 'npqy pune rmzx wncw',
  },
});


transporterContact.verify((error, success) => {
  if (error) {
    console.error('Error al verificar transporterContact:', error);
  } else {
    console.log('TransporterContact está listo para enviar correos');
  }
});

const sendVerificationCode = async (to, code) => {
  console.log('Iniciando envío de código de verificación a:', to);
  const mailOptions = {
    from: 'verify.escine@gmail.com',
    to,
    subject: 'Código de Verificación - EsCine',
    text: `Tu código de verificación es: ${code}. Este código expira en 15 minutos. No lo compartas con nadie.`,
  };

  try {
    const info = await transporterVerification.sendMail(mailOptions);
    console.log('Email de verificación enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error al enviar email de verificación:', error);
    return false;
  }
};

const sendUserMessage = async (name, email, message) => {
  console.log('Iniciando envío de mensaje de usuario:', { name, email, message });
  const mailOptions = {
    from: 'verify.escine@gmail.com',
    to: process.env.SUPPORT_EMAIL || 'verify.escine@gmail.com',
    subject: `Nuevo mensaje de contacto de ${name}`,
    text: `
      Nombre: ${name}
      Correo: ${email}
      Mensaje: ${message}
      Fecha: ${new Date().toISOString()}
    `,
  };

  try {
    console.log('Intentando enviar correo con transporterContact...');
    const info = await transporterContact.sendMail(mailOptions);
    console.log('Email de usuario enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error al enviar email de usuario:', error);
    throw error;
  }
};

module.exports = { sendVerificationCode, sendUserMessage };