import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirmPass) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    try {
      const msg = await register(username, password);
      setMessage(msg);
      setUsername("");
      setPassword("");
      setConfirmPass("");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Đăng ký</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên tài khoản</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            className="form-control"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Đăng ký
        </button>
      </form>
      <p className="mt-3">
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default Register;
