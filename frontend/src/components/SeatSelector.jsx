import { Link, useParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';

function SeatSelector() {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [notification, setNotification] = useState('');
  const [seats, setSeats] = useState([]);

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

  // Corrige el error: no regenerar los asientos dinámicamente en cada render
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src={logo} alt="Cinema Logo" className="max-h-16 w-auto object-contain" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-center flex-1">{movie.title}</h1>
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
          {/* Panel de selección */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block mb-2 font-medium">Sucursal:</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setSelectedDate('');
                  setSelectedTime('');
                  setSelectedSeats([]);
                }}
              >
                <option value="">Selecciona una sucursal</option>
                {branchesData.map((branch) => (
                  <option key={branch.name} value={branch.name}>{branch.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Fecha:</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime('');
                  setSelectedSeats([]);
                }}
                disabled={!selectedBranch}
              >
                <option value="">Selecciona una fecha</option>
                {availableDates.map((date) => (
                  <option key={date.date} value={date.date}>
                    {new Date(date.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Hora:</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value);
                  setSelectedSeats([]);
                }}
                disabled={!selectedDate || availableTimes.length === 0}
              >
                <option value="">Selecciona una hora</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Panel de asientos */}
          <div className="w-full md:w-2/4 bg-white p-4 rounded-lg shadow-md">
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
          </div>

          {/* Temporizador */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md text-center">
            <p className="mb-2"><strong>Tiempo para elegir:</strong></p>
            <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
          </div>
        </div>

        {notification && <p className="text-red-600 mt-2 text-center">{notification}</p>}

        <div className="mt-6 text-center">
          <button
            className={`bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isButtonDisabled}
            onClick={() => {
              if (isButtonDisabled) {
                setNotification('Por favor, completa todas las selecciones y elige al menos un asiento.');
              } else {
                alert('¡Reserva confirmada con éxito!');
              }
            }}
          >
            Confirmar pedido
          </button>
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
