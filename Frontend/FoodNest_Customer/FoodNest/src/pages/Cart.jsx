import { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { assets, dummyAddress } from '../assets/assets';

const Cart = () => {
    const { user, products, currency, cartItems, removeFromCart, updateCartItem, increaseQuantity, getCartCount, navigate, getCartAmount, listProduct } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState('COD');

    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item.maSanPham === key);

            tempArray.push(product);
        }
        setCartArray(tempArray);
    };

    const placeOrder = async () => {
        navigate('/order');
    };

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className="flex-1 max-w-4xl">
                <h1 className="text-3xl font-medium mb-6">
                    Giỏ hàng <span className="text-sm text-primary">{getCartCount()}Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Chi tiết sản phẩm</p>
                    <p className="text-center">Tổng</p>
                    <p className="text-center"></p>
                </div>

                {listProduct.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div
                                onClick={() => {
                                    navigate(`/products/${product.category.toLowerCase()}/${product.maSanPham}`);
                                    scrollTo(0, 0);
                                }}
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                            >
                                <img className="max-w-full h-full object-cover" src={assets.no_image} alt={product.tenSanPham} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.tenSanPham}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>
                                        Ghi chú: <span>{product.note}</span>
                                    </p>

                                    <ul>Tùy chọn</ul>
                                    {product.options.map((item, index) => (
                                        <li>{item.tenTuyChon}</li>
                                    ))}

                                    <div className="flex items-center">
                                        <p>Số lượng:</p>
                                        {/* <select onChange={(e) => updateCartItem(product.maSanPham, Number(e.target.value))} value={listProduct[product.maSanPham]} className="outline-none">
                                            {Array(listProduct[product.maSanPham] > 9 ? listProduct[product.maSanPham] : 9)
                                                .fill('')
                                                .map((_, index) => (
                                                    <option key={index} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                        </select> */}
                                        <button
                                            onClick={() => {
                                                removeFromCart(product.maSanPham, product.options, product.note);
                                            }}
                                            className="w-4 h-4 rounded-full border-2 border-blue-500 text-blue-500 text-xl flex items-center justify-center hover:bg-blue-100 mr-2"
                                        >
                                            -
                                        </button>
                                        {product.soLuongMua}
                                        <button
                                            onClick={() => {
                                                increaseQuantity(product.maSanPham, product.options, product.note);
                                            }}
                                            className="w-4 h-4 rounded-full border-2 border-blue-500 text-blue-500 text-xl flex items-center justify-center hover:bg-blue-100 ml-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">
                            {Number(product.gia).toLocaleString('vi-VN')}
                            {currency}{' '}
                        </p>
                    </div>
                ))}

                <button
                    onClick={() => {
                        navigate('/products');
                        scrollTo(0, 0);
                    }}
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
                >
                    <img src={assets.arrow_right_icon_colored} alt="arrow" className="group-hover:-translate-x-1 transition" />
                    Tiếp tục mua hàng
                </button>
            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Tóm tắt đơn hàng</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Địa chỉ giao hàng</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{user?.diaChi ? user.diaChi : 'No address found'}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Thay đổi
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                <p
                                    onClick={() => {
                                        setShowAddress(false);
                                    }}
                                    className="text-gray-500 p-2 hover:bg-gray-100"
                                >
                                    {user.diaChi ? user.diaChi : 'No address found'}
                                </p>
                                <p onClick={() => navigate('/add-address')} className="text-primary text-center cursor-pointer p-2 hover:bg-iprimary-dull/10">
                                    Thêm địa chỉ giao hàng
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Phương thức thanh toán</p>

                    <select onChange={(e) => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Thanh toán khi nhận hàng</option>
                        <option value="Online">Thanh toán trực tuyến</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Giá </span>
                        <span>
                            {Number(getCartAmount()).toLocaleString('vi-VN')} {currency}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <span>Phí giao hàng</span>
                        <span className="text-green-600">Miễn phí</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Tổng tiền:</span>
                        <span>
                            {Number(getCartAmount()).toLocaleString('vi-VN')} {currency}
                        </span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    {paymentOption === 'COD' ? 'Đặt hàng' : 'Tiến hành thanh toán'}
                </button>
            </div>
        </div>
    ) : null;
};
export default Cart;
