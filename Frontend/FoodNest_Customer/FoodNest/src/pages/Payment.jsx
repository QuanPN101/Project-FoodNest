import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faFilterCircleDollar } from '@fortawesome/free-solid-svg-icons';
import MapView from '../components/MapView';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
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
        payment: 'cod',
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
    const { user, listProduct, getCartCount, getCartAmount, currency, displayName, selectedCoord, navigate } = useAppContext();
    const [totalDeliveryCost, setTotalDeliveryCost] = useState(0);
    const [isAddressSelected, setIsAddressSelected] = useState(false);
    const handleCreateOrder = async () => {
        const formData = new FormData();

        formData.append('maNguoiDung', user.id);
        formData.append('trangThai', 'Chờ xác nhận');
        formData.append('tongTien', totalDeliveryCost + Number(getCartAmount()));
        formData.append('diaChiGiaoHang', displayName);
        formData.append('email', email);
        formData.append('soDienThoai', phone);
        formData.append('hoTen', name);
        formData.append('phuongThucThanhToan', 'Thanh toán khi nhận hàng');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        listProduct.forEach((sp, index) => {
            formData.append(`chiTietSanPham[${index}].maSanPham`, sp.maSanPham);
            formData.append(`chiTietSanPham[${index}].soLuong`, sp.soLuongMua);
            formData.append(`chiTietSanPham[${index}].gia`, sp.gia);
        });
        if (email && phone && name) {
            console.log(email, phone, name);

            // Kiểm tra định dạng email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                toast.error('Email không hợp lệ');
                return;
            }

            // Kiểm tra định dạng số điện thoại (ví dụ: chỉ chấp nhận số)
            const phonePattern = /^[0-9]{10,15}$/;
            if (!phonePattern.test(phone)) {
                toast.error('Số điện thoại không hợp lệ');
                return;
            }
            try {
                const response = await axios.post('http://localhost:8080/api/donhang', formData);
                toast.success('Đặt đơn hàng thành công');
                navigate('/');
            } catch (error) {
                toast.error('Đơn hàng thất bại');
            }
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin nhận hàng');
        }
    };
    function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth radius in meters
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // in meters
        return (d / 1000).toFixed(2);
    }
    useEffect(() => {
        let temp = 0;
        listProduct.map((item) => {
            const fee = haversineDistance(selectedCoord.lat, selectedCoord.lng, item.maGianHang.lat, item.maGianHang.lon);
            console.log('fee', fee);

            temp = temp + fee * item.deliveryCost;
        });
        console.log('temp', temp);

        setTotalDeliveryCost(temp);
    }, [selectedCoord]);

    console.log(selectedCoord);
    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between gap-8 p-6 max-w-8xl mx-auto">
                {/* Thông tin nhận hàng */}
                <div className="flex-1 space-y-6">
                    <h3 className="text-2xl text-primary font-semibold">Thông tin nhận hàng</h3>
                    {[
                        { label: 'Email', name: 'email', type: 'email', value: email, onChange: setEmail },
                        { label: 'Họ tên', name: 'name', type: 'text', value: name, onChange: setName },
                        { label: 'Số điện thoại', name: 'phone', type: 'text', value: phone, onChange: setPhone },
                    ].map(({ label, name, type, value, onChange }) => (
                        <div key={name} className="relative">
                            <input
                                type={type}
                                name={name}
                                id={name}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className={`peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 text-sm 
            focus:border-[#4fbf8b] focus:ring-1 focus:ring-[#4fbf8b] focus:outline-none`}
                                required
                            />
                            <label
                                htmlFor={name}
                                className={`absolute left-3 bg-white px-1 text-gray-400 transition-all duration-200
            ${value ? 'text-sm top-0 -translate-y-1/2 text-[#4fbf8b]' : 'top-3.5 text-base'}
            peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-[#4fbf8b]`}
                            >
                                {label}
                            </label>
                        </div>
                    ))}

                    <div className="text-base ">
                        <p>Địa chỉ (chọn bên dưới)</p>
                        <p>{displayName}</p>
                    </div>
                </div>

                {/* Thanh toán + Đơn hàng */}
                <div className="w-full lg:w-1/3 space-y-6">
                    <div className="my-0">
                        <div className="flex items-center">
                            <FontAwesomeIcon size="22" icon={faTruck} />
                            <h3 className="text-base font-medium ml-2">Vận chuyển</h3>
                        </div>
                        <div className=" text-primary py-3 font-semibold rounded">Vui lòng nhập thông tin giao hàng</div>
                    </div>

                    <div className="my-0">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faFilterCircleDollar} />
                            <h3 className="text-base font-medium ml-2">Thanh toán</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" defaultChecked name="payment" value="cod" onChange={handleChange} /> Thanh toán khi nhận hàng
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
                                {listProduct.map((item, index) => (
                                    <div className="flex items-center">
                                        <img src={item.anhChinh} alt="Product" className="w-12 h-12 mr-4" />
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
                                <div>
                                    {listProduct.map((item, index) => (
                                        <div>
                                            {selectedCoord.lat > 0 ? haversineDistance(selectedCoord.lat, selectedCoord.lng, item.maGianHang.lat || 0, item.maGianHang.lon || 0) : ''} km x {item.deliveryCost}vnđ
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between font-bold border-t pt-2 mt-2">
                                <span>Tổng cộng</span>
                                <span className="text-primary">
                                    {' '}
                                    {selectedCoord.lat > 0 ? Number(totalDeliveryCost + Number(getCartAmount())).toLocaleString('vi-VN') : Number(getCartAmount())}
                                    {currency}{' '}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <Link className="text-primary text-sm" to={'/cart'}>
                                {' '}
                                &lt; Quay về giỏ hàng
                            </Link>
                            <button className="bg-primary text-white px-6 py-2 rounded" onClick={() => handleCreateOrder()}>
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MapView />
        </div>
    );
}