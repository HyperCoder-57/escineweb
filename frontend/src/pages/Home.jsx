import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect, useRef } from 'react';

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hora para el boleto gratis (en segundos)
  const [currentIndexEstrenos, setCurrentIndexEstrenos] = useState(0);
  const [currentIndexTodas, setCurrentIndexTodas] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const carouselEstrenosRef = useRef(null);
  const carouselTodasRef = useRef(null);

  const estrenos = [
    { id: 1, title: "Misión: Imposible - La sentencia final", poster: "https://www.cuevana.is/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FhaOjJGUV00dKlZaJWgjM1UD1cJV.jpg&w=256&q=75" },
    { id: 2, title: "Karate Kid: Leyendas", poster: "https://www.cuevana.is/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FefNhiZPk71FTYJ30dBkWMfc939D.jpg&w=640&q=75" },
    { id: 3, title: "La formula del agua", poster: "https://www.cuevana.is/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F2egvcQPqrXBgPHdK6hhznptaiiY.jpg&w=256&q=75" },
    { id: 4, title: "El amateur: Operación venganza", poster: "https://www.cuevana.is/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F1LKXRXycQAx7slS7AVNPUg2qvpY.jpg&w=640&q=75" },
  ];

  const todasPeliculas = [
    { id: 5, title: "Avengers", poster: "https://www18.pelisplushd.to/poster/the-avengers-los-vengadores-thumb.jpg" },
    { id: 6, title: "La gran Aventura", poster: "https://www18.pelisplushd.to/poster/la-gran-aventura-lego-thumb.jpg" },
    { id: 7, title: "Top Gun Maverick", poster: "https://www18.pelisplushd.to/poster/top-gun-maverick-thumb.jpg" },
    { id: 8, title: "Sin Límites", poster: "https://www18.pelisplushd.to/poster/sin-limites-thumb.jpg" },
    { id: 9, title: "La Llegada", poster: "https://www18.pelisplushd.to/poster/la-llegada-thumb.jpg" },
  ];

  // Crear arrays extendidos para simular el carousel infinito
  const extendedEstrenos = [
    ...estrenos.slice(-1),
    ...estrenos,
    ...estrenos.slice(0, 1),
  ];

  const extendedTodas = [
    ...todasPeliculas.slice(-1),
    ...todasPeliculas,
    ...todasPeliculas.slice(0, 1),
  ];

  const handleAvatarClick = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleAuth = () => {
    setShowDialog(false);
    navigate('/auth');
  };
  const handleExplore = () => navigate('/reservation/1');
  const handleCloseBanner = () => setShowBanner(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Manejo del carousel infinito para Estrenos
  const handlePrevEstrenos = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndexEstrenos((prev) => prev - 1);
  };

  const handleNextEstrenos = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndexEstrenos((prev) => prev + 1);
  };

  // Manejo del carousel infinito para Todas las Películas
  const handlePrevTodas = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndexTodas((prev) => prev - 1);
  };

  const handleNextTodas = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndexTodas((prev) => prev + 1);
  };

  // Ajuste para el carousel infinito (Estrenos)
  const handleTransitionEndEstrenos = () => {
    setIsTransitioning(false);
    if (currentIndexEstrenos === 0) {
      setCurrentIndexEstrenos(estrenos.length);
      carouselEstrenosRef.current.style.transition = 'none';
      carouselEstrenosRef.current.style.transform = `translateX(-${estrenos.length * (100 / 3)}%)`;
    } else if (currentIndexEstrenos === extendedEstrenos.length - 1) {
      setCurrentIndexEstrenos(1);
      carouselEstrenosRef.current.style.transition = 'none';
      carouselEstrenosRef.current.style.transform = `translateX(-${(100 / 3)}%)`;
    }
  };

  // Ajuste para el carousel infinito (Todas las Películas)
  const handleTransitionEndTodas = () => {
    setIsTransitioning(false);
    if (currentIndexTodas === 0) {
      setCurrentIndexTodas(todasPeliculas.length);
      carouselTodasRef.current.style.transition = 'none';
      carouselTodasRef.current.style.transform = `translateX(-${todasPeliculas.length * (100 / 3)}%)`;
    } else if (currentIndexTodas === extendedTodas.length - 1) {
      setCurrentIndexTodas(1);
      carouselTodasRef.current.style.transition = 'none';
      carouselTodasRef.current.style.transform = `translateX(-${(100 / 3)}%)`;
    }
  };

  useEffect(() => {
    setCurrentIndexEstrenos(1); // Iniciar en el primer elemento real
    setCurrentIndexTodas(1);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
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
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Cinema Logo" className="max-h-16 w-auto object-contain" />
          </Link>
          <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-0">
            <Link to="/" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all text-base font-semibold">Inicio</Link>
            <Link to="/reviews" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all text-base font-semibold">Reseñas</Link>
            <Link to="/contact" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all text-base font-semibold">Contacto</Link>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar tu próxima aventura..."
              className="px-4 py-2 rounded-lg text-black w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400">🔍</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all">
              <span className="text-xl text-black">👤</span>
            </div>
            <span className="text-sm mt-1 font-medium">{isLoggedIn ? "Usuario" : "Invitado"}</span>
          </div>
        </div>
      </header>

      {/* Banner de urgencia y prueba social */}
      {showBanner && (
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 text-white text-center mb-6 animate-pulse-slow relative z-10">
          <span
            className="absolute top-2 right-2 text-white hover:text-gray-300 cursor-pointer text-xl"
            onClick={handleCloseBanner}
          >
            ✕
          </span>
          <p className="text-sm font-bold">
            ¡Únete hoy, 24 de mayo de 2025, a millones de cinéfilos! 
            <span className="block md:inline">Regístrate ahora y recibe un boleto gratis (queda {formatTime(timeLeft)}).</span>
          </p>
          <button
            onClick={handleAuth}
            className="mt-2 bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-amber-400/50"
          >
            ¡Regístrate y vive la magia!
          </button>
        </div>
      )}

      {/* Diálogo Modal */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-sm transform animate-fade-in">
            <span
              className="absolute top-2 right-2 text-white hover:text-gray-300 cursor-pointer text-xl"
              onClick={handleCloseDialog}
            >
              ✕
            </span>
            <h3 className="text-lg font-bold text-amber-400 mb-4">Estado de Sesión</h3>
            <p className="text-white mb-4">
              {isLoggedIn ? "¡Ya estás listo para la magia del cine!" : "¡Aún no estás dentro de la aventura! Inicia sesión o regístrate para descubrir contenido exclusivo."}
            </p>
            {!isLoggedIn && (
              <div className="flex justify-center">
                <button
                  onClick={handleAuth}
                  className="bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-400 transition-all shadow-md hover:shadow-amber-600/50"
                >
                  Iniciar sesión o registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        {/* Sección Explorar */}
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-amber-400 mb-4 animate-fade-in-up">¡Embárcate en tu aventura cinematográfica!</h2>
          <button
            onClick={handleExplore}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-amber-400/50 animate-pulse-slow"
          >
            Explorar ahora
          </button>
        </section>

        {/* Sección Estrenos - Carousel Infinito */}
        <section className="mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-4 animate-fade-in-up">Estrenos</h2>
          <div className="relative">
            <button
              onClick={handlePrevEstrenos}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              ◄
            </button>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl overflow-hidden">
                <div
                  ref={carouselEstrenosRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndexEstrenos * (100 / 3)}%)` }}
                  onTransitionEnd={handleTransitionEndEstrenos}
                >
                  {extendedEstrenos.map((movie, index) => (
                    <div key={`${movie.id}-${index}`} className="w-48 flex-shrink-0 px-2">
                      <Link to={`/reservation/${movie.id}`} className="block">
                        <div className="relative group">
                          <div className="aspect-[2/3] overflow-hidden rounded-lg">
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                            <p className="text-white text-sm font-semibold">{movie.title}</p>
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
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              ►
            </button>
          </div>
        </section>

        {/* Sección Todas las Películas - Carousel Infinito */}
        <section>
          <h2 className="text-3xl font-extrabold text-white mb-4 animate-fade-in-up">Todas las Películas</h2>
          <div className="relative">
            <button
              onClick={handlePrevTodas}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              ◄
            </button>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl overflow-hidden">
                <div
                  ref={carouselTodasRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndexTodas * (100 / 3)}%)` }}
                  onTransitionEnd={handleTransitionEndTodas}
                >
                  {extendedTodas.map((movie, index) => (
                    <div key={`${movie.id}-${index}`} className="w-48 flex-shrink-0 px-2">
                      <Link to={`/reservation/${movie.id}`} className="block">
                        <div className="relative group">
                          <div className="aspect-[2/3] overflow-hidden rounded-lg">
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                            <p className="text-white text-sm font-semibold">{movie.title}</p>
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
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              ►
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            A Mr. Tony Production <br />EsCine © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;