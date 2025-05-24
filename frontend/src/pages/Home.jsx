import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado inicial: usuario deslogueado
  const [showDialog, setShowDialog] = useState(false); // Controlar visibilidad del diálogo

  // Datos placeholder para las películas
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

  // Manejar clic en el avatar
  const handleAvatarClick = () => {
    setShowDialog(true);
  };

  // Manejar cierre del diálogo
  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  // Manejar navegación a la página de autenticación
  const handleAuth = () => {
    setShowDialog(false);
    navigate('/auth');
  };

  // Manejar clic en Explorar
  const handleExplore = () => {
    navigate('/reservation/1'); // Redirige a una página de reserva (puedes ajustar la lógica)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="Cinema Logo"
                className="max-h-16 w-auto object-contain"
              />
            </Link>
          </div>

        

          {/* Botones centrales y búsqueda */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-0">
              <Link
                to="/"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition"
              >
                Inicio
              </Link>
              <Link
                to="/reviews"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition"
              >
                Reseñas
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition"
              >
                Contacto
              </Link>
            </nav>

            <div className="relative">
              <input
                type="text"
                placeholder="Buscar película..."
                className="px-4 py-2 rounded-lg text-black w-full md:w-64"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                🔍
              </span>
            </div>
          </div>

          {/* Avatar */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={handleAvatarClick}
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl text-black">👤</span>
            </div>
            <span className="text-sm mt-1">{isLoggedIn ? "Usuario" : "Invitado"}</span>
          </div>
        </div>
      </header>

      {/* Banner de urgencia y prueba social */}
      <div className="bg-yellow-100 p-4 text-center mb-6">
        <p className="text-sm">
          ¡Únete hoy, 23 de mayo de 2025, a millones de cinéfilos! 
          <strong> Regístrate ahora y recibe un boleto gratis por tiempo limitado.</strong>
        </p>
        <button
          onClick={handleAuth}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ¡Regístrate y vive la magia!
        </button>
      </div>

      {/* Diálogo Modal */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <span
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
              onClick={handleCloseDialog}
            >
              ✕
            </span>
            <h3 className="text-lg font-bold mb-4">Estado de Sesión</h3>
            <p className="mb-4">
              {isLoggedIn ? "Ya estás listo para la magia del cine." : "¡Aún no estás dentro de la aventura! Inicia sesión o regístrate para descubrir contenido exclusivo."}
            </p>
            {!isLoggedIn && (
              <div className="flex justify-center">
                <button
                  onClick={handleAuth}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Iniciar sesión o registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow">
        {/* Sección Explorar */}
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¡Explora la magia del cine!</h2>
    
        </section>

        {/* Sección Estrenos */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Estrenos</h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {estrenos.map((movie) => (
              <Link to={`/reservation/${movie.id}`} key={movie.id} className="flex-shrink-0 w-40">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-lg shadow-md hover:shadow-lg transition"
                />
                <p className="mt-2 text-center text-sm">{movie.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Sección Todas las Películas */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Todas las Películas</h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {todasPeliculas.map((movie) => (
              <Link to={`/reservation/${movie.id}`} key={movie.id} className="flex-shrink-0 w-40">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-lg shadow-md hover:shadow-lg transition"
                />
                <p className="mt-2 text-center text-sm">{movie.title}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            A Mr. Tony Production <br />EsCine © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;