import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const NoticeSlide = () => {
  const [notices, setNotices] = useState([]);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/getnotice`)
      .then((res) => {
        setNotices(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching notices:", err);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [notices.length]);

  const truncateText = (text, isDesktop) => {
    const limit = isDesktop ? 15 : 80;
    return text.length > limit ? text.slice(0, limit) + "....." : text;
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  return (
    <div className="px-[10px] font-poppins ">
      <div className="w-auto h-[35px] sm:h-[25px] bg-orange-900 text-white flex">
        <div>
          <div className="w-[150px] bg-blue-800  sm:h-[25px] sm:w-[80px] sm:text-[10px] sm:flex sm:item-center">
            <div className="h-[35px] relative before:absolute before:w-[16%] sm:before:w-[30%] before:h-[72%] sm:before:h-[50%] before:top-[18px] sm:before:top-[12px] before:right-[-18px] sm:before:right-[-40px] before:bg-blue-800 before:origin-top-right before:rotate-45 z-10">
              <p className="pl-[5px] pt-[5px] font-semibold sm:text-[10px] sm:pt-[8px]">
                Notices:-
              </p>
            </div>
          </div>
        </div>

        <div className="pl-[30px] sm:pl-[26px] pt-[5px]  sm:text-[10px] sm:pt-[4px]">
          <TransitionGroup>
            {notices.length > 0 &&
              notices.map((notice, index) => {
                const { date } = formatDateTime(notice.date);
                return (
                  index === currentNoticeIndex && (
                    <CSSTransition key={index} timeout={500} classNames="fade">
                      <div>
                        {/* Mobile View */}
                        <div
                          className={`motion-safe:animate-fadeUp md:hidden flex `}
                        >
                          <p>
                            {date} <span className="px-[4px]">||</span>
                          </p>
                          <p>{truncateText(notice.description, false)}</p>
                          <nav>
                            <NavLink
                              to={`/notice/readMoreNotice/${notice.id}`}
                              className="text-white no-underline"
                            >
                              . . .read more
                            </NavLink>
                          </nav>
                        </div>

                        {/* Desktop View */}
                        <div
                          className={`motion-safe:animate-fadeUp md:flex hidden`}
                        >
                          <p>
                            {date} <span className="px-[5px]">||</span>
                          </p>
                          <p>{truncateText(notice.description, true)}</p>
                          <nav>
                            <NavLink
                              to={`/notice/readMoreNotice/${notice.id}`}
                              className="text-white no-underline"
                            >
                              Read more
                            </NavLink>
                          </nav>
                        </div>
                      </div>
                    </CSSTransition>
                  )
                );
              })}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default NoticeSlide;
