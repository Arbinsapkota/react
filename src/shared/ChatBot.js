import React, { useState, useEffect } from "react";
import logo from "../assets/images/chatboot.png";
import { Container } from "../components/Container";
import { NavLink } from "react-router-dom";
const Chatbot = () => {
  // Initialized with false for clarity
  const [showText, setShowText] = useState(false);
  const [buttonClicked] = useState(false);

  useEffect(() => {
    // Show text after 2 seconds of page load
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <Container>
      <div className="relative bottom-[30px] left-[30px]  text-white rounded-md p-2 flex flex-col items-center space-y-2 text-[20px] sm:text-[15px] mx-auto">
        <nav className="fixed bottom-8 left-8 sm:left-[15px] z-[9999]  flex items-center">
          <NavLink
            className={` hover:duration-1000 duration-1000 p-[6px] rounded-full flex items-center justify-center text-[25px] text-white transform transition-transform  ${
              buttonClicked
                ? "animate-ping"
                : "hover:scale-110 hover:rotate-12  border-white border-[2px] bg-blue-800"
            } animate-bounce hover:animate-none duration-1000 hover:duration-1000 w-[75px] h-[75px] sm:w-[40px] sm:h-[40px] `}
            to="/gunaso"
          >
            <img
              className="w-[45px] h-[65px] rounded-[20%]  sm:w-[20px] sm:h-[30px]  "
              src={logo}
              alt=""
            />
          </NavLink>

          {showText && (
            <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-blue-800 text-white text-[15px] sm:text-sm px-2 py-1 rounded w-[120px]  z-[100] animate-in fade-in-10 duration-1000 sm:text-[69%] sm:w-[100px] sm:h-[25px] ">
              तपाईको गुनासो..?
            </span>
          )}
        </nav>
      </div>
    </Container>
  );
};

export default Chatbot;
