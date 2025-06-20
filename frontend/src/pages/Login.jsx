import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
 
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState('login');
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
  const [notification, setNotification] = useState('');

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
    if (!password) return 'La contraseña es obligatoria';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    } else if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const isFormValid = () => {
    const nameValid = mode === 'signup' ? !validateName(formData.name) : true;
    const emailValid = !validateEmail(formData.email);
    const passwordValid = !validatePassword(formData.password);
    return nameValid && emailValid && passwordValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRegister = mode === 'signup';
  
    const nameError = isRegister ? validateName(formData.name) : '';
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
  
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });
  
    if (nameError || emailError || passwordError) return;
  
    try {
      const url = isRegister ? '/api/users/register' : '/api/users/login';
      const body = isRegister
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };
      const response = await fetch(`http://localhost:5000${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la solicitud');
      }
  
      const data = await response.json();
      if (isRegister) {
        setNotification(data.message);
        setTimeout(() => {
          navigate('/verify');
          setFormData({ name: '', email: '', password: '' });
          setErrors({ name: '', email: '', password: '' });
        }, 2000);
      } else {
        login(data.user, data.token); // Extrae user y token por separado
        setNotification(`¡Bienvenido de nuevo, ${formData.email}! Disfruta de tu experiencia en EsCine.`);
        setTimeout(() => {
          navigate('/');
          setFormData({ name: '', email: '', password: '' });
          setErrors({ name: '', email: '', password: '' });
        }, 2000);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setNotification(error.message);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const dismissNotification = () => setNotification('');

  const currentDateTime = new Date().toLocaleString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 animate-bg text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-gray-100 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <header className="bg-gray-900 bg-opacity-90 text-gray-100 p-4 shadow-lg z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="EsCine Logo" className="max-h-20 w-auto object-contain" loading="lazy" />
          </Link>
          <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-0">
            <Link to="/" className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all text-base font-body font-semibold">Inicio</Link>
            <Link to="/reviews" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Reseñas</Link>
            <Link to="/contact" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Contacto</Link>
          </nav>
        </div>
      </header>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-center text-gray-100 mb-2 shadow-md animate-glow relative z-10" aria-live="polite">
        <p className="text Salmon font-body font-semibold">
          ¡Únete hoy, {currentDateTime}, a millones de cinéfilos! <strong>Regístrate ahora y obtén un boleto gratis.</strong>
        </p>
      </div>

      <main className="container mx-auto p-4 flex-grow flex items-center justify-center relative z-10">
        <div className="bg-gray-900 p-8 rounded-lg shadow-2xl max-w-md w-full text-gray-100 animate-glow">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-yellow-400 mb-6 text-center">
            {mode === 'login' ? 'Inicia Sesión en EsCine' : 'Regístrate en EsCine'}
          </h1>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setMode('login')}
              className={`px-4 py-2 rounded-l-lg font-body font-semibold ${
                mode === 'login' ? 'bg-indigo-600 text-gray-100' : 'bg-gray-800 text-gray-400'
              } transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              aria-pressed={mode === 'login'}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-4 py-2 rounded-r-lg font-body font-semibold ${
                mode === 'signup' ? 'bg-indigo-600 text-gray-100' : 'bg-gray-800 text-gray-400'
              } transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              aria-pressed={mode === 'signup'}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} method="POST">
            {mode === 'signup' && (
              <div>
                <label className="block mb-2 font-body font-medium" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-lg bg-gray-800 border ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'
                  } text-gray-100 focus:outline-none focus:ring-2`}
                  placeholder="Tu nombre"
                  required
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400 font-body">{errors.name}</p>
                )}
              </div>
            )}
            <div>
              <label className="block mb-2 font-body font-medium" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-lg bg-gray-800 border ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'
                } text-gray-100 focus:outline-none focus:ring-2`}
                placeholder="tu@correo.com"
                required
                aria-describedby="email-error"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-400 font-body">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-body font-medium" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-lg bg-gray-800 border ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'
                } text-gray-100 focus:outline-none focus:ring-2`}
                placeholder="********"
                required
                aria-describedby="password-error password-hint"
              />
              {mode === 'signup' && (
                <p id="password-hint" className="mt-1 text-xs text-gray-400 font-body">
                  Mínimo 6 caracteres
                </p>
              )}
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-400 font-body">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full px-4 py-2 rounded-full font-body font-semibold transition-all hover-sparkle relative ${
                isFormValid()
                  ? 'bg-indigo-600 text-gray-100 hover:bg-indigo-500 hover:shadow-indigo-400/50'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {mode === 'login' ? 'Iniciar Sesión Ahora' : 'Registrarse y Obtener Boleto'}
            </button>
            <p className="mt-4 text-center text-sm text-gray-400 font-body">
              EsCine es una plataforma segura y confiable. ¡Únete a la comunidad y vive la magia del cine!
            </p>
          </form>
        </div>
      </main>

      {notification && (
        <div className="fixed bottom-4 right-4 bg-teal-500 text-gray-100 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50" role="alert">
          <span className="font-body">{notification}</span>
          <button
            onClick={dismissNotification}
            className="text-gray-100 hover:text-gray-300 text-xl"
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Login;