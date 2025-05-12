import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Hardcoded users
const USERS = [
  { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
  { email: 'inspector@example.com', password: 'inspector123', role: 'Inspector' },
  { email: 'engineer@example.com', password: 'engineer123', role: 'Engineer' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // On mount, check localStorage for user
  useEffect(() => {
    const storedUser = localStorage.getItem('shipmgmt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const userObj = { email: found.email, role: found.role };
      setUser(userObj);
      localStorage.setItem('shipmgmt_user', JSON.stringify(userObj));
      setError(null);
      return true;
    } else {
      setError('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shipmgmt_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Role-based access control component
export const RequireRole = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null;
  }
  return children;
}; 