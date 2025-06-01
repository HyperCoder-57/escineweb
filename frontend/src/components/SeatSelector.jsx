import { Link, useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect, useRef } from 'react';

function SeatSelector() {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]); // Reservas del usuario actual
  const [globalReservedSeats, setGlobalReservedSeats] = useState({}); // Reservas de "otros usuarios"
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [notification, setNotification] = useState('');
  const [seats, setSeats] = useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [highlightConfirmButton, setHighlightConfirmButton] = useState(false);
  const [isLoggedIn] = useState(true); // Estado simulado para el avatar
  const confirmButtonRef = useRef(null);
  const [selectedCount, setSelectedCount] = useState(0); // Contador de asientos seleccionados

  const movie = { title: "The Passion", id: parseInt(id) || 1 };

  const branchesData = [
    {
      name: "Cinepolis Perisur",
      dates: [
        { date: "2025-05-30", times: ["2:00 pm", "4:00 pm", "7:00 pm"], seats: generateSeats(10, 15, 0.3, 0.1) },
        { date: "2025-05-31", times: ["10:00 am", "1:00 pm", "4:00 pm", "7:00 pm"], seats: generateSeats(10, 15, 0.25, 0.15) },
        { date: "2025-06-01", times: ["12:00 pm", "3:00 pm", "6:00 pm", "9:00 pm"], seats: generateSeats(10, 15, 0.2, 0.05) },
      ],
    },
    {
      name: "Cinepolis Satélite",
      dates: [
        { date: "2025-05-30", times: ["2:00 pm", "4:00 pm"], seats: generateSeats(10, 15, 0.2, 0.1) },
        { date: "2025-05-31", times: ["12:00 pm", "3:00 pm", "6:00 pm"], seats: generateSeats(10, 15, 0.15, 0.05) },
        { date: "2025-06-01", times: ["10:00 am", "1:00 pm", "4:00 pm"], seats: generateSeats(10, 15, 0.1, 0.1) },
      ],
    },
    {
      name: "Cinepolis Universidad",
      dates: [
        { date: "2025-05-30", times: ["2:00 pm", "4:00 pm", "7:00 pm"], seats: generateSeats(10, 15, 0.4, 0.1) },
        { date: "2025-05-31", times: ["10:00 am", "1:00 pm", "4:00 pm"], seats: generateSeats(10, 15, 0.35, 0.15) },
        { date: "2025-06-01", times: ["12:00 pm", "3:00 pm", "6:00 pm"], seats: generateSeats(10, 15, 0.3, 0.05) },
      ],
    },
  ];

  function generateSeats(rows, cols, occupiedPercentage, reservedPercentage) {
    const seats = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const isOccupied = Math.random() < occupiedPercentage;
        const isReserved = !isOccupied && Math.random() < reservedPercentage;
        row.push({
          id: `${i}-${j}`,
          status: isOccupied ? 'occupied' : isReserved ? 'reserved' : 'available',
        });
      }
      seats.push(row);
    }
    return seats;
  }

  const currentBranch = branchesData.find((b) => b.name === selectedBranch) || branchesData[0];
  const availableDates = currentBranch ? currentBranch.dates : [];
  const currentDateData = availableDates.find((d) => d.date === selectedDate) || (availableDates[0] || {});
  const availableTimes = currentDateData.times || [];

  useEffect(() => {
    if (!selectedBranch || !selectedDate || !selectedTime) {
      setSeats([]);
      setGlobalReservedSeats((prev) => {
        const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
        return { ...prev, [key]: [] };
      });
      setSelectedCount(0); // Reiniciar contador al cambiar selección
      return;
    }

    const branch = branchesData.find((b) => b.name === selectedBranch);
    const date = branch?.dates.find((d) => d.date === selectedDate);
    const originalSeats = date?.seats || generateSeats(10, 15, 0.3, 0.1);

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
  }, [selectedBranch, selectedDate, selectedTime]);

  const handleSeatClick = (rowIndex, colIndex) => {
    if (timeLeft <= 0) return;

    const seatId = `${rowIndex}-${colIndex}`;
    const seat = seats[rowIndex][colIndex];

    if (seat.status === 'available') {
      if (selectedCount >= 5 && !selectedSeats.includes(seatId)) {
        setNotification('¡Has alcanzado el límite de 5 asientos! Confirma tu selección o deselecciona alguno para continuar. 😊');
        return;
      }
      setSelectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((id) => id !== seatId)
          : [...prev, seatId]
      );
      setSelectedCount((prev) =>
        selectedSeats.includes(seatId) ? prev - 1 : prev + 1
      );
    } else if (seat.status === 'reserved') {
      setNotification('Lo sentimos, este asiento está reservado por otro usuario. ¡Elige otro para asegurar tu lugar! 🎬');
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setNotification('Tiempo agotado. Por favor, reinicie la selección.');
      setSelectedSeats([]);
      setReservedSeats([]);
      setHasScrolled(false);
      setGlobalReservedSeats((prev) => {
        const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
        return { ...prev, [key]: [] };
      });
      setSelectedCount(0); // Reiniciar contador al agotar tiempo
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
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
        setNotification('Tus asientos reservados han expirado. ¡Selecciona de nuevo para no perder tu lugar! 🎥');
        setSelectedCount(0); // Reiniciar contador al expirar reservas
      }, 300000); // 5 minutos = 300,000 ms
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

  const isButtonDisabled = !selectedBranch || !selectedDate || !selectedTime || (selectedCount === 0) || timeLeft <= 0;

  const handleAvatarClick = () => {
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
          ¡Últimos asientos disponibles para esta función! Más de 300 fans ya reservaron.
        </p>
      </div>

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Panel de selección */}
          <div className="w-full md:w-1/4 bg-gray-900 p-6 rounded-lg shadow-2xl border-l-4 border-amber-400 hover:shadow-amber-400/50 transition-all text-white">
            <h2 className="text-xl font-bold mb-4">Selecciona tu función</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Sucursal <span className="text-red-400">*</span></label>
              <select
                className={`w-full p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                  !selectedBranch ? 'border-red-500 focus:ring-red-500 animate-pulse' : 'border-gray-600 focus:ring-amber-400'
                }`}
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setSelectedDate('');
                  setSelectedTime('');
                  setSelectedSeats([]);
                  setReservedSeats([]);
                  setHasScrolled(false);
                  setSelectedCount(0); // Reiniciar contador al cambiar sucursal
                  setNotification('¡Buen comienzo! Ahora elige una fecha.');
                }}
              >
                <option value="">Elige tu sucursal primero</option>
                {branchesData.map((branch) => (
                  <option key={branch.name} value={branch.name}>{branch.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Fecha <span className="text-red-400">*</span></label>
              <select
                className={`w-full p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                  selectedBranch && !selectedDate ? 'border-red-500 focus:ring-red-500 animate-pulse' : selectedDate ? 'border-gray-600 focus:ring-amber-400' : 'border-gray-600'
                }`}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime('');
                  setSelectedSeats([]);
                  setReservedSeats([]);
                  setHasScrolled(false);
                  setSelectedCount(0); // Reiniciar contador al cambiar fecha
                  setNotification('¡Perfecto! Ahora selecciona una hora.');
                }}
                disabled={!selectedBranch}
              >
                <option value="">Elige una fecha</option>
                {availableDates.map((date) => (
                  <option key={date.date} value={date.date}>
                    {new Date(date.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Hora <span className="text-red-400">*</span></label>
              <select
                className={`w-full p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                  selectedDate && !selectedTime ? 'border-red-500 focus:ring-red-500 animate-pulse' : selectedTime ? 'border-gray-600 focus:ring-amber-400' : 'border-gray-600'
                }`}
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value);
                  setSelectedSeats([]);
                  setReservedSeats([]);
                  setHasScrolled(false);
                  setSelectedCount(0); // Reiniciar contador al cambiar hora
                  if (selectedCount === 0) {
                    setNotification('¡Listo! Ahora elige tus asientos.');
                  } else {
                    setNotification('');
                  }
                }}
                disabled={!selectedDate || availableTimes.length === 0}
              >
                <option value="">Elige una hora</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Panel de asientos */}
          <div className="w-full md:w-2/4 bg-gray-900 p-6 rounded-lg shadow-2xl border-t-4 border-amber-400 hover:shadow-amber-400/50 transition-all">
            <h2 className="text-xl font-bold mb-4 text-white">Elige tus asientos</h2>
            <div className="flex flex-col items-center">
              <div className="flex mb-2">
                {Array.from({ length: 15 }, (_, i) => (
                  <span key={i} className="w-6 text-center text-xs text-gray-300">{i + 1}</span>
                ))}
              </div>
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center mb-1">
                  <span className="w-6 text-center text-xs text-gray-300 mr-2">{String.fromCharCode(65 + rowIndex)}</span>
                  <div className="grid gap-1 grid-cols-[repeat(15,_1fr)]">
                    {row.map((seat, colIndex) => {
                      const seatId = `${rowIndex}-${colIndex}`;
                      const isSelected = selectedSeats.includes(seatId);
                      const isUserReserved = reservedSeats.includes(seatId);
                      const isOtherReserved = seat.status === 'reserved' && !isUserReserved;
                      const isOccupied = seat.status === 'occupied';

                      return (
                        <div
                          key={seat.id}
                          className={`w-6 h-6 flex items-center justify-center rounded
                            ${(isSelected || isUserReserved) ? 'bg-blue-500' : isOtherReserved ? 'bg-yellow-400' : isOccupied ? 'bg-red-600' : 'bg-green-700'}
                            ${!isOccupied && !isOtherReserved && timeLeft > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                          onClick={() => handleSeatClick(rowIndex, colIndex)}
                        >
                          <span className="text-xs">🎟️</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-300 flex justify-center gap-4">
              <span>🟢 Disponible</span>
              <span>🔵 Seleccionado</span>
              <span>🟡 Ya Reservados</span>
              <span>🔴 Ocupado</span>
            </div>
            {selectedCount > 0 && (
              <p className="mt-4 text-center text-green-400 font-semibold">
                ¡Genial! Has seleccionado {selectedCount} asiento(s). Confirma ahora.
              </p>
            )}
            {reservedSeats.length > 0 && (
              <p className="mt-2 text-center text-blue-400 font-semibold">
                Tienes {reservedSeats.length} asiento(s) reservados por 5 minutos. ¡Confirma pronto!
              </p>
            )}
          </div>

          {/* Temporizador */}
          <div className={`w-full md:w-1/4 p-6 rounded-lg shadow-2xl text-center transition-all text-white ${
            timeLeft <= 30 ? 'bg-gray-900 border-l-4 border-red-600 animate-pulse' : 'bg-gray-900 border-l-4 border-amber-400'
          }`}>
            <p className="mb-2 text-lg font-semibold">¡Apresúrate!</p>
            <p className={`text-3xl font-bold ${timeLeft <= 30 ? 'text-red-400' : 'text-green-400'}`}>
              {formatTime(timeLeft)}
            </p>
            <p className="mt-2 text-sm text-gray-400">Tiempo restante (hasta 2:00 PM CST)</p>
          </div>
        </div>

        {notification && <p className="text-red-400 mt-2 text-center">{notification}</p>}

        <div className="mt-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg shadow-2xl animate-pulse-slow" ref={confirmButtonRef}>
          <p className="text-white text-xl mb-4">
            ¡Confirma ahora y obtén palomitas gratis 🎁! Más de 300 fans ya están listos para esta función.
          </p>
          <button
            className={`bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:from-amber-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-amber-400/50 animate-pulse-slow ${
              isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${highlightConfirmButton ? 'shadow-[0_0_15px_rgba(255,193,7,0.9)] animate-pulse-slow' : ''}`}
            disabled={isButtonDisabled}
            onClick={() => {
              if (isButtonDisabled) {
                setNotification('Por favor, completa todas las selecciones y elige al menos un asiento.');
              } else {
                alert('¡Reserva confirmada con éxito! Te hemos regalado palomitas gratis.');
                setSelectedSeats([]);
                setReservedSeats([]);
                setHasScrolled(false);
                setGlobalReservedSeats((prev) => {
                  const key = `${selectedBranch}-${selectedDate}-${selectedTime}`;
                  return { ...prev, [key]: [] };
                });
                setSelectedCount(0); // Reiniciar contador al confirmar
              }
            }}
          >
            ¡Asegura tu lugar mágico ahora!
          </button>
          <p className="text-white text-sm mt-4">Reserva segura | Cancelación gratuita</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            A Mr. Tony Production<br />EsCine © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SeatSelector;