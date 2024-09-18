import React, { useEffect, useState } from "react";
import axios from "axios";
import GmsTola from "../../../components/homeComponents/GmsTola";

import GoToTop from "../../../Scroll/GoToTop";
import ScrollTop from "../../../Scroll/ScrollTop";
import { Container } from "../../../components/Container";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const History = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/getratehistory`);
        const historyData = response.data.history || [];

        // Process data and group by date
        const dateMap = new Map();

        historyData.forEach((item) => {
          const formattedDate = new Date(item.changeDate)
            .toISOString()
            .split("T")[0];
          if (!dateMap.has(formattedDate)) {
            dateMap.set(formattedDate, {
              date: formattedDate,
              carat22: "",
              carat24: "",
              silver: "",
            });
          }

          const entry = dateMap.get(formattedDate);

          if (item.caretType === "TYPE22K") {
            entry.carat22 = item.sellingPer10g;
          } else if (item.caretType === "TYPE24K") {
            entry.carat24 = item.sellingPer10g;
          } else if (item.metalType === "SILVER") {
            entry.silver = item.sellingPer10g;
          }

          dateMap.set(formattedDate, entry);
        });

        const processedData = Array.from(dateMap.values()).map(
          (item, index) => ({
            sn: index + 1,
            carat22: item.carat22,
            carat24: item.carat24,
            silver: item.silver,
            date: item.date,
          })
        );

        setData(processedData);
        setFilteredData(processedData); // Initialize filtered data
      } catch (error) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]); 

  useEffect(() => {
    if (startDate && endDate) {
      setFilteredData(
        data.filter((item) => item.date >= startDate && item.date <= endDate)
      );
    } else {
      setFilteredData(data);
    }
  }, [startDate, endDate, data]);

  return (
    <Container>
    <div className="font-poppins">
      <ScrollTop />
      <GmsTola />
      <GoToTop />
      <h1 className="px-4 py-2 border-b-2 border-gray-300">History</h1>

      {error && <div className="text-red-500 text-center py-2">{error}</div>}

      <div className="px-4 py-2">
        <div className="flex gap-4">
          <div>
            <label className="pr-[5px]" htmlFor="">
              From{" "}
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded px-4 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
          </div>
          <div>
            <label className="pr-[5px]" htmlFor="">
              To:
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded px-4 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mx-4 my-4">
        <table className="min-w-full bg-white border-black border-2">
          <thead className="bg-[#150b65] text-white border-white border-2">
            <tr>
              <th
                rowSpan={2}
                className="px-6 py-2 text-left font-medium uppercase tracking-wider border-r-2 border-white"
              >
                SN
              </th>
              <th
                colSpan={2}
                className="py-2 font-medium uppercase tracking-wider text-center border-white border-2"
              >
                Gold
              </th>
              <th
                rowSpan={2}
                className="px-6 py-2 text-left font-medium uppercase tracking-wider border-white border-2"
              >
                Silver
              </th>
              <th
                rowSpan={2}
                className="px-6 py-2 text-left font-medium uppercase tracking-wider border-white border-2"
              >
                Date
              </th>
            </tr>
            <tr>
              <th className="text-center border-white border-2">22 Carat</th>
              <th className="text-center border-white border-2">24 Carat</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.sn}>
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-black border-2">
                  {item.sn}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-black border-2">
                  {item.carat22 || "-"}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-black border-2">
                  {item.carat24 || "-"}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-black border-2">
                  {item.silver || "-"}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-black border-2">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Container>
  );
};

export default History;
