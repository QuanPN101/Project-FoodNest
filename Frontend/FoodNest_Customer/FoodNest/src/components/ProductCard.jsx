import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';

const ProductCard = ({ product }) => {
    const { currency, addToCart, updateCartItem, removeFromCart, cartItems, listProduct, navigate } = useAppContext();

    return (
        product && (
            <div
                onClick={() => {
                    navigate(`products/detail/${product.maSanPham}`);
                    scrollTo(0, 0);
                }}
                className="border border-gray-500/20 cursor-pointer rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
            >
                <div className="group cursor-pointer flex items-center justify-center px-2 h-1/2">
                    <img className="group-hover:scale-105 transition max-w-26 md:max-w-36 object-cover w-full h-full" src={product.anhChinh} alt={product.tenSanPham} />
                </div>
                <div className="text-gray-500/60 text-sm mt-3">
                    <p>{product.loaiSanPham.tenLoai}</p>
                    <p className="text-gray-700 font-medium text-lg truncate w-full">{product.tenSanPham}</p>
                    <div className="flex items-center gap-0.5">
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                                <img key={i} className="md:w-3.5 w3" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                            ))}
                        <p>(4)</p>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                        <p className="md:text-xl text-base font-medium text-primary">
                            {Number(product.gia).toLocaleString('vi-VN')}
                            {currency}{' '}
                            <span className="text-gray-500/60 md:text-sm text-xs line-through">
                                {Number(product.gia + 15000).toLocaleString('vi-VN')}
                                {currency}
                            </span>
                        </p>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`products/detail/${product.maSanPham}`);
                            }}
                            className="text-primary"
                        >
                            {/* <button className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer ">
                                <img src={assets.cart_icon} alt="cart_icon" />
                                Xem
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductCard;
