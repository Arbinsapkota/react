import React from 'react'
import AdminProfile from '../ui/AdminProfile'
import AdminRoutes from '../routes/AdminRoutes'

const AdminSideBar = () => {
  return (
    <div className='bg-[#754C28] h-auto md:w-[200px]'>
      <div className='border-b-[2px] border-[#ac861e] h-auto md:h-[200px] md:overflow-y-auto '>
       <AdminProfile />
       </div>
       <div>
        <AdminRoutes />
       </div>
    </div>
  )
}

export default AdminSideBar