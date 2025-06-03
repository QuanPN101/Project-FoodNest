// src/components/item/SidebarDropdown.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarDropdown = ({ title, icon, targetId, items }) => {
  return (
    <li className="nav-item">
      <a
        className="nav-link collapsed"
        data-bs-target={`#${targetId}`}
        data-bs-toggle="collapse"
        href="#"
      >
        <i className={icon}></i>
        <span>{title}</span>
        <i className="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul id={targetId} className="nav-content collapse" data-bs-parent="#sidebar-nav">
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.link}>
              <i className="bi bi-circle"></i>
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SidebarDropdown;
