import { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { Link, Links, Navigate, NavLink, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';
const ProductDetails = () => {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();

    const [thumbnail, setThumbnail] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const product = products.find((item) => item.maSanPham === id);

    const [note, setNote] = useState('');

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => product.category === item.category);
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products]);

    // useEffect(() => {
    //   setThumbnail(product?.image[0] ? product.image[0] : null);
    // }, [product]);

    return (
        product && (
            <div className="mt-12">
                <p>
                    <Link to={'/'}>Trang chủ</Link> /<Link to={'/products'}> Tất cả sản phẩm</Link> /
                    <Link
                        to={`/products/${product.loaiSanPham.tenLoai
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')}`}
                    >
                        {product.loaiSanPham.tenLoai}
                    </Link>
                    /<span className="text-primary"> {product.tenSanPham}</span>
                </p>

                <div className="flex flex-col md:flex-row gap-16 mt-4">
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3">
                            <img src={product.anhChinh} alt="" />
                        </div>

                        <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                            <img src={thumbnail} alt="Selected product" />
                        </div>
                    </div>

                    <div className="text-sm w-full md:w-1/2">
                        <h1 className="text-3xl font-medium">{product.tenSanPham}</h1>

                        <div className="flex items-center gap-0.5 mt-1">
                            <img className="md:w-4 w-3.5" src={product.anhChinh ? assets.star_icon : assets.star_dull_icon} alt="" />

                            <p className="text-base ml-2">4</p>
                        </div>

                        {/* <div className="flex items-center gap-2 mt-4">
              <span className="inline-block px-3 py-1 text-sm bg-primary text-white font-semibold rounded-full shadow-sm">
                {product.restaurant || "Tên shop"}
              </span>
              <NavLink
                to={`/restaurant/${
                  product.restaurant?.toLowerCase() || "shop"
                }`}
                className="text-blue-600 text-sm  hover:text-blue-800 "
              >
                Xem thêm món của nhà hàng này
              </NavLink>
            </div> */}

                        <p className="text-base font-medium mt-6">Mô tả sản phẩm</p>
                        <ul className="list-disc ml-4 text-gray-500/70">
                            {/* {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))} */}
                            <li>{product.moTa}</li>
                        </ul>
                        <div className="mt-6">
                            <p className="text-2xl font-semibold text-primary">
                                Giá: {product.gia}
                                {currency}
                            </p>
                            <span className="text-gray-500/60 md:text-sm text-xs line-through">
                                {Number(product.gia + 15000).toLocaleString('vi-VN')}
                                {currency}
                            </span>
                        </div>

                        {/* Extra Options */}
                        <div className="mt-6">
                            <h5 className="font-medium mb-2">Tùy chọn thêm</h5>
                            {['Nhiều hành', 'Không hành', 'Không cay'].map((label, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <input type="checkbox" className="form-checkbox" />
                                    <label>{label}</label>
                                </div>
                            ))}
                        </div>

                        {/* Note */}
                        <div className="mt-6">
                            <label className="font-medium mb-1 block">Ghi chú</label>
                            <textarea rows="3" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú đặc biệt cho món ăn (ví dụ: ít cay, không hành...)" className="w-full p-2 border border-gray-300 rounded-md resize-none" />
                        </div>

                        <div className="flex items-center mt-10 gap-4 text-base">
                            <button onClick={() => addToCart(product.maSanPham)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                                Thêm vào giỏ
                            </button>
                            <button
                                onClick={() => {
                                    addToCart(product.maSanPham);
                                    navigate('/cart');
                                }}
                                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
                {/* --------------------- related products -------------------------------- */}
                <div className="flex flex-col items-center mt-20">
                    <div className="flex flex-col items-center w-max">
                        <p className="text-3xl font-medium">Sản phẩm liên quan</p>
                        <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                    </div>
                    {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div> */}
                    <button
                        onClick={() => {
                            navigate('/products');
                            scrollTo(0, 0);
                        }}
                        className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
                    >
                        Xem thêm
                    </button>
                </div>
            </div>
        )
    );
};

export default ProductDetails;
