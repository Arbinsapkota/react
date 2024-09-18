import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosPeople } from "react-icons/io";
const MemberListRoute = () => {

  return (
    <div>
      <nav className='ml-[15px]'>
        <NavLink  to="memberList"  className="no-underline text-black flex items-center justify-start"> <IoIosPeople  className='text-[#754C28] text-[20px] mr-[5px]'/> Members List</NavLink>
      </nav>
    </div>
  )
}

export default MemberListRoute