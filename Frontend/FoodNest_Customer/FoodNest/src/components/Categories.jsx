import React from 'react';
import { categories } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';

const Categories = () => {
    const { navigate, loaiSanPham } = useAppContext();
    console.log('loai san pham ', loaiSanPham);

    const categoryColors = ['#4fbf8b', '#f39c12', '#e74c3c', '#8e44ad', '#3498db', '#2ecc71', '#1abc9c', '#9b59b6', '#e67e22', '#34495e'];
    return (
        <div className="mt-16">
            <p className="text-2xl md:text-3xl front-medium">Danh mục</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
                {loaiSanPham.slice(0, 7).map((item, index) => (
                    <div
                        key={index}
                        className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
                        style={{ backgroundColor: categoryColors[index % categoryColors.length] }}
                        onClick={() => {
                            navigate(`/products/${item.maLoai}`);
                            scrollTo(0, 0);
                        }}
                    >
                        {/* <img className="group-hover:scale-108 transition max-w-28" src={category.image} alt={category.text} /> */}
                        <p className="text-sm font-medium">{item.tenLoai}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
