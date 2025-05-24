import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // Controlar modo: 'login' o 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      // Simular login con mensaje de conversión
      alert(`¡Bienvenido de nuevo, ${formData.email}! Disfruta de tu experiencia en EsCine.`);
      navigate('/');
    } else {
      // Simular signup con mensaje de conversión
      alert(`¡Bienvenido, ${formData.name}! Te hemos regalado un boleto gratis para hoy.`);
      navigate('/');
    }
    // Limpiar formulario
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/">
            <img
              src={logo}
              alt="Cinema Logo"
              className="max-h-16 w-auto object-contain"
            />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold">
            ¡Inicia sesión o regístrate para vivir la magia del cine!
          </h1>
        </div>
      </header>

      {/* Cuerpo */}
      <main className="container mx-auto p-4 flex-grow flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {/* Banner de urgencia y prueba social */}
          <div className="bg-yellow-100 p-3 rounded mb-6 text-center text-sm">
            ¡Únete hoy, 23 de mayo de 2025, a millones de fans del cine! 
            <strong>¡Oferta especial: Regístrate ahora y obtén un boleto gratis por tiempo limitado!</strong>
          </div>

          {/* Toggle entre Login y Signup */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setMode('login')}
              className={`px-4 py-2 rounded-l-lg ${
                mode === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              } transition`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-4 py-2 rounded-r-lg ${
                mode === 'signup'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              } transition`}
            >
              Registrarse
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="mb-4">
                <label className="block mb-2 font-medium" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  placeholder="Tu nombre"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-2 font-medium" htmlFor="email">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black"
                placeholder="tu@correo.com"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black"
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {mode === 'login' ? 'Iniciar sesión ahora' : 'Registrarse y obtener mi boleto'}
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              EsCine es una plataforma segura y confiable. ¡Únete a la comunidad y vive la magia del cine!
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
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

export default Login;