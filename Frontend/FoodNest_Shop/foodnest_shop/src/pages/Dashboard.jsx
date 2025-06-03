import React, { useEffect, useState } from "react";
import { fetchAccounts, fetchShops, fetchOrders } from "../api/mockApi";

const Dashboard = () => {
  const [accountsCount, setAccountsCount] = useState(0);
  const [shopsCount, setShopsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    fetchAccounts().then((data) => setAccountsCount(data.length));
    fetchShops().then((data) => setShopsCount(data.length));
    fetchOrders().then((data) => setOrdersCount(data.length));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Tài khoản</h5>
              <p className="card-text fs-3">{accountsCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Gian hàng</h5>
              <p className="card-text fs-3">{shopsCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Đơn hàng</h5>
              <p className="card-text fs-3">{ordersCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
