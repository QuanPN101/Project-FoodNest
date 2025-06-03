import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormAddPromotion.css';

const FormAddPromotion = () => {
  const [formData, setFormData] = useState({
    anh: '',
    ten_khuyen_mai: '',
    mo_ta: '',
    loai: '',
    gia_tri_giam: '',
    ngay_bat_dau: '',
    ngay_ket_thuc: '',
    khung_gio_ap_dung: '',
    don_toi_thieu: '',
    dang_ap_dung: false,
    so_lan_su_dung: 0,
    gioi_han_tong: 0,
    gioi_han_moi_khach: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu gửi:", formData);
    // TODO: gửi dữ liệu về backend
  };

  return (
    <div className="container" style={{marginTop: '0', padding: '0'}}>
      <h1>Tạo Chương Trình Khuyến Mãi</h1>
      <form onSubmit={handleSubmit} className="promo-form" style={{marginTop: '10px'}}>
        <div className="row g-3">
          {/* <div className="col-md-6">
            <label className="form-label">Ảnh chương trình</label>
            <input type="file" className="form-control" name="anh" value={formData.anh} onChange={handleChange} placeholder="URL ảnh hoặc đường dẫn" />
          </div> */}
          <div className="col-md-6">
            <label className="form-label">Tên chương trình</label>
            <input type="text" className="form-control" name="ten_khuyen_mai" value={formData.ten_khuyen_mai} onChange={handleChange} required />
          </div>

          <div className="col-md-12">
            <label className="form-label">Mô tả</label>
            <textarea className="form-control" name="mo_ta" value={formData.mo_ta} onChange={handleChange} rows="3" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Loại khuyến mãi</label>
            <input type="text" className="form-control" name="loai" value={formData.loai} onChange={handleChange} placeholder="% / số tiền / tặng kèm..." />
          </div>
          <div className="col-md-6">
            <label className="form-label">Giá trị giảm</label>
            <input type="number" className="form-control" name="gia_tri_giam" value={formData.gia_tri_giam} onChange={handleChange} step="0.01" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Ngày bắt đầu</label>
            <input type="date" className="form-control" name="ngay_bat_dau" value={formData.ngay_bat_dau} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Ngày kết thúc</label>
            <input type="date" className="form-control" name="ngay_ket_thuc" value={formData.ngay_ket_thuc} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Khung giờ áp dụng</label>
            <input type="text" className="form-control" name="khung_gio_ap_dung" value={formData.khung_gio_ap_dung} onChange={handleChange} placeholder="VD: 14:00-17:00" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Đơn hàng tối thiểu</label>
            <input type="number" className="form-control" name="don_toi_thieu" value={formData.don_toi_thieu} onChange={handleChange} step="0.01" />
          </div>

          <div className="col-md-4">
            <label className="form-label">Số lần đã dùng</label>
            <input type="number" className="form-control" name="so_lan_su_dung" value={formData.so_lan_su_dung} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Giới hạn tổng</label>
            <input type="number" className="form-control" name="gioi_han_tong" value={formData.gioi_han_tong} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Giới hạn mỗi khách</label>
            <input type="number" className="form-control" name="gioi_han_moi_khach" value={formData.gioi_han_moi_khach} onChange={handleChange} />
          </div>

          <div className="col-md-12 form-check mt-2">
            <input className="form-check-input" type="checkbox" name="dang_ap_dung" checked={formData.dang_ap_dung} onChange={handleChange} />
            <label className="form-check-label ms-2">Đang áp dụng</label>
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success">Tạo mới</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormAddPromotion;
