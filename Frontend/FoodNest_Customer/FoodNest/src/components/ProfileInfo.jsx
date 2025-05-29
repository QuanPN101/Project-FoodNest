// components/account/ProfileInfo.jsx
import React from 'react';
import { useAppContext } from '../context/Appcontext';

const ProfileInfo = () => {
    const { user } = useAppContext();

    return (
        <div>
            <div className="flex justify-center">
                <img src={user?.anhDaiDien || 'https://via.placeholder.com/120'} alt="Avatar" className="w-28 h-28 rounded-full object-cover" />
            </div>
            <h2 className="text-xl text-center font-semibold my-3">{user?.hoTen}</h2>
            <p>
                <strong>Địa chỉ:</strong> {user?.diaChi}
            </p>
            <p>
                <strong>Tỉnh thành:</strong> {user?.tinhThanh}
            </p>
            <p>
                <strong>Số điện thoại:</strong> {user?.soDienThoai}
            </p>
            <p>
                <strong>Email:</strong> {user?.email}
            </p>
            <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Chỉnh sửa thông tin</button>
        </div>
    );
};

export default ProfileInfo;
