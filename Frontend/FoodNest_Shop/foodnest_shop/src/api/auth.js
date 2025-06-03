const USERS_KEY = "mock_users";

function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      if (users.find((u) => u.username === username)) {
        reject("Tên tài khoản đã tồn tại");
        return;
      }
      const newUser = { id: Date.now(), username, password };
      users.push(newUser);
      setUsers(users);
      resolve("Đăng ký thành công");
    }, 500);
  });
}

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        resolve({ id: user.id, username: user.username });
      } else {
        reject("Tên tài khoản hoặc mật khẩu không đúng");
      }
    }, 500);
  });
}

export function changePassword(username, oldPass, newPass) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const userIndex = users.findIndex((u) => u.username === username);
      if (userIndex === -1) {
        reject("Người dùng không tồn tại");
        return;
      }
      if (users[userIndex].password !== oldPass) {
        reject("Mật khẩu cũ không đúng");
        return;
      }
      users[userIndex].password = newPass;
      setUsers(users);
      resolve("Đổi mật khẩu thành công");
    }, 500);
  });
}

export function logout() {
  // Không cần thao tác gì mock
  return Promise.resolve();
}
