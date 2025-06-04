// import axios from axios;
// import React, { useState, useEffect } from "react";

// const fakeData = [
//   {
//     id: 1,
//     tenGianHang: "Gian hàng A",
//     diaChi: "Hà Nội",
//     moTa: "Đồ ăn ngon",
//     trangThai: "PENDING",
//     anhBiaPreview: null,
//   },
//   {
//     id: 2,
//     tenGianHang: "Gian hàng B",
//     diaChi: "Hồ Chí Minh",
//     moTa: "Đồ uống mát lạnh",
//     trangThai: "APPROVED",
//     anhBiaPreview: null,
//   },
// ];

// const PAGE_SIZE = 2;

// const StoreManagement = () => {
//   const [stores, setStores] = useState(fakeData);
//   const [searchKey, setSearchKey] = useState("");
//   const [page, setPage] = useState(1);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingStore, setEditingStore] = useState(null);
//   const [form, setForm] = useState({
//     tenGianHang: "",
//     diaChi: "",
//     moTa: "",
//     anhBiaFile: null,
//     anhBiaPreview: null,
//   });

//   const [confirmDelete, setConfirmDelete] = useState({
//     open: false,
//     storeId: null,
//   });

//   // Lọc và phân trang
//   const filtered = stores.filter((s) =>
//     s.tenGianHang.toLowerCase().includes(searchKey.toLowerCase())
//   );
//   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
//   const displayedStores = filtered.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE
//   );

//   // Mở modal tạo mới
//   const openCreateModal = () => {
//     setEditingStore(null);
//     setForm({
//       tenGianHang: "",
//       diaChi: "",
//       moTa: "",
//       anhBiaFile: null,
//       anhBiaPreview: null,
//     });
//     setModalOpen(true);
//   };

//   // Mở modal sửa
//   const openEditModal = (store) => {
//     setEditingStore(store);
//     setForm({
//       tenGianHang: store.tenGianHang,
//       diaChi: store.diaChi,
//       moTa: store.moTa,
//       anhBiaFile: null,
//       anhBiaPreview: store.anhBiaPreview,
//     });
//     setModalOpen(true);
//   };

