import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ link, icon, text, customClass }) => {
  const location = useLocation();

  // Đảm bảo so sánh đúng, vì pathname luôn bắt đầu bằng "/"
  const normalizedLink = link.startsWith('/') ? link : `/${link}`;
  const isActive = location.pathname === normalizedLink;

  return (
    <li className="nav-item">
      <Link
        to={normalizedLink}
        className={`nav-link ${isActive ? 'active' : (customClass || 'collapsed')}`}
      >
        <i className={icon}></i>
        <span>{text}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
