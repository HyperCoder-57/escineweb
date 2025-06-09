import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';

function SeatSelector() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [globalReservedSeats, setGlobalReservedSeats] = useState({});
  const [selectedBranch, setSelectedBranch] = useState(''); // Sin valor predeterminado, lo obtendremos del backend
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [seats, setSeats] = useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [highlightConfirmButton, setHighlightConfirmButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Sin forzar autenticación
  const confirmButtonRef = useRef(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
        // Simulación de sucursales (ajustar con backend real)
        setSelectedBranch('Cinepolis Perisur'); // Valor temporal
        setSelectedDate(response.data.Showtimes[0]?.date || '');
        setSelectedTime(response.data.Showtimes[0]?.time || '');
      } catch (error) {
        console.error('Error al obtener película:', error);
        setNotification('Error al cargar los detalles de la película.');
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const auth = localStorage.getItem('authToken'); // Usar autenticación real
    setIsAuthenticated(!!auth);
  }, []);

  useEffect(() => {
    if (!selectedBranch || !selectedDate || !selectedTime || !movie?.Showtimes) {
      setSeats([]);
      setGlobalReservedSeats((prev) => {
        const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
        return { ...prev, [key]: [] };
      });
      setSelectedCount(0);
      return;
    }

    const showtime = movie.Showtimes.find(
      (s) => s.date === selectedDate && s.time === selectedTime
    );
    if (!showtime) return;

    // Simulación de asientos (reemplazar con datos del backend)
    const originalSeats = Array(10)
      .fill()
      .map((_, i) =>
        Array(15)
          .fill()
          .map((_, j) => ({
            id: `${i}-${j}`,
            status: Math.random() < 0.3 ? 'occupied' : 'available',
          }))
      );

    const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
    const reservedForOthers = globalReservedSeats[key] || [];

    const updatedSeats = originalSeats.map((row) =>
      row.map((seat) => ({
        ...seat,
        status: reservedForOthers.includes(seat.id) && seat.status !== 'occupied'
          ? 'reserved'
          : seat.status,
      }))
    );

    setSeats(updatedSeats);
  }, [selectedBranch, selectedDate, selectedTime, movie]);

  const handleSeatClick = (rowIndex, colIndex) => {
    if (timeLeft <= 0) return;

    const seatId = `${rowIndex}-${colIndex}`;
    const seat = seats[rowIndex][colIndex];

    if (seat.status === 'available') {
      if (selectedCount >= 5 && !selectedSeats.includes(seatId)) {
        setNotification('¡Has alcanzado el límite de 5 asientos! Confirma tu selección o deselecciona alguno.');
        return;
      }
      setSelectedSeats((prev) => {
        const newSeats = prev.includes(seatId)
          ? prev.filter((id) => id !== seatId)
          : [...prev, seatId];
        setSelectedCount(newSeats.length);
        return newSeats;
      });
    } else if (seat.status === 'reserved') {
      setNotification('Este asiento está reservado por otro usuario. ¡Elige otro!');
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setNotification('Tiempo agotado. Por favor, reinicia la selección.');
      setSelectedSeats([]);
      setReservedSeats([]);
      setHasScrolled(false);
      setGlobalReservedSeats((prev) => {
        const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
        return { ...prev, [key]: [] };
      });
      setSelectedCount(0);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, selectedBranch, selectedDate, selectedTime]);

  useEffect(() => {
    if (selectedSeats.length > 0) {
      const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
      setGlobalReservedSeats((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), ...selectedSeats],
      }));

      const timeout = setTimeout(() => {
        setReservedSeats((prev) => [...prev, ...selectedSeats]);
        setSelectedSeats([]);
        setGlobalReservedSeats((prev) => {
          const currentReserved = prev[key] || [];
          const updatedReserved = currentReserved.filter((seatId) => !selectedSeats.includes(seatId));
          return { ...prev, [key]: updatedReserved };
        });
        setSelectedCount(0);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [selectedSeats, selectedBranch, selectedDate, selectedTime]);

  useEffect(() => {
    if (reservedSeats.length > 0) {
      const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
      const timeout = setTimeout(() => {
        setReservedSeats([]);
        setGlobalReservedSeats((prev) => {
          const currentReserved = prev[key] || [];
          const updatedReserved = currentReserved.filter((seatId) => !reservedSeats.includes(seatId));
          return { ...prev, [key]: updatedReserved };
        });
        setNotification('Tus asientos reservados han expirado. ¡Selecciona de nuevo!');
        setSelectedCount(0);
      }, 300000);
      return () => clearTimeout(timeout);
    }
  }, [reservedSeats, selectedBranch, selectedDate, selectedTime]);

  useEffect(() => {
    if (selectedCount === 5 && !hasScrolled) {
      if (confirmButtonRef.current) {
        confirmButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightConfirmButton(true);
        setHasScrolled(true);
      }
    } else if (selectedCount < 5) {
      setHasScrolled(false);
      setHighlightConfirmButton(false);
    }
  }, [selectedCount, hasScrolled]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isButtonDisabled = !selectedBranch || !selectedDate || !selectedTime || selectedCount === 0 || timeLeft <= 0 || !isAuthenticated;

  const handleAvatarClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      setNotification('¡Inicia sesión para continuar!');
      setTimeout(() => navigate('/auth'), 2000);
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    // Simulación de búsqueda (ajustar con backend)
    console.log(`Buscando: ${value}`);
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

  const handleReserve = async () => {
    if (isButtonDisabled) {
      setNotification('Por favor, completa todas las selecciones y elige al menos un asiento.');
      return;
    }
    try {
      const showtime = movie.Showtimes.find(
        (s) => s.date === selectedDate && s.time === selectedTime
      );
      if (!showtime) throw new Error('Horario no encontrado');

      const reservationData = {
        showtimeId: showtime.id,
        seatNumbers: selectedSeats.map((seatId) => parseInt(seatId.split('-').join(''))), // Ajustar formato
      };
      await axios.post('http://localhost:5000/api/reservations', reservationData);
      setNotification('¡Reserva confirmada con éxito! Te hemos regalado palomitas gratis.');
      setSelectedSeats([]);
      setReservedSeats([]);
      setHasScrolled(false);
      setGlobalReservedSeats((prev) => {
        const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
        return { ...prev, [key]: [] };
      });
      setSelectedCount(0);
      setTimeout(() => navigate('/profile'), 2000);
    } catch (error) {
      console.error('Error al reservar:', error);
      setNotification('Error al procesar la reserva. Intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 animate-bg text-gray-100 relative overflow-hidden">
      {/* Partículas */}
      <div className="absolute inset-0 opacity-20 z-0">
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
            <Link to="/" className="px-4 py-2 bg-indigo-800 rounded-lg hover:bg-indigo-700 transition-all text-base font-body font-semibold">Inicio</Link>
            <Link to="/reviews" className="px-4 py-2 bg-transparent border-2 border-indigo-800 rounded-lg hover:bg-indigo-800 transition-all text-base font-body font-semibold">Reseñas</Link>
            <Link to="/contact" className="px-4 py-2 bg-transparent border-2 border-indigo-800 rounded-lg hover:bg-indigo-800 transition-all text-base font-body font-semibold">Contacto</Link>
          </nav>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar tu próxima aventura..."
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              aria-label="Buscar películas"
              aria-describedby="search-description"
            />
            <span id="search-description" className="sr-only">Busca películas por título</span>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600">🔍</span>
          </div>
          <button
            className="flex flex-col items-center cursor-pointer"
            onClick={handleAvatarClick}
            aria-label={isAuthenticated ? "Ver perfil" : "Iniciar sesión"}
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all">
              <span className="text-xl text-gray-900">👤</span>
            </div>
            <span className="text-sm font-body font-medium">{isAuthenticated ? "Usuario" : "Invitado"}</span>
          </button>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-3 text-center text-gray-100 mb-2 shadow-md animate-pulse-slow relative z-10" aria-live="polite">
        <p className="text-base font-body font-semibold">
          ¡Últimos asientos para {movie?.title || 'la película'} hoy, {currentDateTime}! <strong>Reserva ahora.</strong>
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Panel de selección */}
          <div className="w-full md:w-1/4 bg-gray-900 p-6 rounded-lg shadow-2xl animate-pulse-slow">
            <h2 className="text-xl font-heading font-bold text-gold-400 mb-4">Selecciona tu función</h2>
            <div className="mb-4">
              <label htmlFor="branch" className="block mb-2 font-body font-medium text-gray-300">Sucursal <span className="text-red-800">*</span></label>
              <select
                id="branch"
                className={`w-full p-2 rounded-lg bg-gray-800 border ${!selectedBranch ? 'border-red-800 focus:ring-red-800 animate-pulse' : 'border-gray-600 focus:ring-indigo-600'} text-gray-100 focus:outline-none focus:ring-2`}
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setSelectedDate('');
                  setSelectedTime('');
                  setSelectedSeats([]);
                  setReservedSeats([]);
                  setHasScrolled(false);
                  setSelectedCount(0);
                  setNotification('¡Buen comienzo! Ahora elige una fecha.');
                }}
                aria-required="true"
                aria-describedby="branch-description"
              >
                <option value="">Elige una sucursal</option>
                <option value="Cinepolis Perisur">Cinepolis Perisur</option>
                <option value="Cinepolis Satélite">Cinepolis Satélite</option>
                <option value="Cinepolis Universidad">Cinepolis Universidad</option>
              </select>
              <span id="branch-description" className="sr-only">Selecciona la sucursal donde deseas ver la película</span>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block mb-2 font-body font-medium text-gray-300">Fecha <span className="text-red-800">*</span></label>
              <select
                id="date"
                className={`w-full p-2 rounded-lg bg-gray-800 border ${selectedBranch && !selectedDate ? 'border-red-800 focus:ring-red-800 animate-pulse' : 'border-gray-600 focus:ring-indigo-600'} text-gray-100 focus:outline-none focus:ring-2`}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime('');
                  setSelectedSeats([]);
                  setReservedSeats([]);
                  setHasScrolled(false);
                  setSelectedCount(0);
                  setNotification('¡Perfecto! Ahora selecciona una hora.');
                }}
                disabled={!selectedBranch}
                aria-required="true"
                aria-describedby="date-description"
              >
                <option value="">Elige una fecha</option>
                {movie?.Showtimes?.map((showtime) => (
                  <option key={showtime.id} value={showtime.date}>
                    {new Date(showtime.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </option>
                ))}
              </select>
              <span id="date-description" className="sr-only">Selecciona la fecha de la función</span>
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block mb-2 font-body font-medium text-gray-300">Hora <span className="text-red-800">*</span></label>
              <select
                id="time"
                className={`w-full p-2 rounded-lg bg-gray-800 border ${selectedDate && !selectedTime ? 'border-red-800 focus:ring-red-800 animate-pulse' : 'border-gray-600 focus:ring-indigo-600'} text-gray-100 focus:outline-none focus:ring-2`}
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value);
                  setSelectedSeats([]);
                  setReservedSeats([]);
                  setHasScrolled(false);
                  setSelectedCount(0);
                  setNotification('¡Listo! Ahora elige tus asientos.');
                }}
                disabled={!selectedDate || !movie?.Showtimes}
                aria-required="true"
                aria-describedby="time-description"
              >
                <option value="">Elige una hora</option>
                {movie?.Showtimes
                  ?.filter((showtime) => showtime.date === selectedDate)
                  ?.map((showtime) => (
                    <option key={showtime.id} value={showtime.time}>
                      {showtime.time}
                    </option>
                  ))}
              </select>
              <span id="time-description" className="sr-only">Selecciona la hora de la función</span>
            </div>
          </div>

          {/* Panel de Asientos */}
          <div className="w-full md:w-2/4 bg-gray-900 p-6 rounded-lg shadow-2xl animate-pulse-slow">
            <h2 className="text-xl font-heading font-bold text-gold-400 mb-4">Elige tus asientos</h2>
            <div className="flex flex-col items-center">
              <div className="flex mb-2">
                {Array.from({ length: 15 }, (_, i) => (
                  <span key={i} className="w-6 text-center text-xs font-body text-gray-300">{i + 1}</span>
                ))}
              </div>
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center mb-1">
                  <span className="w-6 text-center text-xs font-body text-gray-300 mr-2">{String.fromCharCode(65 + rowIndex)}</span>
                  <div className="grid gap-1 grid-cols-[repeat(15,_1fr)]">
                    {row.map((seat, colIndex) => {
                      const seatId = `${rowIndex}-${colIndex}`;
                      const isSelected = selectedSeats.includes(seatId);
                      const isUserReserved = reservedSeats.includes(seatId);
                      const isOtherReserved = seat.status === 'reserved' && !isUserReserved;
                      const isOccupied = seat.status === 'occupied';

                      return (
                        <button
                          key={seat.id}
                          className={`w-6 h-6 flex items-center justify-center rounded
                            ${(isSelected || isUserReserved) ? 'bg-indigo-600' : isOtherReserved ? 'bg-gold-400' : isOccupied ? 'bg-red-800' : 'bg-teal-600'}
                            ${!isOccupied && !isOtherReserved && timeLeft > 0 ? 'cursor-pointer hover:bg-indigo-500' : 'cursor-not-allowed'}
                            transition-all`}
                          onClick={() => handleSeatClick(rowIndex, colIndex)}
                          disabled={isOccupied || isOtherReserved || timeLeft <= 0}
                          aria-label={`Asiento ${String.fromCharCode(65 + rowIndex)}${colIndex + 1} ${isSelected ? 'seleccionado' : isUserReserved ? 'reservado' : isOtherReserved ? 'reservado por otro' : isOccupied ? 'ocupado' : 'disponible'}`}
                          aria-selected={isSelected || isUserReserved}
                        >
                          <span className="text-sm text-gray-200">🎟️</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm font-body text-gray-300 flex justify-center gap-4">
              <span>🟢 Disponible</span>
              <span>🔵 Seleccionado</span>
              <span>🟡 Reservado</span>
              <span>🔴 Ocupado</span>
            </div>
            {selectedCount > 0 && (
              <p className="mt-4 text-center text-teal-600 font-body font-semibold">
                ¡Genial! Has seleccionado {selectedCount} asiento(s). Confirma ahora.
              </p>
            )}
            {reservedSeats.length > 0 && (
              <p className="mt-2 text-center text-gray-300 font-body font-semibold">
                Tienes {reservedSeats.length} asiento(s) reservados por 5 minutos. ¡Confirma pronto!
              </p>
            )}
          </div>

          {/* Temporizador */}
          <div className={`w-full md:w-1/4 p-6 rounded-lg shadow-2xl text-center animate-pulse-slow ${timeLeft <= 30 ? 'bg-gray-900 border-l-4 border-red-800' : 'bg-gray-900 border-l-4 border-indigo-600'}`}>
            <p className="mb-2 text-lg font-heading font-semibold text-gray-100">¡Apresúrate!</p>
            <p className={`text-3xl font-heading font-bold ${timeLeft <= 30 ? 'text-red-800' : 'text-teal-600'}`}>
              {formatTime(timeLeft)}
            </p>
            <p className="mt-2 text-sm font-body text-gray-400">Tiempo restante (hasta {currentDateTime})</p>
          </div>
        </div>

        <div className="mt-6 text-center bg-gradient-to-r from-indigo-800 to-purple-800 p-6 rounded-lg shadow-2xl animate-pulse-slow" ref={confirmButtonRef}>
          <p className="text-gray-100 text-xl font-body mb-4">
            ¡Confirma ahora y obtén palomitas gratis 🎁! Más de 300 fans ya están listos.
          </p>
          <button
            className={`bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 rounded-full font-body font-semibold text-lg hover:from-amber-400 hover:to-yellow-500 transition-all hover:shadow-amber-400/50 hover:scale-105 hover-sparkle relative
              ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${highlightConfirmButton ? 'shadow-[0_0_15px_rgba(245,158,11,0.9)] animate-pulse-slow' : ''}`}
            disabled={isButtonDisabled}
            onClick={handleReserve}
            aria-disabled={isButtonDisabled}
            aria-label="Confirmar reserva de asientos"
          >
            ¡Asegura tu lugar mágico ahora!
          </button>
          <p className="text-gray-100 text-sm font-body mt-4">Reserva segura | Cancelación gratuita</p>
        </div>
      </main>

      {/* Notificación Toast */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-teal-600 text-gray-100 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50" role="alert" aria-live="polite">
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

      <Footer />
    </div>
  );
}

export default SeatSelector;