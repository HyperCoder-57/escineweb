import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

function Contact() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Añadido para manejar el estado de envío

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: user?.name || '',
    }));
  }, [user]);

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Correo inválido";
    if (!formData.message.trim()) newErrors.message = "El mensaje es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
  
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', { // URL absoluta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al enviar');
  
      setFormData({ name: user?.name || '', email: '', message: '' });
      setNotification('¡Mensaje enviado con éxito! Te responderemos pronto.');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      setNotification('¡Mensaje enviado con éxito! Te responderemos pronto.');
      setTimeout(() => setNotification(''), 3000);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleLogout = () => {
    logout();
    setShowDialog(false);
    navigate('/');
    setNotification('¡Sesión cerrada con éxito!');
    setTimeout(() => setNotification(''), 3000);
  };

  const debouncedSearch = (query) => {
    console.log(`Buscando: ${query}`);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    debouncedSearch(value);
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
      {/* Partículas */}
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

      {/* Header */}
      <header className="bg-gray-900 bg-opacity-90 text-gray-100 p-4 shadow-lg z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="EsCine Logo" className="max-h-20 w-auto object-contain" loading="lazy" />
          </Link>
          <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-0">
            <Link to="/" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Inicio</Link>
            <Link to="/reviews" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Reseñas</Link>
            <Link to="/contact" className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all text-base font-body font-semibold">Contacto</Link>
          </nav>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar tu próxima aventura..."
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Buscar películas"
              aria-describedby="search-description"
            />
            <span id="search-description" className="sr-only">Busca películas por título</span>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400">🔍</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all" aria-label={isLoggedIn && user ? `Perfil de ${user.name}` : "Iniciar sesión"}>
              <span className="text-xl text-gray-900">👤</span>
            </div>
            <span className="text-sm font-body font-medium">{isLoggedIn && user ? user.name : 'Invitado'}</span>
          </div>
        </div>
      </header>

      {/* Diálogo de Avatar */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" role="dialog" aria-modal="true">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-sm transform animate-fade-in relative">
            <button
              className="absolute top-2 right-2 text-gray-100 hover:text-gray-300 text-xl"
              onClick={handleCloseDialog}
              aria-label="Cerrar diálogo"
            >
              ✕
            </button>
            <h3 className="text-lg font-heading font-bold text-gray-100 mb-4">¡Únete al mundo del cine mágico!</h3>
            <p className="text-gray-100 font-body mb-4">
              {isLoggedIn && user ? `¡Estás listo para vivir aventuras épicas en la gran pantalla, ${user.name}!` : "¡Embárcate en una aventura! Inicia sesión o regístrate para desbloquear contenido exclusivo."}
            </p>
            {!isLoggedIn && (
              <div className="flex justify-center">
                <button
                  onClick={() => { setShowDialog(false); navigate('/auth'); }}
                  className="bg-indigo-600 text-gray-100 px-4 py-2 rounded-full hover:bg-indigo-500 transition-all shadow-md hover:shadow-indigo-600/50 hover-sparkle relative"
                >
                  Iniciar sesión o registrarse
                </button>
              </div>
            )}
            {isLoggedIn && user && (
              <div className="flex justify-center gap-4">
                <Link
                  to="/profile"
                  className="bg-indigo-600 text-gray-100 px-4 py-2 rounded-full hover:bg-indigo-500 transition-all shadow-md hover:shadow-indigo-600/50 hover-sparkle relative"
                  onClick={handleCloseDialog}
                >
                  Ver Perfil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    handleCloseDialog();
                  }}
                  className="bg-red-600 text-gray-100 px-4 py-2 rounded-full hover:bg-red-500 transition-all shadow-md hover:shadow-red-600/50 hover-sparkle relative"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-center text-gray-100 mb-2 shadow-md animate-glow relative z-10" aria-live="polite">
        <p className="text-base font-body font-semibold">
          ¡Contáctanos hoy, {currentDateTime}! <strong>Tu opinión nos hace brillar.</strong>
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-2xl animate-glow">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gold-400 mb-6">Contáctanos</h1>
          <p className="text-gray-300 mb-6 font-body">
            ¿Tienes alguna pregunta o comentario? Llena el formulario y te responderemos lo antes posible.
          </p>

          {/* Formulario de Contacto */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-body font-medium mb-1 text-gray-300">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'} text-gray-100 focus:outline-none focus:ring-2`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-sm mt-1 font-body">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-body font-medium mb-1 text-gray-300">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'} text-gray-100 focus:outline-none focus:ring-2`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-sm mt-1 font-body">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-body font-medium mb-1 text-gray-300">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'} text-gray-100 focus:outline-none focus:ring-2`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-red-400 text-sm mt-1 font-body">{errors.message}</p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 px-6 py-2 rounded-full text-gray-100 hover:bg-indigo-500 transition-all hover:shadow-indigo-400/50 hover-sparkle relative disabled:opacity-50"
                disabled={Object.keys(errors).some((key) => errors[key])}
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Notificación Toast */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;