// Mock dữ liệu tạm thời lưu trong module scope
let accounts = [
  { id: 1, username: "admin", name: "Admin", role: "Admin" },
  { id: 2, username: "shop1", name: "Shop One", role: "ShopOwner" },
];

let shops = [
  { id: 1, name: "Gian hàng 1", owner: "shop1", address: "Huế" },
  { id: 2, name: "Gian hàng 2", owner: "shop2", address: "Hà Nội" },
];

let menus = [
  { id: 1, shopId: 1, name: "Phở bò", price: 40000 },
  { id: 2, shopId: 1, name: "Bún chả", price: 35000 },
];

let orders = [
  {
    id: 1,
    shopId: 1,
    customer: "Nguyễn Văn A",
    total: 75000,
    status: "Đang xử lý",
  },
];

let promotions = [
  {
    id: 1,
    title: "Giảm giá 10%",
    description: "Áp dụng cho đơn hàng trên 100k",
    active: true,
  },
];

let complaints = [
  { id: 1, orderId: 1, content: "Đồ ăn không ngon", status: "Chưa xử lý" },
];

let reports = [
  {
    id: 1,
    title: "Báo cáo doanh thu tháng 4",
    data: { totalSales: 1000000, orders: 120 },
  },
  {
    id: 2,
    title: "Báo cáo khiếu nại",
    data: { totalComplaints: 5, resolved: 3 },
  },
];

// Helper: tạo ID mới
function getNewId(list) {
  return list.length > 0 ? Math.max(...list.map((i) => i.id)) + 1 : 1;
}

// Account API
export function fetchAccounts() {
  return Promise.resolve([...accounts]);
}
export function addAccount(account) {
  const newAccount = { id: getNewId(accounts), ...account };
  accounts.push(newAccount);
  return Promise.resolve(newAccount);
}
export function updateAccount(id, updated) {
  const index = accounts.findIndex((acc) => acc.id === id);
  if (index === -1) return Promise.reject("Không tìm thấy tài khoản");
  accounts[index] = { ...accounts[index], ...updated };
  return Promise.resolve(accounts[index]);
}
export function deleteAccount(id) {
  accounts = accounts.filter((acc) => acc.id !== id);
  return Promise.resolve();
}

// Shop API
export function fetchShops() {
  return Promise.resolve([...shops]);
}
export function addShop(shop) {
  const newShop = { id: getNewId(shops), ...shop };
  shops.push(newShop);
  return Promise.resolve(newShop);
}
export function updateShop(id, updated) {
  const index = shops.findIndex((s) => s.id === id);
  if (index === -1) return Promise.reject("Không tìm thấy gian hàng");
  shops[index] = { ...shops[index], ...updated };
  return Promise.resolve(shops[index]);
}
export function deleteShop(id) {
  shops = shops.filter((s) => s.id !== id);
  return Promise.resolve();
}

// Menu API
export function fetchMenus() {
  return Promise.resolve([...menus]);
}
export function addMenu(menu) {
  const newMenu = { id: getNewId(menus), ...menu };
  menus.push(newMenu);
  return Promise.resolve(newMenu);
}
export function updateMenu(id, updated) {
  const index = menus.findIndex((m) => m.id === id);
  if (index === -1) return Promise.reject("Không tìm thấy món");
  menus[index] = { ...menus[index], ...updated };
  return Promise.resolve(menus[index]);
}
export function deleteMenu(id) {
  menus = menus.filter((m) => m.id !== id);
  return Promise.resolve();
}

// Order API
export function fetchOrders() {
  return Promise.resolve([...orders]);
}
export function updateOrderStatus(id, status) {
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return Promise.reject("Không tìm thấy đơn hàng");
  orders[index].status = status;
  return Promise.resolve(orders[index]);
}

// Promotion API (quảng cáo & khuyến mãi)
export function fetchPromotions() {
  return Promise.resolve([...promotions]);
}
export function addPromotion(promo) {
  const newPromo = { id: getNewId(promotions), ...promo };
  promotions.push(newPromo);
  return Promise.resolve(newPromo);
}
export function updatePromotion(id, updated) {
  const index = promotions.findIndex((p) => p.id === id);
  if (index === -1) return Promise.reject("Không tìm thấy khuyến mãi");
  promotions[index] = { ...promotions[index], ...updated };
  return Promise.resolve(promotions[index]);
}
export function deletePromotion(id) {
  promotions = promotions.filter((p) => p.id !== id);
  return Promise.resolve();
}

// Complaint API
export function fetchComplaints() {
  return Promise.resolve([...complaints]);
}
export function addComplaint(complaint) {
  const newComplaint = { id: getNewId(complaints), ...complaint };
  complaints.push(newComplaint);
  return Promise.resolve(newComplaint);
}
export function updateComplaint(id, updated) {
  const index = complaints.findIndex((c) => c.id === id);
  if (index === -1) return Promise.reject("Không tìm thấy khiếu nại");
  complaints[index] = { ...complaints[index], ...updated };
  return Promise.resolve(complaints[index]);
}
export function updateComplaintStatus(id, status) {
  const index = complaints.findIndex((c) => c.id === id);
  if (index === -1) return Promise.reject("Không tìm thấy khiếu nại");
  complaints[index].status = status;
  return Promise.resolve(complaints[index]);
}
export function deleteComplaint(id) {
  complaints = complaints.filter((c) => c.id !== id);
  return Promise.resolve();
}

// Report API
export function fetchReports() {
  return Promise.resolve([...reports]);
}
