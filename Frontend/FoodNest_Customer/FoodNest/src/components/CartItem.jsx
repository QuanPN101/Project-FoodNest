import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const CartItem = ({ product }) => {
    const navigate = useNavigate();
    console.log(product);
    return (
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
                        {product.soLuongMua}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
