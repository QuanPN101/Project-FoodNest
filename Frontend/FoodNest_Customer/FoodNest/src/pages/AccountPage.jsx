import React, { useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import ChangePasswordForm from '../components/ChangePasswordForm';
const AccountPage = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            {/* Sidebar */}
            <div className="md:w-1/4 w-full bg-white shadow p-4 rounded">
                <ul className="space-y-4">
                    <li className={`cursor-pointer ${activeTab === 'profile' && 'font-bold text-red-600'}`} onClick={() => setActiveTab('profile')}>
                        👤 Tài khoản của bạn
                    </li>
                    <li className={`cursor-pointer ${activeTab === 'history' && 'font-bold text-red-600'}`} onClick={() => setActiveTab('history')}>
                        🔁 Lịch sử đơn hàng
                    </li>
                    <li className={`cursor-pointer ${activeTab === 'password' && 'font-bold text-red-600'}`} onClick={() => setActiveTab('password')}>
                        🔑 Đổi mật khẩu
                    </li>
                    <li className="cursor-pointer text-gray-500">🚪 Thoát tài khoản</li>
                </ul>
            </div>

            {/* Main content */}
            <div className="md:w-3/4 w-full bg-white shadow p-6 rounded">
                {activeTab === 'profile' && <ProfileInfo />}
                {activeTab === 'edit' && <EditProfileForm onBack={() => setActiveTab('profile')} />}
                {activeTab === 'password' && <ChangePasswordForm />}
            </div>
        </div>
    );
};

export default AccountPage;
