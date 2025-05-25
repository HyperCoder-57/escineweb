import { Link, useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect, useRef } from 'react';

function SeatSelector() {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [notification, setNotification] = useState('');
  const [seats, setSeats] = useState([]);
  const [lastSeatChange, setLastSeatChange] = useState(null);
  const [highlightConfirmButton, setHighlightConfirmButton] = useState(false);
  const confirmButtonRef = useRef(null);

  const movie = { title: "The Passion", id: parseInt(id) || 1 };

  const branchesData = [
    {
      name: "Cinepolis Perisur",
      dates: [
        { date: "2025-05-23", times: ["10:00 am", "1:00 pm", "4:00 pm", "7:00 pm"], seats: generateSeats(10, 15, 0.3) },
        { date: "2025-05-24", times: ["10:00 am", "1:00 pm", "4:00 pm", "7:00 pm"], seats: generateSeats(10, 15, 0.25) },
        { date: "2025-05-25", times: ["12:00 pm", "3:00 pm", "6:00 pm", "9:00 pm"], seats: generateSeats(10, 15, 0.2) },
      ],
    },
    {
      name: "Cinepolis Satélite",
      dates: [
        { date: "2025-05-23", times: ["10:00 am", "1:00 pm", "4:00 pm"], seats: generateSeats(10, 15, 0.2) },
        { date: "2025-05-24", times: ["12:00 pm", "3:00 pm", "6:00 pm"], seats: generateSeats(10, 15, 0.15) },
        { date: "2025-05-25", times: ["10:00 am", "1:00 pm", "4:00 pm"], seats: generateSeats(10, 15, 0.1) },
      ],
    },
    {
      name: "Cinepolis Universidad",
      dates: [
        { date: "2025-05-23", times: ["12:00 pm", "3:00 pm", "6:00 pm", "9:00 pm"], seats: generateSeats(10, 15, 0.4) },
        { date: "2025-05-24", times: ["10:00 am", "1:00 pm", "4:00 pm"], seats: generateSeats(10, 15, 0.35) },
        { date: "2025-05-25", times: ["12:00 pm", "3:00 pm", "6:00 pm"], seats: generateSeats(10, 15, 0.3) },
      ],
    },
  ];

  function generateSeats(rows, cols, occupiedPercentage) {
    const seats = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const isOccupied = Math.random() < occupiedPercentage;
        row.push({
          id: `${i}-${j}`,
          status: isOccupied ? 'occupied' : 'available',
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
      return;
    }

    const branch = branchesData.find((b) => b.name === selectedBranch);
    const date = branch?.dates.find((d) => d.date === selectedDate);
    const originalSeats = date?.seats || generateSeats(10, 15, 0.3);

    const updatedSeats = originalSeats.map((row) =>
      row.map((seat) => ({
        ...seat,
        status: Math.random() < 0.1 ? 'occupied' : seat.status,
      }))
    );

    setSeats(updatedSeats);
  }, [selectedBranch, selectedDate, selectedTime]);

  const handleSeatClick = (rowIndex, colIndex) => {
    if (timeLeft <= 0) return;

    const seatId = `${rowIndex}-${colIndex}`;
    if (seats[rowIndex][colIndex].status === 'available') {
      setSelectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((id) => id !== seatId)
          : [...prev, seatId]
      );
      setLastSeatChange(Date.now());
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setNotification('Tiempo agotado. Por favor, reinicie la selección.');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isButtonDisabled = !selectedBranch || !selectedDate || !selectedTime || selectedSeats.length === 0 || timeLeft <= 0;

  useEffect(() => {
    if (selectedSeats.length > 0 && lastSeatChange) {
      const timeout = setTimeout(() => {
        if (confirmButtonRef.current && Date.now() - lastSeatChange >= 2000) {
          confirmButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightConfirmButton(true);
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [selectedSeats, lastSeatChange]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src={logo} alt="Cinema Logo" className="max-h-16 w-auto object-contain" />
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-xl md:text-2xl font-bold mb-2">{movie.title} - ¡Vive la magia del cine!</h1>
            <div className="bg-gradient-to-r from-yellow-400 to-red-500 text-white p-2 md:p-3 rounded-lg shadow-lg animate-pulse">
              <p className="text-sm md:text-base font-bold">
                ¡Últimos asientos disponibles para esta función! Más de 300 fans ya reservaron.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl text-black">👤</span>
            </div>
            <span className="text-sm mt-1">Usuario</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Panel de selección con halo */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Selecciona tu función</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">Sucursal <span className="text-red-500">*</span></label>
              <select
                className={`w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-blue-500 ${!selectedBranch ? 'shadow-[0_0_10px_rgba(239,68,68,0.7)] animate-halo-pulse' : 'shadow-[0_0_10px_rgba(16,185,129,0.7)] animate-halo-glow'}`}
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setSelectedDate('');
                  setSelectedTime('');
                  setSelectedSeats([]);
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
              <label className="block mb-2 font-medium text-gray-700">Fecha <span className="text-red-500">*</span></label>
              <select
                className={`w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-blue-500 ${selectedBranch && !selectedDate ? 'shadow-[0_0_10px_rgba(239,68,68,0.7)] animate-halo-pulse' : selectedDate ? 'shadow-[0_0_10px_rgba(16,185,129,0.7)] animate-halo-glow' : 'shadow-none'}`}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime('');
                  setSelectedSeats([]);
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
              <label className="block mb-2 font-medium text-gray-700">Hora <span className="text-red-500">*</span></label>
              <select
                className={`w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-blue-500 ${selectedDate && !selectedTime ? 'shadow-[0_0_10px_rgba(239,68,68,0.7)] animate-halo-pulse' : selectedTime ? 'shadow-[0_0_10px_rgba(16,185,129,0.7)] animate-halo-glow' : 'shadow-none'}`}
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value);
                  setSelectedSeats([]);
                  setNotification('¡Listo! Ahora elige tus asientos.');
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
          <div className="w-full md:w-2/4 bg-white p-6 rounded-lg shadow-xl border-t-4 border-yellow-400 hover:shadow-2xl transition">
            <h2 className="text-xl font-bold mb-4 text-yellow-700">Elige tus asientos</h2>
            <div className="flex flex-col items-center">
              <div className="flex mb-2">
                {Array.from({ length: 15 }, (_, i) => (
                  <span key={i} className="w-6 text-center text-xs text-gray-600">{i + 1}</span>
                ))}
              </div>
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center mb-1">
                  <span className="w-6 text-center text-xs text-gray-600 mr-2">{String.fromCharCode(65 + rowIndex)}</span>
                  <div className="grid gap-1 grid-cols-[repeat(15,_1fr)]">
                    {row.map((seat, colIndex) => (
                      <div
                        key={seat.id}
                        className={`w-6 h-6 flex items-center justify-center rounded
                          ${selectedSeats.includes(seat.id) ? 'bg-yellow-400' :
                            seat.status === 'occupied' ? 'bg-red-600' : 'bg-green-500'}
                          ${seat.status === 'available' && timeLeft > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        onClick={() => handleSeatClick(rowIndex, colIndex)}
                      >
                        <span className="text-xs">🎟️</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600 flex justify-center gap-4">
              <span>🟢 Disponible</span>
              <span>🟡 Seleccionado</span>
              <span>🔴 Ocupado</span>
            </div>
            {selectedSeats.length > 0 && (
              <p className="mt-4 text-center text-green-600 font-semibold">
                ¡Genial! Has seleccionado {selectedSeats.length} asiento(s). Confirma ahora.
              </p>
            )}
          </div>

          {/* Temporizador */}
          <div className={`w-full md:w-1/4 p-6 rounded-lg shadow-xl text-center transition-all ${timeLeft <= 30 ? 'bg-red-100 border-l-4 border-red-500 animate-pulse' : 'bg-white border-l-4 border-green-500'}`}>
            <p className="mb-2 text-lg font-semibold text-gray-700">¡Apresúrate!</p>
            <p className={`text-3xl font-bold ${timeLeft <= 30 ? 'text-red-600' : 'text-green-600'}`}>
              {formatTime(timeLeft)}
            </p>
            <p className="mt-2 text-sm text-gray-500">Tiempo restante (hasta 11:48 PM CST)</p>
          </div>
        </div>

        {notification && <p className="text-red-600 mt-2 text-center">{notification}</p>}

        <div className="mt-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-2xl animate-bounce-slow" ref={confirmButtonRef}>
          <p className="text-white text-xl mb-4">
            ¡Confirma ahora y obtén palomitas gratis 🎁! Más de 300 fans ya están listos para esta función.
          </p>
          <button
            className={`bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-xl hover:bg-yellow-500 transition-transform hover:scale-105 shadow-lg ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${highlightConfirmButton ? 'shadow-[0_0_15px_rgba(59,130,246,0.9)] animate-halo-glow' : ''}`}
            disabled={isButtonDisabled}
            onClick={() => {
              if (isButtonDisabled) {
                setNotification('Por favor, completa todas las selecciones y elige al menos un asiento.');
              } else {
                alert('¡Reserva confirmada con éxito! Te hemos regalado palomitas gratis.');
              }
            }}
          >
            ¡Asegura tu lugar mágico ahora!
          </button>
          <p className="text-white text-sm mt-4">Reserva segura | Cancelación gratuita</p>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            A Mr. Tony Production<br />EsCine © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SeatSelector;