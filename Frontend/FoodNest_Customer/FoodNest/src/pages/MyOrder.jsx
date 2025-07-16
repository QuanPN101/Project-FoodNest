import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { dummyOrders } from '../assets/assets';
import getDonHangByUserId from '../api/getDonHangByUserId';

const MyOrder = () => {
    const [myOrder, setMyorder] = useState([]);
    const { currency, user } = useAppContext();

    const fetchMyOrder = async () => {
        const data = await getDonHangByUserId(user.id);
        console.log(data);

        setMyorder(data);
    };
    useEffect(() => {
        fetchMyOrder();
    }, []);
    return (
        <div className="mt-16 pb-16">
            <div className="flex flex-col items-end w-max mb-8">
                <p className="text-2xl font-medium uppercase">Lịch sử đơn hàng</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>
            {myOrder.map((orderData, index) => (
                <div className="max-w-4xl p-4 bg-white shadow-lg rounded-lg mb-4">
                    {/* Hiển thị thông tin đơn hàng */}
                    <h2 className="text-2xl font-bold mb-4">Đơn Hàng</h2>

                    <div className="mb-6">
                        <p>
                            <strong>Mã Đơn Hàng:</strong> {orderData.maDonHang}
                        </p>
                        <p>
                            <strong>Tên người nhận: </strong> {orderData.hoTen}
                        </p>
                        <p>
                            <strong>Số điện thoại: </strong> {orderData.soDienThoai}
                        </p>
                        <p>
                            <strong>Địa Chỉ Giao Hàng:</strong> {orderData.diaChiGiaoHang}
                        </p>
                        <p>
                            <strong>Ngày Đặt:</strong> {new Date(orderData.ngayDat).toLocaleString()}
                        </p>
                        <p>
                            <strong>Trạng Thái:</strong> {orderData.trangThaiDonHang}
                        </p>

                        <p>
                            <strong>Tổng Tiền:</strong> {orderData.tongTien.toLocaleString()} {currency}
                        </p>
                    </div>

                    {/* Hiển thị chi tiết các sản phẩm trong đơn hàng */}
                    <h3 className="text-xl font-semibold mb-4">Chi Tiết Đơn Hàng</h3>
                    <div className="space-y-4">
                        {orderData.dsChiTietDonHang.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <img src={item.maSanPham.anhChinh} alt={item.maSanPham.tenSanPham} className="w-24 h-24 object-cover rounded-lg" />

                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold">{item.maSanPham.tenSanPham}</h4>
                                    <p className="text-gray-600">{item.maSanPham.moTa}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Số Lượng: {item.soLuong}</p>
                                    <p className="text-sm text-gray-700">
                                        Đơn Giá: {item.donGia.toLocaleString()} {currency}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        Thành Tiền: {(item.soLuong * item.donGia).toLocaleString()} {currency}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyOrder;
