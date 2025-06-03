import React from 'react';
import '../../assets/style/style.css';

const InfoCard = ({ icon, count, title, description, color }) => {
  return (
    <div className="col-xxl-4 col-md-6">
      <div className="card info-card sales-card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>

          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className={`bi ${icon}`}></i>
            </div>
            <div className="ps-3">
              <h6>{count}</h6>
              <span
                className="small pt-2 ps-1"
                style={{ color: color }}
              >
                {description}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default InfoCard;
