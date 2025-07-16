import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContect'; // Đường dẫn tùy theo bạn

const RequireAuth = () => {
  const { user } = useUser();

  // Nếu chưa login, chuyển về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã login, render các route con bên trong
  return <Outlet />;
};

export default RequireAuth;
