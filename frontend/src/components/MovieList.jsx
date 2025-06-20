import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación

function MovieList() {
  const navigate = useNavigate();
  const { isLoggedIn, user, login, logout } = useAuth(); // Obtener estado de autenticación
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        console.error('Error al obtener películas:', error);
        setNotification('Error al cargar las películas. Intenta de nuevo.');
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      if (!searchQuery.trim()) {
        setFilteredMovies(movies);
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/movies/search', {
          params: { query: searchQuery },
        });
        setFilteredMovies(response.data);
      } catch (error) {
        console.error('Error al buscar películas:', error);
        setNotification('Error al buscar películas. Intenta de nuevo.');
      }
    };
    fetchFilteredMovies();
  }, [searchQuery, movies]);

  const handleAvatarClick = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleAuth = () => {
    setShowDialog(false);
    navigate('/login');
  };

  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  const dismissNotification = () => setNotification('');

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

      {/* Header con funcionalidad completa de autenticación */}
      <header className="bg-gray-900 bg-opacity-90 text-gray-100 p-4 shadow-lg z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Cinema Logo" className="max-h-20 w-auto object-contain" loading="lazy" />
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
              onChange={(e) => debouncedSearch(e.target.value)}
              placeholder="Buscar tu próxima aventura..."
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Buscar películas"
              aria-describedby="search-description"
            />
            <span id="search-description" className="sr-only">Busca películas por título</span>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400">🔍</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all" aria-label={isLoggedIn && user ? `Perfil de ${user.name || 'Usuario'}` : "Iniciar sesión"}>
              <span className="text-xl text-gray-900">👤</span>
            </div>
            <span className="text-sm font-body font-medium">{isLoggedIn && user ? user.name || 'Usuario' : 'Invitado'}</span>
          </div>
        </div>
      </header>

      {/* Modal Dialog con funcionalidad de autenticación */}
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
              {isLoggedIn && user ? `¡Estás listo para vivir aventuras épicas en la gran pantalla, ${user.name || 'Usuario'}!` : "¡Embárcate en una aventura! Inicia sesión o regístrate para desbloquear contenido exclusivo."}
            </p>
            {!isLoggedIn && (
              <div className="flex justify-center">
                <button
                  onClick={handleAuth}
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
                >
                  Ver Perfil
                </Link>
                <button
                  onClick={() => {
                    logout();
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

      {/* Banner (opcional, replicado de Home.jsx si lo deseas) */}
      {/* Nota: El banner depende de timeLeft y showBanner, que no están en MovieList. Si lo quieres, necesitarás agregar su lógica. */}
      {/* Por simplicidad, lo omitimos aquí, pero puedes añadirlo si es necesario. */}

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-7xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg text-gray-100">
          <h1 className="text-3xl font-heading font-extrabold mb-6 animate-fade-in-up">Películas Disponibles</h1>
          {filteredMovies.length === 0 ? (
            <p className="text-center text-gray-400 font-body">No se encontraron películas. ¡Intenta con otra búsqueda!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMovies.map((movie, index) => (
                movie.title && movie.poster ? (
                  <div
                    key={movie.id}
                    className="bg-gray-800 rounded-lg shadow-md overflow-hidden group hover:shadow-indigo-200/50 transition-all duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link to={`/reservation/${movie.id}`}>
                      <div className="relative aspect-[2/3]">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => (e.target.src = 'https://via.placeholder.com/150x225?text=Poster+No+Disponible')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <p className="text-gray-100 font-body font-semibold text-base">{movie.title}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <h2 className="text-lg font-heading font-bold truncate">{movie.title}</h2>
                        <p className="text-sm font-body text-gray-400">
                          Horarios: {movie.Showtimes && movie.Showtimes.length > 0 ? movie.Showtimes.map(show => show.time).join(', ') : 'No disponibles'}
                        </p>
                        <p className="text-sm font-body text-gray-400">
                          Fecha: {movie.Showtimes && movie.Showtimes.length > 0 ? new Date(movie.Showtimes[0].date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Por confirmar'}
                        </p>
                        <button className="mt-3 w-full bg-indigo-600 text-gray-100 px-4 py-2 rounded-full font-body font-semibold hover:bg-indigo-500 transition-all hover:shadow-indigo-400/50 hover-sparkle relative">
                          Reservar ahora
                        </button>
                      </div>
                    </Link>
                  </div>
                ) : null
              ))}
            </div>
          )}
        </div>

        {/* Notification Toast */}
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MovieList;