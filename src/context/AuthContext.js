"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de verificación de autenticación
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    // Simulación de login
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const register = (userData) => {
    // Simulación de registro
    const newUser = { ...userData, id: Date.now().toString() };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    // Simulación de logout
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    return user?.role === "admin";
  };

  // Función para hacer login como admin (para testing)
  const loginAsAdmin = () => {
    const adminUser = {
      id: "admin1",
      name: "Administrador AlaMano",
      email: "admin@alamano.com",
      role: "admin",
      isProvider: false,
    };
    login(adminUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAdmin,
        loginAsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
