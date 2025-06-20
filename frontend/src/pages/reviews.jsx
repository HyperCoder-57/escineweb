import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

function Reviews() {
  const navigate = useNavigate();
  const { isLoggedIn, user, login, logout } = useAuth(); // Usa el contexto de autenticación
  const [showDialog, setShowDialog] = useState(false); // Diálogo de avatar
  const [formData, setFormData] = useState({
    movie: '',
    rating: 0,
    review: '',
  });
  const [errors, setErrors] = useState({});
  const [reviews, setReviews] = useState([]);
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Cargar reseñas destacadas desde localStorage
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews([
        { movie: 'Duna', rating: 5, review: 'Impresionante fotografía y ambientación.', user: 'Luis M.' },
        { movie: 'El Padrino', rating: 5, review: 'Una obra maestra del cine clásico.', user: 'Claudia R.' },
      ]);
    }
  }, []);

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.movie.trim()) newErrors.movie = "El nombre de la película es obligatorio";
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) newErrors.rating = "Selecciona una calificación entre 1 y 5";
    if (!formData.review.trim()) newErrors.review = "La reseña es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    // En un caso real: enviar al backend
    const newReview = {
      ...formData,
      user: user ? user.name || 'Anónimo' : 'Anónimo', // Usa el nombre del usuario del contexto
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));

    setFormData({ movie: '', rating: 0, review: '' });
    setNotification('¡Reseña enviada con éxito!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAvatarClick = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleLogout = () => {
    logout(); // Usa la función logout del contexto
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
            <Link to="/" className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all text-base font-body font-semibold">Inicio</Link>
            <Link to="/reviews" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Reseñas</Link>
            <Link to="/contact" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Contacto</Link>
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
      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-3 text-center text-gray-100 mb-2 shadow-md animate-pulse-slow relative z-10" aria-live="polite">
        <p className="text-base font-body font-semibold">
          Comparte tu opinión <strong>¡Tu reseña inspira a otros!</strong>
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-2xl animate-pulse-slow">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gold-400 mb-6">Reseñas de Películas</h1>
          <p className="text-gray-300 mb-6 font-body">
            {isLoggedIn
              ? 'Comparte tu opinión sobre tus películas favoritas.'
              : 'Inicia sesión para dejar una reseña.'}
          </p>

          {/* Formulario */}
          {isLoggedIn ? (
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <label htmlFor="movie" className="block text-sm font-body font-medium mb-1 text-gray-300">
                  Película
                </label>
                <input
                  id="movie"
                  type="text"
                  name="movie"
                  value={formData.movie}
                  onChange={handleChange}
                  className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.movie ? 'border-red-800 focus:ring-red-800' : 'border-gray-600 focus:ring-indigo-600'} text-gray-100 focus:outline-none focus:ring-2`}
                  placeholder="Nombre de la película"
                  aria-invalid={!!errors.movie}
                  aria-describedby={errors.movie ? 'movie-error' : undefined}
                />
                {errors.movie && (
                  <p id="movie-error" className="text-red-800 text-sm mt-1 font-body">{errors.movie}</p>
                )}
              </div>
              <div>
                <label htmlFor="rating" className="block text-sm font-body font-medium mb-1 text-gray-300">
                  Calificación (1-5)
                </label>
                <input
                  id="rating"
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.rating ? 'border-red-800 focus:ring-red-800' : 'border-gray-600 focus:ring-indigo-600'} text-gray-100 focus:outline-none focus:ring-2`}
                  aria-invalid={!!errors.rating}
                  aria-describedby={errors.rating ? 'rating-error' : undefined}
                />
                {errors.rating && (
                  <p id="rating-error" className="text-red-800 text-sm mt-1 font-body">{errors.rating}</p>
                )}
              </div>
              <div>
                <label htmlFor="review" className="block text-sm font-body font-medium mb-1 text-gray-300">
                  Reseña
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.review ? 'border-red-800 focus:ring-red-800' : 'border-gray-600 focus:ring-indigo-600'} text-gray-100 focus:outline-none focus:ring-2`}
                  placeholder="Escribe lo que te hizo sentir la película..."
                  aria-invalid={!!errors.review}
                  aria-describedby={errors.review ? 'review-error' : undefined}
                />
                {errors.review && (
                  <p id="review-error" className="text-red-800 text-sm mt-1 font-body">{errors.review}</p>
                )}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-800 px-6 py-2 rounded-full text-gray-100 hover:bg-indigo-700 transition-all hover:shadow-indigo-600/50 hover-sparkle relative disabled:opacity-50"
                  disabled={Object.keys(errors).some((key) => errors[key])}
                >
                  Enviar Reseña
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center mb-8">
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-800 px-6 py-2 rounded-full text-gray-100 hover:bg-indigo-700 transition-all hover:shadow-indigo-600/50 hover-sparkle relative"
              >
                Inicia sesión para reseñar
              </button>
            </div>
          )}

          {/* Lista de Reseñas */}
          <section>
            <h2 className="text-lg font-heading font-semibold mb-4 text-gray-100">Reseñas Recientes</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((r, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gray-800 shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-body font-medium text-gray-100">{r.movie}</h3>
                      <div className="flex" aria-label={`Calificación ${r.rating} de 5`}>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${i < r.rating ? 'text-gold-400' : 'text-gray-400'}`}
                            aria-hidden="true"
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2 font-body">{r.review}</p>
                    <p className="text-sm text-gray-400 font-body">Por {r.user}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-300 text-center font-body">No hay reseñas aún.</p>
            )}
          </section>
        </div>
      </main>

      {/* Notificación Toast */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-teal-600 text-gray-100 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50" role="alert">
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

export default Reviews;