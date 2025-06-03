import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DEFAULT_IMAGE =
  "https://cdn.tgdd.vn/2021/06/CookProduct/thumb-bun-bo-hue-1200x676.jpg";

const INITIAL_MENU = [
  {
    id: 1,
    name: "Bún bò Huế",
    description: "Món ăn đặc sản miền Trung, cay nồng đậm đà.",
    price: 45000,
    category: "Bún/Phở",
    available: true,
    imageUrl:
      "https://www.hungryhuy.com/wp-content/uploads/bun-bo-hue-bowl.jpg",
    customizableIngredients: ["Ớt sa tế", "Chanh", "Rau sống"],
  },
];

const CATEGORY_OPTIONS = ["Cơm", "Bún/Phở", "Đồ uống", "Món phụ"];
const ITEMS_PER_PAGE = 4;

const MenuManager = () => {
  const [menu, setMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    imageFile: null,
    previewUrl: null,
    category: "",
    ingredientsInput: "",
  });

  useEffect(() => {
    setMenu(INITIAL_MENU);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem((prev) => ({
        ...prev,
        imageFile: file,
        previewUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleAdd = () => {
    const {
      name,
      description,
      price,
      imageFile,
      previewUrl,
      category,
      ingredientsInput,
    } = newItem;
    if (!name || !price || !category)
      return alert("Vui lòng nhập đầy đủ tên, giá và phân loại!");

    const id = menu.length ? Math.max(...menu.map((m) => m.id)) + 1 : 1;

    const newMenuItem = {
      id,
      name,
      description,
      price: parseInt(price),
      imageUrl: previewUrl || DEFAULT_IMAGE,
      category,
      available: true,
      customizableIngredients: ingredientsInput
        ? ingredientsInput.split(",").map((s) => s.trim())
        : [],
    };

    setMenu([...menu, newMenuItem]);
    setNewItem({
      name: "",
      description: "",
      price: "",
      imageFile: null,
      previewUrl: null,
      category: "",
      ingredientsInput: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xoá món này?")) {
      setMenu(menu.filter((item) => item.id !== id));
    }
  };

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredMenu.length / ITEMS_PER_PAGE);
  const paginatedMenu = filteredMenu.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Quản lý Thực đơn</h2>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Tìm món ăn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Form thêm món mới */}
      <div className="card p-4 shadow-sm mb-5">
        <h4 className="mb-3">Thêm món mới</h4>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Tên món"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Giá"
              type="number"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            >
              <option value="">Chọn phân loại</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Nguyên liệu tuỳ chọn (phân cách dấu phẩy)"
              value={newItem.ingredientsInput}
              onChange={(e) =>
                setNewItem({ ...newItem, ingredientsInput: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Mô tả"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
          </div>
          {newItem.previewUrl && (
            <div className="col-md-2">
              <img
                src={newItem.previewUrl}
                alt="Preview"
                className="img-thumbnail"
              />
            </div>
          )}
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleAdd}>
              Thêm món
            </button>
          </div>
        </div>
      </div>

      {/* Danh sách món ăn */}
      <div className="row">
        {paginatedMenu.map((item) => (
          <div className="col-lg-3 col-md-6 mb-4" key={item.id}>
            <div className="card h-100 border-0 shadow-sm">
              <img
                src={item.imageUrl || DEFAULT_IMAGE}
                className="card-img-top"
                style={{ height: "160px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{item.name}</h5>
                <p className="small text-muted mb-1">{item.description}</p>
                <p className="mb-1">
                  <strong>Phân loại:</strong> {item.category}
                </p>
                <p className="mb-1">
                  <strong>Giá:</strong> {item.price.toLocaleString()} đ
                </p>
                <p className="mb-1">
                  <strong>Trạng thái:</strong>{" "}
                  <span
                    className={item.available ? "text-success" : "text-danger"}
                  >
                    {item.available ? "Hiển thị" : "Ẩn"}
                  </span>
                </p>
                {item.customizableIngredients.length > 0 && (
                  <ul className="list-unstyled small mb-2">
                    {item.customizableIngredients.map((i, idx) => (
                      <li key={idx}>- {i}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto d-flex justify-content-between">
                  <button className="btn btn-outline-primary btn-sm">
                    Sửa
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuManager;
