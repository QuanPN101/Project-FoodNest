import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ChangePassword = () => {
  const { changePassword } = useAuth();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (newPass !== confirmPass) {
      setError("Mật khẩu mới không khớp");
      return;
    }
    try {
      const res = await changePassword(oldPass, newPass);
      setMessage(res);
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2>Đổi mật khẩu</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Mật khẩu cũ</label>
          <input
            type="password"
            className="form-control"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