//   // Handle upload ảnh và preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setForm((f) => ({ ...f, anhBiaFile: file }));

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setForm((f) => ({ ...f, anhBiaPreview: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // Lưu tạo hoặc sửa
//   const handleSave = () => {
//     if (!form.tenGianHang.trim()) {
//       alert("Tên gian hàng không được để trống");
//       return;
//     }
//     if (editingStore) {
//       // Cập nhật
//       setStores((prev) =>
//         prev.map((s) =>
//           s.id === editingStore.id
//             ? {
//                 ...s,
//                 tenGianHang: form.tenGianHang,
//                 diaChi: form.diaChi,
//                 moTa: form.moTa,
//                 anhBiaPreview: form.anhBiaPreview || s.anhBiaPreview,
//               }
//             : s
//         )
//       );
//     } else {
//       // Tạo mới
//       const newStore = {
//         id: stores.length ? Math.max(...stores.map((s) => s.id)) + 1 : 1,
//         tenGianHang: form.tenGianHang,
//         diaChi: form.diaChi,
//         moTa: form.moTa,
//         trangThai: "PENDING",
//         anhBiaPreview: form.anhBiaPreview,
//       };
//       setStores((prev) => [newStore, ...prev]);
//     }
//     setModalOpen(false);
//   };

//   // Xử lý duyệt gian hàng
//   const handleReview = (id, newStatus) => {
//     setStores((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, trangThai: newStatus } : s))
//     );
//   };

//   // Xóa gian hàng
//   const handleDelete = () => {
//     setStores((prev) => prev.filter((s) => s.id !== confirmDelete.storeId));
//     setConfirmDelete({ open: false, storeId: null });
//   };

//   return (
//     <div className="container mt-3">
//       <h2>Quản lý gian hàng</h2>
//       <div className="d-flex mb-3">
//         <input
//           className="form-control me-2"
//           placeholder="Tìm theo tên gian hàng..."
//           value={searchKey}
//           onChange={(e) => {
//             setSearchKey(e.target.value);
//             setPage(1);
//           }}
//         />
//         <button className="btn btn-primary" onClick={openCreateModal}>
//           Tạo gian hàng mới
//         </button>
//       </div>

//       {/* Danh sách gian hàng */}
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Ảnh bìa</th>
//             <th>Tên gian hàng</th>
//             <th>Địa chỉ</th>
//             <th>Mô tả</th>
//             <th>Trạng thái</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {displayedStores.length === 0 ? (
//             <tr>
//               <td colSpan="6" className="text-center">
//                 Không tìm thấy gian hàng
//               </td>
//             </tr>
//           ) : (
//             displayedStores.map((store) => (
//               <tr key={store.id}>
//                 <td style={{ width: 110 }}>
//                   {store.anhBiaPreview ? (
//                     <img
//                       src={store.anhBiaPreview}
//                       alt="Ảnh bìa"
//                       style={{
//                         maxWidth: 100,
//                         maxHeight: 80,
//                         objectFit: "cover",
//                       }}
//                     />
//                   ) : (
//                     <div
//                       style={{
//                         width: 100,
//                         height: 80,
//                         backgroundColor: "#eee",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: 12,
//                         color: "#999",
//                       }}
//                     >
//                       Chưa có ảnh
//                     </div>
//                   )}
//                 </td>
//                 <td>{store.tenGianHang}</td>
//                 <td>{store.diaChi}</td>
//                 <td>{store.moTa}</td>
//                 <td>
//                   {store.trangThai === "PENDING" && (
//                     <span className="badge bg-warning text-dark">
//                       Chờ duyệt
//                     </span>
//                   )}
//                   {store.trangThai === "APPROVED" && (
//                     <span className="badge bg-success">Đã duyệt</span>
//                   )}
//                   {store.trangThai === "REJECTED" && (
//                     <span className="badge bg-danger">Từ chối</span>
//                   )}
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-info me-1"
//                     onClick={() => openEditModal(store)}
//                   >
//                     Sửa
//                   </button>
//                   <button
//                     className="btn btn-sm btn-danger me-1"
//                     onClick={() =>
//                       setConfirmDelete({ open: true, storeId: store.id })
//                     }
//                   >
//                     Xóa
//                   </button>
//                   {/* {store.trangThai === "PENDING" && (
//                     <>
//                       <button
//                         className="btn btn-sm btn-success me-1"
//                         onClick={() => handleReview(store.id, "APPROVED")}
//                       >
//                         Duyệt
//                       </button>
//                       <button
//                         className="btn btn-sm btn-secondary"
//                         onClick={() => handleReview(store.id, "REJECTED")}
//                       >
//                         Từ chối
//                       </button>
//                     </>
//                   )} */}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Phân trang */}
//       <nav>
//         <ul className="pagination">
//           <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
//             <button
//               className="page-link"
//               onClick={() => setPage((p) => Math.max(p - 1, 1))}
//             >
//               Trước
//             </button>
//           </li>
//           {[...Array(totalPages)].map((_, i) => (
//             <li
//               key={i}
//               className={`page-item ${page === i + 1 ? "active" : ""}`}
//             >
//               <button className="page-link" onClick={() => setPage(i + 1)}>
//                 {i + 1}
//               </button>
//             </li>
//           ))}
//           <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
//             <button
//               className="page-link"
//               onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//             >
//               Sau
//             </button>
//           </li>
//         </ul>
//       </nav>

//       {/* Modal tạo / sửa */}
//       {modalOpen && (
//         <div
//           className="modal d-block"
//           tabIndex={-1}
//           onClick={() => setModalOpen(false)}
//           style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
//         >
//           <div
//             className="modal-dialog"
//             onClick={(e) => e.stopPropagation()}
//             style={{ maxWidth: 600 }}
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   {editingStore ? "Sửa gian hàng" : "Tạo gian hàng mới"}
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Tên gian hàng</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={form.tenGianHang}
//                     onChange={(e) =>
//                       setForm({ ...form, tenGianHang: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Địa chỉ</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={form.diaChi}
//                     onChange={(e) =>
//                       setForm({ ...form, diaChi: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Mô tả</label>
//                   <textarea
//                     className="form-control"
//                     rows={3}
//                     value={form.moTa}
//                     onChange={(e) => setForm({ ...form, moTa: e.target.value })}
//                   ></textarea>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Ảnh bìa</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                 </div>
//                 {form.anhBiaPreview && (
//                   <div className="mb-3 text-center">
//                     <img
//                       src={form.anhBiaPreview}
//                       alt="Preview"
//                       style={{
//                         maxWidth: "100%",
//                         maxHeight: 150,
//                         objectFit: "cover",
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   Hủy
//                 </button>
//                 <button className="btn btn-primary" onClick={handleSave}>
//                   Lưu
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal xác nhận xóa */}
//       {confirmDelete.open && (
//         <div
//           className="modal d-block"
//           tabIndex={-1}
//           onClick={() => setConfirmDelete({ open: false, storeId: null })}
//           style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
//         >
//           <div
//             className="modal-dialog"
//             onClick={(e) => e.stopPropagation()}
//             style={{ maxWidth: 400 }}
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Xác nhận xóa</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() =>
//                     setConfirmDelete({ open: false, storeId: null })
//                   }
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 Bạn có chắc muốn xóa gian hàng này không?
//               </div>
//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() =>
//                     setConfirmDelete({ open: false, storeId: null })
//                   }
//                 >
//                   Hủy
//                 </button>
//                 <button className="btn btn-danger" onClick={handleDelete}>
//                   Xóa
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoreManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PAGE_SIZE = 5;

const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [form, setForm] = useState({
    tenGianHang: "",
    diaChi: "",
    moTa: "",
    anhBiaFile: null,
    anhBiaPreview: null,
  });

  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    storeId: null,
  });

  // API base URL
  const API_BASE = "http://localhost:8080/api/gianhang"; // sửa theo backend bạn

  // Load danh sách gian hàng từ API
  const fetchStores = async () => {
    try {
      const res = await axios.get(API_BASE);
      setStores(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách gian hàng:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Lọc và phân trang
  const filtered = stores.filter((s) =>
    s.tenGianHang.toLowerCase().includes(searchKey.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const displayedStores = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Mở modal tạo mới
  const openCreateModal = () => {
    setEditingStore(null);
    setForm({
      tenGianHang: "",
      diaChi: "",
      moTa: "",
      anhBiaFile: null,
      anhBiaPreview: null,
    });
    setModalOpen(true);
  };

  // Mở modal sửa
  const openEditModal = (store) => {
    setEditingStore(store);
    setForm({
      tenGianHang: store.tenGianHang,
      diaChi: store.diaChi,
      moTa: store.moTa,
      anhBiaFile: null,
      anhBiaPreview: store.anhBiaPreview,
    });
    setModalOpen(true);
  };

  // Xử lý chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, anhBiaFile: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, anhBiaPreview: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Lưu tạo hoặc sửa (POST hoặc PUT API)
  const handleSave = async () => {
    if (!form.tenGianHang.trim()) {
      alert("Tên gian hàng không được để trống");
      return;
    }

    try {
      // Chuẩn bị dữ liệu gửi lên backend
      const storeData = {
        maGianHang: editingStore ? editingStore.maGianHang : null,
        tenGianHang: form.tenGianHang,
        diaChi: form.diaChi,
        moTa: form.moTa,
        trangThai: editingStore ? editingStore.trangThai : true, // mặc định true khi tạo mới
        anhBiaPreview: form.anhBiaPreview, // backend có thể nhận base64 hoặc bạn cần upload riêng
        maNguoiDung: null,
        ngayTao: editingStore ? editingStore.ngayTao : new Date().toISOString(),
      };

      if (editingStore) {
        // PUT cập nhật
        await axios.put(`${API_BASE}/${editingStore.maGianHang}`, storeData);
      } else {
        // POST tạo mới
        await axios.post(API_BASE, storeData);
      }

      await fetchStores(); // tải lại danh sách sau khi lưu
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi lưu gian hàng:", error);
      alert("Lỗi khi lưu gian hàng, vui lòng thử lại.");
    }
  };

  // Xóa gian hàng
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/${confirmDelete.storeId}`);
      await fetchStores();
      setConfirmDelete({ open: false, storeId: null });
    } catch (error) {
      console.error("Lỗi khi xóa gian hàng:", error);
      alert("Lỗi khi xóa gian hàng, vui lòng thử lại.");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Quản lý gian hàng</h2>
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Tìm theo tên gian hàng..."
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
            setPage(1);
          }}
        />
        <button className="btn btn-primary" onClick={openCreateModal}>
          Tạo gian hàng mới
        </button>
      </div>

      {/* Danh sách gian hàng */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Ảnh bìa</th>
            <th>Tên gian hàng</th>
            <th>Địa chỉ</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedStores.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Không tìm thấy gian hàng
              </td>
            </tr>
          ) : (
            displayedStores.map((store) => (
              <tr key={store.maGianHang}>
                <td style={{ width: 110 }}>
                  {store.anhBiaPreview ? (
                    <img
                      src={store.anhBiaPreview}
                      alt="Ảnh bìa"
                      style={{
                        maxWidth: 100,
                        maxHeight: 80,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 100,
                        height: 80,
                        backgroundColor: "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: "#999",
                      }}
                    >
                      Chưa có ảnh
                    </div>
                  )}
                </td>
                <td>{store.tenGianHang}</td>
                <td>{store.diaChi}</td>
                <td>{store.moTa}</td>
                <td>
                  {store.trangThai ? (
                    <span className="badge bg-success">Đã duyệt</span>
                  ) : (
                    <span className="badge bg-warning text-dark">
                      Chờ duyệt
                    </span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-1"
                    onClick={() => openEditModal(store)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-1"
                    onClick={() =>
                      setConfirmDelete({
                        open: true,
                        storeId: store.maGianHang,
                      })
                    }
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Trước
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${page === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Sau
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal tạo / sửa */}
      {modalOpen && (
        <div
          className="modal d-block"
          tabIndex={-1}
          onClick={() => setModalOpen(false)}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingStore ? "Sửa gian hàng" : "Tạo gian hàng mới"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Tên gian hàng</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.tenGianHang}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, tenGianHang: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.diaChi}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, diaChi: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mô tả</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={form.moTa}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, moTa: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ảnh bìa</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {form.anhBiaPreview && (
                    <img
                      src={form.anhBiaPreview}
                      alt="Ảnh bìa preview"
                      style={{
                        marginTop: 10,
                        maxWidth: "100%",
                        maxHeight: 200,
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {confirmDelete.open && (
        <div
          className="modal d-block"
          tabIndex={-1}
          onClick={() => setConfirmDelete({ open: false, storeId: null })}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận xóa</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setConfirmDelete({ open: false, storeId: null })
                  }
                ></button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa gian hàng này?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setConfirmDelete({ open: false, storeId: null })
                  }
                >
                  Hủy
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreManagement;
