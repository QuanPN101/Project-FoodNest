import React from 'react';
import noavata from '../../assets/images/no-avatar.png'
import { Link, useNavigate} from 'react-router-dom';
import { useUser } from '../../context/UserContect'; 
const ProfileDropdown = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <li className="nav-item dropdown pe-3">
      <Link className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
        <img src={noavata} alt="Profile" className="rounded-circle" />
        <span className="d-none d-md-block dropdown-toggle ps-2">{user?.hoTen || 'Đăng nhập'}</span>
      </Link>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>{user?.hoTen}</h6>
          <span>
            {user?.maVaiTro === 1
              ? 'Khách hàng'
              : user?.maVaiTro === 2
              ? 'Chủ gian hàng'
              : user?.maVaiTro === 3
              ? 'Admin'
              : ''}
          </span>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <Link className="dropdown-item d-flex align-items-center" to='profile' >
            <i className="bi bi-person"></i>
            <span>Hồ sơ cá nhân</span>
          </Link>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center"
            onClick={handleLogout}
            style={{ border: 'none', background: 'none', padding: '15px', cursor: 'pointer', width: '100%', textAlign: 'left', height: '40px' }}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Đăng xuất</span>
          </button>
        </li>
      </ul>
    </li>
  );
};

export default ProfileDropdown;
