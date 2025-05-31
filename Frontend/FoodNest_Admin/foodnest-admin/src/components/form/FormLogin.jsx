import React, { useState } from "react";
import '../form/FormLogin.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/UserContect';

const FormLogin = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [formData, setFormData] = useState({ email: "", matKhau: "" });
  const [errors, setErrors] = useState({ email: "", matKhau: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    let errorMessages = { email: "", matKhau: "" };

    if (!formData.email) {
      errorMessages.email = "Vui lòng nhập email.";
      hasError = true;
    }
    if (!formData.matKhau) {
      errorMessages.matKhau = "Vui lòng nhập mật khẩu.";
      hasError = true;
    }
    setErrors(errorMessages);
    if (hasError) return;

    try {
      const res = await axios.post("http://localhost:8080/api/auth", formData);
      if (res.data.code === 1000) {
        const user = res.data.result;
        login(user);  // lưu user vào context + localStorage
        navigate('/dashboard');
      } else {
        alert("Đăng nhập thất bại: " + res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="body_RegisterForm">
      <div className="login-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tài khoản</label>
            <input
              type="text"
              name="email"
              placeholder="Email của bạn"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span style={{ color: "#f00", fontSize: 13 }}>{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              placeholder="Mật khẩu"
              value={formData.matKhau}
              onChange={handleChange}
            />
            {errors.matKhau && <span style={{ color: "#f00", fontSize: 13 }}>{errors.matKhau}</span>}
          </div>
          <button type="submit" className="login-btn">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
