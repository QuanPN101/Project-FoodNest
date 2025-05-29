import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/Appcontext';

const BestSeller = () => {
    const { products } = useAppContext();
    console.log(products);
    return (
        <div className="mt-16">
            <p className="text-2xl md:text-3xl font-medium">Món bán chạy</p>
            <div className="flex overflow-x-auto gap-4 scrollbar-hide">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
