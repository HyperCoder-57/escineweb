import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

function SeatSelector() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [globalReservedSeats, setGlobalReservedSeats] = useState({});
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [seats, setSeats] = useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [highlightConfirmButton, setHighlightConfirmButton] = useState(false);
  const [movie, setMovie] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const confirmButtonRef = useRef(null);

  // Obtener detalles de la película
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error al obtener película:', error);
        setNotification('Error al cargar los detalles de la película.');
      }
    };
    fetchMovie();
  }, [id]);

  // Obtener asientos y reservas temporales
  useEffect(() => {
    if (!selectedBranch || !selectedDate || !selectedTime || !movie?.Showtimes) {
      setSeats([]);
      setGlobalReservedSeats((prev) => {
        const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
        return { ...prev, [key]: [] };
      });
      return;
    }

    const fetchSeats = async () => {
      try {
        const showtime = movie.Showtimes.find(
          (s) => s.branchId === parseInt(selectedBranch) && s.date === selectedDate && s.time === selectedTime
        );
        if (!showtime) {
          console.error('Showtime no encontrado:', { branchId: selectedBranch, date: selectedDate, time: selectedTime });
          setNotification('Horario no disponible. Por favor, selecciona otro.');
          return;
        }

        console.log('Showtime seleccionado:', { showtimeId: showtime.id, branchId: selectedBranch, date: selectedDate, time: selectedTime });

        // Obtener asientos
        try {
          const seatResponse = await axios.get(`http://localhost:5000/api/reservations/seats?showtimeId=${showtime.id}`);
          console.log('Respuesta de la API (seats):', seatResponse.data);
          const seatData = seatResponse.data
            .filter((seat) => Number.isInteger(seat.row) && Number.isInteger(seat.col) && seat.row > 0 && seat.col > 0)
            .map((seat) => ({
              id: seat.id,
              row: seat.row,
              col: seat.col,
              status: seat.status || 'available',
            }));
          console.log('Asientos filtrados:', seatData);
          setSeats(seatData);
        } catch (seatError) {
          if (seatError.response?.status === 404) {
            console.warn('No hay asientos para showtimeId:', showtime.id);
            setSeats([]);
            setNotification('No hay asientos disponibles para este horario.');
          } else {
            throw seatError;
          }
        }

        // Obtener reservas temporales
        try {
          const reservedResponse = await axios.get(
            `http://localhost:5000/api/reservations/temporary?showtimeId=${showtime.id}`
          );
          setGlobalReservedSeats((prev) => {
            const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
            return { ...prev, [key]: reservedResponse.data.map((seat) => seat.id) };
          });
        } catch (tempError) {
          console.warn('Advertencia: No se pudieron obtener reservas temporales:', tempError);
          setGlobalReservedSeats((prev) => {
            const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
            return { ...prev, [key]: [] };
          });
        }
      } catch (error) {
        console.error('Error al obtener asientos:', error);
        setNotification('Error al cargar los asientos. Intenta de nuevo.');
      }
    };
    fetchSeats();
  }, [selectedBranch, selectedDate, selectedTime, movie]);

  // Manejar clic en un asiento
  const handleSeatClick = (seatId) => {
    if (timeLeft <= 0) return;

    const seat = seats.find((s) => s.id === seatId);
    const totalSelected = selectedSeats.length + reservedSeats.length;

    if (seat?.status === 'available') {
      if (totalSelected >= 5 && !selectedSeats.includes(seatId)) {
        setNotification('¡Has alcanzado el límite de 5 asientos! Confirma tu selección o deselecciona alguno.');
        return;
      }
      setSelectedSeats((prev) =>
        prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
      );
    } else if (seat?.status === 'temporary' || seat?.status === 'reserved') {
      setNotification('Este asiento está reservado por otro usuario. ¡Elige otro!');
    }
  };

  // Temporizador de 5 minutos
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
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, selectedBranch, selectedDate, selectedTime]);

  // Crear reserva temporal después de 5 segundos
  useEffect(() => {
    if (selectedSeats.length > 0) {
      const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
      const showtime = movie?.Showtimes.find(
        (s) => s.branchId === parseInt(selectedBranch) && s.date === selectedDate && s.time === selectedTime
      );
      if (showtime) {
        const timeout = setTimeout(async () => {
          try {
            await axios.post(`http://localhost:5000/api/reservations/temporary`, {
              showtimeId: showtime.id,
              seatIds: selectedSeats,
              userId: user?.id,
            });
            setReservedSeats((prev) => [...new Set([...prev, ...selectedSeats])]);
            setSelectedSeats([]);
            setGlobalReservedSeats((prev) => {
              const currentReserved = prev[key] || [];
              return { ...prev, [key]: [...new Set([...currentReserved, ...selectedSeats])] };
            });
          } catch (error) {
            console.error('Error al crear reserva temporal:', error);
            setNotification('Error al reservar asientos temporalmente.');
          }
        }, 5000);
        return () => clearTimeout(timeout);
      }
    }
  }, [selectedSeats, selectedBranch, selectedDate, selectedTime, movie, user?.id]);

  // Liberar reservas temporales después de 5 minutos
  useEffect(() => {
    if (reservedSeats.length > 0) {
      const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
      const showtime = movie?.Showtimes.find(
        (s) => s.branchId === parseInt(selectedBranch) && s.date === selectedDate && s.time === selectedTime
      );
      if (showtime) {
        const timeout = setTimeout(async () => {
          try {
            await axios.delete(`http://localhost:5000/api/reservations/temporary`, {
              data: { showtimeId: showtime.id, seatIds: reservedSeats, userId: user?.id },
            });
            setReservedSeats([]);
            setGlobalReservedSeats((prev) => {
              const currentReserved = prev[key] || [];
              return { ...prev, [key]: currentReserved.filter((seatId) => !reservedSeats.includes(seatId)) };
            });
            setNotification('Tus asientos reservados han expirado. ¡Selecciona de nuevo!');
          } catch (error) {
            console.error('Error al eliminar reserva temporal:', error);
            setNotification('Error al liberar asientos temporales.');
          }
        }, 300000); // 5 minutos
        return () => clearTimeout(timeout);
      }
    }
  }, [reservedSeats, selectedBranch, selectedDate, selectedTime, movie, user?.id]);

  // Resaltar botón de confirmación al seleccionar 5 asientos
  useEffect(() => {
    if (selectedSeats.length === 5 && !hasScrolled) {
      if (confirmButtonRef.current) {
        confirmButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightConfirmButton(true);
        setHasScrolled(true);
      }
    } else if (selectedSeats.length < 5) {
      setHasScrolled(false);
      setHighlightConfirmButton(false);
    }
  }, [selectedSeats.length, hasScrolled]);

  // Formatear tiempo restante
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Verificar si el botón de confirmar está deshabilitado
  const isButtonDisabled =
    !selectedBranch ||
    !selectedDate ||
    !selectedTime ||
    selectedSeats.length + reservedSeats.length === 0 ||
    timeLeft <= 0 ||
    !isLoggedIn;

  // Manejar clics en el avatar
  const handleAvatarClick = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleAuth = () => {
    setShowDialog(false);
    navigate('/login');
  };

  // Manejar búsqueda
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    console.log(`Buscando: ${value}`);
  };

  // Cerrar notificación
  const dismissNotification = () => setNotification('');

  // Fecha y hora actual
  const currentDateTime = new Date().toLocaleString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Confirmar reserva
  const handleReserve = async () => {
    if (isButtonDisabled) {
      setNotification('Por favor, completa todas las selecciones y elige al menos un asiento.');
      return;
    }
    try {
      const showtime = movie.Showtimes.find(
        (s) => s.branchId === parseInt(selectedBranch) && s.date === selectedDate && s.time === selectedTime
      );
      if (!showtime) throw new Error('Horario no encontrado');

      const reservationData = {
        movieId: movie.id,
        showtimeId: showtime.id,
        seatIds: [...new Set([...selectedSeats, ...reservedSeats])],
      };
      const response = await axios.post('http://localhost:5000/api/reservations/reserve-multiple', reservationData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setNotification('¡Reserva confirmada con éxito! Te hemos regalado palomitas gratis.');
      setSelectedSeats([]);
      setReservedSeats([]);
      setHasScrolled(false);
      setGlobalReservedSeats((prev) => {
        const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
        return { ...prev, [key]: [] };
      });
      setTimeout(() => navigate('/profile'), 2000);
    } catch (error) {
      console.error('Error al reservar:', error);
      setNotification('Error al procesar la reserva. Intenta de nuevo.');
    }
  };

  // Renderizar cuadrícula de asientos
  const renderSeatGrid = () => {
    if (!seats.length) return <p className="text-gray-300 font-body">No hay asientos disponibles.</p>;

    // Calcular maxRow y maxCol solo con asientos válidos
    const validSeats = seats.filter((seat) => Number.isInteger(seat.row) && Number.isInteger(seat.col) && seat.row > 0 && seat.col > 0);
    if (!validSeats.length) {
      console.error('No hay asientos válidos después de filtrar:', seats);
      return <p className="text-red-600 font-body">Error: No se encontraron asientos válidos.</p>;
    }

    const maxRow = Math.max(...validSeats.map((seat) => seat.row));
    const maxCol = Math.max(...validSeats.map((seat) => seat.col));
    console.log('Dimensiones de la cuadrícula:', { maxRow, maxCol });

    // Crear matriz de asientos
    const seatGrid = Array.from({ length: maxRow }, () => Array(maxCol).fill(null));
    validSeats.forEach((seat) => {
      if (seat.row <= maxRow && seat.col <= maxCol) {
        seatGrid[seat.row - 1][seat.col - 1] = seat;
      } else {
        console.warn('Asiento fuera de rango:', seat);
      }
    });

    return (
      <div className="flex flex-col items-center">
        <div className="flex mb-2">
          <span className="w-6"></span>
          {Array.from({ length: maxCol }, (_, i) => (
            <span key={i} className="w-6 text-center text-xs font-body text-gray-300">{i + 1}</span>
          ))}
        </div>
        {seatGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center mb-1">
            <span className="w-6 text-center text-xs font-body text-gray-300 mr-2">
              {String.fromCharCode(65 + rowIndex)}
            </span>
            {row.map((seat, colIndex) => {
              if (!seat) {
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="w-6 h-6 mx-1 rounded bg-gray-600 cursor-not-allowed"
                    aria-hidden="true"
                  ></div>
                );
              }
              const isSelected = selectedSeats.includes(seat.id);
              const isUserReserved = reservedSeats.includes(seat.id);
              const isOtherReserved = seat.status === 'temporary' && !isUserReserved;

              return (
                <button
                  key={seat.id}
                  className={`w-6 h-6 mx-1 flex items-center justify-center rounded
                    ${isSelected || isUserReserved ? 'bg-blue-600' : isOtherReserved ? 'bg-yellow-400' : seat.status === 'reserved' ? 'bg-red-600' : 'bg-green-600'}
                    ${!isOtherReserved && seat.status !== 'reserved' && timeLeft > 0 ? 'cursor-pointer hover:bg-blue-500' : 'cursor-not-allowed'}
                    transition-all`}
                  onClick={() => handleSeatClick(seat.id)}
                  disabled={isOtherReserved || seat.status === 'reserved' || timeLeft <= 0}
                  aria-label={`Asiento ${String.fromCharCode(65 + rowIndex)}${colIndex + 1} ${isSelected ? 'seleccionado' : isUserReserved ? 'reservado' : isOtherReserved ? 'reservado temporalmente' : seat.status === 'reserved' ? 'reservado' : 'disponible'}`}
                  aria-selected={isSelected || isUserReserved}
                >
                  <span className="text-sm text-gray-200">🎟️</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 animate-bg text-gray-100 relative overflow-hidden">
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

      <header className="bg-gray-900 bg-opacity-90 text-gray-100 p-4 shadow-lg z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Cinema Logo" className="max-h-20 w-auto object-contain" loading="lazy" />
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
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar tu próxima aventura..."
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Buscar películas"
              aria-describedby="search-description"
            />
            <span id="search-description" className="sr-only">Busca películas por título</span>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400">🔍</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={handleAvatarClick}>
            <div
              className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all"
              aria-label={isLoggedIn && user ? `Perfil de ${user.name || 'Usuario'}` : 'Iniciar sesión'}
            >
              <span className="text-xl text-gray-900">👤</span>
            </div>
            <span className="text-sm font-body font-medium">
              {isLoggedIn && user ? user.name || 'Usuario' : 'Invitado'}
            </span>
          </div>
        </div>
      </header>

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
              {isLoggedIn && user
                ? `¡Estás listo para vivir aventuras épicas en la gran pantalla, ${user.name || 'Usuario'}!`
                : '¡Embárcate en una aventura! Inicia sesión o regístrate para desbloquear contenido exclusivo.'}
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

      <div
        className="bg-gradient-to-r from-indigo-800 to-purple-800 p-3 text-center text-gray-100 mb-2 shadow-md animate-pulse-slow relative z-10"
        aria-live="polite"
      >
        <p className="text-base font-body font-semibold">
          ¡Últimos asientos para {movie?.title || 'la película'} hoy, {currentDateTime}! <strong>Reserva ahora.</strong>
        </p>
      </div>

      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 bg-gray-900 p-6 rounded-lg shadow-2xl animate-pulse-slow">
            <h2 className="text-xl font-heading font-bold text-gold-400 mb-4">Selecciona tu función</h2>
            <div className="mb-4">
              <label htmlFor="branch" className="block mb-2 font-body font-medium text-gray-300">
                Sucursal <span className="text-red-800">*</span>
              </label>
              <select
                id="branch"
                className={`w-full p-2 rounded-lg bg-gray-800 border ${
                  !selectedBranch
                    ? 'border-red-800 focus:ring-red-800 animate-pulse'
                    : 'border-gray-600 focus:ring-indigo-600'
                } text-gray-100 focus:outline-none focus:ring-2`}
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                aria-required="true"
                aria-describedby="branch-description"
              >
                <option value="">Elige una sucursal</option>
                {movie?.Showtimes?.map((showtime) => (
                  <option key={showtime.id} value={showtime.branchId}>
                    {showtime.Branch?.name || `Sucursal ${showtime.branchId}`}
                  </option>
                ))}
              </select>
              <span id="branch-description" className="sr-only">Selecciona la sucursal donde deseas ver la película</span>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block mb-2 font-body font-medium text-gray-300">
                Fecha <span className="text-red-800">*</span>
              </label>
              <select
                id="date"
                className={`w-full p-2 rounded-lg bg-gray-800 border ${
                  selectedBranch && !selectedDate
                    ? 'border-red-800 focus:ring-red-800 animate-pulse'
                    : 'border-gray-600 focus:ring-indigo-600'
                } text-gray-100 focus:outline-none focus:ring-2`}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                disabled={!selectedBranch}
                aria-required="true"
                aria-describedby="date-description"
              >
                <option value="">Elige una fecha</option>
                {movie?.Showtimes
                  ?.filter((showtime) => showtime.branchId === parseInt(selectedBranch))
                  ?.map((showtime) => (
                    <option key={showtime.id} value={showtime.date}>
                      {new Date(showtime.date).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </option>
                  ))}
              </select>
              <span id="date-description" className="sr-only">Selecciona la fecha de la función</span>
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block mb-2 font-body font-medium text-gray-300">
                Hora <span className="text-red-800">*</span>
              </label>
              <select
                id="time"
                className={`w-full p-2 rounded-lg bg-gray-800 border ${
                  selectedDate && !selectedTime
                    ? 'border-red-800 focus:ring-red-800 animate-pulse'
                    : 'border-gray-600 focus:ring-indigo-600'
                } text-gray-100 focus:outline-none focus:ring-2`}
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                disabled={!selectedDate}
                aria-required="true"
                aria-describedby="time-description"
              >
                <option value="">Elige una hora</option>
                {movie?.Showtimes
                  ?.filter((showtime) => showtime.branchId === parseInt(selectedBranch) && showtime.date === selectedDate)
                  ?.map((showtime) => (
                    <option key={showtime.id} value={showtime.time}>
                      {showtime.time}
                    </option>
                  ))}
              </select>
              <span id="time-description" className="sr-only">Selecciona la hora de la función</span>
            </div>
          </div>

          <div className="w-full md:w-2/4 bg-gray-900 p-6 rounded-lg shadow-2xl animate-pulse-slow">
            <h2 className="text-xl font-heading font-bold text-gold-400 mb-4">Elige tus asientos</h2>
            {renderSeatGrid()}
            <div className="mt-4 text-sm font-body text-gray-300 flex justify-center gap-4">
              <span>🟢 Disponible</span>
              <span>🔵 Seleccionado</span>
              <span>🟡 Reservado Temporal</span>
              <span>🔴 Reservado</span>
            </div>
            {(selectedSeats.length > 0 || reservedSeats.length > 0) && (
              <p className="mt-4 text-center text-teal-600 font-body font-semibold">
                ¡Genial! Has seleccionado o reservado {selectedSeats.length + reservedSeats.length} asiento(s). Confirma ahora.
              </p>
            )}
            {reservedSeats.length > 0 && (
              <p className="mt-2 text-center text-gray-300 font-body font-semibold">
                Tienes {reservedSeats.length} asiento(s) reservados por 5 minutos. ¡Confirma pronto!
              </p>
            )}
          </div>

          <div
            className={`w-full md:w-1/4 p-6 rounded-lg shadow-2xl text-center animate-pulse-slow ${
              timeLeft <= 30 ? 'bg-gray-900 border-l-4 border-red-800' : 'bg-gray-900 border-l-4 border-indigo-600'
            }`}
          >
            <p className="mb-2 text-lg font-heading font-semibold text-gray-100">¡Apresúrate!</p>
            <p className={`text-3xl font-heading font-bold ${timeLeft <= 30 ? 'text-red-800' : 'text-teal-600'}`}>
              {formatTime(timeLeft)}
            </p>
            <p className="mt-2 text-sm font-body text-gray-400">Tiempo restante (hasta {currentDateTime})</p>
          </div>
        </div>

        <div
          className="mt-6 text-center bg-gradient-to-r from-indigo-800 to-purple-800 p-6 rounded-lg shadow-2xl animate-pulse-slow"
          ref={confirmButtonRef}
        >
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

      {notification && (
        <div
          className="fixed bottom-4 right-4 bg-teal-600 text-gray-100 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50"
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

      <Footer />
    </div>
  );
}

export default SeatSelector;