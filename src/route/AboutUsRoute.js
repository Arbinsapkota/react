


import React from 'react';
import { NavLink } from 'react-router-dom';

const AboutUsRoute = () => {
  return (
    <nav className='text-[16px] grid border-[2px] border-solid border-brown-300 gap-[8px] bg-brown-300 py-[12px] font-poppins'>
 
      <NavLink 
        to="/about/intro" 
        className={({ isActive }) => 
          `pl-[20px] no-underline py-[3px] ${isActive ? 'bg-[#754C28] text-white' : 'text-black hover:text-white hover:bg-[#754C28] '}`
        }
      >
        Introduction
      </NavLink>
      <NavLink 
        to="/about/pastCommittee" 
        className={({ isActive }) => 
          `pl-[20px] no-underline py-[3px] ${isActive ? 'bg-[#754C28] text-white' : 'text-black  hover:text-white hover:bg-[#754C28]'}`
        }
      >
       Past Committee
      </NavLink>
      <NavLink 
        to="/about/executive" 
        className={({ isActive }) => 
          `pl-[20px] no-underline py-[3px] ${isActive ? 'bg-[#754C28] text-white' : 'text-black  hover:text-white hover:bg-[#754C28]'}`
        }
      >
      Executive Committee
      </NavLink>
    </nav>
  );
}

export default AboutUsRoute;

