import React, { useEffect, useState } from 'react';
import { Link ,useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [canDelete, setCanDelete] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/nguoidung/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error('Lỗi lấy chi tiết người dùng:', err));
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/nguoidung/can-delete/${id}`)
      .then(res => setCanDelete(res.data))
      .catch(err => console.error("Lỗi kiểm tra xóa người dùng:", err));
  }, [id]);

  const handleDeleteUser = (id) => {
  if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
    axios.delete(`http://localhost:8080/api/nguoidung/${id}`)
      .then(res => {
        toast.info("Xóa thành công!");
        navigator('/account');
      })
      .catch(err => {
        console.error(err);
        toast.error("Xóa thất bại!");
      });
  }
};


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };

  if (!user) return <div>Đang tải chi tiết người dùng...</div>;

  return (
    <div>
      <h1>Chi tiết thông tin người dùng</h1>
      <div className="col-lg-12" style={{ marginTop: '10px' }}>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label fw-bold text-end">Họ và tên:</label>
                <div className="col-sm-10">
                  <p class="form-control" style={{margin: '0'}}>
                    {user.hoTen}
                  </p>
                </div>
              </div>

              
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label fw-bold text-end">Email:</label>
                <div className="col-sm-10">
                  <p class="form-control">
                    {user.email}
                  </p>
                </div>
              </div>

              
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label fw-bold text-end">Địa chỉ:</label>
                <div className="col-sm-10">
                  <p class="form-control">
                    {user.diaChi}
                  </p>
                </div>
              </div>

              
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label fw-bold text-end">Số điện thoại:</label>
                <div className="col-sm-10">
                  <p class="form-control">
                    {user.soDienThoai}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label fw-bold text-end">Vai trò:</label>
                <div className="col-sm-10">
                  <p className="form-control">
                    {user.maVaiTro === 1
                      ? "Khách hàng"
                      : user.maVaiTro === 2
                      ? "Chủ Gian hàng"
                      : user.maVaiTro === 3
                      ? "Admin"
                      : "Không xác định"}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label fw-bold text-end">Trạng thái:</label>
                <div className="col-sm-10">
                  <p className="form-control">
                    {user.trangThai ? "Đang hoạt động" : "Đã bị khóa"}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-2 col-form-label fw-bold text-end">Ngày tạo:</label>
                <div className="col-sm-10">
                  <p class="form-control">
                    {user.ngayTao}
                  </p>
                </div>
              </div>
          
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label fw-bold text-end">Ảnh đại diện:</label>
                <div className="col-sm-10 d-flex align-items-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Ảnh đại diện"
                      style={{ maxWidth: '200px', borderRadius: '8px' }}
                    />
                  ) : (
                    <span className="text-muted">Không có ảnh</span>
                  )}
                </div>
              </div>
 
              <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2 d-flex gap-2">
                  {canDelete && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user.maNguoiDung)}
                    >
                      Xóa người dùng
                    </button>

                  )}

                  <Link to="/account" className="btn btn-secondary">Quay lại</Link>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;

