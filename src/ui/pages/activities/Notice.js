import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import GmsTola from "../../../components/homeComponents/GmsTola";
import { Container } from "../../../components/Container";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Notice = () => {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Perform the data fetching operation
    axios
      .get(`${apiUrl}/api/v1/getnotice`)
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

  // Function to handle click on "View All" button
  const handleViewAll = () => {
    setShowAll(true); // Set showAll to true to display all Notice
  };

  const handleCloseAll = () => {
    setShowAll(false); // Set showAll to false to display all Notice
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  return (
    <Container>
      <GmsTola />
      <div className="bg-[#343694] py-[20px] px-[10px] mx-[10px] mb-[20px] font-poppins">
        <h1 className="text-center text-white underline mb-[25px]">Notices</h1>
        <div className="pb-[30px]">
          <div className="grid gap-4 grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {data.map((notice, index) => {
              const { date } = formatDateTime(notice.date);
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
                      src={notice.imageUrl}
                      alt="gallery-photo"
                    />
                    <div className="text-white text-center mt-[10px] gap-0">
                      <p>{date}</p>
                      <p className="mt-[-13px] text-center">
                        {notice.description.length > 60
                          ? `${notice.description.slice(0, 60)}...`
                          : notice.description}
                      </p>

                      <nav className="mt-[-15px]">
                        <NavLink to={`/notice/readMoreNotice/${notice.id}`}>
                          <button className="text-white no-underline">
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

        {/* Button for showing all or closing */}
        <div className="flex justify-center">
          {!showAll ? (
            <button
              onClick={handleViewAll}
              className="bg-orange-900 text-[20px] font-semibold text-white py-[5px] px-[20px] rounded-[10px] hover:bg-orange-700 duration-1000 hover:duration-1000"
            >
              View all Notice
            </button>
          ) : (
            <button
              onClick={handleCloseAll}
              className="bg-orange-900 text-[20px] font-semibold text-white py-[5px] px-[20px] rounded-[10px] hover:bg-orange-700 duration-1000 hover:duration-1000"
            >
              Close Notice
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Notice;
