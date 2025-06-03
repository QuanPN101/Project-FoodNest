import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noavata from '../../assets/images/no-avatar.png'
import { Link } from "react-router-dom";

const EditProfile = () => {
  
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    maNguoiDung: "",
    email: "",
    matKhau: "",
    hoTen: "",
    soDienThoai: "",
    anhDaiDien: "",
    maVaiTro: "",
    trangThai: "",
    diaChi: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        maNguoiDung: user.maNguoiDung || "",
        hoTen: user.hoTen || "",
        email: user.email || "",
        diaChi: user.diaChi || "",
        soDienThoai: user.soDienThoai || "",
        matKhau: user.matKhau || "",
        anhDaiDien: user.anhDaiDien || "",
        maVaiTro: user.maVaiTro || "",
        trangThai: user.trangThai || "",
      });
    }
  }, [user]);

  if (!user) return null

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/nguoidung/${user.maNguoiDung}`, formData); 
      toast.success("Cập nhật thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      toast.error("Cập nhật thất bại!");
    }
  };


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
                  <div style={{ width: "70%" }}>
                    <div className="form-group">
                      <label>Họ và tên:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hoTen"
                        value={formData.hoTen || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Số điện thoại:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="soDienThoai"
                        value={formData.soDienThoai || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Địa chỉ:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="diaChi"
                        value={formData.diaChi || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Chức vụ:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={
                          formData.maVaiTro === 1
                            ? "Khách hàng"
                            : formData.maVaiTro === 2
                            ? "Chủ gian hàng"
                            : formData.maVaiTro === 3
                            ? "Admin"
                            : "Không rõ"
                        }
                        disabled
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      width: "1px",
                      backgroundColor: "rgb(187, 187, 187)",
                      margin: "0 10px",
                    }}
                  ></div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <div className="form-group">
                      <label>Ảnh cá nhân:</label>
                      <input
                        type="file"
                        className="form-control"
                        name="avatar"
                        accept="image/*"
                        onChange={handleChange}
                        required
                      />
                    </div> */}

                    <div
                      className="form-group"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        id="Photo"
                        src={noavata}
                        className="img img-bordered"
                        style={{
                          width: "300px",
                          height: "300px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        alt="Ảnh đại diện"
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <button type="submit" className="btn btn-primary">
                        <i className="fa fa-floppy-o"></i> Cập nhật
                      </button>
                      <Link
                        to="/profile"
                        className="btn btn-secondary"
                      >
                        Quay lại
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
              <div style={{ display: "none" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
