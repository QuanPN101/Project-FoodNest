import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const StoreDetail = () => {
  const { maGianHang } = useParams(); // <-- Lấy ID từ URL
  const [gianHang, setGianHang] = useState(null);
  const [sanPhams, setSanPhams] = useState([]);

  useEffect(() => {
    if (maGianHang) {
      axios.get(`http://localhost:8080/api/gianhang/get/${maGianHang}`)
        .then(res => setGianHang(res.data))
        .catch(err => console.error("Lỗi lấy gian hàng", err));

      axios.get(`http://localhost:8080/api/sanpham/gianhang/${maGianHang}`)
        .then(res => setSanPhams(res.data))
        .catch(err => console.error("Lỗi lấy sản phẩm", err));
    }
  }, [maGianHang]);

  return (
    <div>
      <h1>Chi tiết gian hàng </h1>

      <div className="container mt-4 border rounded p-4" style={{ background: "white" }}>
        {/* Phần 1: Ảnh + tiêu đề + mô tả */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div 
              className="rounded" 
              style={{ 
                width: "100%", 
                height: 150, 
                backgroundImage: `url(${gianHang?.anhDaiDien || 'default-image-url'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} 
            ></div>

          </div>
          <div className="col-md-8">
            <h3><strong>{gianHang?.tenGianHang}</strong></h3>
            <p>Mô tả: {gianHang?.moTa}</p>
          </div>
          <div className="col-md-1">
            <Link to='/liststores' className="btn btn-light">X</Link>
          </div>
        </div>

        {/* Phần 2: Thông tin chi tiết + Món ăn nổi bật */}
        <div className="row mb-4">
          <div className="col-md-4">
            <h5><strong>Thông tin chi tiết khác</strong></h5>
            <p><strong>Chủ gian hàng:</strong> {gianHang?.nguoiDung?.hoTen}</p>
            <p><strong>Email:</strong> {gianHang?.nguoiDung?.email}</p>
            <p><strong>Địa chỉ:</strong> {gianHang?.diaChi}</p>
            <p><strong>SĐT:</strong> {gianHang?.nguoiDung?.soDienThoai}</p>
          </div>


          <div className="col-md-8">
            <h5><strong>Món ăn nổi bật</strong></h5>
            <div className="row">
              {sanPhams.slice(0, 3).map((sp, idx) => (
                <div className="col-4" key={idx}>
                  <div className="bg-secondary rounded" style={{ width: "100%", height: 120, backgroundImage: `url(${sp.anhChinh})`, backgroundSize: 'cover' }}></div>
                  <p><strong>{sp.tenSanPham}</strong><br />{sp.gia.toLocaleString()}đ</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phần 3: Danh sách thực đơn */}
        <div className="mb-3">
          <h5><strong>Danh sách thực đơn</strong></h5>
          <div className="d-flex overflow-auto gap-3">
            {sanPhams.map((sp, idx) => (
              <div key={idx}>
                <div className="bg-secondary rounded" style={{ width: 100, height: 100, backgroundImage: `url(${sp.anhChinh})`, backgroundSize: 'cover' }}></div>
                <p
                  style={{
                    width: 100,
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    margin: 0,
                  }}
                >
                  {sp.tenSanPham}
                </p>

                <p style={{ margin: 0 }}>{sp.gia.toLocaleString()}đ</p>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
