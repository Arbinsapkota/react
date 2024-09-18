import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosPeople } from "react-icons/io";
const AboutUSRoute = () => {
  return (
    <div className='pl-[10px]'>
      <nav className='grid grid-cols-1 gap-2'>
        <NavLink 
          to="past-committee" 
          className="text-black hover:text-blue-500 no-underline flex"
        >
          <IoIosPeople className='text-[#754C28] text-[20px] mr-[5px]' /> Past Committee 
        </NavLink>
        <NavLink 
          to="executive-committee" 
          className="text-black hover:text-blue-500 no-underline flex justify-start items-center"
        >
          <IoIosPeople className='text-[#754C28] text-[20px] mr-[5px]' /> Executive Committee
        </NavLink>
      </nav>
    </div>
  );
}

export default AboutUSRoute;
