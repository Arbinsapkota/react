
import React from 'react';
import { NavLink } from 'react-router-dom';

const ActivitiesRoute = () => {
  return (
    <nav className='text-[16px] grid border-[2px] border-solid border-brown-300 gap-[8px] bg-brown-300 py-[12px] font-poppins'>
      <NavLink 
        to="/news" 
        className={({ isActive }) => 
          `pl-[20px] no-underline py-[3px] ${isActive ? 'bg-[#754C28] text-white' : 'text-black  hover:text-white hover:bg-[#754C28]'}`
        }
      >
        News
      </NavLink>
      <NavLink 
        to="/notices" 
        className={({ isActive }) => 
          `pl-[20px] no-underline py-[3px] ${isActive ? 'bg-[#754C28] text-white' : 'text-black hover:text-white hover:bg-[#754C28] '}`
        }
      >
        Notices
      </NavLink>
      <NavLink 
        to="/photoGallery" 
        className={({ isActive }) => 
          `pl-[20px] no-underline py-[3px] ${isActive ? 'bg-[#754C28] text-white' : 'text-black  hover:text-white hover:bg-[#754C28]'}`
        }
      >
        Photo Gallery
      </NavLink>
    </nav>
  );
}

export default ActivitiesRoute;
