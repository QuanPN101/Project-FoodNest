import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StoreList = () => {
  const [storeList, setStoreList] = useState([]);
  const navigate = useNavigate();

  // Lấy dữ liệu từ localStorage
  useEffect(() => {
    const data = localStorage.getItem("stores");
    if (data) {
      setStoreList(JSON.parse(data));
    } else {
      // Nếu chưa có dữ liệu thì thêm 2 gian hàng mẫu
      const defaultStores = [
        {
          ma_gian_hang: 1,
          ten_gian_hang: "Bún Bò Cô Sáu",
          mo_ta: "Chuyên bún bò Huế chuẩn vị miền Trung",
          dia_chi: "24 Lý Thường Kiệt, TP Huế",
          logo: "https://via.placeholder.com/100x100.png?text=Bún+Bò",
          ma_tai_khoan: 101,
          ngay_tao: "2025-05-01",
          trang_thai: 1,
        },
        {
          ma_gian_hang: 2,
          ten_gian_hang: "Trà Sữa Kiki",
          mo_ta: "Trà sữa homemade, ship toàn TP.HCM",
          dia_chi: "95 Nguyễn Trãi, Quận 5, TP.HCM",
          logo: "https://via.placeholder.com/100x100.png?text=Trà+Sữa",
          ma_tai_khoan: 102,
          ngay_tao: "2025-05-15",
          trang_thai: 1,
        },
      ];
      localStorage.setItem("stores", JSON.stringify(defaultStores));
      setStoreList(defaultStores);
    }
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá gian hàng này?")) {
      const updatedList = storeList.filter((s) => s.ma_gian_hang !== id);
      setStoreList(updatedList);
      localStorage.setItem("stores", JSON.stringify(updatedList));
    }
  };

  return (
    <div>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/add-store")}
      >
        + Thêm gian hàng
      </button>
      <div className="row">
        {storeList.map((store) => (
          <div className="col-md-6 mb-4" key={store.ma_gian_hang}>
            <div className="card">
              <img src={store.logo} className="card-img-top" alt="logo" />
              <div className="card-body">
                <h5 className="card-title">{store.ten_gian_hang}</h5>
                <p className="card-text">{store.mo_ta}</p>
                <p className="card-text">
                  <strong>Địa chỉ:</strong> {store.dia_chi}
                </p>
                <p className="card-text">
                  <strong>Trạng thái:</strong>{" "}
                  <span
                    className={
                      store.trang_thai === 1 ? "text-success" : "text-secondary"
                    }
                  >
                    {store.trang_thai === 1 ? "Đang hoạt động" : "Tạm nghỉ"}
                  </span>
                </p>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/edit-store/${store.ma_gian_hang}`)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(store.ma_gian_hang)}
                >
                  Xoá
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
