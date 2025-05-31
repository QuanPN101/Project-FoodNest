import React from 'react';
import '../form/Profile.css';
import { Link, Links } from 'react-router-dom';
import avata from '../../assets/images/no-avatar.png'
import {useUser} from '../../context/UserContect'

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <h1>Vui lòng đăng nhập để xem thông tin cá nhân.</h1>;
  }

  return (
    <div className="container-func">
      <div className="container-func-right" id="func-right-container">
        <div className="edit-profile">
          <div className="profile">
            <h1>Thông tin cá nhân</h1>
            <hr />
            <div className="body-profile">
              <div className="form-edit-profile">
                <div style={{ width: '70%' }}>
                  <div className="form-group">
                    <label>Họ và tên:</label>
                    <input class="form-control" type="text" value={user.hoTen || 'Không có thông tin'} disabled readonly />
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input class="form-control" type="text" value={user.email || 'Không có thông tin'} disabled readonly />
                  </div>

                  <div className="form-group">
                    <label>Số điện thoại:</label>
                    <input class="form-control" type="text" value={user.soDienThoai || 'Không có thông tin'} disabled readonly />
                  </div>

                  <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input class="form-control" type="text" value={user.diaChi || 'Không có thông tin'} disabled readonly />
                  </div>

                  <div className="form-group">
                    <label>Chức vụ:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={
                        user.maVaiTro === 1
                          ? 'Khách hàng'
                          : user.maVaiTro === 2
                          ? 'Chủ gian hàng'
                          : user.maVaiTro === 3
                          ? 'Admin'
                          : ''
                      }
                      disabled
                      readOnly
                    />
                  </div>

                </div>

                <div style={{ width: '1px', backgroundColor: 'rgb(187, 187, 187)', margin: '0 10px' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      id="Photo"
                      src={avata}
                      className="img img-bordered"
                      style={{ width: '300px', height: '300px', borderRadius: '50%' }}
                      alt="Ảnh đại diện"
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <Link to="/account/edit" className="btn btn-success">
                      <i className="fa fa-pencil"></i> Chỉnh sửa
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
