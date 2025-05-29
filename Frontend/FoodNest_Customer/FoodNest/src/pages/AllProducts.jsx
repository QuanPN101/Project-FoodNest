import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter((product) => product.tenSanPham.toLowerCase().includes(searchQuery.toLowerCase())));
        } else {
            setFilteredProducts(products);
        }
        setCurrentPage(1); // Reset trang khi filter
    }, [products, searchQuery]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo(0, 0); // Scroll lên đầu trang khi chuyển trang
        }
    };

    return (
        <div className="mt-16 flex flex-col">
            <div className="flex flex-col items-end w-max">
                <p className="text-2xl font-medium uppercase">Tất cả sản phẩm</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
                {paginatedProducts
                    .filter((product) => product.trangThai === true)
                    .map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
            </div>

            {/* PHÂN TRANG */}
            <div className="flex items-center justify-center gap-2 mt-8">
                <button type="button" aria-label="Previous" className="mr-4" onClick={() => changePage(currentPage - 1)}>
                    <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1L2 9.24242L11 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="flex gap-2 text-gray-500 text-sm md:text-base">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button key={page} onClick={() => changePage(page)} className={`flex items-center  justify-center w-9 md:w-12 h-9 md:h-12 aspect-square ${currentPage === page ? 'bg-indigo-500 text-white' : 'border border-gray-300/60 hover:bg-gray-300/10'} rounded-sm transition-all`}>
                            {page}
                        </button>
                    ))}
                </div>

                <button type="button" aria-label="Next" className="ml-4" onClick={() => changePage(currentPage + 1)}>
                    <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L10 9.24242L1 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
