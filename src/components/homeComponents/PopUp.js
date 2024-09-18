import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const PopUp = () => {
  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  // Open the modal if it hasn't been shown yet and there's data
  useEffect(() => {
    const popupShown = sessionStorage.getItem("popupShown");

    // Fetch popup data
    axios
      .get(`${apiUrl}/api/v1/getpopupnotice`)
      .then((res) => {
        // Filter and sort data
        const filteredData = res.data.data
          .filter((item) => item.category === "Published") // Filter by category
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt
        setData(filteredData);

        // Open modal only if data is present and it hasn't been shown yet
        if (!popupShown && filteredData.length > 0) {
          setIsOpen(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching notices:", err); // Log the error properly
      });
  }, []);

  // Close the modal and set sessionStorage flag
  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("popupShown", "true"); // Set the flag in sessionStorage
  };

  return (
    <>
      {/* Modal Overlay */}
      {isOpen && data.length > 0 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 px-[20px]">
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-[50%] sm:w-[70%] overflow-y-auto max-h-[500px] sm:max-h-[400px] font-poppins">
            <div className="absolute top-[5px] right-[35px]">
              <button className="fixed p-4px bg-[#513418] text-white rounded-[50%]" onClick={closeModal}>
                <IoClose className="text-[25px]" />
              </button>
            </div>
            {data.map((popup) => (
              <div key={popup._id} >
                <img className="mx-auto" src={popup.imageUrl} alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
