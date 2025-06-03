import React from "react";
import noavata from "../assets/images/no-avatar.png";
import { Link } from "react-router-dom";
const ProfileDropdown = () => {
  return (
    <li className="nav-item dropdown pe-3">
      <Link
        className="nav-link nav-profile d-flex align-items-center pe-0"
        data-bs-toggle="dropdown"
      >
        <img src={noavata} alt="Profile" className="rounded-circle" />
        <span className="d-none d-md-block dropdown-toggle ps-2">
          Trần Quang
        </span>
      </Link>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>Trương Thị Minh Tú</h6>
          <span>Shop</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link
            className="dropdown-item d-flex align-items-center"
            to="profile"
          >
            <i className="bi bi-person"></i>
            <span>Hồ sơ cá nhân</span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item d-flex align-items-center" to="login">
            <i className="bi bi-box-arrow-right"></i>
            <span>Đăng xuất</span>
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default ProfileDropdown;
