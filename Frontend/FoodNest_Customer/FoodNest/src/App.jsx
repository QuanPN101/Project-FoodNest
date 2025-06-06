import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAppContext } from './context/Appcontext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import Contact from './pages/Contact';
import AccountPage from './pages/AccountPage';
import ChangePasswordForm from './pages/ChangePasswordForm';
import Payment from './pages/Payment';
import MyOrder from './pages/MyOrder';
import MapView from './components/MapView';
import PrivateRoute from './PrivateRoute';

export const App = () => {
    const isSellerPath = useLocation().pathname.includes('seller');
    const { showUserLogin } = useAppContext();
    return (
        <div>
            {isSellerPath ? null : <Navbar />}
            {showUserLogin ? <Login /> : null}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                }}
            />
            <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<AllProducts />} />
                    <Route path="/products/:category" element={<ProductCategory />} />
                    <Route path="/products/detail/:id" element={<ProductDetails />} />

                    <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
                    <Route path="/add-address" element={<PrivateRoute element={<AddAddress />} />} />
                    <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
                    <Route path="/account" element={<PrivateRoute element={<AccountPage />} />} />
                    <Route path="/changepassword" element={<PrivateRoute element={<ChangePasswordForm />} />} />
                    <Route path="/order" element={<PrivateRoute element={<Payment />} />} />
                    <Route path="/myorders" element={<PrivateRoute element={<MyOrder />} />} />
                </Routes>
            </div>
            {!isSellerPath && <Footer />}
        </div>
    );
};
export default App;
