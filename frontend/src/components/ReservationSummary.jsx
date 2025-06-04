// frontend/src/pages/ReservationSummary.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

function ReservationSummary() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const reserveButtonRef = useRef(null); // Referencia al botón de reserva

  // Datos dummy
  const movie = {
    id: 8,
    title: "Sin Límites",
    poster: "https://www18.pelisplushd.to/poster/sin-limites-thumb.jpg",
    classification: "R",
    rating: 4,
    director: "Neil Burger",
    synopsis:
      "Sin Límites (2011) es un thriller de ciencia ficción donde un escritor fracasado descubre una misteriosa droga que le permite usar el 100% de su capacidad cerebral. Con habilidades mentales sobrehumanas, comienza a escalar en el mundo financiero, pero pronto se ve atrapado en una red peligrosa de poder, ambición y consecuencias mortales. Una adictiva mezcla de suspenso, inteligencia y adrenalina.",
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
        <span
          key={i}
          className={i <= rating ? "text-gold-400" : "text-gray-400"}
          aria-hidden="true"
        >
          ★
        </span>
      );
    }
    return <span aria-label={`Valoración ${rating} de 5`}>{stars}</span>;
  };

  const handleScheduleClick = (day, time) => {
    if (reserveButtonRef.current) {
      reserveButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      reserveButtonRef.current.focus();
    }
    setNotification(`Genial Vamos a reservar tus asientos`);
    setTimeout(() => setNotification(''), 3000);
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
            <img
              src={logo}
              alt="EsCine Logo"
              className="max-h-20 w-auto object-contain"
              loading="lazy"
            />
          </Link>
          <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-0">
            <Link
              to="/"
              className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all text-base font-body font-semibold"
            >
              Inicio
            </Link>
            <Link
              to="/reviews"
              className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold"
            >
              Reseñas
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold"
            >
              Contacto
            </Link>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <div
        className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-center text-gray-100 mb-2 shadow-md animate-glow relative z-10"
        aria-live="polite"
      >
        <p className="text-base font-body font-semibold">
          ¡Solo quedan pocos asientos para "{movie.title}" hoy, {currentDateTime}!{' '}
          <strong>Más de 500 fans ya reservaron.</strong>
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Título de la película */}
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6 text-gold-400">
            {movie.title} - ¡Tu épica aventura te espera!
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Horarios de proyección */}
            <div className="w-full md:w-1/3 bg-gray-900 p-6 rounded-lg shadow-2xl animate-glow">
              <h2 className="text-2xl font-heading font-semibold mb-4 text-gray-100">
                Horarios Disponibles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(schedules).map(([day, times]) => (
                  <div key={day} className="min-w-[120px]">
                    <h3 className="font-body font-medium text-gray-100">{day}</h3>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {times.map((time, index) => (
                        <li
                          key={index}
                          className="hover:text-gold-400 cursor-pointer transition-all"
                          role="button"
                          aria-label={`Seleccionar horario ${time} para ${day}`}
                          tabIndex={0}
                          onClick={() => handleScheduleClick(day, time)}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && handleScheduleClick(day, time)
                          }
                        >
                          {time}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Poster e información */}
            <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="w-full md:w-1/2">
                <div className="relative group">
                  <div className="aspect-[2/3] overflow-hidden rounded-lg">
                    <img
                      src={movie.poster}
                      alt={`Póster de ${movie.title}`}
                      className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <p className="text-gray-100 text-sm font-body font-semibold">
                      {movie.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información de la película */}
              <div className="w-full md:w-1/2 bg-gray-900 p-6 rounded-lg shadow-2xl animate-glow">
                <p className="mb-2 text-lg font-body">
                  <strong>Clasificación:</strong>{' '}
                  <span className="text-red-400">{movie.classification}</span>
                </p>
                <p className="mb-2 text-lg font-body">
                  <strong>Valoración:</strong> {renderStars(movie.rating)}
                </p>
                <p className="mb-2 text-lg font-body">
                  <strong>Director:</strong>{' '}
                  <span className="text-gray-300">{movie.director}</span>
                </p>
                <p className="mb-4 text-lg font-body">
                  <strong>Sinopsis:</strong>{' '}
                  <span className="text-gray-300">{movie.synopsis}</span>
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 font-body">
                  <span>Seguro y fácil</span>
                  <span className="bg-teal-900 text-teal-400 px-2 py-1 rounded-full">
                    Certificado
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de conversión con CTA */}
          <div className="mt-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg shadow-2xl animate-glow">
            <p className="text-gray-100 text-xl font-body mb-4">
              ¡Reserva ahora y obtén un 10% de descuento en tu próxima compra!
            </p>
            <button
              ref={reserveButtonRef}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:from-amber-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-amber-400/50 animate-pulse-slow"
              onClick={() => navigate(`/seat/${movie.id}`)}
              aria-label="Reserva tu asiento ahora"
            >
              ¡Reserva tu aventura ahora!
            </button>
          </div>
        </div>
      </main>

      {/* Notificación Toast */}
      {notification && (
        <div
          className="fixed bottom-4 right-4 bg-teal-500 text-gray-100 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50"
          role="alert"
          aria-live="polite"
        >
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

export default ReservationSummary;