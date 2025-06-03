import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../card/PromotionCard.css';

const PromotionCard = ({ title, discount, dateRange, condition, timeRange }) => {
  return (
    <div className="col">
      <div className="card h-100 promotion-card">
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <h6 className="card-subtitle mb-2">{discount}</h6>

    <ul className="list-unstyled mt-3">
      <li><strong>Thời gian:</strong> {dateRange}</li>
      <li><strong>Điều kiện:</strong> {condition}</li>
      <li><strong>Giờ áp dụng:</strong> {timeRange}</li>
    </ul>
  </div>
</div>
    </div>
  );
};

export default PromotionCard;
