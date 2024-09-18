
import React from 'react';
import { NavLink } from 'react-router-dom';

const RatesRoute = () => {
  return (
    <nav className='font-poppins text-[16px] grid border-[2px] border-solid border-brown-300 gap-[8px] bg-brown-300 py-[12px]'>
 
      <NavLink 
        to="/history" 
        className={({ isActive }) => 
          `pl-[20px] no-underline py-[3px] ${isActive ? 'bg-[#754C28] text-white' : 'text-black hover:text-white hover:bg-[#754C28] '}`
        }
      >
        History
      </NavLink>
      <NavLink 
        to="/graph" 
        className={({ isActive }) => 
          `pl-[20px] no-underline py-[3px] ${isActive ? 'bg-[#754C28] text-white' : 'text-black  hover:text-white hover:bg-[#754C28]'}`
        }
      >
       Graph
      </NavLink>
    </nav>
  );
}

export default RatesRoute;

