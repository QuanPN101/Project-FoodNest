import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import { data, useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const { category } = useParams(); // category = maLoai
    const { fetchProductsByLoai, loaiSanPham } = useAppContext();
    const [products, setProducts] = useState([]);

    console.log('products ', products);

    const tenLoai = loaiSanPham.find((loai) => loai.maLoai === category)?.tenLoai || 'Không rõ';
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProductsByLoai(category);
            setProducts(data);
        };
        fetchData();
    }, [category]);
    return (
        <div className="mt-16">
            {category && (
                <div className="flex flex-col items-end w-max">
                    <p className="text-2xl font-medium uppercase">{tenLoai}</p>
                    <div className="w-16 h-0.5 bg-primary rounded-full"></div>
                </div>
            )}
            {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {products.map((product) => (
                        <ProductCard key={product.maSanPham} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-[60vh]">
                    <p className="text-2xl font-medium text-primary">Danh mục này hiện không có sản phẩm</p>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;
