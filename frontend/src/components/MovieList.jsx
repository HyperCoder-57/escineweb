import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

function MovieList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const mockMovies = [
      { id: 5, title: "Lilo y Stitch", image: "https://image.tmdb.org/t/p/w500/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg", times: ["16:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-15" },
      { id: 6, title: "Una película de Minecraft", image: "https://image.tmdb.org/t/p/w500/rZYYmjgyF5UP1AVsvhzzDOFLCwG.jpg", times: ["14:00 PM", "18:00 PM"], date: "2025-06-10" },
      { id: 7, title: "Los Vengadores", image: "https://image.tmdb.org/t/p/w500/ugX4WZJO3jEvTOerctAWJLinujo.jpg", times: ["14:00 PM", "16:00 PM", "20:00 PM"], date: "2025-06-20" },
      { id: 8, title: 'Until Dawn', image: "https://image.tmdb.org/t/p/w500/exgfubqSbF4veI4uXFOdbV66gEf.jpg", times: ["12:00 PM", "18:00 PM"], date: "2025-06-15" },
      { id: 9, title: "A Working Man", image: "https://image.tmdb.org/t/p/w500/8jrIVxlydAdFmHpBGmKpv2DPIWJ.jpg", times: ["14:00 PM", "16:00 PM", "20:00 PM"], date: "2025-06-10" },
      { id: 10, title: "Sikandar", image: "https://image.tmdb.org/t/p/w500/41s42CRXafa3OuRGvCtfYPEBmse.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-11" },
      { id: 11, title: "Misión: Imposible - Sentencia final", image: "https://image.tmdb.org/t/p/w500/haOjJGUV00dKlZaJWgjM1UD1cJV.jpg", times: ["12:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 12, title: "La fuente de la eterna juventud", image: "https://image.tmdb.org/t/p/w500/9bhDUyOCrcwPLKbPyHM4uKOa65T.jpg", times: ["12:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 13, title: "La calle del terror: La reina del baile", image: "https://image.tmdb.org/t/p/w500/kYeTcmPmuMvBgmwOdOtR5fUwRuH.jpg", times: ["12:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 14, title: "Warfare. Tiempo de guerra", image: "https://image.tmdb.org/t/p/w500/fkVpNJugieKeTu7Se8uQRqRag2M.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 15, title: "The Legend of Ochi", image: "https://image.tmdb.org/t/p/w500/cORMkM2j7JDXIYGLdz9EHUM84aD.jpg", times: ["12:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 16, title: "Blancanieves", image: "https://image.tmdb.org/t/p/w500/sm91FNDF6OOKU4hT9BDW6EMoyDB.jpg", times: ["12:00 PM", "16:00 PM", "18:00 PM"], date: "2025-05-30" },
      { id: 17, title: "Rosario", image: "https://image.tmdb.org/t/p/w500/mYK7OYW4w2ZujE8B8GGnVYZWHYD.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 18, title: "Lilo & Stitch", image: "https://image.tmdb.org/t/p/w500/9jrmKyhNGam2pj89bcxmhQzXCNo.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 19, title: "Capitán América: Brave New World", image: "https://image.tmdb.org/t/p/w500/vUNj55xlF0pSU5FU3yDHC6L5wVX.jpg", times: ["16:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 20, title: "Tin Soldier", image: "https://image.tmdb.org/t/p/w500/lFFDrFLXywFhy6khHes1LCFVMsL.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 21, title: "Los pecadores", image: "https://image.tmdb.org/t/p/w500/zdClwqpYQXBSCGGDMdtvsuggwec.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 22, title: "The Great Escape", image: "https://image.tmdb.org/t/p/w500/iTpgKfg70wbzA15xZF8k1lZhCgM.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 23, title: "Thunderbolts*", image: "https://image.tmdb.org/t/p/w500/cGOBis1KNC8AkYMcOEw4lCycfD1.jpg", times: ["14:00 PM", "16:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 24, title: "Extraterritorial", image: "https://image.tmdb.org/t/p/w500/bTYbNWz4kI1P3GzEVvWZwyZT7Uv.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 25, title: "Abduct", image: "https://image.tmdb.org/t/p/w500/2ZTp5eQ8C8W70rvXCkbdHQW0sM9.jpg", times: ["14:00 PM", "16:00 PM", "18:00 PM"], date: "2025-06-02" },
      { id: 26, title: "Mujer Valiente", image: "https://image.tmdb.org/t/p/w500/hdqbujWmlmsdVm62Ob8sGuC2kDk.jpg", times: ["12:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 27, title: "Tierras perdidas", image: "https://image.tmdb.org/t/p/w500/sLDxndoqFWwJEq7iEdYQBzPjUDQ.jpg", times: ["12:00 PM", "14:00 PM", "20:00 PM"], date: "2025-06-02" },
      { id: 28, title: "La bala perdida 3", image: "https://image.tmdb.org/t/p/w500/AoXAvZDxcym6oONBvJ82tFjEGdY.jpg", times: ["12:00 PM", "16:00 PM", "18:00 PM"], date: "2025-05-30" },
      { id: 29, title: "Vaiana 2", image: "https://image.tmdb.org/t/p/w500/b1WsCRfomw7tRi12NuseKsAJxYK.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 30, title: "Bambi, una vida en el bosque", image: "https://image.tmdb.org/t/p/w500/fvtIXQH4JcifptPe0J9GfLDIOAQ.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 31, title: "Misión Panda en África", image: "https://image.tmdb.org/t/p/w500/3o0ktTmmf4wD2pzs2D7OMG6vT9a.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 32, title: "Estragos", image: "https://image.tmdb.org/t/p/w500/yN1WnHTyBUQobLmQAPeL100bQWg.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 33, title: "లైలా", image: "https://image.tmdb.org/t/p/w500/l4gsNxFPGpzbq0D6QK1a8vO1lBz.jpg", times: ["14:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 34, title: "El ladrón de joyas", image: "https://image.tmdb.org/t/p/w500/hzuus3qrQct2JeoAs2AGMYzKzjZ.jpg", times: ["18:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 35, title: "Rust", image: "https://image.tmdb.org/t/p/w500/tbJ3RkA2s6X5qrBzrYHYTxvDBui.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-02" },
      { id: 36, title: "The Haunting at Saint Joseph's", image: "https://image.tmdb.org/t/p/w500/ck9tMVSvGmkPuQvOezhfpYJMgs8.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 37, title: "Karate Kid: Legends", image: "https://image.tmdb.org/t/p/w500/efNhiZPk71FTYJ30dBkWMfc939D.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 38, title: "Misión: Imposible - Sentencia mortal parte uno", image: "https://image.tmdb.org/t/p/w500/83sGKvCv2T2CulYbd40Aeduc7n2.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 39, title: "Mufasa: El rey león", image: "https://image.tmdb.org/t/p/w500/dmw74cWIEKaEgl5Dv3kUTcCob6D.jpg", times: ["14:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-30" },
      { id: 40, title: "Lilo & Stitch 2: El efecto del defecto", image: "https://image.tmdb.org/t/p/w500/l71VXcph19ZwJr2ZtEFuZA6ZzK5.jpg", times: ["14:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 41, title: "Expediente Bryson: Conjuring the Cult", image: "https://image.tmdb.org/t/p/w500/z4O2wCMm534pnoxXziQu95wMuX9.jpg", times: ["12:00 PM", "18:00 PM", "20:00 PM"], date: "2025-05-30" },
      { id: 42, title: "Sonic 3: La película", image: "https://image.tmdb.org/t/p/w500/3aDWCRXLYOCuxjrjiPfLd79tcI6.jpg", times: ["14:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 43, title: "Destino final", image: "https://image.tmdb.org/t/p/w500/6F3MEcGHeMAMxledi7vQfqkZRkc.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-31" },
      { id: 44, title: "새엄마의 욕망", image: "https://image.tmdb.org/t/p/w500/rYC6UyML4CU4zYiZVbDMrwnGyWW.jpg", times: ["12:00 PM", "14:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 45, title: "¡Qué Huevos, Sofía!", image: "https://image.tmdb.org/t/p/w500/6On03YOhaiQfsVkE0Amw3LVs1mE.jpg", times: ["14:00 PM", "18:00 PM", "22:00 PM"], date: "2025-05-30" },
      { id: 46, title: "Чинк - хвостатый детектив", image: "https://image.tmdb.org/t/p/w500/fXkdpstjgSnaLX1iFxQh62mIa3L.jpg", times: ["14:00 PM", "20:00 PM", "22:00 PM"], date: "2025-06-01" },
      { id: 47, title: "El Mono", image: "https://image.tmdb.org/t/p/w500/z15wy8YqFG8aCAkDQJKR63nxSmd.jpg", times: ["12:00 PM", "16:00 PM", "18:00 PM"], date: "2025-05-30" },
      { id: 48, title: "Destino final 5", image: "https://image.tmdb.org/t/p/w500/T0IGau7Alj52OLrrthzftkLMIA.jpg", times: ["12:00 PM", "16:00 PM", "20:00 PM"], date: "2025-05-31" },
      { id: 49, title: "Culpa mía", image: "https://image.tmdb.org/t/p/w500/gp31EwMH5D2bftOjscwkgTmoLAB.jpg", times: ["16:00 PM", "18:00 PM", "20:00 PM"], date: "2025-06-01" },
      { id: 50, title: "El abismo secreto", image: "https://image.tmdb.org/t/p/w500/3s0jkMh0YUhIeIeioH3kt2X4st4.jpg", times: ["16:00 PM", "18:00 PM", "22:00 PM"], date: "2025-06-02" },
      { id: 51, title: "Death of a Unicorn", image: "https://image.tmdb.org/t/p/w500/lXR32BLR6gUo3fQX6J.jpg" },
      { id: 57, title: "Robot salvaje", image: "https://image.tmdb.org/t/p/w500/a0a7RC01aTa7pOnskgJb3mCD2Ba.jpg", times: ["14:00 PM", "18:00 PM", "2025-06-02" ]},
      { id: 102, title: "Interstellar", image: "https://image.tmdb.org/t/p/w500/fbUwSqYIP0isCiJXey3staY3DNn.jpg", times: ["12:00 PM", "14:00 PM", "22:00 PM"], date: "2025-06-01" },
    ];
    setMovies(mockMovies);
    setFilteredMovies(mockMovies);
  }, []);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  const handleAvatarClick = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleAuth = () => {
    setShowDialog(false);
    navigate('/auth');
  };

  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  const currentDateTime = new Date().toLocaleString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

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
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all" aria-label={isLoggedIn ? "Perfil de usuario" : "Iniciar sesión"}>
              <span className="text-xl text-gray-900">👤</span>
            </div>
            <span className="text-sm font-body font-semibold mt-1">{isLoggedIn ? "Usuario" : "Invitado"}</span>
          </div>
        </div>
      </header>

      {/* Modal Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" role="dialog" aria-modal="true">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-sm text-gray-100 relative">
            <button
              className="absolute top-2 right-2 text-gray-100 hover:text-gray-300 text-xl"
              onClick={handleCloseDialog}
              aria-label="Cerrar diálogo"
            >
              ✕
            </button>
            <h3 className="text-lg font-heading font-bold text-gold-400 mb-4">¡Embárcate en el mundo del cine!</h3>
            <p className="text-gray-100 font-body mb-4">
              {isLoggedIn ? "¡Estás listo para explorar historias épicas!" : "¡Inicia sesión o regístrate para desbloquear la magia del cine!"}
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
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-center text-gray-100 mb-2 shadow-md animate-glow relative z-10" aria-live="polite">
        <p className="text-base font-body font-semibold">
          ¡Descubre las películas de hoy, Únete a miles de cinéfilos.
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-7xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg text-gray-100">
          <h1 className="text-3xl font-heading font-extrabold mb-6 animate-fade-in-up">Películas Disponibles</h1>
          {filteredMovies.length === 0 ? (
            <p className="text-center text-gray-400 font-body">No se encontraron películas. ¡Intenta con otra búsqueda!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMovies.map((movie, index) => (
                movie.title && movie.image && movie.date ? (
                  <div
                    key={movie.id}
                    className="bg-gray-800 rounded-lg shadow-md overflow-hidden group hover:shadow-indigo-200/50 transition-all duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link to={`/seat/${movie.id}`}>
                      <div className="relative aspect-[2/3]">
                        <img
                          src={movie.image}
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
                          Horarios: {movie.times && Array.isArray(movie.times) ? movie.times.join(', ') : 'No disponibles'}
                        </p>
                        <p className="text-sm font-body text-gray-400">
                          Fecha: {new Date(movie.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
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