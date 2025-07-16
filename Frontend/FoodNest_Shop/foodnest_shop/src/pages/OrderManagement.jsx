import React, { useEffect, useState } from "react";
import { api } from "./fakeApi";
import "bootstrap/dist/css/bootstrap.min.css";

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.getOrders().then(setOrders);
  }, []);

  const handleStatusChange = (id, status) => {
    api.updateOrderStatus(id, status).then(() => {
      setOrders((prev) =>
        prev.map((o) => (o.maDonHang === id ? { ...o, trangThai: status } : o))
      );
    });
  };

  return (
    <div className="container mt-4">
      <h3>Quản lý đơn hàng</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Mã Đơn</th>
            <th>Ngày Đặt</th>
            <th>Trạng Thái</th>
            <th>Tổng Tiền</th>
            <th>Địa Chỉ</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.maDonHang}>
              <td>{o.maDonHang}</td>
              <td>{o.ngayDat}</td>
              <td>{o.trangThai}</td>
              <td>{o.tongTien.toLocaleString()}đ</td>
              <td>{o.diaChi}</td>
              <td>
                <select
                  className="form-select"
                  value={o.trangThai}
                  onChange={(e) =>
                    handleStatusChange(o.maDonHang, e.target.value)
                  }
                >
                  <option>Đang xử lý</option>
                  <option>Đang giao</option>
                  <option>Đã giao</option>
                  <option>Đã hủy</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
