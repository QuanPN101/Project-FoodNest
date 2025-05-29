import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getAllLoaiSanPham } from '../api/loaiSanPhamApi';
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [isSeller, setisSeller] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});
    const [loaiSanPham, setLoaiSanPham] = useState([]);
    // Fetch all product
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/sanpham');

            setProducts(data); // du lieu tra tu sprb

            console.log('data: ', data);

            console.log('product: ', products);
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu từ backend:', error);
        }
    };

    const fetchLoaiSanPham = async () => {
        const result = await getAllLoaiSanPham();
        setLoaiSanPham(result);
    };
    // Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Add To Cart');
    };

    // Update Cart Item Quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart Update');
    };

    // Remove Product from Cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success('Remove from cart');
        setCartItems(cartData);
    };

    // Get Cart Item Count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    useEffect(() => {
        fetchLoaiSanPham();
        fetchProducts();
        const isLogin = localStorage.getItem('isLogin');
        if (isLogin === 'true') {
            setUser(true);
        }
    }, []);

    const value = {
        currency,
        navigate,
        user,
        setUser,
        isSeller,
        setisSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        getCartCount,
        getCartAmount,
        loaiSanPham,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
