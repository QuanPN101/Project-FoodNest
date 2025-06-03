import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/Appcontext';

const ChangePasswordForm = () => {
    const { user } = useAppContext();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = formData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu mới không khớp!');
            return;
        }

        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('user')); // lấy user từ localStorage
            const response = await axios.put(`http://localhost:8080/api/nguoidung/${user.id}/doimatkhau`, {
                currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                toast.success('Đổi mật khẩu thành công!');
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                toast.error(response.data.message || 'Đổi mật khẩu thất bại!');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Đã xảy ra lỗi!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Đổi mật khẩu</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                    <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary" />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary" />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary" />
                </div>

                <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dull transition" disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
