import React from "react";
import GmsTola from "../../components/homeComponents/GmsTola";
import CarouselHome from "../../components/homeComponents/CarouselHome";
import WeeklyChart from "../../components/homeComponents/WeeklyChart";
import Gallery from "../../shared/Gallery";
import RecentNews from "../../shared/RecentNews";
import ScrollTop from "../../Scroll/ScrollTop";
import GoToTop from "../../Scroll/GoToTop";
import NoticeSlide from "../../components/homeComponents/NoticeSlide";
import PopUp from "../../components/homeComponents/PopUp";
import { Container } from "../../components/Container";
const Home = () => {
  return (
    <Container>
      <div>
        <ScrollTop />
        <PopUp />
        <GmsTola />
        <NoticeSlide />
        <CarouselHome />
        <WeeklyChart />
        <RecentNews />
        <Gallery />
        <GoToTop />
      </div>
    </Container>
  );
};

export default Home;
