// import React from 'react'
// import WeeklyChart from '../../../components/homeComponents/WeeklyChart'
// import GmsTola from '../../../components/homeComponents/GmsTola'
// import GoToTop from '../../../Scroll/GoToTop'
// import ScrollTop from '../../../Scroll/ScrollTop'
// import { Container } from '../../../components/Container'

// const Graph = () => {
//   return (
//     <Container>
//     <div className='my-[20px]'>
//       <ScrollTop />
//       <GmsTola />
//       <div className='mt-[20px]'>
//       <WeeklyChart />
//       </div>
//      <GoToTop />
//     </div>
//     </Container>
//   )
// }

// export default Graph

import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import GmsTola from "../../../components/homeComponents/GmsTola";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Graph = () => {
  const [gold22kData, setGold22kData] = useState([]);
  const [gold24kData, setGold24kData] = useState([]);
  const [silverData, setSilverData] = useState([]);
  const [error, setError] = useState(null);

  const [fromDate, setFromDate] = useState(""); // From date filter
  const [toDate, setToDate] = useState(""); // To date filter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/getratehistory`);
        const historyData = response.data.history || [];

        // Format and map data for charts
        const formatData = (data, type) =>
          data
            .filter(
              (item) => item.caretType === type || item.metalType === type
            )
            .map((item) => ({
              date: new Date(item.changeDate),
              value: item.sellingPer10g,
            }));

        setGold22kData(formatData(historyData, "TYPE22K"));
        setGold24kData(formatData(historyData, "TYPE24K"));
        setSilverData(formatData(historyData, "SILVER"));
      } catch (error) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const filterDataByDate = (data) => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;
      return true;
    });
  };

  const generateChartData = (gold24k, gold22k, silver) => {
    const allData = [...gold24k, ...gold22k, ...silver];
    const categories = [
      ...new Set(allData.map((item) => dayjs(item.date).format("YYYY-MM-DD"))),
    ].sort();

    const getDataSeries = (data) =>
      categories.map((date) => ({
        x: date,
        y:
          data.find((d) => dayjs(d.date).format("YYYY-MM-DD") === date)
            ?.value || 0,
      }));

    return {
      categories,
      gold24kSeries: getDataSeries(gold24k),
      gold22kSeries: getDataSeries(gold22k),
      silverSeries: getDataSeries(silver),
    };
  };

  const [chart1Options, setChart1Options] = useState({
    chart: {
      id: "chart1",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      type: "category",
      title: {
        text: "Date",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      categories: [],
      labels: {
        formatter: (value) => dayjs(value).format("MMM DD, YYYY"),
      },
    },
    yaxis: {
      title: {
        text: "Value (Selling Per 10g)",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    title: {
      text: "22 Carat vs 24 Carat",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 5,
    },
    grid: {
      borderColor: "#2A2511",
    },
  });

  const [chart2Options, setChart2Options] = useState({
    chart: {
      id: "chart2",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      type: "category",
      title: {
        text: "Date",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      categories: [],
      labels: {
        formatter: (value) => dayjs(value).format("MMM DD, YYYY"),
      },
    },
    yaxis: {
      title: {
        text: "Value (Selling Per 10g)",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    title: {
      text: "Silver",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 5,
    },
    grid: {
      borderColor: "#2A2511",
    },
  });

  const [chart1Series, setChart1Series] = useState([]);
  const [chart2Series, setChart2Series] = useState([]);

  useEffect(() => {
    if (gold22kData.length && gold24kData.length && silverData.length) {
      const filteredGold24k = filterDataByDate(gold24kData);
      const filteredGold22k = filterDataByDate(gold22kData);
      const filteredSilver = filterDataByDate(silverData);

      const { categories, gold24kSeries, gold22kSeries, silverSeries } =
        generateChartData(filteredGold24k, filteredGold22k, filteredSilver);

      setChart1Options((prev) => ({
        ...prev,
        xaxis: {
          ...prev.xaxis,
          categories,
        },
      }));

      setChart2Options((prev) => ({
        ...prev,
        xaxis: {
          ...prev.xaxis,
          categories,
        },
      }));

      setChart1Series([
        {
          name: "24 Carat",
          data: gold24kSeries,
        },
        {
          name: "22 Carat",
          data: gold22kSeries,
        },
      ]);

      setChart2Series([
        {
          name: "Silver",
          data: silverSeries,
        },
      ]);
    }
  }, [gold22kData, gold24kData, silverData, fromDate, toDate]);

  return (
    <>
      <div>
        <GmsTola />
      </div>
      <div className="md:mb-[150px] font-poppins">
        <h4 className="font-semibold text-center mb-[10px]">Weekly Chart</h4>

        {/* Date filters */}
        <div className="flex justify-center mb-4 gap-x-[30px] md:gap-x-[4px]">
          <div className="flex items-center gap-x-[5px] sm:grid">
            <h5>From:-</h5>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="mr-2 p-2 border rounded"
            />
          </div>
          <div className="flex items-center gap-x-[5px] sm:grid">
            <h5>To:-</h5>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>

        <div className="h-[350px] md:h-[600px] px-[10px] grid grid-cols-2 gap-[20px] md:grid-cols-1">
          {/* ----- Chart 1 */}
          <div className="col-4 mixed-chart w-auto">
            <Chart
              options={chart1Options}
              series={chart1Series}
              type="line"
              height="340"
            />
          </div>
          {/* ----- Chart 2 */}
          <div>
            <Chart
              options={chart2Options}
              series={chart2Series}
              type="line"
              height="340"
            />
          </div>
        </div>

        {/* Error Handling */}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </>
  );
};

export default Graph;
