import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ADMIN_PASSWORD } from '../constants';

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string, remember?: boolean) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'sterling_admin_session';
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for persisted session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_KEY);
    if (storedSession) {
      try {
        const { expiry } = JSON.parse(storedSession);
        if (Date.now() < expiry) {
          setIsAdmin(true);
        } else {
          localStorage.removeItem(SESSION_KEY); // Expired
        }
      } catch (e) {
        localStorage.removeItem(SESSION_KEY); // Corrupt data
      }
    }
  }, []);

  const login = (password: string, remember: boolean = false) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      
      if (remember) {
        const sessionData = {
          expiry: Date.now() + SESSION_DURATION
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      }
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};