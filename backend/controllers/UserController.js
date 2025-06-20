const { User } = require('../models');
const { sendVerificationCode } = require('../utils/email');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // Agrega esto

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password,
      verificationCode,
      verificationCodeExpires,
    });

    const emailSent = await sendVerificationCode(email, verificationCode);
    if (!emailSent) {
      return res.status(500).json({ error: 'Error al enviar el código de verificación' });
    }

    res.status(201).json({ message: 'Usuario registrado. Revisa tu email para el código de verificación.' });
  } catch (error) {
    console.error('Error al registrar:', error.stack);
    res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.params;
  try {
    const user = await User.findOne({ where: { verificationCode: code } });
    if (!user) {
      return res.status(400).json({ error: 'Código inválido' });
    }

    if (new Date() > user.verificationCodeExpires) {
      return res.status(400).json({ error: 'El código ha expirado' });
    }

    await user.update({ verified: true, verificationCode: null, verificationCodeExpires: null });
    res.status(200).json({ message: 'Correo verificado. Ahora puedes iniciar sesión.' });
  } catch (error) {
    console.error('Error al verificar correo:', error.stack);
    res.status(500).json({ error: 'Error al verificar el correo' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Intentando login con email:', email); // Depuración
    const user = await User.findOne({ where: { email } });
    console.log('Usuario encontrado:', user); // Verificar si se encuentra
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    if (!user.verified) {
      console.log('Correo no verificado');
      return res.status(401).json({ error: 'Verifica tu correo antes de iniciar sesión' });
    }
    if (user.password !== password) {
      console.log('Contraseña incorrecta, ingresada:', password, 'almacenada:', user.password);
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }


    console.log('Generando token con JWT_SECRET:', process.env.JWT_SECRET); // Verificar clave
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login exitoso, token generado:', token);
    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.stack); // Mostrar el error completo
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'verificationCode', 'verificationCodeExpires'] },
    });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    console.error('Error al obtener perfil:', error.stack);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (currentPassword && user.password !== currentPassword) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      password: newPassword || user.password,
    });
    res.json({ message: 'Perfil actualizado', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error updating profile:', error.stack);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};

module.exports = { register, verifyEmail, login, getProfile, updateProfile };