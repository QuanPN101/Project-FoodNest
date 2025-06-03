import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Sidebar from './Sidebar';

function AdminLayout() {
  return (
    <div cz-shortcut-listen="true">
        <Header/>
        <Sidebar/>
        <main id="main" className="main">
          <div className="pagetitle">
            <Outlet/>
          </div>
        </main>
    </div>
  )
}

export default AdminLayout