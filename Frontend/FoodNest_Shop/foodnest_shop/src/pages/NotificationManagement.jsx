import React, { useEffect, useState } from "react";
import {
  fetchNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from "./fakeApi";

function NotificationManagement() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchNotifications().then((data) => {
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  const handleCreate = () => {
    if (!newTitle || !newContent)
      return alert("Nhập đầy đủ tiêu đề và nội dung");
    createNotification({ title: newTitle, content: newContent }).then(
      (newNoti) => {
        setNotifications((prev) => [...prev, newNoti]);
        setNewTitle("");
        setNewContent("");
      }
    );
  };

  const handleEditStart = (noti) => {
    setEditId(noti.id);
    setEditTitle(noti.title);
    setEditContent(noti.content);
  };

  const handleEditSave = () => {
    if (!editTitle || !editContent)
      return alert("Nhập đầy đủ tiêu đề và nội dung");
    updateNotification(editId, { title: editTitle, content: editContent }).then(
      (updated) => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === updated.id ? updated : n))
        );
        setEditId(null);
        setEditTitle("");
        setEditContent("");
      }
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thông báo này?")) {
      deleteNotification(id).then(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      });
    }
  };

  if (loading) return <div className="container mt-3">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Quản lý Thông báo</h3>

      <div className="mb-4">
        <h5>Tạo thông báo mới</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Tiêu đề"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          rows={3}
          placeholder="Nội dung"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleCreate}>
          Tạo thông báo
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((noti) => (
            <tr key={noti.id}>
              <td>{noti.id}</td>
              <td>
                {editId === noti.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  noti.title
                )}
              </td>
              <td>
                {editId === noti.id ? (
                  <textarea
                    className="form-control"
                    rows={2}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                ) : (
                  noti.content
                )}
              </td>
              <td>{new Date(noti.createdAt).toLocaleString()}</td>
              <td>
                {editId === noti.id ? (
                  <>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={handleEditSave}
                    >
                      Lưu
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setEditId(null)}
                    >
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEditStart(noti)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(noti.id)}
                    >
                      Xóa
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NotificationManagement;
