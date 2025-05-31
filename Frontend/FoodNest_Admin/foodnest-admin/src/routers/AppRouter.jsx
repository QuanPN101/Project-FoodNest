import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout'
import DashBoard from '../pages/DashBoard';
import ListStore from '../pages/ListStore';
import ListStoreRegister from '../pages/ListStoreRegister';
import ListUser from '../pages/ListUser';
import FormLogin from '../components/form/FormLogin';
import OrderAndTransaction from '../pages/OrderAndTransaction';
import AdvertisementAndPromotion from '../pages/AdvertisementAndPromotion';
import ComplaintAndViolation from '../pages/ComplaintAndViolation';
import UserDetail from '../components/item/UserDetail';
import Profile from '../components/form/Profile';
import FormAddPromotion from '../components/form/FormAddPromotion';
import EditProfile from '../components/form/EditProfile';
import RequireAuth from '../components/RequireAuth';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<FormLogin />} />
      
      <Route path="" element={<RequireAuth />}>
        <Route path="" element={<AdminLayout />}>
          <Route path="ads/add" element={<FormAddPromotion />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="store/list" element={<ListStore />} />
          <Route path="store/register" element={<ListStoreRegister />} />
          <Route path="account" element={<ListUser />} />
          <Route path="orders" element={<OrderAndTransaction />} />
          <Route path="ads" element={<AdvertisementAndPromotion />} />
          <Route path="complaints" element={<ComplaintAndViolation />} />
          <Route path="account/:id" element={<UserDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
