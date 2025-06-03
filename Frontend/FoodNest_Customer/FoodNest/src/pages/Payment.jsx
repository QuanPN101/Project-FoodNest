import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';

export default function Payment() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        note: '',
        payment: '',
        discountCode: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const { user, listProduct, getCartCount, getCartAmount, currency } = useAppContext();

    useEffect(() => {
        setEmail(user.email);
        setName(user.hoTen);
        setPhone(user.soDienThoai);
        setAddress(user.diaChi);
    }, []);
    return (
        <div className="flex flex-col lg:flex-row justify-between gap-8 p-6 max-w-8xl mx-auto">
            {/* Thông tin nhận hàng */}
            <div className="flex-1 space-y-4">
                <h3 className="text-lg font-medium">Thông tin nhận hàng</h3>

                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" />
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border px-3 py-2 rounded" />
                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border px-3 py-2 rounded" />

                <textarea name="note" placeholder="Ghi chú (tùy chọn)" onChange={(e) => setNote(e.target.value)} className="w-full border px-3 py-2 rounded"></textarea>
            </div>

            {/* Thanh toán + Đơn hàng */}
            <div className="w-full lg:w-1/3 space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Vận chuyển</h3>
                    <div className=" text-primary p-3 rounded">Vui lòng nhập thông tin giao hàng</div>
                </div>

                <div>
                    <h3 className="text-lg font-medium">Thanh toán</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" value="cod" onChange={handleChange} /> Thanh toán khi nhận hàng
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" value="bank" onChange={handleChange} /> Chuyển khoản
                        </label>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium">Đơn hàng ({getCartCount()} sản phẩm)</h3>
                    <div className="items-center gap-4 border-b pb-4">
                        <div>
                            <p>Tên shop</p>
                            {listProduct.map((item, index) => (
                                <div className="flex items-center">
                                    <img src={assets.no_image} alt="Product" className="w-12 h-12 mr-4" />
                                    <div key={index}>
                                        <p className="text-sm">{item.tenSanPham}</p>
                                        <p className="font-semibold text-sm text-gray-600">
                                            {item.soLuongMua} x {Number(item.gia).toLocaleString('vi-VN')}
                                            {currency}{' '}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <div className="flex gap-2 mt-4">
                        <input type="text" name="discountCode" placeholder="Nhập mã giảm giá" onChange={handleChange} className="flex-1 border px-3 py-2 rounded" />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Áp dụng</button>
                    </div> */}

                    <div className="mt-4 text-sm">
                        <div className="flex justify-between">
                            <span>Tạm tính</span>
                            <span>
                                {Number(getCartAmount()).toLocaleString('vi-VN')}
                                {currency}{' '}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Phí vận chuyển</span>
                            <span>Miễn phí</span>
                        </div>
                        <div className="flex justify-between font-bold border-t pt-2 mt-2">
                            <span>Tổng cộng</span>
                            <span className="text-primary">
                                {' '}
                                {Number(getCartAmount()).toLocaleString('vi-VN')}
                                {currency}{' '}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <a href="#" className="text-primary text-sm">
                            &lt; Quay về giỏ hàng
                        </a>
                        <button className="bg-primary text-white px-6 py-2 rounded">Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
