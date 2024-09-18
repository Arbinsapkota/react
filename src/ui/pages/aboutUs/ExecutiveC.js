import React, { useEffect, useState } from "react";
import GmsTola from "../../../components/homeComponents/GmsTola";
import ScrollTop from "../../../Scroll/ScrollTop";
import GoToTop from "../../../Scroll/GoToTop";
import axios from "axios";
import { Container } from "../../../components/Container";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const ExecutiveC = () => {
  const [president, setPresident] = useState([]);
  const [vicePresident, setVicePresident] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/getexecutivecommittee`
        );
        const { data } = response.data;

        // Assuming data is an array of members with a category field
        setPresident(data.filter((member) => member.category === "president"));
        setVicePresident(
          data.filter((member) => member.category === "vice-president")
        );
        setMembers(data.filter((member) => member.category === "member"));
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <Container >
    <div className="font-poppins ">
      <ScrollTop />
      <GmsTola />
      <div className="mx-[10px]">
        <div className=" border-b-[1px] border-blue-gray-200 mt-[10px] mb-[40px] ">
          <h1 className="text-[35px] md:text-[25px] ">Executive Committee</h1>
        </div>

        <div>
          {/* President Section */}
          {president.map((member) => (
            <div
              key={member.id}
              className="font-poppins   border-b-[2px] mb-[50px]"
            >
              {/* President Section */}
              <div className="flex items-center justify-center">
                <div className="py-[10px] pt-[40px]">
                  <div className="relative w-[120%] h-[100px] flex justify-center mb-[50px]">
                    {/* Background Color */}
                    <div className="h-[85px] w-[150px] bg-blue-gray-400 opacity-35 bottom-0 absolute"></div>
                    <img
                      className="absolute h-[180px] w-[140px] bg-red bottom-0"
                      src={member.imageUrl}
                      alt={member.name}
                    />
                    <div className="mt-[100px] font-medium space-y-[-17px] text-center">
                      <p>{member.name}</p>
                      <p>{member.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/*---- vice-president  -------*/}
    
          <di className="grid grid-cols-3 gap-[10px] justify-center  border-b-[2px] mb-[30px] sm:grid-cols-2">
            {vicePresident.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-center "
              >
                <div className="py-[10px]">
                  <div className="relative w-[120px] h-[100px] flex justify-center mb-[2px]">
                    {/* Background Color */}
                    <div className="h-[60px] w-[120px] bg-blue-gray-400 bottom-0 absolute"></div>
                    <img
                      className="absolute h-[120px] bg-red bottom-0"
                      src={member.imageUrl}
                      alt={member.name}
                    />
                  </div>
                  <div className="font-medium space-y-[-17px] text-center">
                    <p>{member.name}</p>
                    <p>{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </di>

          {/* --------All members-------*/}
          <div className="grid  grid-cols-5 gap-[10px] justify-center md:grid-cols-3 sm:grid-cols-2 border-b-[2px] mb-[30px] sm:hidden ">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-center "
              >
                <div className="py-[10px]">
                  <div className="relative w-[120px] h-[100px] flex justify-center mb-[2px]">
                    {/* Background Color */}
                    <div className="h-[50px] w-full bg-blue-gray-400 bottom-0 absolute"></div>
                    <img
                      className="absolute h-[120px] bg-red bottom-0"
                      src={member.imageUrl}
                      alt={member.name}
                    />
                  </div>
                  <div className="font-medium space-y-[-17px] text-center">
                    <p>{member.name}</p>
                    <p>{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          




          <div className="sm:block hidden">
          <div className="grid  gap-[10px] justify-center items-center grid-cols-2 border-b-[2px] mb-[30px]">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-center "
              >
                <div className="py-[10px]">
                  <div className="relative w-[120px] h-[100px] flex justify-center mb-[2px]">
                    {/* Background Color */}
                    <div className="h-[50px] w-full bg-blue-gray-400 bottom-0 absolute"></div>
                    <img
                      className="absolute h-[120px] bg-red bottom-0"
                      src={member.imageUrl}
                      alt={member.name}
                    />
                  </div>
                  <div className="font-medium space-y-[-17px] text-center">
                    <p>{member.name}</p>
                    <p>{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
     
    </div>
    <GoToTop />
    </Container>
  );
};

export default ExecutiveC;
