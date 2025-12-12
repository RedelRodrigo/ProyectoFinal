import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    // Credenciales de administrador
    const ADMIN_USER = "admin";
    const ADMIN_PASSWORD = "admin123";

    // Validar que no estén vacíos
    if (!username || !password) {
      return { success: false, message: "Por favor completa todos los campos" };
    }

    let userData;

    // Si es admin
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      userData = {
        username: username,
        role: "admin",
        loginTime: new Date().toISOString(),
      };
    } else {
      // Cualquier otro usuario es un usuario normal
      userData = {
        username: username,
        role: "user",
        loginTime: new Date().toISOString(),
      };
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true, message: "Login exitoso" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
