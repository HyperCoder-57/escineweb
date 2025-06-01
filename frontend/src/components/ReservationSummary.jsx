import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';

function ReservationSummary() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true); // Estado simulado para el avatar

  // Datos dummy
  const movie = {
    id: 8,
    title: "Sin Límites",
    poster: "https://www18.pelisplushd.to/poster/sin-limites-thumb.jpg",
    classification: "R",
    rating: 4,
    director: "Neil Burger",
    synopsis: "Sin Límites (2011) es un thriller de ciencia ficción donde un escritor fracasado descubre una misteriosa droga que le permite usar el 100% de su capacidad cerebral. Con habilidades mentales sobrehumanas, comienza a escalar en el mundo financiero, pero pronto se ve atrapado en una red peligrosa de poder, ambición y consecuencias mortales. Una adictiva mezcla de suspenso, inteligencia y adrenalina.",
  };

  const schedules = {
    Lunes: ["10:00 am", "1:00 pm", "4:00 pm", "7:00 pm"],
    Martes: ["10:00 am", "1:00 pm", "4:00 pm", "7:00 pm"],
    Miércoles: ["12:00 pm", "3:00 pm", "6:00 pm", "9:00 pm"],
    Jueves: ["12:00 pm", "3:00 pm", "6:00 pm", "9:00 pm"],
    Viernes: ["10:00 am", "1:00 pm", "4:00 pm", "7:00 pm"],
    Sábado: ["10:00 am", "1:00 pm", "4:00 pm", "7:00 pm"],
    Domingo: ["12:00 pm", "3:00 pm", "6:00 pm", "9:00 pm"],
  };

  // Generar estrellas para la valoración
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-amber-400" : "text-gray-400"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleAvatarClick = () => {
    // Podríamos mostrar un modal como en Home, pero aquí solo simulamos
    alert(isLoggedIn ? "Bienvenido, usuario!" : "Por favor inicia sesión.");
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

      {/* Banner de urgencia */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 text-white text-center mb-6 animate-pulse-slow relative z-10">
        <p className="text-sm font-bold">
          ¡Solo quedan pocos asientos para "Sin Límites" hoy, 30 de mayo de 2025! 
          <span className="block md:inline">Más de 500 fans ya reservaron. ¡Sé el próximo!</span>
        </p>
      </div>

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Título de la película */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-amber-400 animate-fade-in-up">
            {movie.title} - ¡Tu épica aventura te espera!
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Horarios de proyección (izquierda) */}
            <div className="w-full md:w-1/3 bg-gray-900 p-6 rounded-lg shadow-2xl border-l-4 border-amber-400 hover:shadow-amber-400/50 transition-all">
              <h2 className="text-2xl font-semibold mb-4 text-white">Horarios Disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(schedules).map(([day, times]) => (
                  <div key={day} className="min-w-[120px] mb-2">
                    <h3 className="font-medium text-white">{day}</h3>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {times.map((time, index) => (
                        <li key={index} className="hover:text-amber-400 cursor-pointer transition-all">
                          {time}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Poster e información (centro y derecha) */}
            <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-6">
              {/* Poster (centro) */}
              <div className="w-full md:w-1/2">
                <div className="relative group">
                  <div className="aspect-[2/3] overflow-hidden rounded-lg">
                    <img
                      src={movie.poster}
                      alt={`Póster de ${movie.title}`}
                      className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <p className="text-white text-sm font-semibold">{movie.title}</p>
                  </div>
                </div>
              </div>

              {/* Información de la película (derecha) */}
              <div className="w-full md:w-1/2 bg-gray-900 p-6 rounded-lg shadow-2xl border-r-4 border-red-600 hover:shadow-amber-400/50 transition-all text-white">
                <p className="mb-2 text-lg"><strong>Clasificación:</strong> <span className="text-red-400">{movie.classification}</span></p>
                <p className="mb-2 text-lg">
                  <strong>Valoración:</strong> {renderStars(movie.rating)}
                </p>
                <p className="mb-2 text-lg"><strong>Director:</strong> <span className="text-gray-300">{movie.director}</span></p>
                <p className="mb-4 text-lg"><strong>Sinopsis:</strong> <span className="text-gray-300">{movie.synopsis}</span></p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Seguro y fácil</span>
                  <span className="bg-green-900 text-green-400 px-2 py-1 rounded-full">Certificado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de conversión con CTA */}
          <div className="mt-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg shadow-2xl animate-pulse-slow">
            <p className="text-white text-xl mb-4">
              ¡Reserva ahora y obtén un 10% de descuento en tu próxima compra!
            </p>
            <button
              className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:from-amber-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-amber-400/50 animate-pulse-slow"
              onClick={() => navigate(`/seat/${movie.id}`)}
            >
              ¡Reserva tu aventura ahora!
            </button>
          </div>
        </div>
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

export default ReservationSummary;