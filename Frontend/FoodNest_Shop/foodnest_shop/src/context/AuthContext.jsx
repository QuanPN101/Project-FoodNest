import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AUTH_STORAGE_KEY = "fnb-shop-auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (username, password) => {
    // Mock login: user/pass = admin/admin
    if (username === "admin" && password === "admin") {
      const loggedUser = { username: "admin", name: "Administrator" };
      setUser(loggedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedUser));
      return { success: true };
    }
    return { success: false, message: "Sai tên đăng nhập hoặc mật khẩu" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const register = (username, password, name) => {
    // Mock register success (no backend)
    if (username === "admin") {
      return { success: false, message: "Tên đăng nhập đã tồn tại" };
    }
    return { success: true };
  };

  const changePassword = (oldPass, newPass) => {
    // Mock always success for demo
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
