
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAdmin = () => user && user.role === "admin";
  const isVendor = () => user && user.role === "vendor";

  const login = (usernameOrEmail, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === usernameOrEmail && storedUser.password === password) {
      setUser(storedUser); // Store the logged-in user in state
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isVendor }}>
      {children}
    </AuthContext.Provider>
  );
};
