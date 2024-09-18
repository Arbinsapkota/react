import React, { useEffect, useState } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const CarouselHome = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/getbanner`)
      .then((response) => {
        setBanner(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching banner:", error);
      });
  }, []);

  return (
    <div className="m-[10px] mb-[40px]">
      <Carousel className="" interval={2000}>
        {banner.map((image, index) => (
          <CarouselItem key={index}>
            <img
              className="w-[100%] h-[500px] md:h-auto "
              src={image.imageUrl}
              alt={`Slide ${index}`}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselHome;
