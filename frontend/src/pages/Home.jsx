import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, user, login, logout } = useAuth(); // Obtener user del contexto
  const [showDialog, setShowDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndexEstrenos, setCurrentIndexEstrenos] = useState(1);
  const [currentIndexTodas, setCurrentIndexTodas] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBanner, setShowBanner] = useState(true); // Añadido showBanner al useState
  const [estrenos, setEstrenos] = useState([]);
  const [todasPeliculas, setTodasPeliculas] = useState([]);
  const carouselEstrenosRef = useRef(null);
  const carouselTodasRef = useRef(null);

  // Fetch datos desde el backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseEstrenos = await fetch('http://localhost:5000/api/movies?releaseYear_gte=2024');
        const dataEstrenos = await responseEstrenos.json();
        setEstrenos(dataEstrenos);

        const responseTodas = await fetch('http://localhost:5000/api/movies?limit=10');
        const dataTodas = await responseTodas.json();
        setTodasPeliculas(dataTodas);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const extendedEstrenos = [...(estrenos.slice(-1) || []), ...estrenos, ...(estrenos.slice(0, 1) || [])];
  const extendedTodas = [...(todasPeliculas.slice(-1) || []), ...todasPeliculas, ...(todasPeliculas.slice(0, 1) || [])];

  const handleAvatarClick = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleAuth = () => {
    setShowDialog(false);
    navigate('/login');
  };
  const handleExplore = () => navigate('/movielist');
  const handleCloseBanner = () => setShowBanner(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevEstrenos = () => {
    if (isTransitioning || estrenos.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndexEstrenos((prev) => prev - 1);
  };

  const handleNextEstrenos = () => {
    if (isTransitioning || estrenos.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndexEstrenos((prev) => prev + 1);
  };

  const handlePrevTodas = () => {
    if (isTransitioning || todasPeliculas.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndexTodas((prev) => prev - 1);
  };

  const handleNextTodas = () => {
    if (isTransitioning || todasPeliculas.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndexTodas((prev) => prev + 1);
  };

  const handleTransitionEndEstrenos = () => {
    setIsTransitioning(false);
    if (currentIndexEstrenos === 0 && estrenos.length > 0) {
      setCurrentIndexEstrenos(estrenos.length);
      carouselEstrenosRef.current.style.transition = 'none';
      carouselEstrenosRef.current.style.transform = `translateX(-${estrenos.length * (100 / 4)}%)`;
    } else if (currentIndexEstrenos === extendedEstrenos.length - 1 && estrenos.length > 0) {
      setCurrentIndexEstrenos(1);
      carouselEstrenosRef.current.style.transition = 'none';
      carouselEstrenosRef.current.style.transform = `translateX(-${(100 / 4)}%)`;
    }
  };

  const handleTransitionEndTodas = () => {
    setIsTransitioning(false);
    if (currentIndexTodas === 0 && todasPeliculas.length > 0) {
      setCurrentIndexTodas(todasPeliculas.length);
      carouselTodasRef.current.style.transition = 'none';
      carouselTodasRef.current.style.transform = `translateX(-${todasPeliculas.length * (100 / 4)}%)`;
    } else if (currentIndexTodas === extendedTodas.length - 1 && todasPeliculas.length > 0) {
      setCurrentIndexTodas(1);
      carouselTodasRef.current.style.transition = 'none';
      carouselTodasRef.current.style.transform = `translateX(-${(100 / 4)}%)`;
    }
  };

  useEffect(() => {
    if (carouselEstrenosRef.current) {
      carouselEstrenosRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    }
    if (carouselTodasRef.current) {
      carouselTodasRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    }
  }, [estrenos, todasPeliculas]);

  const debouncedSearch = debounce((value) => {
    console.log('Searching for:', value);
  }, 300);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Controlar showBanner basado en isLoggedIn
  useEffect(() => {
    setShowBanner(!isLoggedIn); // Ocultar banner si el usuario está loggeado
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 animate-bg-fade relative overflow-hidden">
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
            <img src={logo} alt="Cinema Logo" className="max-h-20 w-auto object-contain" />
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                debouncedSearch(e.target.value);
              }}
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

      {showBanner && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-gray-100 text-center mb-6 shadow-md animate-glow relative z-10" aria-live="polite">
          <button
            className="absolute top-2 right-2 text-gray-100 hover:text-gray-300 text-xl"
            onClick={handleCloseBanner}
            aria-label="Cerrar banner"
          >
            ✕
          </button>
          <p className="text-base font-body font-bold text-gray-100">
            ¡Únete al mundo del cine mágico! 
            <span className="block md:inline">Regístrate ahora y desbloquea un boleto gratis (queda {formatTime(timeLeft)}).</span>
          </p>
          <button
            onClick={handleAuth}
            className="mt-2 bg-teal-500 text-gray-100 px-4 py-2 rounded-full hover:bg-teal-400 transition-all shadow-lg hover:shadow-teal-400/50 hover-sparkle relative"
          >
            ¡Vive la magia!
          </button>
        </div>
      )}

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

      <main className="container mx-auto p-4 flex-grow relative z-10">
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-heading font-extrabold text-gray-100 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            ¡Embárcate en tu aventura cinematográfica!
          </h2>
          <button
            onClick={handleExplore}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-gray-100 px-4 py-2 rounded-full text-lg font-body font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-indigo-400/50 hover-sparkle relative"
          >
            Explorar ahora
          </button>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-heading font-extrabold text-gray-100 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            ¡Nuevas Aventuras en la Gran Pantalla!
          </h2>
          <div className="relative">
            <button
              onClick={handlePrevEstrenos}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePrevEstrenos()}
              tabIndex={0}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-gray-100 p-3 rounded-full hover:bg-indigo-500 transition-all z-10"
              aria-label="Películas anteriores (Estrenos)"
            >
              ◄
            </button>
            <div className="flex justify-center">
              <div className="w-full max-w-5xl overflow-hidden">
                <div
                  ref={carouselEstrenosRef}
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ transform: `translateX(-${currentIndexEstrenos * (100 / 4)}%)` }}
                  onTransitionEnd={handleTransitionEndEstrenos}
                >
                  {extendedEstrenos.map((movie, index) => (
                    <div key={`${movie.id}-${index}`} className="w-56 flex-shrink-0 px-2">
                      <Link to={`/reservation/${movie.id}`} className="block">
                        <div className="relative group">
                          <div className="aspect-[2/3] overflow-hidden rounded-lg">
                            <img
                              src={movie.poster || 'https://via.placeholder.com/150x225?text=Poster+Not+Found'}
                              alt={movie.title}
                              className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                            <p className="text-gray-100 text-base font-body font-semibold">{movie.title}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleNextEstrenos}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNextEstrenos()}
              tabIndex={0}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-gray-100 p-3 rounded-full hover:bg-indigo-500 transition-all z-10"
              aria-label="Siguientes películas (Estrenos)"
            >
              ►
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-heading font-extrabold text-gray-100 mb-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Explora un Universo de Historias
          </h2>
          <div className="relative">
            <button
              onClick={handlePrevTodas}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePrevTodas()}
              tabIndex={0}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-gray-100 p-3 rounded-full hover:bg-indigo-500 transition-all z-10"
              aria-label="Películas anteriores (Todas)"
            >
              ◄
            </button>
            <div className="flex justify-center">
              <div className="w-full max-w-5xl overflow-hidden">
                <div
                  ref={carouselTodasRef}
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ transform: `translateX(-${currentIndexTodas * (100 / 4)}%)` }}
                  onTransitionEnd={handleTransitionEndTodas}
                >
                  {extendedTodas.map((movie, index) => (
                    <div key={`${movie.id}-${index}`} className="w-56 flex-shrink-0 px-2">
                      <Link to={`/reservation/${movie.id}`} className="block">
                        <div className="relative group">
                          <div className="aspect-[2/3] overflow-hidden rounded-lg">
                            <img
                              src={movie.poster || 'https://via.placeholder.com/150x225?text=Poster+Not+Found'}
                              alt={movie.title}
                              className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                            <p className="text-gray-100 text-base font-body font-semibold">{movie.title}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleNextTodas}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNextTodas()}
              tabIndex={0}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-gray-100 p-3 rounded-full hover:bg-indigo-500 transition-all z-10"
              aria-label="Siguientes películas (Todas)"
            >
              ►
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;