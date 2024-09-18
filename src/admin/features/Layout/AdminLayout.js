import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../shared/AdminHeader';
import AdminSideBar from '../shared/AdminSideBar';


const AdminLayout = () => {
  return (
    <>
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div className='w-64 fixed top-0 left-0 h-full  text-white '>
        <AdminSideBar />
      </div>

      {/* Main content area */}
      <div className='flex-1 ml-64 md:ml-[200px]'>
        {/* Header */}
        <div className='w-full h-16 fixed top-0 left-64 md:left-[201px]  '>
          <AdminHeader />
        </div>

        {/* Content */}
        <div className=' overflow-auto h-full'>
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminLayout;

