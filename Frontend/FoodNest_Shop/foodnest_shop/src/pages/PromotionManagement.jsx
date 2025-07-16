import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Table, Container } from "react-bootstrap";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [formData, setFormData] = useState({
    maKhuyenMai: "",
    tenKhuyenMai: "",
    moTa: "",
    phanTramGiam: "",
    ngayBatDau: "",
    ngayKetThuc: "",
  });

  // Giả lập dữ liệu lấy từ backend
  useEffect(() => {
    const fakeData = [
      {
        maKhuyenMai: "KM01",
        tenKhuyenMai: "Giảm giá Tết",
        moTa: "Khuyến mãi nhân dịp Tết Nguyên Đán",
        phanTramGiam: 20,
        ngayBatDau: "2025-01-01",
        ngayKetThuc: "2025-01-15",
      },
      {
        maKhuyenMai: "KM02",
        tenKhuyenMai: "Mừng hè rực rỡ",
        moTa: "Khuyến mãi mùa hè",
        phanTramGiam: 10,
        ngayBatDau: "2025-06-01",
        ngayKetThuc: "2025-06-30",
      },
    ];
    setPromotions(fakeData);
  }, []);

  const handleShowModal = (promotion = null) => {
    if (promotion) {
      setEditingPromotion(promotion);
      setFormData(promotion);
    } else {
      setEditingPromotion(null);
      setFormData({
        maKhuyenMai: "",
        tenKhuyenMai: "",
        moTa: "",
        phanTramGiam: "",
        ngayBatDau: "",
        ngayKetThuc: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPromotion(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingPromotion) {
      // Cập nhật
      const updated = promotions.map((item) =>
        item.maKhuyenMai === formData.maKhuyenMai ? formData : item
      );
      setPromotions(updated);
    } else {
      // Thêm mới
      setPromotions((prev) => [...prev, formData]);
    }
    handleCloseModal();
  };

  const handleDelete = (maKhuyenMai) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá khuyến mãi này không?")) {
      setPromotions((prev) =>
        prev.filter((item) => item.maKhuyenMai !== maKhuyenMai)
      );
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Quản lý khuyến mãi</h3>
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => handleShowModal()}
      >
        + Thêm khuyến mãi
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã KM</th>
            <th>Tên khuyến mãi</th>
            <th>Mô tả</th>
            <th>% Giảm</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((item) => (
            <tr key={item.maKhuyenMai}>
              <td>{item.maKhuyenMai}</td>
              <td>{item.tenKhuyenMai}</td>
              <td>{item.moTa}</td>
              <td>{item.phanTramGiam}%</td>
              <td>{item.ngayBatDau}</td>
              <td>{item.ngayKetThuc}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowModal(item)}
                >
                  Sửa
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.maKhuyenMai)}
                >
                  Xoá
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingPromotion ? "Cập nhật" : "Thêm mới"} khuyến mãi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="maKhuyenMai" className="mb-2">
              <Form.Label>Mã khuyến mãi</Form.Label>
              <Form.Control
                type="text"
                name="maKhuyenMai"
                value={formData.maKhuyenMai}
                onChange={handleChange}
                disabled={!!editingPromotion}
              />
            </Form.Group>
            <Form.Group controlId="tenKhuyenMai" className="mb-2">
              <Form.Label>Tên khuyến mãi</Form.Label>
              <Form.Control
                type="text"
                name="tenKhuyenMai"
                value={formData.tenKhuyenMai}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="moTa" className="mb-2">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                name="moTa"
                value={formData.moTa}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phanTramGiam" className="mb-2">
              <Form.Label>Phần trăm giảm</Form.Label>
              <Form.Control
                type="number"
                name="phanTramGiam"
                value={formData.phanTramGiam}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="ngayBatDau" className="mb-2">
              <Form.Label>Ngày bắt đầu</Form.Label>
              <Form.Control
                type="date"
                name="ngayBatDau"
                value={formData.ngayBatDau}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="ngayKetThuc" className="mb-2">
              <Form.Label>Ngày kết thúc</Form.Label>
              <Form.Control
                type="date"
                name="ngayKetThuc"
                value={formData.ngayKetThuc}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PromotionManagement;
