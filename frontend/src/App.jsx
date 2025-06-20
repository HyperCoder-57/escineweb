import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MovieList from './components/MovieList';
import ReservationSummary from './components/ReservationSummary';
import SeatSelector from './components/SeatSelector';
import Contact from './pages/contact';
import PrivacyPolicy from './pages/privacy';
import Reviews from './pages/reviews';
import VerifyEmail from './pages/VerifyEmail';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importar AuthProvider y useAuth

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/reservation/:id" element={<ReservationSummary />} />
          <Route
            path="/seatselector/:id"
            element={
              <ProtectedRoute>
                <SeatSelector />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} /> {/* Única ruta para login/auth */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Componente para proteger rutas
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirigir a /login 
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
}

export default App;