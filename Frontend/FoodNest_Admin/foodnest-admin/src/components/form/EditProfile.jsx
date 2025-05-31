import React, { useState, useEffect } from 'react';
import '../form/Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContect';
import noAvatar from '../../assets/images/no-avatar.png';

const EditProfile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    diaChi: '',
    maVaiTro: '',
    avatar: ''
  });
  const [previewImage, setPreviewImage] = useState(noAvatar);

  useEffect(() => {
    if (user) {
      setFormData({
        hoTen: user.hoTen || '',
        email: user.email || '',
        soDienThoai: user.soDienThoai || '',
        diaChi: user.diaChi || '',
        maVaiTro: user.maVaiTro || '',
        avatar: user.avatar || ''
      });
      setPreviewImage(user.avatar || noAvatar);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(files[0]);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'avatar' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu chỉnh sửa đến backend ở đây nếu cần

      const updatedUser = {
        ...user,
        ...formData,
        avatar: previewImage // Cập nhật preview nếu dùng base64
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('Cập nhật thành công');
      navigate('/profile');
    } catch (error) {
      console.error('Lỗi cập nhật thông tin:', error);
      alert('Đã xảy ra lỗi khi cập nhật');
    }
  };

  const onCancel = () => navigate(-1);

  return (
    <div className="container-func">
      <div className="container-func-right" id="func-right-container">
        <div className="edit-profile">
          <div className="profile">
            <h1>Chỉnh sửa hồ sơ cá nhân</h1>
            <hr />
            <div className="body-profile">
              <form onSubmit={handleSubmit}>
                <div className="form-edit-profile">
                  <div style={{ width: '70%' }}>
                    <div className="form-group">
                      <label>Họ và tên:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hoTen"
                        value={formData.hoTen}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Số điện thoại:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="soDienThoai"
                        value={formData.soDienThoai}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Địa chỉ:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="diaChi"
                        value={formData.diaChi}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Chức vụ:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={
                          formData.maVaiTro === 1 ? 'Khách hàng' :
                          formData.maVaiTro === 2 ? 'Chủ gian hàng' :
                          formData.maVaiTro === 3 ? 'Admin' : 'Không rõ'
                        }
                        disabled
                      />
                    </div>
                  </div>

                  <div style={{ width: '1px', backgroundColor: 'rgb(187, 187, 187)', margin: '0 10px' }}></div>

                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="form-group">
                      <label>Ảnh cá nhân:</label>
                      <input
                        type="file"
                        className="form-control"
                        name="avatar"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        id="Photo"
                        src={previewImage}
                        className="img img-bordered"
                        style={{ width: '300px', height: '300px', borderRadius: '50%' }}
                        alt="Ảnh đại diện"
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" className="btn btn-success">
                        <i className="fa fa-floppy-o"></i> Cập nhật
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Quay lại
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
