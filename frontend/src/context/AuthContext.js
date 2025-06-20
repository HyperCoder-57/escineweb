import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Cambia a 'token'
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
          setUser(null);
          return;
        }
        const response = await fetch('http://localhost:5000/api/users/check-auth', {
          credentials: 'include',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('token');
      }
    };
    checkAuth();
  }, []);

  const login = (userData, token) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token); // Guardar el token
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    fetch('http://localhost:5000/api/users/logout', { method: 'POST', credentials: 'include' });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);