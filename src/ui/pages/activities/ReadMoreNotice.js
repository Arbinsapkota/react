import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access URL parameters
import GmsTola from "../../../components/homeComponents/GmsTola";
import axios from "axios";
import GoToTop from "../../../Scroll/GoToTop";
import { Container } from "../../../components/Container";


const apiUrl = process.env.REACT_APP_BACKEND_URL;
 
const ReadMoreNotice = () => {
  const { id } = useParams(); // Get the notice ID from URL params
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    console.log("Fetching data for ID:", id); // Debug log for ID
    axios
      .get(`${apiUrl}/api/v1/getnews/${id}`)
      .then((res) => {

        if (res.data && res.data.data) {
          setNotice(res.data.data);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, [id]); // Dependency array ensures useEffect runs when `id` changes

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [notice]); 
  return (
    <Container>
      <GmsTola />
      <div className="px-[10px] my-[20px] font-poppins">
        <h1 className="border-b-[1px]">Notice</h1>
        {notice ? (
          <ul key={notice.id} className="list-disc my-[20px]">
            <p> Date: {formatDateTime(notice.date).date}</p>
            <img
              className="mx-auto my-[20px] md:w-auto md:h-auto h-[300px]"
              src={notice.imageUrl}
              alt="NoticeImage"
            />
            <p className="mx-auto">{notice.description}</p>
           
          </ul>
        ) : (
          <p>Loading...</p>
          // Show loading text while fetching data
        )}
      </div>
      <GoToTop />
    </Container>
  );
};

export default ReadMoreNotice;
