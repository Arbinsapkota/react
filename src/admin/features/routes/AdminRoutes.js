// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { LuClipboardEdit } from "react-icons/lu";
// import { TbPhotoEdit } from "react-icons/tb";
// import { FaNewspaper } from "react-icons/fa6";
// import { RiBookLine } from "react-icons/ri";
// import { MdErrorOutline } from "react-icons/md";
// import { BsFillPeopleFill } from "react-icons/bs";
// import { HiChevronRight, HiChevronDown } from "react-icons/hi2";
// import { BiSolidMessageRoundedEdit } from "react-icons/bi";
// import AboutUSRoute from "./AboutUSRoute";
// import MemberListRoute from "./MemberListRoute";
// import { BiMessageAltEdit } from "react-icons/bi";

// const AdminRoutes = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const handleDropdownToggle = (dropdown) => {
//     setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
//   };

//   return (
//     <div className="font-poppins px-[10px] pt-[10px] h-[1200px] md:scroll-m-6">
//       <nav className="grid grid-cols-1 text-start gap-[10px] ">
//         <div className="border-b-[2px] border-[#ac861e] pb-[2px]">
//           <NavLink
//             to="carat22"
//             className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center mb-[5px] "
//             activeClassName="bg-[#f0f0f0]"
//           >
//             <LuClipboardEdit className="text-[#754C28]" /> २२ क्यारेट
//           </NavLink>
//         </div>

//         <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
//           <NavLink
//             to="carat24"
//             className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
//             activeClassName="bg-[#f0f0f0]"
//           >
//             <LuClipboardEdit className="text-[#754C28]" /> २४ क्यारेट
//           </NavLink>
//         </div>

//         <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
//           <NavLink
//             to="pureSilver"
//             className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
//             activeClassName="bg-[#f0f0f0]"
//           >
//             <LuClipboardEdit className="text-[#754C28]" /> असल चाँदी
//           </NavLink>
//         </div>

//         <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
//           <NavLink
//             to="bannerPage"
//             className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
//             activeClassName="bg-[#f0f0f0]"
//           >
//             <RiBookLine className="text-[#754C28]" /> Banner Page
//           </NavLink>
//         </div>

//         <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
//           <NavLink
//             to="recentNews"
//             className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
//             activeClassName="bg-[#f0f0f0]"
//           >
//             <FaNewspaper className="text-[#754C28]" /> Recent News
//           </NavLink>
//         </div>

//         <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
//           <NavLink
//             to="gallery"
//             className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
//             activeClassName="bg-[#f0f0f0]"
//           >
//             <TbPhotoEdit className="text-[#754C28]" /> Gallery
//           </NavLink>
//         </div>

//         <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
//           <NavLink
//             to="notice"
//             className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
//             activeClassName="bg-[#f0f0f0]"
//           >
//             <BiSolidMessageRoundedEdit className="text-[#754C28]" /> Notice
//           </NavLink>
//         </div>

//         <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
//           <NavLink
//             to="popMessage"
//             className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
//             activeClassName="bg-[#f0f0f0]"
//           >
//             <BiMessageAltEdit className="text-[#754C28]" /> PopUp message
//           </NavLink>
//         </div>
//       </nav>

//       <div className="grid grid-cols-1 text-start gap-[10px] mt-[8px]">
//         <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
//           <div className="border-b-[2px] border-[#ac861e] pb-[0px]  text-black w-full no-underline bg-white gap-2 px-[2px] rounded-xl items-center md:relative ">
//             <button
//               onClick={() => handleDropdownToggle("members")}
//               className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
//             >
//               <BsFillPeopleFill className="text-[#754C28]" /> Members
//               <div className="ml-[100px]">
//                 {openDropdown === "members" ? (
//                   <HiChevronDown />
//                 ) : (
//                   <HiChevronRight />
//                 )}
//               </div>
//             </button>
//             {openDropdown === "members" && (
//               <div className="mt-0 pb-[3px] md:absolute top-[-45px] md:bg-white md:w-full md:py-[10px] md:rounded-t-lg md:left-0 md:border-[2px] md:border-[#754C28] md:border-b-0 md:drop-shadow-lg  ">
//                 <MemberListRoute />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
//           <div className="border-b-[2px] border-[#ac861e] mb-[2px]  text-black w-full no-underline bg-white gap-2 px-[2px] rounded-xl items-center md:relative ">
//             <button
//               onClick={() => handleDropdownToggle("aboutUs")}
//               className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
//             >
//               <MdErrorOutline className="text-[#754C28]" /> About Us
//               <div className="ml-[100px]">
//                 {openDropdown === "aboutUs" ? (
//                   <HiChevronDown />
//                 ) : (
//                   <HiChevronRight />
//                 )}
//               </div>
//             </button>
//             {openDropdown === "aboutUs" && (
//               <div className="mt-2 md:absolute top-[-86.5px] md:bg-white md:w-full md:py-[10px] md:rounded-t-lg md:left-0 md:border-[2px] md:border-[#754C28] md:border-b-0 md:drop-shadow-lg">
//                 <AboutUSRoute />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminRoutes;


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuClipboardEdit } from "react-icons/lu";
import { TbPhotoEdit } from "react-icons/tb";
import { FaNewspaper } from "react-icons/fa6";
import { RiBookLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiChevronRight, HiChevronUp } from "react-icons/hi2";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";
import AboutUSRoute from "./AboutUSRoute";
import MemberListRoute from "./MemberListRoute";
import { BiMessageAltEdit } from "react-icons/bi";


