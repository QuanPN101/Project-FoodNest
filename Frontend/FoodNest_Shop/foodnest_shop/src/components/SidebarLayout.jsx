import React, { useState, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button, Collapse } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaUserCog,
  FaStore,
  FaUtensils,
  FaBoxOpen,
  FaGift,
  FaExclamationTriangle,
  FaChartBar,
  FaLock,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import Header from "../components/Header";
import "./SidebarLayout.css"; // Bạn bổ sung CSS dưới đây vào file này

const SidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/shop/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/shop/accounts", icon: <FaUserCog />, label: "Quản lý tài khoản" },
    {
      to: "/shop/shop-management",
      icon: <FaStore />,
      label: "Quản lý gian hàng",
      children: [
        { to: "/shop/shop-management/add", label: "Tạo gian hàng" },
        {
          to: "/shop/shop-management/update",
          label: "Cập nhật thông tin gian hàng",
        },
        { to: "/shop/shop-management/detail", label: "Xem chi tiết gian hàng" },
        { to: "/shop/shop-management/list", label: "Xem danh sách gian hàng" },
      ],
    },
    { to: "/shop/menu", icon: <FaUtensils />, label: "Quản lý thực đơn" },
    { to: "/shop/orders", icon: <FaBoxOpen />, label: "Đơn hàng & Giao dịch" },

    {
      to: "/shop/shop-ad-pro",
      icon: <FaGift />,
      label: "Quảng cáo & Khuyến mãi",
      children: [{ to: "/shop/promotions", label: "Quản lý khuyến mãi" }],
    },
    {
      to: "/shop/complaints",
      icon: <FaExclamationTriangle />,
      label: "Khiếu nại & Vi phạm",
    },
    { to: "/shop/reports", icon: <FaChartBar />, label: "Báo cáo thống kê" },
  ];

  // Đóng sidebar khi bấm link trên mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Navbar mobile: Nút hamburger mở sidebar */}
      <header className="mobile-header d-md-none">
        <Button variant="light" onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </Button>
        <span className="mobile-header-user">{user?.name || "User"}</span>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header text-center border-bottom py-3">
          <h5 className="text-teal">Shop Panel</h5>
          <small className="text-muted">Xin chào, {user?.name}</small>
          {/* Nút đóng sidebar trên mobile */}
          <button
            className="close-sidebar d-md-none"
            onClick={() => setSidebarOpen(false)}
          >
            &times;
          </button>
        </div>
        <nav className="sidebar-nav flex-column p-3">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.to} className="dropdown mb-3">
                <div
                  className="nav-link d-flex align-items-center justify-content-between dropdown-toggle"
                  onClick={() =>
                    setOpenDropdown((prev) =>
                      prev === item.to ? null : item.to
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center">
                    <span className="me-2">{item.icon}</span>
                    {item.label}
                  </div>
                  {openDropdown === item.to ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                <Collapse in={openDropdown === item.to}>
                  <div className="ms-4 mt-2">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          "nav-link d-block mb-2" +
                          (isActive ? " active fw-bold text-teal" : "")
                        }
                        onClick={handleLinkClick}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </Collapse>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  "nav-link d-flex align-items-center mb-3" +
                  (isActive ? " active text-teal fw-bold" : "")
                }
                onClick={handleLinkClick}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Header />
        <Outlet />
      </main>
    </>
  );
};

export default SidebarLayout;
