import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // Controlar modo: 'login' o 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Validaciones
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    if (!name) return 'El nombre es obligatorio';
    if (!nameRegex.test(name)) return 'El nombre solo debe contener letras y espacios, entre 2 y 50 caracteres';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El correo electrónico es obligatorio';
    if (!emailRegex.test(email)) return 'Ingresa un correo electrónico válido (ejemplo@dominio.com)';
    return '';
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) return 'La contraseña es obligatoria';
    if (!passwordRegex.test(password)) return 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (@$!%*?&)';
    return '';
  };

  // Manejar cambios en los inputs y validar en tiempo real
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar el campo que cambió
    if (name === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    } else if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  // Verificar si el formulario es válido para habilitar el botón
  const isFormValid = () => {
    const nameValid = mode === 'signup' ? !validateName(formData.name) : true;
    const emailValid = !validateEmail(formData.email);
    const passwordValid = !validatePassword(formData.password);
    return nameValid && emailValid && passwordValid;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const nameError = mode === 'signup' ? validateName(formData.name) : '';
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    if (nameError || emailError || passwordError) return;

    if (mode === 'login') {
      // Simular login con mensaje de conversión
      alert(`¡Bienvenido de nuevo, ${formData.email}! Disfruta de tu experiencia en EsCine.`);
      navigate('/');
    } else {
      // Simular signup con mensaje de conversión
      alert(`¡Bienvenido, ${formData.name}! Te hemos regalado un boleto gratis para hoy.`);
      navigate('/');
    }
    // Limpiar formulario
    setFormData({ name: '', email: '', password: '' });
    setErrors({ name: '', email: '', password: '' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 animate-bg-fade relative overflow-hidden">
      {/* Partículas de fondo (efecto estelar) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-blue-800 bg-opacity-90 text-white p-4 shadow-lg z-10">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link to="/">
            <img
              src={logo}
              alt="Cinema Logo"
              className="max-h-16 w-auto object-contain"
            />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold">
            ¡Inicia sesión o regístrate para vivir la magia del cine!
          </h1>
        </div>
      </header>

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow flex items-center justify-center relative z-10">
        <div className="bg-gray-900 p-6 rounded-lg shadow-2xl max-w-md w-full text-white">
          {/* Banner de urgencia y prueba social */}
          <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 rounded mb-6 text-center text-sm animate-pulse-slow relative z-10">
            <p className="font-bold">
              ¡Únete hoy, 30 de mayo de 2025, a millones de fans del cine! 
              <strong>¡Oferta especial: Regístrate ahora y obtén un boleto gratis por tiempo limitado!</strong>
            </p>
          </div>

          {/* Toggle entre Login y Signup */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setMode('login')}
              className={`px-4 py-2 rounded-l-lg ${
                mode === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              } transition-all`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-4 py-2 rounded-r-lg ${
                mode === 'signup'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              } transition-all`}
            >
              Registrarse
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="mb-4">
                <label className="block mb-2 font-medium" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-amber-400'
                  }`}
                  placeholder="Tu nombre"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="email">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-amber-400'
                }`}
                placeholder="tu@correo.com"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-amber-400'
                }`}
                placeholder="********"
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full px-4 py-2 rounded-full text-white transition-all shadow-lg ${
                isFormValid()
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-amber-400/50 animate-pulse-slow'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              {mode === 'login' ? 'Iniciar sesión ahora' : 'Registrarse y obtener mi boleto'}
            </button>
            <p className="mt-4 text-center text-sm text-gray-400">
              EsCine es una plataforma segura y confiable. ¡Únete a la comunidad y vive la magia del cine!
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            A Mr. Tony Production<br />EsCine © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Login;