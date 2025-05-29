import React, { useEffect, useState } from 'react';
import { Link ,useParams } from 'react-router-dom';
import axios from 'axios';

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/nguoidung/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error('Lỗi lấy chi tiết người dùng:', err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (!user) return <div>Đang tải chi tiết người dùng...</div>;

  return (
    <div>
      <h1>Chi tiết thông tin người dùng</h1>
      <div className="col-lg-12" style={{ marginTop: '10px' }}>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Họ và tên</label>
                <div className="col-sm-10">
                  <p class="form-control" style={{margin: '0'}}>
                    {user.hoTen}
                  </p>
                </div>
              </div>

              
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <p class="form-control">
                    {user.email}
                  </p>
                </div>
              </div>

              
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Địa chỉ</label>
                <div className="col-sm-10">
                  <p class="form-control">
                    {user.diaChi}
                  </p>
                </div>
              </div>

              
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Số điện thoại</label>
                <div className="col-sm-10">
                  <p class="form-control">
                    {user.soDienThoai}
                  </p>
                </div>
              </div>

              
              <div className="row mb-3">
                
                <fieldset className="col-md-6">
                  <legend className="col-form-label pt-0">Vai trò</legend>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" value="admin" defaultChecked />
                    <label className="form-check-label">Quản trị viên</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" value="user" />
                    <label className="form-check-label">Người dùng</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" value="vendor" />
                    <label className="form-check-label">Chủ gian hàng</label>
                  </div>
                </fieldset>

                <fieldset className="col-md-6">
                  <legend className="col-form-label pt-0">Trạng thái</legend>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="status" id="active" value="active" defaultChecked />
                    <label className="form-check-label" htmlFor="active">Hoạt động</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="status" id="inactive" value="inactive" />
                    <label className="form-check-label" htmlFor="inactive">Không hoạt động</label>
                  </div>  
                </fieldset>

              </div>
            
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Ảnh đại diện</label>
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
                  <button type="submit" className="btn btn-danger">Xóa thông tin</button>
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
