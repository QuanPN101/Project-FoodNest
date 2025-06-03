import React from "react";

const StoreDetail = () => {
  return (
    <div>
      <h1>Chi tiết gian hàng</h1>

      <div className="container mt-4 border rounded p-4" style={{background: 'white'}}>
      {/* Phần 1: Ảnh + tiêu đề + mô tả */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="bg-secondary rounded" style={{ width: "100%", height: 150 }}></div>
        </div>
        <div className="col-md-9">
          <h3><strong>Thế lòng se điếu</strong></h3>
          <p>Mô tả: Theo dân gian, lòng se điếu là một loại lòng đặc biệt...</p>
        </div>
      </div>

      {/* Phần 2: Thông tin chi tiết + Món ăn nổi bật */}
      <div className="row mb-4">
        <div className="col-md-4">
          <h5><strong>Thông tin chi tiết khác</strong></h5>
          <p>Chủ gian hàng: Ngô Quỳnh Thế</p>
          <p>Email: ngoquynhthe.official@gmail.com</p>
          <p>Địa chỉ: 77 Nguyễn Huệ, TP Huế</p>
          <p>SĐT: 0983863222</p>
          <p>Số CCCD: 040204015881</p>
          <p>Số tài khoản: 123923278 (Vietcombank)</p>
        </div>

        <div className="col-md-8">
          <h5><strong>Món ăn nổi bật</strong></h5>
          <div className="row">
            <div className="col-4">
              <div className="bg-secondary rounded" style={{ width: "100%", height: 120 }}></div>
              <p><strong>Cơm gà đùi</strong><br />35.000đ</p>
            </div>
            <div className="col-4">
              <div className="bg-secondary rounded" style={{ width: "100%", height: 120 }}></div>
              <p><strong>Cơm gà đùi</strong><br />35.000đ</p>
            </div>
            <div className="col-4">
              <div className="bg-secondary rounded" style={{ width: "100%", height: 120 }}></div>
              <p><strong>Cơm sườn nướng</strong><br />39.000đ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phần 3: Danh sách thực đơn */}
      <div className="mb-3">
        <h5><strong>Danh sách thực đơn</strong></h5>
        <div className="d-flex overflow-auto gap-3">
          {["Cơm gà đùi", "Cơm gà đùi", "Cơm gà đùi"].map((item, idx) => (
            <div key={idx}>
              <div className="bg-secondary rounded" style={{ width: 100, height: 100 }}></div>
              <p className="text-center">
                {item}
                <br />
                35.000đ
              </p>
            </div>
          ))}
          {/* Bạn có thể thay array trên để render nhiều món hơn */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default StoreDetail;
