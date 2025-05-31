import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Tạo context
const UserContext = createContext();

// 2. Custom hook để dễ dùng
export const useUser = () => useContext(UserContext);

// 3. Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Lấy user từ localStorage khi load lần đầu
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
