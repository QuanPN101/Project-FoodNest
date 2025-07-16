import { Profiler, use, useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { Link, Links, Navigate, NavLink, useFetcher, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import { getSanPhamByLoai } from '../api/sanPhamApi';
const ProductDetails = () => {
    const { products, navigate, currency, addToCart, setListProduct, listProduct } = useAppContext();
    const { id } = useParams();
    const [thumbnail, setThumbnail] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [tuyChon, setTuyChon] = useState([]);
    const product = products.find((item) => item.maSanPham === id);
    const [note, setNote] = useState('');
    const [selectedTuyChon, setSelectedTuyChon] = useState([]);
    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => product.category === item.category);
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products]);

    useEffect(() => {
        const getSPByLoai = async () => {
            const data = await getSanPhamByLoai(product.loaiSanPham.maLoai);
            setRelatedProducts(data);
        };
        getSPByLoai();
    }, [product, product]);

    const handleCheckboxChange = (e, item) => {
        if (e.target.checked) {
            setSelectedTuyChon((prev) => [...prev, { maTuyChon: item.maTuyChon, tenTuyChon: item.tenTuyChon }]);
        } else {
            setSelectedTuyChon((prev) => prev.filter((i) => i.maTuyChon !== item.maTuyChon));
        }
    };

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
                        {/* <div className="flex flex-col gap-3">
                            <img src={product.anhChinh ? product.anhChinh : assets.no_image} alt="" />
                        </div> */}

                        <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                            <img src={product.anhChinh} alt="Selected product" />
                        </div>
                    </div>

                    <div className="text-sm w-full md:w-1/2">
                        <h1 className="text-3xl font-medium">{product.tenSanPham}</h1>

                        <div className="flex items-center gap-0.5 mt-1">
                            <img className="md:w-4 w-3.5" src={product.anhChinh ? assets.star_icon : assets.star_dull_icon} alt="" />
                            {Array(4)
                                .fill('')
                                .map((_, i) => (
                                    <img key={i} className="md:w-3.5 w3" src={i < 3 ? assets.star_icon : assets.star_dull_icon} alt="" />
                                ))}
                            <p>(4)</p>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <span className="inline-block px-3 py-1 text-sm bg-primary text-white font-semibold rounded-full shadow-sm">{product.maGianHang.tenGianHang || 'Tên shop'}</span>
                            <NavLink
                                to={`/restaurant/${(product.maGianHang?.tenGianHang || 'shop')
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')
                                    .normalize('NFD')
                                    .replace(/[\u0300-\u036f]/g, '')}`}
                                className="text-blue-600 text-sm  hover:text-blue-800 "
                            >
                                Xem thêm món của nhà hàng này
                            </NavLink>
                        </div>

                        <p className="text-base font-medium mt-6">Mô tả sản phẩm</p>
                        <ul className="list-disc ml-4 text-gray-500/70">
                            {/* {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))} */}
                            <li>{product.moTa}</li>
                        </ul>
                        <div className="mt-6">
                            <p className="text-2xl font-semibold text-primary">
                                Giá:
                                {Number(product.gia).toLocaleString('vi-VN')}
                                {currency}{' '}
                            </p>
                            <span className="text-gray-500/60 md:text-sm text-xs line-through">
                                {Number(product.gia + 15000).toLocaleString('vi-VN')}
                                {currency}
                            </span>
                        </div>

                        {/* Extra Options */}
                        <div className="mt-6">
                            <h5 className="font-medium mb-2">Tùy chọn thêm</h5>
                            {product.tuyChon.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <input id={`tuychon-${item.maTuyChon}`} type="checkbox" className="form-checkbox text-green-600" value={item.tenTuyChon} checked={selectedTuyChon.some((i) => i.maTuyChon === item.maTuyChon)} onChange={(e) => handleCheckboxChange(e, item)} />{' '}
                                    <label>{item.tenTuyChon}</label>
                                </div>
                            ))}
                        </div>

                        {/* Note */}
                        <div className="mt-6">
                            <label className="font-medium mb-1 block">Ghi chú</label>
                            <textarea rows="3" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú đặc biệt cho món ăn (ví dụ: ít cay, không hành...)" className="w-full p-2 border border-gray-300 rounded-md resize-none" />
                        </div>

                        <div className="flex items-center mt-10 gap-4 text-base">
                            <button
                                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                                onClick={() => {
                                    const existed = listProduct.find((p) => p.maSanPham === product.maSanPham && JSON.stringify(p.options) === JSON.stringify(selectedTuyChon) && p.note === note);

                                    if (!existed) {
                                        setListProduct((prevList) => [
                                            ...prevList,
                                            {
                                                ...product,
                                                note: note,
                                                options: selectedTuyChon,
                                                soLuongMua: 1,
                                            },
                                        ]);
                                        toast.success('Thêm vào giỏ hàng thành công.');
                                    } else {
                                        const updated = listProduct.map((p) => (p.maSanPham === product.maSanPham && JSON.stringify(p.options) === JSON.stringify(selectedTuyChon) && p.note === note ? { ...p, soLuongMua: p.soLuongMua + 1 } : p));
                                        setListProduct(updated);
                                        toast.success('Thêm vào giỏ hàng thành công.');
                                    }
                                }}
                            >
                                Thêm vào giỏ
                            </button>

                            {/* <button //  code
                                onClick={() => {
                                    const newProduct = {
                                        ...product,
                                        note: note,
                                        options: selectedTuyChon,
                                        soLuongMua: 1,
                                    };
                                    setListProduct((prevList) => [...prevList, newProduct]);
                                    navigate('/cart');
                                }}
                                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
                            >
                                Mua ngay
                            </button> */}
                            <button
                                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
                                onClick={() => {
                                    const existed = listProduct.find((p) => p.maSanPham === product.maSanPham && JSON.stringify(p.options) === JSON.stringify(selectedTuyChon) && p.note === note);

                                    if (!existed) {
                                        setListProduct((prevList) => [
                                            ...prevList,
                                            {
                                                ...product,
                                                note: note,
                                                options: selectedTuyChon,
                                                soLuongMua: 1,
                                            },
                                        ]);
                                    } else {
                                        const updated = listProduct.map((p) => (p.maSanPham === product.maSanPham && JSON.stringify(p.options) === JSON.stringify(selectedTuyChon) && p.note === note ? { ...p, soLuongMua: p.soLuongMua + 1 } : p));
                                        setListProduct(updated);
                                    }
                                    navigate('/cart');
                                }}
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
                        {relatedProducts.slice(0, 5).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
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
