import React from 'react'

const AdminHome = () => {
  // const adminName = useSelector((state) => state.auth.adminName);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-[#754C28] mb-4">
          Welcome to the Admin Dashboard
        </h1>
        {/* {adminName && (
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Hello, {adminName}!
          </h2>
        )} */}
        <p className="">
          Here you can manage users, view reports, and adjust settings.
        </p>
        <p>Add more components or information as needed  </p> 
      </div>
    </div>
  )
}

export default AdminHome