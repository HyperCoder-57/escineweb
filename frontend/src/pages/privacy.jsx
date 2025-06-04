import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

function Privacy() {
  const currentDate = new Date().toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 animate-bg text-gray-100 relative overflow-hidden">
      {/* Partículas decorativas */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(40)].map((_, i) => (
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

      {/* Encabezado */}
      <header className="bg-gray-900 bg-opacity-90 text-gray-100 p-4 shadow-lg z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="EsCine Logo" className="max-h-20 w-auto object-contain" loading="lazy" />
          </Link>
          <nav className="flex flex-col md:flex-row gap-2 md:gap-4">
            <Link to="/" className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all font-semibold">Inicio</Link>
            <Link to="/reviews" className="px-4 py-2 border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all font-semibold">Reseñas</Link>
            <Link to="/contact" className="px-4 py-2 border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all font-semibold">Contacto</Link>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8 flex-grow relative z-10">
        <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg shadow-2xl animate-glow">
          <h1 className="text-3xl font-heading font-bold text-indigo-300 mb-6">Política de Privacidad</h1>
          <p className="text-sm text-gray-400 font-body mb-6">Última actualización: {currentDate}</p>

          <p className="text-gray-300 font-body mb-6">
            En <strong>EsCine</strong>, nos tomamos tu privacidad en serio. Este Aviso de Privacidad describe la información que recopilamos, cómo la usamos, tus derechos y las opciones disponibles para que tengas el control sobre tus datos.
          </p>

          {/* Sección: Qué recopilamos */}
          <h2 className="text-xl font-heading font-bold text-indigo-300 mb-2">1. Qué información recopilamos</h2>
          <p className="text-gray-300 font-body mb-4">
            Recopilamos información para mejorar tu experiencia en la plataforma. Esto incluye:
          </p>
          <ul className="list-disc list-inside text-gray-300 font-body mb-6 space-y-1">
            <li>Información de contacto como nombre y correo electrónico.</li>
            <li>Contenido de los mensajes enviados a través del formulario de contacto.</li>
            <li>Datos técnicos como tu dirección IP, tipo de navegador y sistema operativo.</li>
            <li>Preferencias de navegación y búsqueda (en caso de que se habiliten funciones personalizadas).</li>
          </ul>

          {/* Sección: Cómo usamos tu información */}
          <h2 className="text-xl font-heading font-bold text-indigo-300 mb-2">2. Cómo utilizamos tu información</h2>
          <p className="text-gray-300 font-body mb-6">
            Utilizamos tu información para:
          </p>
          <ul className="list-disc list-inside text-gray-300 font-body mb-6 space-y-1">
            <li>Responder a tus mensajes y solicitudes.</li>
            <li>Ofrecerte contenido personalizado y recomendaciones.</li>
            <li>Mejorar el rendimiento, seguridad y diseño de nuestro sitio.</li>
            <li>Enviar comunicaciones administrativas importantes.</li>
          </ul>

          {/* Sección: Compartición */}
          <h2 className="text-xl font-heading font-bold text-indigo-300 mb-2">3. ¿Compartimos tu información?</h2>
          <p className="text-gray-300 font-body mb-6">
            No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en los siguientes casos:
          </p>
          <ul className="list-disc list-inside text-gray-300 font-body mb-6 space-y-1">
            <li>Proveedores de servicios que nos ayudan a operar EsCine (por ejemplo, hosting o análisis de datos).</li>
            <li>Cuando lo exige la ley o en respuesta a una solicitud legal válida.</li>
          </ul>

          {/* Sección: Tus derechos */}
          <h2 className="text-xl font-heading font-bold text-indigo-300 mb-2">4. Tus derechos y elecciones</h2>
          <p className="text-gray-300 font-body mb-6">
            Puedes solicitar acceso, rectificación o eliminación de tus datos personales escribiéndonos a: <a href="mailto:privacidad@escine.com" className="text-indigo-400 hover:text-indigo-300">privacidad@escine.com</a>. También puedes optar por no recibir comunicaciones en cualquier momento.
          </p>

          {/* Sección: Seguridad */}
          <h2 className="text-xl font-heading font-bold text-indigo-300 mb-2">5. Seguridad de la información</h2>
          <p className="text-gray-300 font-body mb-6">
            Implementamos medidas técnicas y organizativas para proteger tus datos. Sin embargo, ningún sistema es completamente seguro. Te recomendamos no compartir información confidencial por canales no cifrados.
          </p>

          {/* Sección: Cookies */}
          <h2 className="text-xl font-heading font-bold text-indigo-300 mb-2">6. Uso de cookies</h2>
          <p className="text-gray-300 font-body mb-6">
            EsCine puede utilizar cookies y tecnologías similares para mejorar la navegación y analizar tendencias. Puedes configurar tu navegador para rechazar cookies, pero algunas funciones podrían no estar disponibles.
          </p>

          {/* Sección CCPA */}
          <h2 className="text-xl font-heading font-bold text-indigo-300 mb-2">7. Información para residentes de California (CCPA)</h2>
          <p className="text-gray-300 font-body mb-4">
            Si eres residente de California, tienes derechos adicionales bajo la <strong>California Consumer Privacy Act (CCPA)</strong>, que incluyen:
          </p>
          <ul className="list-disc list-inside text-gray-300 font-body mb-4">
            <li>Solicitar detalles sobre la información personal que recopilamos.</li>
            <li>Solicitar la eliminación de tus datos personales.</li>
            <li>Optar por que no se vendan tus datos (nosotros no vendemos datos).</li>
          </ul>
          <p className="text-gray-300 font-body mb-6">
            Puedes ejercer estos derechos escribiendo a: <a href="mailto:ccpa@escine.com" className="text-indigo-400 hover:text-indigo-300">ccpa@escine.com</a>. Nos comprometemos a responder conforme a la legislación aplicable.
          </p>

          {/* Sección final */}
          <h2 className="text-xl font-heading font-bold text-indigo-300 mb-2">8. Cambios a esta política</h2>
          <p className="text-gray-300 font-body mb-6">
            Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos publicando un aviso en esta página o mediante otros canales apropiados.
          </p>

          <p className="text-sm text-gray-500 font-body mt-8">
            Para más información sobre privacidad en México, puedes consultar al <a href="https://home.inai.org.mx/" className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener noreferrer">INAI</a> o visitar la <a href="https://www.gob.mx/protecciondedatos" className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener noreferrer">Plataforma Nacional de Transparencia</a>.
          </p>
        </div>
      </main>

{/* Footer */}
<Footer />
    </div>
  );
}

export default Privacy;
