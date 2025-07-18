import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SidebarItem from '../components/item/SidebarItem';
import SidebarDropdown from '../components/item/SidebarDropdown';

const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      
      <ul className="sidebar-nav" id="sidebar-nav">

        <li className="nav-heading">Quản lý</li>
        <SidebarItem link="dashboard" icon="bi bi-bar-chart-line" text="Tổng quan" customClass="" />
        <SidebarItem link="orders" icon="bi bi-receipt-cutoff" text="Đơn hàng và giao dịch" customClass="collapsed" />
        <SidebarItem link="ads" icon="bi bi-megaphone" text="Quảng cáo và khuyến mãi" customClass="collapsed" />
        <SidebarItem link="complaints" icon="bi bi-exclamation-triangle" text="Khiếu nại và vi phạm" customClass="collapsed" />
        <SidebarItem link="account" icon="bi bi-person-gear" text="Tài khoản" customClass="collapsed" />


        {/* <SidebarDropdown
          title="Tài khoản"
          icon="bi bi-person-gear"
          targetId="nav-account"
          items={[
            { link: 'customers', text: 'Khách hàng' },
            { link: 'admins', text: 'Admin' },
          ]}
        /> */}
        <SidebarItem link="liststores" icon="bi bi-shop" text="Danh sách gian hàng" customClass="collapsed" />
        {/* <SidebarDropdown
          title="Gian hàng"
          icon="bi bi-shop"
          targetId="components-nav"
          items={[
            { link: 'liststores', text: 'Danh sách gian hàng' },
            
          ]}
        /> */}
        
        
        
        <li className="nav-heading">Trang</li>

        {/* <SidebarItem link="/fanpage" icon="bi bi-person" text="Fanpage" customClass="collapsed" /> */}
        {/* <a href="http://localhost:5173/" className="sidebar-item collapsed">
          <i className="bi bi-person"></i>
          <span>Fanpage</span>
        </a> */}

        <SidebarItem link="/home" icon="bi bi-question-circle" text="Website" customClass="collapsed" />

      </ul>
    </aside>
  );
};

export default Sidebar;
