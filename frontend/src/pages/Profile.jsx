import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

function Profile() {
  const navigate = useNavigate();
  const initialUser = {
    name: "Usuario Ejemplo",
    email: "usuario@example.com",
    password: "pass123",
    bookings: [
      { id: "1", title: "Sin Límites", date: "2025-06-05", time: "14:00", status: "active" },
      { id: "16", title: "Epic Adventure", date: "2025-06-01", time: "10:00", status: "canceled" },
    ],
  };
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? { ...initialUser, ...JSON.parse(savedUser), bookings: Array.isArray(JSON.parse(savedUser).bookings) ? JSON.parse(savedUser).bookings : initialUser.bookings } : initialUser;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: user.name, email: user.email, currentPassword: '', newPassword: '' });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(null);

  useEffect(() => {
    setEditedUser({ name: user.name, email: user.email, currentPassword: '', newPassword: '' });
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const validateInputs = () => {
    const newErrors = {};
    if (!editedUser.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!editedUser.email || !/\S+@\S+\.\S+/.test(editedUser.email)) newErrors.email = "Correo inválido";
    if (isEditing && (editedUser.newPassword || editedUser.name !== user.name || editedUser.email !== user.email)) {
      if (!editedUser.currentPassword) newErrors.currentPassword = "Contraseña actual requerida";
      else if (editedUser.currentPassword !== user.password) newErrors.currentPassword = "Contraseña actual incorrecta";
    }
    if (editedUser.newPassword && editedUser.newPassword.length < 8) newErrors.newPassword = "La nueva contraseña debe tener al menos 8 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;
    setIsSaving(true);
    setTimeout(() => {
      setUser({ ...user, name: editedUser.name, email: editedUser.email, password: editedUser.newPassword || user.password });
      setIsEditing(false);
      setNotification('¡Perfil actualizado correctamente!');
      setIsSaving(false);
      setTimeout(() => setNotification(''), 3000);
    }, 1000);
  };

  const handleCancelBooking = (bookingId) => {
    setShowCancelConfirm(bookingId);
  };

  const confirmCancelBooking = (bookingId) => {
    setUser({
      ...user,
      bookings: user.bookings.map((b) => (b.id === bookingId ? { ...b, status: "canceled" } : b)),
    });
    setShowCancelConfirm(null);
    setNotification('¡Reserva cancelada con éxito!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setNotification('Sesión cerrada. ¡Vuelve pronto!');
    setTimeout(() => navigate('/'), 1000);
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
            <img src={logo} alt="EsCine Logo" className="max-h-20 w-auto object-contain" loading="lazy" />
          </Link>
          <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-0">
            <Link to="/" className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all text-base font-body font-semibold">Inicio</Link>
            <Link to="/reviews" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Reseñas</Link>
            <Link to="/contact" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Contacto</Link>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-center text-gray-100 mb-2 shadow-md animate-glow relative z-10" aria-live="polite">
        <p className="text-base font-body font-semibold">
          ¡vive la magia del cine!
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-2xl animate-glow">
          <h1 className="text-3xl font-heading font-bold text-gold-400 mb-6">Perfil de Usuario</h1>
          <section className="mb-8">
            <h2 className="text-xl font-heading font-semibold mb-4 text-gray-100">Datos Personales</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-base font-body font-medium mb-1 text-gray-300">
                  Nombre
                </label>
                {isEditing ? (
                  <div>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'} text-gray-100 focus:outline-none focus:ring-2`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-400 text-sm mt-1 font-body">{errors.name}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-lg text-gray-100 font-body">{user.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-body font-medium mb-1 text-gray-300">
                  Correo Electrónico
                </label>
                {isEditing ? (
                  <div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'} text-gray-100 focus:outline-none focus:ring-2`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-400 text-sm mt-1 font-body">{errors.email}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-lg text-gray-100 font-body">{user.email}</p>
                )}
              </div>
              {isEditing && (
                <>
                  <div>
                    <label htmlFor="currentPassword" className="block text-base font-body font-medium mb-1 text-gray-300">
                      Contraseña Actual
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      name="currentPassword"
                      value={editedUser.currentPassword}
                      onChange={(e) => setEditedUser({ ...editedUser, currentPassword: e.target.value })}
                      className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.currentPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'} text-gray-100 focus:outline-none focus:ring-2`}
                      aria-invalid={!!errors.currentPassword}
                      aria-describedby={errors.currentPassword ? 'currentPassword-error' : undefined}
                    />
                    {errors.currentPassword && (
                      <p id="currentPassword-error" className="text-red-400 text-sm mt-1 font-body">{errors.currentPassword}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-base font-body font-medium mb-1 text-gray-300">
                      Nueva Contraseña (Opcional)
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      value={editedUser.newPassword}
                      onChange={(e) => setEditedUser({ ...editedUser, newPassword: e.target.value })}
                      className={`w-full p-2 rounded-lg bg-gray-800 border ${errors.newPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-400'} text-gray-100 focus:outline-none focus:ring-2`}
                      aria-invalid={!!errors.newPassword}
                      aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
                    />
                    {errors.newPassword && (
                      <p id="newPassword-error" className="text-red-400 text-sm mt-1 font-body">{errors.newPassword}</p>
                    )}
                  </div>
                </>
              )}
              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className={`bg-indigo-600 px-4 py-2 rounded-full text-gray-100 hover:bg-indigo-500 transition-all hover:shadow-indigo-400/50 hover-sparkle relative ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <svg className="animate-spin h-5 w-5 mr-2 text-gray-100" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          Guardando...
                        </span>
                      ) : (
                        'Guardar'
                      )}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-600 px-4 py-2 rounded-full text-gray-100 hover:bg-gray-500 transition-all hover-sparkle relative"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-indigo-600 px-4 py-2 rounded-full text-gray-100 hover:bg-indigo-500 transition-all hover:shadow-indigo-400/50 hover-sparkle relative"
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-heading font-semibold mb-4 text-gray-100">Historial de Reservas</h2>
            {user.bookings.length > 0 ? (
              <div className="space-y-6">
                {user.bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`p-4 rounded-lg shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between ${booking.status === 'active' ? 'bg-teal-900' : booking.status === 'canceled' ? 'bg-red-900' : 'bg-gray-800'}`}
                  >
                    <div>
                      <p className="text-lg text-gray-100 font-body flex items-center">
                        <span className="mr-2">{booking.status === 'active' ? '🎟️' : booking.status === 'canceled' ? '❌' : '🕒'}</span>
                        {booking.title}
                      </p>
                      <p className="text-base text-gray-300 font-body">
                        Fecha: {new Date(booking.date).toLocaleDateString('es-MX')} a las {booking.time}
                      </p>
                      <p className="text-base font-body font-medium text-gray-100">
                        Estado: {booking.status === 'active' ? 'Activa' : booking.status === 'canceled' ? 'Cancelada' : 'Pasada'}
                      </p>
                    </div>
                    {booking.status === 'active' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="mt-2 sm:mt-0 bg-red-600 px-4 py-2 rounded-full text-gray-100 hover:bg-red-500 transition-all hover:shadow-red-400/50 hover-sparkle relative"
                        aria-label={`Cancelar reserva para ${booking.title}`}
                      >
                        Cancelar Reserva
                      </button>
                    )}
                    {showCancelConfirm === booking.id && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" role="dialog" aria-modal="true">
                        <div className="bg-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-sm animate-fade-in">
                          <h3 className="text-xl font-heading font-bold text-gold-400 mb-4">Confirmar Cancelación</h3>
                          <p className="text-gray-100 font-body mb-4">
                            ¿Estás seguro de cancelar la reserva para "{booking.title}"?
                          </p>
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={() => confirmCancelBooking(booking.id)}
                              className="bg-red-600 px-4 py-2 rounded-full text-gray-100 hover:bg-red-500 hover-sparkle relative"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() => setShowCancelConfirm(null)}
                              className="bg-gray-600 px-4 py-2 rounded-full text-gray-100 hover:bg-gray-500 hover-sparkle relative"
                              aria-label="Cancelar acción"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-300 text-center text-base font-body">No hay reservas aún.</p>
            )}
          </section>
          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-full text-gray-100 hover:bg-red-500 transition-all hover:shadow-red-400/50 hover-sparkle relative"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </main>

      {/* Notificación Toast */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-teal-500 text-gray-100 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50" role="alert">
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

export default Profile;