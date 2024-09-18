import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import logo1 from "../assets/images/logo1.png";
import { HiBars3, HiMiniXMark } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import AboutUsRoute from "../route/AboutUsRoute";
import RatesRoute from "../route/RatesRoute";
import ActivitiesRoute from "../route/ActivitiesRoute";
import { useTransition, animated } from "@react-spring/web";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const dropdownRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setShowMenu(false);
  }, [location]);

  const handleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const isActiveRoute = (path) => location.pathname === path;

  const getButtonClass = (dropdown) =>
    `text-black w-full text-start py-[15px] px-[20px] ${
      openDropdown === dropdown || isActiveRoute(dropdown)
        ? "bg-[#754C28] text-white duration-500"
        : "hover:bg-brown-300 "
    }`;

  const getNavLinkClass = (path) =>
    `px-[10px] md:py-[8px] ${
      isActiveRoute(path)
        ? "bg-[#754C28] text-white duration-500 flex items-center"
        : "text-black hover:bg-brown-300 hover:text-white flex items-center"
    }`;

  const transitionsMenu = useTransition(showMenu, {
    from: { opacity: 0, transform: "translateY(-100px)" }, // Start 100px above
    enter: { opacity: 1, transform: "translateY(0px)" }, // Move to its final position
    leave: { opacity: 0, transform: "translateY(-200px)" }, // Leave 100px above
  });

  return (
    <div className="sticky bg-white top-0 z-30 text-black font-poppins">
      <div className="items-center justify-around md:justify-between px-[15px]">
        <div className="flex justify-between ">
          <div className="flex pt-[10px]">
            {/* -----logo----- */}
            <img
              className="w-[30%] sm:w-[25%] h-[100px] sm:h-[50px] "
              src={logo}
              alt="logo"
            />
            <img
              className="w-[350px] sm:w-[76%] h-[100px] sm:h-[45px]"
              src={logo1}
              alt=""
            />
          </div>

          <div className="bg-red-600 h-[100px] w-[100px] mt-[5px] md:hidden "></div>
          <div className="bg-red-600 h-[100px] w-[100px] mt-[5px] md:hidden "></div>
          <div className="bg-red-600 h-[100px] w-[100px] mt-[5px] md:hidden "></div>

          {/* -----menu button------- */}
          <div
            className="md:flex hidden items-center sm:mb-[5px]"
            ref={menuRef}
          >
            {showMenu ? (
              <button
                onClick={handleMenuToggle}
                className="text-[30px] border-[2px] border-solid border-[#754C28] h-[40px] w-auto px-[10px] hover:bg-[#754C28] hover:text-white"
              >
                <HiMiniXMark />
              </button>
            ) : (
              <button
                className="text-[30px] border-[2px] border-solid border-[#754C28] w-auto h-[40px] px-[10px] hover:text-white hover:bg-[#754C28]"
                onClick={handleMenuToggle}
              >
                <HiBars3 />
              </button>
            )}
          </div>
        </div>

        {/*-------Navbar---  */}
        <div
          className={`pt-[10px] flex md:hidden font-poppins font-semibold text-blue-gray-800 items-center`}
        >
          <nav className="flex justify-between w-full">
            <div className={`${getNavLinkClass("/")}`}>
              <NavLink
                to="/"
                className={`${getNavLinkClass(
                  "/"
                )} no-underline flex items-center`}
              >
                HOME
              </NavLink>
            </div>

            <div className="relative">
              <button
                onClick={() => handleDropdown("about")}
                className={`${getButtonClass("about")} flex items-center`}
              >
                ABOUT US <IoIosArrowDown size={25} />
              </button>
              {openDropdown === "about" && (
                <div className="absolute w-[240px] left-0 bg-brown-200 border-[2px] border-solid border-brown-300">
                  <AboutUsRoute />
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleDropdown("rates")}
                className={`${getButtonClass(
                  "rates"
                )} flex items-center text-black`}
              >
                RATES <IoIosArrowDown size={25} />
              </button>
              {openDropdown === "rates" && (
                <div className="absolute left-0 w-[190px] bg-brown-200 border-[2px] border-solid border-brown-300">
                  <RatesRoute />
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleDropdown("activities")}
                className={`${getButtonClass("activities")} flex items-center`}
              >
                ACTIVITIES <IoIosArrowDown size={25} />
              </button>
              {openDropdown === "activities" && (
                <div className="absolute w-[200px] left-0 bg-brown-200 border-[2px] border-solid border-brown-300">
                  <ActivitiesRoute />
                </div>
              )}
            </div>

            <div className={`${getNavLinkClass("/contact")}`}>
              <NavLink
                to="/contact"
                className={`${getNavLinkClass("/contact")} no-underline`}
              >
                CONTACT US
              </NavLink>
            </div>
          </nav>
        </div>
      </div>

      {/* ----for the md responsive nav bar -*/}
      {transitionsMenu((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="md:flex hidden border-b-[2px] border-solid w-full bg-white"
          >
            <nav className="font-poppins font-semibold items-center text-[14px] pt-[20px] grid grid-cols-1 gap-[5px] px-[20px] w-full">
              <div className={getNavLinkClass("/")}>
                <NavLink
                  exact
                  to="/"
                  className={`${getNavLinkClass("/")} no-underline`}
                >
                  HOME
                </NavLink>
              </div>

              <div className="relative">
                <button
                  onClick={() => handleDropdown("about")}
                  className={`${getButtonClass("about")} flex items-center`}
                >
                  ABOUT US <IoIosArrowDown className="text-[22px]" />
                </button>
                {openDropdown === "about" && (
                  <div className="bg-brown-200 border-[2px] border-solid border-brown-300">
                    <AboutUsRoute />
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => handleDropdown("rates")}
                  className={`${getButtonClass("rates")} flex items-center`}
                >
                  RATES <IoIosArrowDown className="text-[22px]" />
                </button>
                {openDropdown === "rates" && (
                  <div className="bg-brown-200 border-[2px] border-solid border-brown-300">
                    <RatesRoute />
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => handleDropdown("activities")}
                  className={`${getButtonClass(
                    "activities"
                  )} flex items-center`}
                >
                  ACTIVITIES <IoIosArrowDown className="text-[22px]" />
                </button>
                {openDropdown === "activities" && (
                  <div className="bg-brown-200 border-[2px] border-solid border-brown-300">
                    <ActivitiesRoute />
                  </div>
                )}
              </div>

              <div className={getNavLinkClass("/contact")}>
                <NavLink
                  to="/contact"
                  className={`${getNavLinkClass("/contact")} no-underline`}
                >
                  CONTACT US
                </NavLink>
              </div>
            </nav>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default Header;
