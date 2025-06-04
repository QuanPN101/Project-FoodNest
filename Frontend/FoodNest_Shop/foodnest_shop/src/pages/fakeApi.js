// mockApi.js
const orders = [
  {
    maDonHang: "DH001",
    ngayDat: "2025-05-31",
    trangThai: "Đang xử lý",
    tongTien: 250000,
    diaChi: "123 Lê Lợi, Đà Nẵng",
  },
];

const complaints = [
  {
    maKhieuNai: "KN001",
    tieuDe: "Đơn hàng bị giao sai",
    noiDung: "Tôi đặt món chay nhưng nhận món mặn.",
    trangThai: "Đang xử lý",
    ngayTao: "2025-06-01",
  },
];

const statistics = {
  doanhThu: 15000000,
  soNguoiDung: 1280,
  soGianHang: 34,
  soDonHang: 412,
};

// API Mô phỏng
export const api = {
  getOrders: () => Promise.resolve(orders),
  updateOrderStatus: (id, status) => {
    const order = orders.find((o) => o.maDonHang === id);
    if (order) order.trangThai = status;
    return Promise.resolve(order);
  },
  getComplaints: () => Promise.resolve(complaints),
  createComplaint: (data) => {
    complaints.push({
      ...data,
      maKhieuNai: `KN${complaints.length + 1}`,
      trangThai: "Mới",
    });
    return Promise.resolve(true);
  },
  updateComplaintStatus: (id, status) => {
    const complaint = complaints.find((c) => c.maKhieuNai === id);
    if (complaint) complaint.trangThai = status;
    return Promise.resolve(complaint);
  },
  getStatistics: () => Promise.resolve(statistics),
};
