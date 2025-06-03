import { createContext, use, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getAllLoaiSanPham } from '../api/loaiSanPhamApi';
import { getSanPhamByLoai } from '../api/sanPhamApi';
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
    const [listProduct, setListProduct] = useState([]);

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

    // loai san phampham
    const fetchLoaiSanPham = async () => {
        const result = await getAllLoaiSanPham();
        setLoaiSanPham(result);
    };

    // sanphambyloai
    const fetchProductsByLoai = async (maLoai) => {
        try {
            const data = await getSanPhamByLoai(maLoai);
            return data; // trả về list sản phẩm
        } catch (error) {
            console.error('Lỗi khi fetch sản phẩm theo loại:', error);
            return [];
        }
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
        const product = listProduct.find((p) => p.maSanPham === itemId);
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
    // const removeFromCart = (id) => {
    //     let itemWasRemoved = false;

    //     const updatedCart = listProduct
    //         .map((item) => {
    //             if (item.maSanPham === id) {
    //                 const newQty = item.soLuongMua - 1;
    //                 if (newQty <= 0) {
    //                     itemWasRemoved = true;
    //                     return null;
    //                 }
    //                 return { ...item, soLuongMua: newQty };
    //             }
    //             return item;
    //         })
    //         .filter((item) => item !== null); // loại bỏ item đã đánh dấu

    //     setListProduct(updatedCart);

    //     if (itemWasRemoved) {
    //         toast.success('Xóa sản phẩm thành công');
    //     } else {
    //         toast.success('Giảm số lượng sản phẩm thành công');
    //     }
    // };
    const removeFromCart = (id, options, note) => {
        let itemWasRemoved = false;

        const updatedCart = listProduct
            .map((item) => {
                const isSameProduct = item.maSanPham === id && JSON.stringify(item.options) === JSON.stringify(options) && item.note === note;

                if (isSameProduct) {
                    const newQty = item.soLuongMua - 1;
                    if (newQty <= 0) {
                        itemWasRemoved = true;
                        return null;
                    }
                    return { ...item, soLuongMua: newQty };
                }
                return item;
            })
            .filter((item) => item !== null); // loại bỏ item đã đánh dấu null

        setListProduct(updatedCart);

        if (itemWasRemoved) {
            toast.success('Xóa sản phẩm thành công');
        } else {
            toast.success('Giảm số lượng sản phẩm thành công');
        }
    };

    // const increaseQuantity = (itemId) => {
    //     const updatedCart = listProduct
    //         .map((item) => {
    //             if (item.maSanPham === itemId) {
    //                 const newQty = item.soLuongMua + 1;

    //                 return { ...item, soLuongMua: newQty };
    //             }
    //             return item;
    //         })
    //         .filter((item) => item !== null);

    //     setListProduct(updatedCart);

    //     toast.success('Cập nhập số lượng thành công');
    // };
    const increaseQuantity = (id, options, note) => {
        const updatedCart = listProduct.map((item) => {
            const isSameProduct = item.maSanPham === id && JSON.stringify(item.options) === JSON.stringify(options) && item.note === note;

            if (isSameProduct) {
                const newQty = item.soLuongMua + 1;
                return { ...item, soLuongMua: newQty };
            }
            return item;
        });

        setListProduct(updatedCart);
        toast.success('Cập nhật số lượng thành công');
    };

    // Get Cart Item Count
    const getCartCount = () => {
        return listProduct.length;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        listProduct.forEach((item) => {
            totalAmount += item.gia * item.soLuongMua;
        });
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
        fetchProductsByLoai,
        setListProduct,
        listProduct,
        increaseQuantity,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
