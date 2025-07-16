import React, { useEffect, useState } from "react";
import { api } from "./fakeApi";
import "bootstrap/dist/css/bootstrap.min.css";

function StatisticsReport() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getStatistics().then(setStats);
  }, []);

  if (!stats) return <div className="container mt-4">Đang tải thống kê...</div>;

  return (
    <div className="container mt-4">
      <h3>Báo cáo thống kê</h3>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Doanh thu</h5>
              <p className="card-text">{stats.doanhThu.toLocaleString()} đ</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Gian hàng</h5>
              <p className="card-text">{stats.soGianHang}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Đơn hàng</h5>
              <p className="card-text">{stats.soDonHang}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsReport;
