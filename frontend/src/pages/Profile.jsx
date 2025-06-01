import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Usuario Ejemplo",
    email: "usuario@example.com",
    membership: "Premium",
    bookings: 3,
    lastLogin: "2025-05-29 14:30 CST",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Simulación de carga de datos del usuario (reemplazar con API real)
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = () => {
    setUser(editedUser);
    localStorage.setItem('user', JSON.stringify(editedUser));
    setIsEditing(false);
    setNotification('¡Perfil actualizado con éxito! 🎉');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogout = () => {
    // Simulación de cierre de sesión (reemplazar con lógica real)
    localStorage.removeItem('user');
    setNotification('Sesión cerrada. ¡Vuelve pronto! 🎬');
    setTimeout(() => navigate('/'), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
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
            <Link to="/seat/1" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all text-base font-semibold">Reservas</Link>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar tu próxima aventura..."
              className="px-4 py-2 rounded-lg text-black w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400">🔍</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setNotification('Ya estás en tu perfil! 👤')}>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all">
              <span className="text-xl text-black">👤</span>
            </div>
            <span className="text-sm mt-1 font-medium">Usuario</span>
          </div>
        </div>
      </header>

      {/* Banner de urgencia (opcional, adaptado) */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 text-white text-center mb-6 animate-pulse-slow relative z-10">
        <p className="text-sm font-bold">¡Gestiona tu perfil y revisa tus reservas!</p>
      </div>

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow relative z-10">
        <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-2xl border-l-4 border-amber-400 hover:shadow-amber-400/50 transition-all text-white">
          <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>

          {/* Sección de datos del usuario */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              ) : (
                <p className="text-lg">{user.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              ) : (
                <p className="text-lg">{user.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Membresía</label>
              <p className="text-lg">{user.membership}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reservas realizadas</label>
              <p className="text-lg">{user.bookings}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Último inicio de sesión</label>
              <p className="text-lg">{user.lastLogin}</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex gap-4">
            {isEditing ? (
              <button
                className="bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-2 rounded-full hover:from-amber-400 hover:to-yellow-500 transition-all shadow-lg"
                onClick={handleSave}
              >
                Guardar
              </button>
            ) : (
              <button
                className="bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-2 rounded-full hover:from-amber-400 hover:to-yellow-500 transition-all shadow-lg"
                onClick={handleEdit}
              >
                Editar Perfil
              </button>
            )}
            <button
              className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 rounded-full hover:from-red-500 hover:to-red-600 transition-all shadow-lg"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Notificaciones */}
          {notification && <p className="mt-4 text-center text-green-400">{notification}</p>}
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

export default Profile;