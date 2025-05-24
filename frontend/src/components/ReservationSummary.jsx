import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function ReservationSummary() {
  // Usar useNavigate para la navegación (React Router v6)
  const navigate = useNavigate();

  // Datos dummy
  const movie = {
    id: 8, // Coincide con los datos de Home.jsx
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

          <nav className="hidden md:block"></nav>

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
          <h1 className="text-3xl font-bold mb-6">{movie.title}</h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Horarios de proyección (izquierda) */}
            <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Horarios de Proyección</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(schedules).map(([day, times]) => (
                  <div key={day} className="min-w-[120px] mb-2">
                    <h3 className="font-medium">{day}</h3>
                    <ul className="list-disc list-inside text-sm">
                      {times.map((time, index) => (
                        <li key={index} className="whitespace-nowrap">{time}</li>
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
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Información de la película (derecha) */}
              <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
                <p className="mb-2"><strong>Clasificación:</strong> {movie.classification}</p>
                <p className="mb-2">
                  <strong>Valoración:</strong> {renderStars(movie.rating)}
                </p>
                <p className="mb-2"><strong>Director:</strong> {movie.director}</p>
                <p className="mb-2"><strong>Sinopsis:</strong> {movie.synopsis}</p>
              </div>
            </div>
          </div>

          {/* Botón Reservar */}
          <div className="mt-6 text-center">
            <button
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
              onClick={() => navigate(`/seat/${movie.id}`)}
            >
              Reservar
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