import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const RecentNews = () => {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);

 
  useEffect(() => {
    // Perform the data fetching operation
    axios
      .get(`${apiUrl}/api/v1/getnews`)
      .then((response) => {
        const fetchedData = response.data.data || [];

        // Sort the data in descending order based on date
        const sortedData = fetchedData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(sortedData); // Update the state with sorted data
    
      })
      .catch((err) => {
        // Handle errors
        console.log(err); // For debugging purposes
      });

  }, []);

  // Function to handle click on "View All" button
  const handleViewAll = () => {
    setShowAll(true); // Set showAll to true to display all News
  };
  const handleCloseAll = () => {
    setShowAll(false); // Set showAll to false to display all News
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  
  return (
    <>
      <div className="bg-[#343694] py-[20px] px-[10px] mx-[10px] mb-[20px] font-poppins">
        <h1 className="text-center text-white underline mb-[25px]">
          Recent News
        </h1>
        <div className="pb-[30px]">
          <div className="grid gap-4 grid-cols-4 md:grid-cols-2 sm:grid-cols-1 ">
            {data.map((news, index) => {
              const { date } = formatDateTime(news.date);
              return (
                <div
                  style={{
                    display: showAll ? "block" : index < 4 ? "block" : "none",
                  }}
                  key={index}
                >
                  <div>
                    <img
                      className="h-40 w-full max-w-full rounded-[5px] object-cover object-center"
                      src={news.imageUrl}
                      alt="gallery-photo"
                    />
                    <div className="text-white text-center mt-[10px] gap-0">
                      <p>{date}</p>
                      <p className="mt-[-13px] text-center ">{news.description.length > 80 ? `${news.description.slice(0, 80)}` : news.description}</p>

                      <nav className=" mt-[-15px]">
                        <NavLink to={`/news/readMoreNews/${news.id}`}>
                          <button className="text-white no-underline ">
                            . . . read more
                          </button>
                        </NavLink>
                      </nav>
                    </div>
                  </div>
                </div> 
              );
            })}
          </div>
        </div>

        {/* button for the images */}
        <div className="flex justify-center">
          {!showAll ? (
            <button
              onClick={handleViewAll}
              className="bg-orange-900 text-[20px] font-semibold text-white py-[5px] px-[20px] rounded-[10px] hover:bg-orange-700 duration-1000 hover:duration-1000"
            >
              View all News
            </button>
          ) : (
            <button
              onClick={handleCloseAll}
              className="bg-orange-900 text-[20px] font-semibold text-white py-[5px] px-[20px] rounded-[10px] hover:bg-orange-700 duration-1000 hover:duration-1000 "
            >
              Close News
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentNews;
