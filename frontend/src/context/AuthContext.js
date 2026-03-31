'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth(token);
    } else {
      setLoading(false);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user_token', token);
    localStorage.setItem('user_data', JSON.stringify(userData));
    setUser(userData);
    setLoginModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isLoginModalOpen, setLoginModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
