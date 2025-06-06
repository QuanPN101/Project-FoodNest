import React, { useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { user, setUser } = useAppContext();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        hoTen: user?.hoTen || '',
        diaChi: user?.diaChi || '',
        soDienThoai: user?.soDienThoai || '',
        AnhChinh: user?.AnhChinh || '',
        email: user?.email || '',
    });
    const [previewImage, setPreviewImage] = useState(user?.AnhChinh || '');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setFormData({ ...formData, AnhChinh: imageUrl });
            // Nếu cần upload thực tế, bạn xử lý ở đây
        }
    };

    const handleSave = async () => {
        try {
            const { hoTen, diaChi, soDienThoai, email } = formData;
            const payload = { hoTen, diaChi, soDienThoai, email };
            const response = await axios.put(`http://localhost:8080/api/nguoidung/${user.id}`, payload);
            console.log('payload:', payload);

            if (response.status === 200) {
                toast.success('Cập nhật thông tin thành công!');

                const updatedUser = { ...user, hoTen, diaChi, soDienThoai, email };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setEditMode(false);
            } else {
                toast.error(response.data.message || 'Cập nhật thất bại!');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // "Email đã được sử dụng."
            } else {
                toast.error('Có lỗi xảy ra, vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
            <div className="flex flex-col items-center gap-3 mb-6">
                <div className="relative w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
                    {previewImage ? <img src={previewImage} alt="Ảnh đại diện" className="w-full h-full object-cover rounded-full" /> : <i className="fas fa-user-circle text-6xl text-gray-400 flex items-center justify-center w-full h-full"></i>}

                    {editMode && (
                        <>
                            <label htmlFor="avatar-upload" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer hover:bg-opacity-70 transition" title="Thay ảnh đại diện">
                                +
                            </label>
                            <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </>
                    )}
                </div>

                <h2 className="text-2xl font-semibold">{user?.hoTen || 'Người dùng'}</h2>
            </div>

            <div className="space-y-3 text-gray-700 text-base">
                {['hoTen', 'diaChi', 'soDienThoai', 'email'].map((field) => (
                    <div key={field}>
                        <span className="font-semibold">
                            {
                                {
                                    hoTen: 'Họ và tên',
                                    diaChi: 'Địa chỉ',
                                    soDienThoai: 'Số điện thoại',
                                    email: 'Email',
                                }[field]
                            }
                            :{' '}
                        </span>
                        {editMode ? <input type="text" name={field} value={formData[field]} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1 w-full mt-1" /> : <span>{user?.[field]}</span>}
                    </div>
                ))}
            </div>

            {editMode ? (
                <div className="flex gap-4 mt-6">
                    <button onClick={handleSave} className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dull transition cursor-pointer">
                        Lưu thông tin
                    </button>
                    <button
                        onClick={() => {
                            setEditMode(false);
                            setPreviewImage(user?.AnhChinh || '');
                            setFormData({
                                hoTen: user?.hoTen || '',
                                diaChi: user?.diaChi || '',
                                soDienThoai: user?.soDienThoai || '',
                                AnhChinh: user?.AnhChinh || '',
                                email: user?.email || '',
                            });
                        }}
                        className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
                    >
                        Hủy
                    </button>
                </div>
            ) : (
                <button onClick={() => setEditMode(true)} className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dull transition cursor-pointer">
                    Chỉnh sửa thông tin
                </button>
            )}
        </div>
    );
};

export default UserProfile;
