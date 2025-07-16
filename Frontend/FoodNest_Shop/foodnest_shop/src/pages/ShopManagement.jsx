import React, { useEffect, useState } from "react";
import { fetchShops, addShop, updateShop, deleteShop } from "../api/mockApi";

const ShopManagement = () => {
  const [shops, setShops] = useState([]);
  const [form, setForm] = useState({ name: "", owner: "", address: "" });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const loadShops = () => {
    fetchShops().then(setShops);
  };

  useEffect(() => {
    loadShops();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (editingId === null) {
      addShop(form).then(() => {
        loadShops();
        setForm({ name: "", owner: "", address: "" });
      });
    } else {
      updateShop(editingId, form).then(() => {
        loadShops();
        setForm({ name: "", owner: "", address: "" });
        setEditingId(null);
      });
    }
  };

  const handleEdit = (shop) => {
    setForm({ name: shop.name, owner: shop.owner, address: shop.address });
    setEditingId(shop.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa gian hàng này?")) {
      deleteShop(id).then(() => loadShops());
    }
  };

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(search.toLowerCase()) ||
      shop.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Quản lý gian hàng</h2>
      <form onSubmit={handleAddOrUpdate} className="mb-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên gian hàng"
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="owner"
          value={form.owner}
          onChange={handleChange}
          placeholder="Tên chủ gian hàng"
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Địa chỉ"
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          {editingId === null ? "Thêm gian hàng" : "Cập nhật"}
        </button>
        {editingId !== null && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setForm({ name: "", owner: "", address: "" });
              setEditingId(null);
            }}
          >
            Hủy
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="Tìm kiếm gian hàng..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-3"
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tên gian hàng</th>
            <th>Chủ gian hàng</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredShops.map((shop) => (
            <tr key={shop.id}>
              <td>{shop.name}</td>
              <td>{shop.owner}</td>
              <td>{shop.address}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(shop)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(shop.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {filteredShops.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                Không tìm thấy gian hàng
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShopManagement;
