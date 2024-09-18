import React from "react";
import Profile from "../../../assets/member/member1.png";
const AdminProfile = () => {
  return (
    <div className="grid grid-cols-3 justify-center items-center md:grid-cols-1 md:pt-[20px] pt-[10px] ">
      {/* profile of the admin */}
      <div className="h-[80px] md:h-[30px] w-full  flex justify-center items-center">
        <img
          className="w-[60%] md:w-[20%] p-[2px]  rounded-[50%] border-1  bg-red-500 md:justify-center md:flex"
          src={Profile}
          alt=""
        />
      </div>

      {/* name of the admin  */}
      <div className="  flex justify-center items-center col-span-2 h-[80px] md:h-[45px] w-full  text-white py-[10px] ">
        <p className="text-center items-center selection: mb-[-1px]">
          Admin KAGOSIDA
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
