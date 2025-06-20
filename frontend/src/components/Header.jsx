import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { debounce } from 'lodash';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user, login, logout } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAvatarClick = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);
  const handleAuth = () => {
    setShowDialog(false);
    navigate('/login');
  };

  const debouncedSearch = debounce((value) => {
    console.log('Searching for:', value);
  }, 300);

  return (
    <header className="bg-gray-900 bg-opacity-90 text-gray-100 p-4 shadow-lg z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Cinema Logo" className="max-h-20 w-auto object-contain" />
        </Link>
        <nav className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2 md:mb-0">
          <Link to="/" className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all text-base font-body font-semibold">Inicio</Link>
          <Link to="/reviews" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Reseñas</Link>
          <Link to="/contact" className="px-4 py-2 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all text-base font-body font-semibold">Contacto</Link>
        </nav>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              debouncedSearch(e.target.value);
            }}
            placeholder="Buscar tu próxima aventura..."
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Buscar películas"
            aria-describedby="search-description"
          />
          <span id="search-description" className="sr-only">Busca películas por título</span>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400">🔍</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={handleAvatarClick}>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all" aria-label={isLoggedIn && user ? `Perfil de ${user.name || 'Usuario'}` : "Iniciar sesión"}>
            <span className="text-xl text-gray-900">👤</span>
          </div>
          <span className="text-sm font-body font-medium">{isLoggedIn && user ? user.name || 'Usuario' : 'Invitado'}</span>
        </div>
      </div>

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
              {isLoggedIn && user ? `¡Estás listo para vivir aventuras épicas en la gran pantalla, ${user.name || 'Usuario'}!` : "¡Embárcate en una aventura! Inicia sesión o regístrate para desbloquear contenido exclusivo."}
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
    </header>
  );
}

export default Header;