import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import SidebarLayout from "./components/SidebarLayout";

import Dashboard from "./pages/Dashboard";
import AccountManagement from "./pages/AccountManagement"; // Quản lý tài khoản
import ShopManagement from "./pages/ShopManagement"; // Quản lý gian hàng
import MenuManagement from "./pages/MenuManagement"; // Quản lý thực đơn
import OrderManagement from "./pages/OrderManagement"; // Đơn hàng & giao dịch
import ComplaintManagement from "./pages/ComplaintManagement"; // Khiếu nại & vi phạm
import ReportManagement from "./pages/ReportManagement"; // Báo cáo thống kê
import ShopAdd from "./pages/ShopAdd";
import ShopUpdate from "./pages/ShopUpdate";
import ShopDetail from "./pages/ShopDetail";
import PromotionManagement from "./pages/PromotionManagement";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/shop" element={<SidebarLayout />}>
            <Route index element={<Navigate to="/shop/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="shop-management" element={<ShopManagement />} />
            <Route path="shop-management/add" element={<ShopAdd />} />
            <Route path="shop-management/update" element={<ShopUpdate />} />
            <Route path="shop-management/detail" element={<ShopDetail />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="promotions" element={<PromotionManagement />} />
            <Route path="complaints" element={<ComplaintManagement />} />
            <Route path="reports" element={<ReportManagement />} />
          </Route>
          <Route path="*" element={<Navigate to="/shop/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
