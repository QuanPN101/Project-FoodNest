import React from 'react';

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
      icon: 'bi-exclamation-circle',
      title: 'Lorem Ipsum',
      description: 'Quae dolorem earum veritatis oditseno',
      time: '30 min. ago',
      type: 'text-warning',
    },
    {
      icon: 'bi-x-circle',
      title: 'Atque rerum nesciunt',
      description: 'Quae dolorem earum veritatis oditseno',
      time: '1 hr. ago',
      type: 'text-danger',
    },
    {
      icon: 'bi-check-circle',
      title: 'Sit rerum fuga',
      description: 'Quae dolorem earum veritatis oditseno',
      time: '2 hrs. ago',
      type: 'text-success',
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
          Bạn có 4 thông báo mới
          <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">Xem tất cả</span></a>
        </li>
        <li><hr className="dropdown-divider" /></li>
        {notifications.map((notification, index) => (
          <React.Fragment key={index}>
            <NotificationItem {...notification} />
            <li><hr className="dropdown-divider" /></li>
          </React.Fragment>
        ))}
        <li className="dropdown-footer">
          <a href="#">Show all notifications</a>
        </li>
      </ul>
    </li>
  );
};

export default NotificationDropdown;
