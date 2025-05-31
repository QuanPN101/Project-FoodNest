import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';
const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, loaiSanPham } = useAppContext();

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('isLogin');
        localStorage.removeItem('user');
        navigate('/');
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products');
        }
    }, [searchQuery]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to={'/'}>
                <img className="h-9" style={{ height: '50px', width: '320px' }} src={assets.logo_foodnest} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary font-semibold' : 'hover:text-primary-dull')}>
                    Trang chủ
                </NavLink>

                <div className="relative group p" onMouseEnter={() => setShowCategoryDropdown(true)} onMouseLeave={() => setShowCategoryDropdown(false)}>
                    <div className="flex gap-2 items-center">
                        <button className={`hover:text-primary-dull ${showCategoryDropdown ? 'text-primary' : ''}`}>Danh mục</button>
                        <img onClick={() => setOpen(false)} src={assets.down_icon} alt="search" className="w-4 h-4 " />
                    </div>

                    {showCategoryDropdown && (
                        <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md rounded-md p-2  min-w-[140px] z-10">
                            {loaiSanPham.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={`/products/${item.tenLoai
                                        .toLowerCase()
                                        .replace(/\s+/g, '-')
                                        .normalize('NFD')
                                        .replace(/[\u0300-\u036f]/g, '')}`}
                                    className={({ isActive }) => (isActive ? 'text-primary font-semibold px-2 py-1' : 'hover:text-primary px-2 py-1')}
                                >
                                    {item.tenLoai}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>

                <NavLink to="/products" className={({ isActive }) => (isActive ? 'text-primary font-semibold' : 'hover:text-primary-dull')}>
                    Tất cả sản phẩm
                </NavLink>

                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-primary font-semibold' : 'hover:text-primary-dull')}>
                    Liên hệ
                </NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Nhập tên sản phẩm" />
                    <img onClick={() => setOpen(false)} src={assets.search_icon} alt="search" className="w-4 h-4" />
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Đăng nhập
                    </button>
                ) : (
                    <div className="relative group">
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <img src={assets.profile_icon} className="w-10" alt="profile" />
                            {user && user.hoTen ? <p className="text-sm font-medium pt-2">Xin chào, {user.hoTen}</p> : null}
                        </div>
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 min-w-max rounded-md text-sm z-40">
                            <li onClick={() => navigate('account-management')} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                                Quản lý tài khoản
                            </li>
                            <li onClick={() => navigate('my-orders')} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                                Đơn hàng
                            </li>
                            <li onClick={logout} className="p-2 pl-3 hover:bg-primary/10 cursor-pointer">
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-6 sm:hidden">
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => (open ? setOpen(false) : setOpen(true))} aria-label="Menu" className="">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt="menu" />
                </button>
            </div>
            {/* Mobile Menu */}

            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink to="/" onClick={() => setOpen(false)}>
                        Home
                    </NavLink>
                    <NavLink to="/product" onClick={() => setOpen(false)}>
                        All product
                    </NavLink>
                    {user && (
                        <>
                            <NavLink to="/" onClick={() => setOpen(false)}>
                                My Order
                            </NavLink>
                            <NavLink to="/" onClick={() => setOpen(false)}>
                                Quản lý tài khoản
                            </NavLink>
                        </>
                    )}
                    <NavLink to="/product" onClick={() => setOpen(false)}>
                        Contact
                    </NavLink>
                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false);
                                setShowUserLogin(true);
                            }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        >
                            Login
                        </button>
                    ) : (
                        <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            LogOut
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
