import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
const RecentNews = () => {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/getgallery`)
      .then((response) => {
        const fetchedData = response.data.data || [];

        // Sort the data in descending order based on date
        const sortedData = fetchedData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setData(sortedData); // Update the state with sorted data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to handle click on "View All" button
  const handleViewAll = () => {
    setShowAll(true); // Set showAll to true to display all images
  };
  const handleCloseAll = () => {
    setShowAll(false); // Set showAll to false to display all images
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  return (
    <>
      <div className="bg-[#343694] py-[20px] px-[10px] mx-[10px] mb-[20px] font-poppins my-[10px]">
        <h1 className="text-center text-white underline mb-[25px]"> Gallery</h1>
        <div className="grid gap-4 grid-cols-4 md:grid-cols-2 sm:grid-cols-1 ">
          {data.map((gallery, index) => {
            const { date } = formatDateTime(gallery.date);
            return (
              <div
                style={{
                  display: showAll ? "block" : index < 8 ? "block" : "none",
                }}
                key={index}
              >
                <div>
                  <img
                    className="h-40 w-full max-w-full rounded-[5px] object-cover object-center"
                    src={gallery.imageUrl}
                    alt="gallery-photo"
                  />
                  <div className="text-white text-center mt-[10px] gap-0">
                    <p>{date}</p>
                    <p className="mt-[-13px]">{gallery.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* button for the images */}
        <div className="flex justify-center">
          {!showAll ? (
            <button
              onClick={handleViewAll}
              className="bg-orange-900 text-[20px] font-semibold text-white py-[5px] px-[20px] rounded-[10px] hover:bg-orange-700 duration-1000 hover:duration-1000"
            >
              View all Gallery
            </button>
          ) : (
            <button
              onClick={handleCloseAll}
              className="bg-orange-900 text-[20px] font-semibold text-white py-[5px] px-[20px] rounded-[10px] hover:bg-orange-700 duration-1000 hover:duration-1000 "
            >
              Close Gallery
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentNews;
