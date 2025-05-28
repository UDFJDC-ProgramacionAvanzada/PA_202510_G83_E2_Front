"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Usuario administrador predefinido
const ADMIN_USER = {
  id: "admin_001",
  name: "Administrador AlaMano",
  email: "admin@alamano.com",
  role: "admin",
  isProvider: false,
  profileImage: "/assets/images/users/admin-avatar.jpg",
  phone: "555-000-0000",
  location: "Oficina Central",
};

// Usuarios de prueba predefinidos
const TEST_USERS = [
  {
    id: "user_001",
    name: "María González",
    email: "maria@ejemplo.com",
    role: "user",
    isProvider: false,
    profileImage: "/assets/images/users/maria-gonzalez.jpg",
    phone: "555-111-1111",
    location: "Ciudad de México",
  },
  {
    id: "provider_001",
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    role: "provider",
    isProvider: true,
    profileImage: "/assets/images/profiles/carlos-rodriguez.jpg",
    phone: "555-123-4567",
    location: "Ciudad de México",
    providerProfile: {
      categoryId: "hogar",
      category: "Hogar y Reparaciones",
      description:
        "Electricista profesional con más de 10 años de experiencia.",
      skills: ["Instalaciones eléctricas", "Reparaciones", "Iluminación"],
      rating: 4.8,
      reviewCount: 124,
      isAvailable: true,
    },
  },
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificación de autenticación al cargar la aplicación
    const checkAuth = () => {
      const storedUser = localStorage.getItem("alamano_user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("alamano_user");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulación de delay de red
      setTimeout(() => {
        // Verificar credenciales de admin
        if (email === ADMIN_USER.email && password === "admin123") {
          setUser(ADMIN_USER);
          setIsAuthenticated(true);
          localStorage.setItem("alamano_user", JSON.stringify(ADMIN_USER));
          resolve({ success: true, user: ADMIN_USER });
          return;
        }

        // Verificar usuarios de prueba
        const testUser = TEST_USERS.find((u) => u.email === email);
        if (testUser && password === "123456") {
          setUser(testUser);
          setIsAuthenticated(true);
          localStorage.setItem("alamano_user", JSON.stringify(testUser));
          resolve({ success: true, user: testUser });
          return;
        }

        // Credenciales incorrectas
        reject({ success: false, message: "Credenciales incorrectas" });
      }, 1000);
    });
  };

  const register = (userData) => {
    return new Promise((resolve) => {
      // Simulación de registro
      setTimeout(() => {
        const newUser = {
          ...userData,
          id: `user_${Date.now()}`,
          role: "user",
          isProvider: false,
        };

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("alamano_user", JSON.stringify(newUser));
        resolve({ success: true, user: newUser });
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("alamano_user");
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("alamano_user", JSON.stringify(updatedUser));
  };

  // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    return user?.role === "admin";
  };

  // Función para hacer login como admin (para testing)
  const loginAsAdmin = () => {
    setUser(ADMIN_USER);
    setIsAuthenticated(true);
    localStorage.setItem("alamano_user", JSON.stringify(ADMIN_USER));
  };

  // Función para obtener todos los usuarios de prueba (solo para admin)
  const getTestUsers = () => {
    if (!isAdmin()) return [];
    return TEST_USERS;
  };

  // Función para obtener credenciales de prueba
  const getTestCredentials = () => {
    return {
      admin: {
        email: ADMIN_USER.email,
        password: "admin123",
        description: "Usuario administrador con acceso completo",
      },
      user: {
        email: TEST_USERS[0].email,
        password: "123456",
        description: "Usuario regular de ejemplo",
      },
      provider: {
        email: TEST_USERS[1].email,
        password: "123456",
        description: "Proveedor de servicios de ejemplo",
      },
    };
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
        getTestUsers,
        getTestCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
