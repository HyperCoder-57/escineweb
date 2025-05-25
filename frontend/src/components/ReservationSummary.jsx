import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function ReservationSummary() {
  const navigate = useNavigate();

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
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
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

          {/* Banner de urgencia y prueba social */}
          <div className="bg-gradient-to-r from-yellow-400 to-red-500 text-white p-2 md:p-3 rounded-lg text-center shadow-lg animate-pulse w-full md:w-auto mx-auto md:mx-0">
            <p className="text-sm md:text-base font-bold">
              ¡Solo quedan pocos asientos para "Sin Límites" hoy, 24 de mayo de 2025! 
              <span className="block md:inline">Más de 500 fans ya reservaron. ¡Sé el próximo!</span>
            </p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl text-black">👤</span>
            </div>
            <span className="text-sm mt-1">Usuario</span>
          </div>
        </div>
      </header>

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow">
        <div className="max-w-5xl mx-auto">
          {/* Título de la película */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 animate-fade-in">
            {movie.title} - ¡Tu épica aventura te espera!
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Horarios de proyección (izquierda) */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Horarios Disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(schedules).map(([day, times]) => (
                  <div key={day} className="min-w-[120px] mb-2">
                    <h3 className="font-medium text-gray-700">{day}</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {times.map((time, index) => (
                        <li key={index} className="hover:text-blue-500 cursor-pointer transition">
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
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Información de la película (derecha) */}
              <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-xl border-r-4 border-red-500 hover:shadow-2xl transition">
                <p className="mb-2 text-lg"><strong>Clasificación:</strong> <span className="text-red-600">{movie.classification}</span></p>
                <p className="mb-2 text-lg">
                  <strong>Valoración:</strong> {renderStars(movie.rating)}
                </p>
                <p className="mb-2 text-lg"><strong>Director:</strong> <span className="text-gray-700">{movie.director}</span></p>
                <p className="mb-4 text-lg"><strong>Sinopsis:</strong> <span className="text-gray-600">{movie.synopsis}</span></p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Seguro y fácil</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Certificado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de conversión con CTA */}
          <div className="mt-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-2xl animate-bounce-slow">
            <p className="text-white text-xl mb-4">
              ¡Reserva ahora y obtén un 10% de descuento en tu próxima compra!
            </p>
            <button
              className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-xl hover:bg-yellow-500 transition-transform hover:scale-105 shadow-lg"
              onClick={() => navigate(`/seat/${movie.id}`)}
            >
              ¡Reserva tu aventura ahora!
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            A Mr. Tony Production EsCine<br />© 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ReservationSummary;