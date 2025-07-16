import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { maDonHang } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);
  const navigate = useNavigate();

  const updateStatus = (newStatus) => {
  if (!window.confirm(`Xác nhận chuyển đơn hàng sang trạng thái: ${newStatus}?`)) return;

  axios.put(`http://localhost:8080/api/donhang/${maDonHang}/trangthai`, {
      trangThai: newStatus
    })
      .then(() => {
        toast.success("Cập nhật thành công!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(() => toast.error("Cập nhật thất bại!"));
  };
  const handleDelete = (maDonHang) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
      axios.delete(`http://localhost:8080/api/donhang/${maDonHang}`)
        .then(() => {
          toast.success("Đã xóa đơn hàng.");
          navigate('/orders');
        })
        .catch(() => {
          toast.error("Xóa thất bại!");
        });
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/chitiethoadon/donhang/${maDonHang}`)
      .then(res => {
        setOrderItems(res.data);
        if (res.data.length > 0) {
          setOrderInfo(res.data[0].maDonHang);
        }
      })
      .catch(err => console.error('Lỗi khi tải dữ liệu đơn hàng:', err));
  }, [maDonHang]);

  if (!orderInfo) return <p>Đang tải dữ liệu đơn hàng...</p>;

  return (
    <div className="max-w-6xl mx-auto p-0">
      {/* Tiêu đề */}
      <h1 className="text-3xl fw-bold mb-3">Chi tiết đơn hàng</h1>
      

      {/* Thông tin đơn hàng */}
      <div className="bg-white border rounded shadow-sm p-4 mb-3">
        <div className="row mb-2">
          <div className="col-md-6">
            <p><strong>Mã đơn hàng:</strong> {orderInfo.maDonHang}</p>
            <p><strong>Người đặt:</strong> {orderInfo.maNguoiDung.hoTen} ({orderInfo.hoTen})</p>
            <p><strong>Trạng thái:</strong> {orderInfo.trangThaiDonHang}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Ngày đặt:</strong> {new Date(orderInfo.ngayDat).toLocaleString()}</p>
            <p><strong>Địa chỉ giao hàng:</strong> {orderInfo.diaChiGiaoHang}</p>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <h1 className="text-2xl fw-semibold mb-3">Sản phẩm trong đơn hàng</h1>
      <div className="rounded-top overflow-hidden border">
        <table className="table table-bordered table-hover align-middle text-center mb-0">
          <thead className="table-light">
            <tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => {
              const sp = item.maSanPham;
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={sp.anhChinh}
                      alt={sp.tenSanPham}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                  </td>
                  <td>{sp.tenSanPham}</td>
                  <td>{item.donGia.toLocaleString()} VNĐ</td>
                  <td>{item.soLuong}</td>
                  <td>{(item.donGia * item.soLuong).toLocaleString()} VNĐ</td>
                  <td className="text-start">
                    {sp.tuyChon && sp.tuyChon.length > 0 ? (
                      <ul className="mb-0 ps-3">
                        {sp.tuyChon.map((tuychon, idx) => (
                          <li key={idx}>
                            {tuychon.tenTuyChon} - {tuychon.moTa}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>Không có</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tổng tiền */}
      <div className="text-end mt-4">
        
        <h5 className="fw-bold text-danger">
          Tổng tiền:{' '}
          {orderItems
            .reduce((total, item) => total + item.donGia * item.soLuong, 0)
            .toLocaleString()} VNĐ
        </h5>
        <div className="d-flex justify-content-end mt-4">
          <div className="dropdown me-2">
              {orderInfo.trangThaiDonHang === "Đã hủy" || orderInfo.trangThaiDonHang === "Từ chối đơn hàng" ? (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(orderInfo.maDonHang)}
                >
                  Xóa đơn hàng
                </button>
              ) : orderInfo.trangThaiDonHang !== "Đã nhận hàng" && (
                <div className="btn-group">
                  <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Xử lý đơn hàng
                  </button>
                  <ul className="dropdown-menu shadow-sm rounded-2 px-1">
                    {orderInfo.trangThaiDonHang === "Chờ xác nhận" && (
                      <>
                        <li><button className="dropdown-item" onClick={() => updateStatus("Đã gửi") }>Duyệt đơn hàng</button></li>
                        <li><button className="dropdown-item" onClick={() => updateStatus("Từ chối đơn hàng")}>Từ chối đơn hàng</button></li>
                        <li><button className="dropdown-item" onClick={() => updateStatus("Đã hủy")}>Hủy đơn hàng</button></li>
                      </>
                    )}

                    {["Đã gửi", "Đang giao"].includes(orderInfo.trangThaiDonHang) && (
                      <li><button className="dropdown-item" onClick={() => updateStatus("Đang giao")}>Chuyển giao hàng</button></li>
                    )}

                    {orderInfo.trangThaiDonHang === "Đang giao" && (
                      <li><button className="dropdown-item" onClick={() => updateStatus("Đã nhận hàng")}>Xác nhận hoàn tất</button></li>
                    )}
                  </ul>
                </div>
              )}

          </div>
          <button
          className="btn btn-secondary mb-3"
          onClick={() => navigate('/orders')}
        >
           Quay lại
        </button> 
        </div>

        
      </div>
    </div>
  );
};

export default OrderDetails;
