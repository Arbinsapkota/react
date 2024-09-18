import React from 'react'
import Form from '../../shared/Form'
import GmsTola from '../../components/homeComponents/GmsTola'
import GoToTop from '../../Scroll/GoToTop'
import { Container } from '../../components/Container'
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const ContactUs = () => {
  return (
    <Container >
    <div className='pt-[20px]'>
      <GoToTop />
      <GmsTola />
      <div className='grid grid-cols-2 md:grid-cols-1'>
        <div>
      <Form title="Contact Us" />
      </div>
        <div className=' w-full h-full pt-[10px] md:px-[10px]'>
  
        <iframe title='map'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1313475334573!2d85.32463037298716!3d27.713230576179186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190ee9a96a93%3A0x558e3c6364177ec7!2sGold%20And%20Silver%20Dealears%20Association!5e0!3m2!1sen!2snp!4v1726317229451!5m2!1sen!2snp"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="  w-full h-[505px] md:w-full pr-[10px] md:pr-[0px] rounded-[3%]"
          />
        </div>
      </div>

      <div className="md:pt-[20px] mb-[20px] font-poppins ">
      
            <div className=' pt-[10px]'>
              <h2 className="font-bold text-center text-[#754c28] underline text-[30px] ">Contact Information</h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-1 gap-x-[20px] px-[50px] md:px-[20px] gap-y-[10px] '>
             <div className='py-[10px] px-[30px] text-white bg-[#b57741] rounded-[20px]'>
            <p className="flex items-center gap-x-[5px] hover:text-[18px] hover:duration-1000 duration-1000 w-full cursor-pointer">
              <FaMapMarkerAlt /> Block No-17, Kathmandu{" "}
            </p>

            <p className="flex items-center gap-x-[5px]  hover:text-[18px] hover:duration-1000 duration-1000 w-full cursor-pointer">
             
              <IoIosMail />
              kagosida@gmail.com
            </p>

            <p className="flex items-center gap-x-[5px]  hover:text-[18px] hover:duration-1000 duration-1000 w-full cursor-pointer">
              {" "}
              <IoIosMail /> infokagodsida@gmail.com
            </p>
            </div>

            <div className='py-[10px] px-[30px] text-white bg-[#b57741]  rounded-[20px]'>
            <p className="flex items-center gap-x-[5px]  hover:text-[18px] hover:duration-1000 duration-1000 w-full cursor-pointer">
              <FaPhoneAlt />
              5369730, 5319293
            </p>

            <div>
              <p className="underline">Follow Us On:</p>
              <div className="flex items-center gap-x-[12px] mt-[-6px]">
                <p className="border-[7px] border-[#381b69] rounded-[50%] cursor-pointer hover:translate-y-[-5px]">
                  {" "}
                  <FaFacebook className="text-[17px] text-white cursor-pointer bg-[#381b69]" />
                </p>
                <p className="border-[7px] border-[#f71180] rounded-[50%] cursor-pointer hover:translate-y-[-5px]">
                  {" "}
                  <FaInstagram className="text-[17px] text-white bg-[#f71180] " />
                </p>
              </div>
              </div>
              </div>
            </div>
          </div>
    </div>
    </Container>
  )
}

export default ContactUs