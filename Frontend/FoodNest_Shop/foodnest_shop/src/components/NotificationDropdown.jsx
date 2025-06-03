import React from "react";

const NotificationItem = ({ icon, title, description, time, type }) => {
  return (
    <li className="notification-item">
      <i className={`bi ${icon} ${type}`}></i>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
        <p>{time}</p>
      </div>
    </li>
  );
};

const NotificationDropdown = () => {
  const notifications = [
    {
      icon: "bi-exclamation-circle",
      title: "Đơn hàng mới",
      description: "Khách hàng #1 đã đặt hàng",
      time: "30 phút trước",
      type: "text-warning",
    },
    {
      icon: "bi-x-circle",
      title: "Hủy đơn hàng",
      description: "Khách hàng #2 hủy đơn hàng",
      time: "1 giờ trước",
      type: "text-danger",
    },
    {
      icon: "bi-check-circle",
      title: "Đơn hàng đã giao",
      description:
        "Khách hàng #1 với mã đơn hàng #1 đã nhận được hàng thành công",
      time: "2 giờ trước",
      type: "text-success",
    },
  ];

  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        <span className="badge bg-danger badge-number">4</span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li className="dropdown-header">
          Bạn có 3 thông báo mới
          <a href="#">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              Xem tất cả
            </span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {notifications.map((notification, index) => (
          <React.Fragment key={index}>
            <NotificationItem {...notification} />
            <li>
              <hr className="dropdown-divider" />
            </li>
          </React.Fragment>
        ))}
        <li className="dropdown-footer">
          <a href="#">Hiển thị tất cả thông báo</a>
        </li>
      </ul>
    </li>
  );
};

export default NotificationDropdown;
