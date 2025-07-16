import React, { useState } from "react";

const AccountManagement = () => {
  const [account, setAccount] = useState({
    maNguoiDung: "1",
    hoTen: "Trần Quang",
    email: "quang@example.com",
    soDienThoai: "0911222333",
    diaChi: "",
    matKhau: "123456",
    anhDaiDien:
      "https://png.pngtree.com/png-vector/20221119/ourmid/pngtree-smiling-girl-point-up-with-fingers-png-image_6471570.png",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Thông tin cập nhật:", account);
    alert("Cập nhật thành công!");
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    console.log("Mật khẩu mới:", newPassword);
    alert("Đổi mật khẩu thành công!");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản?")) {
      console.log("Tài khoản đã bị xóa:", account.maNguoiDung);
      alert("Tài khoản bị xóa.");
    }
  };

  const handleLogout = () => {
    console.log("Đăng xuất người dùng...");
    alert("Đăng xuất thành công!");
  };

  return (
    <div className="container mt-4">
      <h2>Quản lý tài khoản người bán</h2>
      <div className="card p-4 shadow-sm">
        <div className="text-center mb-3">
          <img
            src={account.anhDaiDien}
            alt="Avatar"
            style={{ width: "100px", borderRadius: "50%" }}
          />
        </div>

        <div className="form-group mb-2">
          <label>Mã người dùng</label>
          <input
            type="text"
            className="form-control"
            value={account.maNguoiDung}
            disabled
          />
        </div>

        <div className="form-group mb-2">
          <label>Họ tên</label>
          <input
            type="text"
            className="form-control"
            name="hoTen"
            value={account.hoTen}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group mb-2">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={account.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group mb-2">
          <label>Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            name="soDienThoai"
            value={account.soDienThoai}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group mb-3">
          <label>Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            name="diaChi"
            value={account.diaChi}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="d-flex gap-2">
          {isEditing ? (
            <>
              <button className="btn btn-success" onClick={handleUpdate}>
                Lưu
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Cập nhật thông tin
            </button>
          )}

          <button
            className="btn btn-warning"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            Đổi mật khẩu
          </button>

          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Xóa tài khoản
          </button>

          <button className="btn btn-dark" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>

        {showPasswordForm && (
          <div className="mt-4 border-top pt-3">
            <h5>Đổi mật khẩu</h5>
            <div className="form-group mb-2">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={handlePasswordChange}>
              Xác nhận đổi mật khẩu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
