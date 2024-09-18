import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa6";
import { Container } from '../components/Container';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToUp = () => { 
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  const listenToScroll = () => {
    let heightToHidden = 250;

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll)
  }, []);

  return (
    <Container>
      {isVisible && (
        <div className=" flex justify-end 
       fixed bottom-[40px] right-[30px] z-[9999px] text-white" onClick={goToUp}>
          <button className="bg-[#dc7f32] h-auto w-auto p-[5px] rounded-full flex items-center justify-center text-[25px]"><FaArrowUp /></button>

        </div>
      )}
    </Container>

  )
}
export default GoToTop