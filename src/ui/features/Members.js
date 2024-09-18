import React, { useEffect, useState } from "react";
import GmsTola from "../../components/homeComponents/GmsTola";

import GoToTop from "../../Scroll/GoToTop";
import axios from "axios";
import { Container } from "../../components/Container";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
const Members = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/getMember`)
      .then((res) => {
        setData(res.data.data);
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
    <div className="font-poppins">
      <GmsTola />
      <GoToTop />
      <h1 className=" px-[10px] pt-[10px] border-b-[2px]">Members</h1>

      <div className="overflow-x-auto font-poppins mx-[10px] ">
        <table className="min-w-full divide-y divide-gray-200 bg-white border-2 border-[#150b65] mb-[10px]">
          <thead className="bg-[#150b65] font-semibold font-poppins">
            <tr>
              <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                SN
              </th>

              <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((member, index) => {
              const { date } = formatDateTime(member.date);
              return (
                <tr key={member.sn}>
                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap text-sm text-black">
                    {member.name}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-black">
                    {member.position}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-black">
                    {date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </Container>
  );
};

export default Members;
