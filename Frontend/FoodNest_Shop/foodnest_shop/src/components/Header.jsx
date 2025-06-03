import React from "react";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
const Header = () => {
  const handleLinkClick = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to="dashboard"
          className="logo d-flex align-items-center"
          style={{ textDecoration: "none" }}
        >
          <span className="d-none d-lg-block">FoodNest</span>
        </Link>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={handleLinkClick}
        ></i>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          {/* Notification Dropdown */}
          <NotificationDropdown />

          {/* Profile Dropdown */}
          <ProfileDropdown />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