const AdminRoutes = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };
  const handleCloseDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="font-poppins px-[10px] pt-[10px] h-[1200px] scroll-m-6">
      <nav className="grid grid-cols-1 text-start gap-[10px]">
        <div className="border-b-[2px] border-[#ac861e] pb-[2px]">
          <NavLink
            to="carat22"
            className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center mb-[5px]"
            activeClassName="bg-[#f0f0f0]"
            onClick={handleCloseDropdown}
          >
            <LuClipboardEdit className="text-[#754C28]" /> २२ क्यारेट
          </NavLink>
        </div>

        <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
          <NavLink
            to="carat24"
            className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
            activeClassName="bg-[#f0f0f0]"
            onClick={handleCloseDropdown}
          >
            <LuClipboardEdit className="text-[#754C28]" /> २४ क्यारेट
          </NavLink>
        </div>

        <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
          <NavLink
            to="pureSilver"
            className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
            activeClassName="bg-[#f0f0f0]"
            onClick={handleCloseDropdown}
          >
            <LuClipboardEdit className="text-[#754C28]" /> असल चाँदी
          </NavLink>
        </div>

        <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
          <NavLink
            to="bannerPage"
            className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
            activeClassName="bg-[#f0f0f0]"
            onClick={handleCloseDropdown}
          >
            <RiBookLine className="text-[#754C28]" /> Banner Page
          </NavLink>
        </div>

        <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
          <NavLink
            to="recentNews"
            className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
            activeClassName="bg-[#f0f0f0]"
            onClick={handleCloseDropdown}
          >
            <FaNewspaper className="text-[#754C28]" /> Recent News
          </NavLink>
        </div>

        <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
          <NavLink
            to="gallery"
            className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
            activeClassName="bg-[#f0f0f0]"
            onClick={handleCloseDropdown}
          >
            <TbPhotoEdit className="text-[#754C28]" /> Gallery
          </NavLink>
        </div>

        <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
          <NavLink
            to="notice"
            className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
            activeClassName="bg-[#f0f0f0]"
            onClick={handleCloseDropdown}
          >
            <BiSolidMessageRoundedEdit className="text-[#754C28]" /> Notice
          </NavLink>
        </div>

        <div className="border-b-[2px] border-[#ac861e] pb-[5px]">
          <NavLink
            to="popMessage"
            className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
            activeClassName="bg-[#f0f0f0]"
            onClick={handleCloseDropdown}
          >
            <BiMessageAltEdit className="text-[#754C28]" /> PopUp message
          </NavLink>
        </div>
      </nav>

      <div className="grid grid-cols-1 text-start gap-[10px] mt-[8px]">
        <div className="border-b-[2px] border-[#ac861e] pb-[5px] ">
          <div className="relative border-b-[2px] border-[#ac861e] pb-[0px] text-black w-full no-underline bg-white gap-2 px-[2px] rounded-xl items-center">
            <button
              onClick={() => handleDropdownToggle("members")}
              className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
            >
              <BsFillPeopleFill className="text-[#754C28]" /> Members
              <div className="ml-[100px] md:ml-[50px]">
                {openDropdown === "members" ? (
                  <HiChevronUp  />
                ) : (
                  <HiChevronRight />
                )}
              </div>
            </button>
            {openDropdown === "members" && (
              <div className=" absolute top-[-39px]  mt-0 pb-[3px] bg-white w-full py-[10px] rounded-t-lg left-0 border-[2px] border-[#754C28] border-b-0 drop-shadow-lg">
                <MemberListRoute />
              </div>
            )}
          </div>
        </div>

        <div className="border-b-[2px] border-[#ac861e] pb-[5px] relative">
          <div className=" border-b-[2px] border-[#ac861e] mb-[2px] text-black w-full no-underline bg-white gap-2 px-[2px] rounded-xl items-center">
            <button
              onClick={() => handleDropdownToggle("aboutUs")}
              className="flex text-black py-[3px] w-full no-underline bg-white gap-2 px-[3px] rounded-xl items-center"
            >
              <MdErrorOutline className="text-[#754C28]" /> About Us
              <div className="ml-[100px] md:ml-[50px]">
                {openDropdown === "aboutUs" ? (
                  <HiChevronUp />
                ) : (
                  <HiChevronRight />
                )}
              </div>
            </button>
            {openDropdown === "aboutUs" && (
              <div className="mt-2 absolute top-[-85px] md:top-[-110px]  bg-white w-full py-[10px] rounded-t-lg left-0  border-[2px] border-[#754C28] border-b-0 drop-shadow-lg">
                <AboutUSRoute />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;
