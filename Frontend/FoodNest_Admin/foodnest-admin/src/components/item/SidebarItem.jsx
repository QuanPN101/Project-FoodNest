import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ link, icon, text, customClass }) => {
  const location = useLocation();
  const isActive = location.pathname === ('admin/'+link);

  return (
    <li className="nav-item">
      <Link to={link} className={`nav-link ${isActive ? '' : (customClass || 'collapsed')}`}>
        <i className={icon}></i>
        <span>{text}</span>
      </Link>
    </li>
  );
};


export default SidebarItem;
