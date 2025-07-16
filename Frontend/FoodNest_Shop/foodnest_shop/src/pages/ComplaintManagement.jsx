import React, { useEffect, useState } from "react";
import { api } from "./fakeApi";
import "bootstrap/dist/css/bootstrap.min.css";

function ComplaintManagement() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api.getComplaints().then(setComplaints);
  }, []);

  const handleStatusUpdate = (id, status) => {
    api.updateComplaintStatus(id, status).then(() => {
      setComplaints((prev) =>
        prev.map((c) => (c.maKhieuNai === id ? { ...c, trangThai: status } : c))
      );
    });
  };

  return (
    <div className="container mt-4">
      <h3>Quản lý khiếu nại</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Mã</th>
            <th>Tiêu Đề</th>
            <th>Nội Dung</th>
            <th>Ngày</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.maKhieuNai}>
              <td>{c.maKhieuNai}</td>
              <td>{c.tieuDe}</td>
              <td>{c.noiDung}</td>
              <td>{c.ngayTao}</td>
              <td>{c.trangThai}</td>
              <td>
                <select
                  className="form-select"
                  value={c.trangThai}
                  onChange={(e) =>
                    handleStatusUpdate(c.maKhieuNai, e.target.value)
                  }
                >
                  <option>Mới</option>
                  <option>Đang xử lý</option>
                  <option>Đã xử lý</option>
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

export default ComplaintManagement;
