import React, { useEffect, useState } from "react";
import NepaliDate from "nepali-date-converter"; // Ensure this library is installed
import ScrollTop from "../../Scroll/ScrollTop";
import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
const GmsTola = () => {
  const [language, setLanguage] = useState("ne"); // Default to Nepali
  const [gold22kData, setGold22kData] = useState([]);
  const [gold24kData, setGold24kData] = useState([]);
  const [silverData, setSilverData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/getcurrentrate`);
        const goldRates = response.data.goldRates || [];
        const silverRates = response.data.silverRates || [];

        setGold24kData(
          goldRates.filter((item) => item.caretType === "TYPE24K")
        );
        setGold22kData(
          goldRates.filter((item) => item.caretType === "TYPE22K")
        );
        setSilverData(silverRates);
      } catch (error) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const convertEnglishToNepali = (englishNumber) => {
    if (typeof englishNumber !== "string") {
      console.error(
        "convertEnglishToNepali: Expected a string but got:",
        typeof englishNumber
      );
      return "";
    }

    const englishToNepali = {
      0: "०",
      1: "१",
      2: "२",
      3: "३",
      4: "४",
      5: "५",
      6: "६",
      7: "७",
      8: "८",
      9: "९",
    };

    return englishNumber
      .split("")
      .map((char) => englishToNepali[char] || char)
      .join("");
  };

  const getNepaliMonthName = (monthNumber) => {
    const monthNames = [
      "वैशाख",
      "जेठ",
      "आषाढ",
      "शृवण",
      "भाद्र",
      "आश्वयज",
      "कार्तिक",
      "मङ्सिर",
      "पुष",
      "माघ",
      "फागुन",
      "चैत",
    ];
    return monthNames[monthNumber];
  };

  const texts = {
    en: {
      complaint: "Your Complaint",
      grams: "10 grams",
      perTola: "Per Tola",
      sale: "Sale",
      purchase: "Purchase",
      carat24: "24 Carat",
      carat22: "22 Carat",
      pureSilver: "Pure Silver",

      formattedDate: () => {
        const today = new Date();
        return `${today.getDate()} ${today.toLocaleString("default", {
          month: "short",
        })} ${today.getFullYear()}`;
      },
    },
    ne: {
      complaint: "तपाइको गुनासो",
      grams: "१० ग्राम",
      perTola: "प्रति तोला",
      sale: "बिक्री",
      purchase: "खरिद",
      carat24: "२४ क्यारेट",
      carat22: "२२ क्यारेट",
      pureSilver: "असल चाँदी",

      formattedDate: () => {
        const today = new NepaliDate();
        const day = convertEnglishToNepali(today.getDate().toString());
        const month = getNepaliMonthName(today.getMonth()); // NepaliDate months are 1-based
        const year = convertEnglishToNepali(today.getYear().toString()); // Nepali years start from 1943 AD

        return `${day} ${month} ${year}`;
      },
    },
  };

  // for putting the coma in the every digits according to the needed
  const formatNumberNational = (num) => {
    // Convert number to string
    let str = num.toString();

    // Insert commas according to the South Asian numbering system
    if (str.length > 3) {
      let lastThree = str.substring(str.length - 3);
      let rest = str.substring(0, str.length - 3);
      rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
      return rest + "," + lastThree;
    } else {
      return str;
    }
  };

  return (
    <div className="px-[10px] my-[10px] font-poppins">
      <ScrollTop />
      {/* Error Handling */}
      {error && <div className="text-red-500">{error}</div>}

      {/*------ for the larger size------ */}
      <div className="md:hidden flex">
        <table className="w-full">
          <thead>
            <tr className="">
              <th colSpan={2} rowSpan={2}>
                <div className="flex pt-[3px] text-white  font-poppins  mb-[5px]">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className="text-[15px] py-[8px] w-full bg-[#343694]"
                  >
                    ENGLISH
                  </button>
                  <button
                    onClick={() => handleLanguageChange("ne")}
                    className="w-full text-[15px] py-[8px] bg-red-700 "
                  >
                    NEPALI
                  </button>
                </div>
              </th>

              <th
                colSpan={2}
                className="border-[2px] border-blue-gray-100 bg-[#343694] text-white text-center"
              >
                {texts[language].grams}
              </th>

              <th
                colSpan={2}
                className="col-span-2 border-[2px] border-blue-gray-100 bg-[#343694] text-white text-center"
              >
                {texts[language].perTola}
              </th>
            </tr>
            {/*   for the sold and buy */}
            <tr>
              <th className="font-normal text-red-700 border-[2px] border-blue-gray-100 pl-[5px]">
                {texts[language].sale}
              </th>
              <th className="font-normal border-[2px] border-blue-gray-100 text-red-700 pl-[5px]">
                {texts[language].purchase}
              </th>
              <th className="font-normal border-[2px] border-blue-gray-100 text-red-700 pl-[5px]">
                {texts[language].sale}
              </th>
              <th className="font-normal border-[2px] border-blue-gray-100 text-red-700 pl-[5px]">
                {texts[language].purchase}
              </th>
            </tr>
          </thead>

          <tbody>
            {gold24kData.map((item) => (
              <tr key={item.id}>
                <td rowSpan={5} className="text-center">
                  <div className="grid grid-cols-1 md:hidden ">
                    <div className="bg-[#e30505] text-[45px] px-[10px] h-auto text-center text-white md:text-[35px]">
                      {texts[language].formattedDate().split(" ")[0]}{" "}
                      {/* Day */}
                    </div>
                    <div className="bg-[#3504e6] text-[22px] px-[10px] h-auto text-center text-white md:text-[22px] py-[5px]">
                      {texts[language].formattedDate().split(" ")[1]}{" "}
                      {/* Month */}
                    </div>
                    <div className="bg-[#e30505] text-[20px] py-[5px] px-[10px] font-semibold text-center text-white md:text-[22px]">
                      {texts[language].formattedDate().split(" ")[2]}{" "}
                      {/* Year */}
                    </div>
                  </div>
                </td>
                <td className="border-blue-gray-100 border-[2px] text-center font-semibold bg-[#FFD700] w-[22%] text-black">
                  {texts[language].carat24}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.sellingPer10g))
                      )
                    : formatNumberNational(item.sellingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPer10g))
                      )
                    : formatNumberNational(item.buyingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPerTola))
                      )
                    : formatNumberNational(item.sellingPerTola)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPerTola))
                      )
                    : formatNumberNational(item.buyingPerTola)}
                </td>
              </tr>
            ))}
            {gold22kData.map((item) => (
              <tr key={item.id}>
                <td className="border-[2px] border-blue-gray-100 text-center font-semibold bg-[#fdf563] text-black">
                  {texts[language].carat22}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.sellingPer10g))
                      )
                    : formatNumberNational(item.sellingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPer10g))
                      )
                    : formatNumberNational(item.buyingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPerTola))
                      )
                    : formatNumberNational(item.sellingPerTola)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPerTola))
                      )
                    : formatNumberNational(item.buyingPerTola)}
                </td>
              </tr>
            ))}
            {silverData.map((item) => (
              <tr key={item.id}>
                <td className="border-[2px] border-blue-gray-100 text-center font-semibold bg-[#e5e9f7] text-black">
                  {texts[language].pureSilver}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.sellingPer10g))
                      )
                    : formatNumberNational(item.sellingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPer10g))
                      )
                    : formatNumberNational(item.buyingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPerTola))
                      )
                    : formatNumberNational(item.sellingPerTola)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPerTola))
                      )
                    : formatNumberNational(item.buyingPerTola)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*------- for the medium size------ */}
      <div className="md:flex hidden">
        <table className="w-full sm:text-[10px]">
          <thead>
            <tr className="border border-blue-gray-100">
              <th className="font-poppins sm:text-[9px]">
                <div className="grid grid-cols-2 items-center justify-center text-white font-normal  text-center">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className=" py-[4px] sm:px-[1px] w-full bg-[#343694] "
                  >
                    ENGLISH
                  </button>
                  <button
                    onClick={() => handleLanguageChange("ne")}
                    className="w-full  py-[4px] bg-red-700 "
                  >
                    NEPALI
                  </button>
                </div>
              </th>
              <th
                colSpan={2}
                className="border-[2px] border-blue-gray-100 bg-[#343694] text-white text-center"
              >
                {texts[language].grams}
              </th>
              <th
                colSpan={2}
                className="col-span-2 border-[2px] border-blue-gray-100 bg-[#343694] text-white text-center"
              >
                {texts[language].perTola}
              </th>
            </tr>
            <tr>
              <th className="grid grid-cols-3 text-white items-center text-center justify-center h-[18px]">
                <p className="bg-[#e30505]  ">
                  {texts[language].formattedDate().split(" ")[0]}
                </p>
                <p className="bg-[#3504e6]">
                  {texts[language].formattedDate().split(" ")[1]}
                </p>
                <p className="bg-[#e6d304] ">
                  {texts[language].formattedDate().split(" ")[2]}
                </p>
              </th>
              <th className="font-normal text-red-700 border-[2px] border-blue-gray-100 pl-[5px]">
                {texts[language].sale}
              </th>
              <th className="font-normal border-[2px] border-blue-gray-100 text-red-700 pl-[5px]">
                {texts[language].purchase}
              </th>
              <th className="font-normal border-[2px] border-blue-gray-100 text-red-700 pl-[5px]">
                {texts[language].sale}
              </th>
              <th className="font-normal border-[2px] border-blue-gray-100 text-red-700 pl-[5px]">
                {texts[language].purchase}
              </th>
            </tr>
          </thead>

          <tbody>
            {gold24kData.map((item) => (
              <tr key={item.id}>
                <td className="border-blue-gray-100 border-[2px] text-center font-semibold bg-[#FFD700] w-[22%]">
                  {item.metalType === "GOLD" && item.caretType === "TYPE24K"
                    ? texts[language].carat24
                    : item.caretType === "TYPE22K"
                    ? texts[language].carat22
                    : texts[language].pureSilver}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.sellingPer10g))
                      )
                    : formatNumberNational(item.sellingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPer10g))
                      )
                    : formatNumberNational(item.buyingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.sellingPerTola))
                      )
                    : formatNumberNational(item.sellingPerTola)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPerTola))
                      )
                    : formatNumberNational(item.buyingPerTola)}
                </td>
              </tr>
            ))}
            {gold22kData.map((item) => (
              <tr key={item.id}>
                <td className="border-[2px] border-blue-gray-100 text-center font-semibold bg-[#fdf563] text-black">
                  {texts[language].carat22}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.sellingPer10g))
                      )
                    : formatNumberNational(item.sellingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPer10g))
                      )
                    : formatNumberNational(item.buyingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.sellingPerTola))
                      )
                    : formatNumberNational(item.sellingPerTola)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPerTola))
                      )
                    : formatNumberNational(item.buyingPerTola)}
                </td>
              </tr>
            ))}
            {silverData.map((item) => (
              <tr key={item.id}>
                <td className="border-[2px] border-blue-gray-100 text-center font-semibold bg-[#e5e9f7] text-black">
                  {texts[language].pureSilver}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.sellingPer10g))
                      )
                    : formatNumberNational(item.sellingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPer10g))
                      )
                    : formatNumberNational(item.buyingPer10g)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.sellingPerTola))
                      )
                    : formatNumberNational(item.sellingPerTola)}
                </td>
                <td className="border-[2px] border-blue-gray-100 pl-[5px]">
                  {language === "ne"
                    ? convertEnglishToNepali(
                        formatNumberNational(String(item.buyingPerTola))
                      )
                    : formatNumberNational(item.buyingPerTola)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GmsTola;
