import React, { useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import axios from 'axios';
const Login = () => {
    const { setShowUserLogin, setUser } = useAppContext();
    const [state, setState] = React.useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [matKhau, setPassword] = React.useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const { data } = await axios.post('http://localhost:8080/api/auth', { email, matKhau });

        console.log('data: ', data);
        if (data.code === 1000) {
            setUser(true);
            localStorage.setItem('isLogin', true);
        }

        setShowUserLogin(false);
    };

    return (
        <div onClick={() => setShowUserLogin(false)} className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50">
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    {/* <span className="text-primary">Đăng nhập</span>{" "} */}
                    {state === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                </p>
                {state === 'register' && (
                    <div className="w-full">
                        <p>Họ và tên</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Nhập họ và tên" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                    </div>
                )}
                <div className="w-full ">
                    <p>Email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập địa chỉ email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
                <div className="w-full ">
                    <p>Mật khẩu</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={matKhau} placeholder="Nhập mật khẩu" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                </div>
                {state === 'register' && (
                    <div className="w-full">
                        <p>Nhập lại mật khẩu</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Nhập lại mật khẩu" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                    </div>
                )}
                {state === 'register' ? (
                    <p>
                        Bạn đã có tài khoản?{' '}
                        <span onClick={() => setState('login')} className="text-primary cursor-pointer">
                            Đăng nhập ngay
                        </span>
                    </p>
                ) : (
                    <p>
                        Bạn chưa có tài khoản?{' '}
                        <span onClick={() => setState('register')} className="text-primary cursor-pointer">
                            Đăng ký ngay
                        </span>
                    </p>
                )}
                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">{state === 'register' ? 'Tạo tài khoản' : 'Đăng nhập'}</button>
            </form>
        </div>
    );
};
export default Login;
