import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Container } from "../components/Container";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Footer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Perform the data fetching operation
    axios
      .get(`${apiUrl}/api/v1/getnews`)
      .then((response) => {
        const fetchedData = response.data.data || [];

        // Sort the data in descending order based on date
        const sortedData = fetchedData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setData(sortedData); // Update the state with sorted data
      })
      .catch((err) => {
        // Handle errors
        console.log(err); // For debugging purposes
      });
  }, []);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  return (
    <>
      <Container>
        {/* */}
        <div className="  bg-[#754C28] grid grid-cols-4 p-[10px] gap-[2%] md:gap-0  md:grid-cols-1 h-auto md:py-[20px] font-poppins">
          <div className="py-[20px]">
            <h5 className="font-semibold text-white">Quick Links</h5>
            <nav className="grid grid-cols-1 text-white space-y-[10px] ">
              <NavLink
                to="/executive"
                className="no-underline text-white border-b-[1px] border-[#3e3d3c]  hover:text-[18px] hover:duration-1000 duration-1000"
              >
                Executive Committee{" "}
              </NavLink>
              <NavLink
                to="/history"
                className="no-underline text-white border-b-[1px] border-[#3e3d3c] hover:text-[18px] hover:duration-1000 duration-1000"
              >
                Rate History
              </NavLink>
              <NavLink
                to="/graph"
                className="no-underline text-white border-b-[1px] border-[#3e3d3c] hover:text-[18px] hover:duration-1000 duration-1000"
              >
                Rate Graph{" "}
              </NavLink>
              <NavLink
                to="/news"
                className="no-underline v text-white border-b-[1px] border-[#3e3d3c] hover:text-[18px] hover:duration-1000 duration-1000"
              >
                Latest News{" "}
              </NavLink>
              <NavLink
                to="/notices"
                className="no-underline text-white border-b-[1px] border-[#3e3d3c] hover:text-[18px] hover:duration-1000 duration-1000"
              >
                Notices
              </NavLink>
            </nav>
          </div>
          <div>
            <div className="py-[20px]">
              <h5 className="font-semibold text-white w-full">Weekly news</h5>
              <nav className="grid grid-cols-1 text-white space-y-[12px] ">
                {data.slice(0, 6).map((news) => {
                  const { date } = formatDateTime(news.date);
                  return (
                    <NavLink
                      key={news.id}
                      to={news.linkUrl}
                      className="no-underline text-white border-b-[1px] border-[#3e3d3c] hover:text-[18px] hover:duration-1000 duration-1000 "
                    >
                      Weekly Report {date}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="md:pb-[-10px] text-white">
            <div>
              <h5 className="font-semibold ">Contact Information</h5>
            </div>

            <p className="flex items-center gap-x-[5px] border-b-[1px] border-[#3e3d3c] hover:text-[18px] hover:duration-1000 duration-1000 w-full cursor-pointer">
              <FaMapMarkerAlt /> Block No-17, Kathmandu{" "}
            </p>

            <p className="flex items-center gap-x-[5px] border-b-[1px] border-[#3e3d3c] hover:text-[18px] hover:duration-1000 duration-1000 w-full cursor-pointer">
              {" "}
              <IoIosMail />
              kagosida@gmail.com
            </p>

            <p className="flex items-center gap-x-[5px] border-b-[1px] border-[#3e3d3c] hover:text-[18px] hover:duration-1000 duration-1000 w-full cursor-pointer">
              {" "}
              <IoIosMail /> infokagodsida@gmail.com
            </p>

            <p className="flex items-center gap-x-[5px] border-b-[1px] border-[#3e3d3c] hover:text-[18px] hover:duration-1000 duration-1000 w-full cursor-pointer">
              <FaPhoneAlt />
              5369730, 5319293
            </p>

            <div>
              <p className="underline">Follow Us On:</p>
              <div className="flex items-center gap-x-[12px] mt-[-6px]">
                <p className="border-[7px] border-[#381b69] rounded-[50%] cursor-pointer hover:translate-y-[-5px]">
                  {" "}
                  <FaFacebook className="text-[17px] text-white cursor-pointer" />
                </p>
                <p className="border-[7px] border-[#f71180] rounded-[50%] cursor-pointer hover:translate-y-[-5px]">
                  {" "}
                  <FaInstagram className="text-[17px] text-white bg-[#f71180] " />
                </p>
              </div>
            </div>
          </div>
          <div >
            <h5 className="text-white font-semibold">Map</h5>
                <iframe title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1313475334573!2d85.32463037298716!3d27.713230576179186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190ee9a96a93%3A0x558e3c6364177ec7!2sGold%20And%20Silver%20Dealears%20Association!5e0!3m2!1sen!2snp!4v1726317229451!5m2!1sen!2snp"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="  w-[250px] h-[230px] md:w-full pr-[10px] md:pr-[0px] border-none"
          />
          </div>
        </div>
        <div className="h-auto bg-[#6D4828] border-t-[1px] flex justify-center items-center pt-[10px] px-[10px] sm:pt-[10px] font-poppins">
          <p className="text-white ">
            Kathmandu Gold and Silver Dealers' Association. 2013 - 2024 © All
            Rights Reserved.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Footer;
