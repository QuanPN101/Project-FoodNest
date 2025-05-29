// components/account/ChangePasswordForm.jsx
import React, { useState } from 'react';

const ChangePasswordForm = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate and call API
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Đổi mật khẩu</h2>
            <input type="password" placeholder="Mật khẩu hiện tại" className="input-style" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
            <input type="password" placeholder="Mật khẩu mới" className="input-style" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
            <input type="password" placeholder="Xác nhận lại mật khẩu" className="input-style" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
            <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Xác nhận</button>
        </form>
    );
};

export default ChangePasswordForm;
