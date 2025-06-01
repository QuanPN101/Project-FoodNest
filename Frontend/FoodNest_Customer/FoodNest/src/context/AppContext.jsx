import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getAllLoaiSanPham } from '../api/loaiSanPhamApi';
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Lỗi khi parse user từ localStorage:', error);
            return null;
        }
    });

    const [showUserLogin, setShowUserLogin] = useState(false);
    const [isSeller, setisSeller] = useState(false);
    const [products, setProducts] = useState([]);
    // const [cartItems, setCartItems] = useState({});
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cartItems');
            return storedCart ? JSON.parse(storedCart) : {};
        } catch (error) {
            console.error('Lỗi khi parse cart từ localStorage:', error);
            return {};
        }
    });
    const [searchQuery, setSearchQuery] = useState({});
    const [loaiSanPham, setLoaiSanPham] = useState([]);
    // Fetch all product
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/sanpham');

            setProducts(data); // du lieu tra tu sprb

            // console.log('data: ', data);

            // console.log('product: ', products);
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu từ backend:', error);
        }
    };

    const fetchLoaiSanPham = async () => {
        const result = await getAllLoaiSanPham();
        setLoaiSanPham(result);
    };
    // Add product to cart
    // const addToCart = (itemId) => {
    //     let cartData = structuredClone(cartItems);
    //     if (cartData[itemId]) {
    //         cartData[itemId] += 1;
    //     } else {
    //         cartData[itemId] = 1;
    //     }
    //     setCartItems(cartData);
    //     toast.success('Thêm thành công');
    // };

    const addToCart = (itemId) => {
        const product = products.find((p) => p.maSanPham === itemId);
        if (!product) return;

        const currentQty = cartItems[itemId] || 0;
        if (currentQty + 1 > product.soLuong) {
            toast.error('Vượt quá số lượng tồn kho');
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId] = currentQty + 1;
        setCartItems(cartData);
        toast.success('Đã thêm vào giỏ hàng');
    };

    // Update Cart Item Quantity
    // const updateCartItem = (itemId, quantity) => {
    //     let cartData = structuredClone(cartItems);
    //     cartData[itemId] = quantity;
    //     setCartItems(cartData);
    //     toast.success('Đã cập nhật giỏ hàng');
    // };

    const updateCartItem = (itemId, quantity) => {
        const product = products.find((p) => p.maSanPham === itemId);
        if (!product) return;

        if (quantity > product.soLuong) {
            toast.error('Vượt quá số lượng tồn kho');
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Đã cập nhật giỏ hàng');
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
        toast.success('Xóa sản phẩm thành công');
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
            const itemInfo = products.find((product) => product.maSanPham === items);
            if (itemInfo && cartItems[items] > 0) {
                totalAmount += itemInfo.gia * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        fetchLoaiSanPham();
        fetchProducts();

        const userData = localStorage.getItem('user');
        try {
            if (userData && userData !== 'undefined') {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            // Có thể clear localStorage nếu dữ liệu sai định dạng:
            // localStorage.removeItem('user');
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
