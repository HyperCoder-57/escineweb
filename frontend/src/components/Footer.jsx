// frontend/src/components/Footer.jsx
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <img src={logo} alt="EsCine Logo" className="max-h-12 mx-auto mb-2" loading="lazy" />
          <p className="text-sm font-body font-semibold">EsCine © 2025</p>
        </div>
        <div>
          <h4 className="text-lg font-heading font-bold mb-2">Enlaces</h4>
          <ul className="text-sm font-body space-y-1">
            <li>
              <Link to="/about" className="hover:text-indigo-400">Sobre Nosotros</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-indigo-400">Política de Privacidad</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-heading font-bold mb-2">Síguenos</h4>
          <div className="flex justify-center gap-4">
            <a
              href="https://facebook.com/EsCineOficial"
              className="hover:opacity-80 transition-all"
              aria-label="Síguenos en Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Logo de Facebook"
                className="w-6 h-6 object-contain"
                loading="lazy"
              />
            </a>
            <a
              href="https://x.com/EsCineOficial"
              className="hover:opacity-80 transition-all"
              aria-label="Síguenos en X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                  src="https://cdn.freelogovectors.net/wp-content/uploads/2023/07/twitter_x-logo-freelogovectors.net_.png"
                  alt="Logo de X"
                className="w-6 h-6 object-contain"
                loading="lazy"
              />
            </a>
            <a
              href="https://instagram.com/EsCineOficial"
              className="hover:opacity-80 transition-all"
              aria-label="Síguenos en Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Logo de Instagram"
                className="w-6 h-6 object-contain"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;