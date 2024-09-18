import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GmsTola from "../../../components/homeComponents/GmsTola";
import axios from "axios";
import GoToTop from "../../../Scroll/GoToTop";
import { Container } from "../../../components/Container";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const ReadMoreNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    console.log("Fetching data for ID:", id);
    axios
      .get(`${apiUrl}/api/v1/getnews/${id}`)
      .then((res) => {
        if (res.data && res.data.data) {
          setNews(res.data.data);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [news]); 

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  return (
    <Container>
    <div>
      <GmsTola />
      <div className="px-[10px] my-[20px] font-poppins">
        <h1 className="border-b-[1px]">News</h1>
        {news ? (
          <ul key={news.id} className="list-disc my-[20px]">
            <p> Date: {formatDateTime(news.date).date}</p>
            <img
              className="mx-auto my-[20px] md:w-auto md:h-auto h-[300px]"
              src={news.imageUrl}
              alt="NoticeImage"
            />
            <p className="mx-auto ">{news.description}</p>
            <div className="mt-[-12px]">
              <a
                href={news.linkUrl}
                className="text-blue-500 max-w-10 overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                {news.linkUrl}
              </a>
            </div>
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <GoToTop />
    </div>
    </Container>
  );
};

export default ReadMoreNews;
