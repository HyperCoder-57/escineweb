import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
 
const VerifyEmail = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const validateCode = (code) => {
    const codeRegex = /^\d{6}$/;
    if (!code) return 'El código es obligatorio';
    if (!codeRegex.test(code)) return 'El código debe ser de 6 dígitos numéricos';
    return '';
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCode(value);
    setError(validateCode(value));
  };

  const isFormValid = () => {
    return !validateCode(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codeError = validateCode(code);
    setError(codeError);

    if (codeError) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/verify/${code}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al verificar');
      }

      const data = await response.json();
      setNotification(data.message);
      setTimeout(() => {
        navigate('/login');
        setCode('');
        setError('');
      }, 2000);
    } catch (error) {
      console.error('Error al verificar:', error);
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
          ¡Verifica tu correo ahora, {currentDateTime}, y únete a la comunidad de EsCine!
        </p>
      </div>

      <main className="container mx-auto p-4 flex-grow flex items-center justify-center relative z-10">
        <div className="bg-gray-900 p-8 rounded-lg shadow-2xl max-w-md w-full text-gray-100 animate-glow">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-yellow-400 mb-6 text-center">
            Verifica tu Correo
          </h1>
          <p className="text-center text-gray-300 mb-6 font-body">
            Ingresa el código de 6 dígitos que enviamos a tu correo electrónico.
          </p>

          <form onSubmit={handleSubmit} method="GET">
            <div>
              <label className="block mb-2 font-body font-medium" htmlFor="code">
                Código de Verificación
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-lg bg-gray-800 border ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'
                } text-gray-100 focus:outline-none focus:ring-2`}
                placeholder="123456"
                required
                maxLength="6"
                aria-describedby="code-error"
              />
              {error && (
                <p id="code-error" className="mt-1 text-sm text-red-400 font-body">{error}</p>
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
              Verificar Código
            </button>
            <p className="mt-4 text-center text-sm text-gray-400 font-body">
              ¿No recibiste el código? Revisa tu carpeta de spam o <Link to="/register" className="text-indigo-400 hover:underline">solicita uno nuevo</Link>.
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
};

export default VerifyEmail;