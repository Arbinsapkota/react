import React, { useEffect, useState } from "react";
import GmsTola from "../../../components/homeComponents/GmsTola";

import ScrollTop from "../../../Scroll/ScrollTop";
import GoToTop from "../../../Scroll/GoToTop";

import axios from "axios";
import { Container } from "../../../components/Container";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
const PastCommittee = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/getpostcommittee`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  return (
    <Container>
      <div className="font-poppins ">
        <ScrollTop />
        <GmsTola />
        <div className="mx-[10px]">
          <div className=" border-b-[1px] border-blue-gray-200 mt-[10px] mb-[40px] ">
            <h1 className="text-[35px] md:text-[25px] ">Past Committee</h1>
          </div>

          <div>
            {/* --------Past Committee members---- */}

            {/* ----for the desk top view---- */}
            <div className="sm:hidden block">
              <div className="grid grid-cols-5 md:grid-cols-3   mb-[50px]">
                {data.map((member) => {
                  const { date } = formatDateTime(member.date);
                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-center relative "
                    >
                      <div className="py-[10px]">
                        <img
                          className=" h-[150px] w-[150px] bg-red bottom-0"
                          src={member.imageUrl}
                          alt={member.name}
                        />

                        <div className="font-medium  text-center">
                          <p className="mb-[-4px]">{date}</p>
                          <p className="mb-[-4px]">{member.name}</p>
                          <p className="mb-[-4px]">{member.position}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---- for the mobile view---- */}
            <div className="sm:block hidden">
              <div className="grid grid-cols-5 md:grid-cols-2  mb-[50px]">
                {data.map((member) => {
                  const { date } = formatDateTime(member.date);
                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-center relative "
                    >
                      <div className="py-[10px]">
                        <img
                          className=" h-[150px] w-[150px] bg-red bottom-0"
                          src={member.imageUrl}
                          alt={member.name}
                        />

                        <div className="font-medium  text-center">
                          <p className="mb-[-4px]">{date}</p>
                          <p className="mb-[-4px]">{member.name}</p>
                          <p className="mb-[-4px]">{member.position}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <GoToTop />
      </div>
    </Container>
  );
};

export default PastCommittee;
