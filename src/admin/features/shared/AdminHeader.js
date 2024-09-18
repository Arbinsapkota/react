// import { useNavigate } from "react-router-dom";
// import Profile from "../../../assets/member/member1.png";
// import { MdExitToApp } from "react-icons/md";
// const AdminHeader = () => {
//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     if (window.confirm("Are you sure you want to log out?")) {
//       navigate("/login");
//       window.location.reload(); // Refreshes the page after navigating
//     }
//   };
//   return (
//     <div className="bg-[#754C28] text-white font font-poppins flex justify-between items-center h-auto pl-[20px] pr-[100px] shadow-md">
//       <div className="flex items-center pt-[8px] gap-[10px]">
//         <p>KAGOSIDA</p>
//       </div>

//       <div>
//         <div className="flex w-full items-center   gap-[10px] ">
//           <img
//             className="md:w-[8%] w-[8%] rounded-[50%] border-1  bg-red-500 "
//             src={Profile}
//             alt=""
//           />
//           <p className="pt-[10px]">Admin Kagosida </p>
//           <div className="relative">
//             <button onClick={handleLogOut}>
//               <MdExitToApp className="text-[23px]" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminHeader;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Profile from "../../../assets/member/member1.png";
import { MdExitToApp } from "react-icons/md";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogOut = () => {
    closeModal();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="bg-[#754C28] text-white font-poppins flex justify-between items-center h-auto pl-[20px] pr-[100px] shadow-md">
      <div className="flex items-center pt-[8px] gap-[10px]">
        <p>KAGOSIDA</p>
      </div>

      <div>
        <div className="flex w-full items-center gap-[10px]">
          <img
            className="md:w-[8%] w-[8%] rounded-[50%] border-1 bg-red-500"
            src={Profile}
            alt=""
          />
          <p className="pt-[10px]">Admin Kagosida</p>
          <div className="relative">
            <button onClick={openModal}>
              <MdExitToApp className="text-[23px]" />
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Logout"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
          content: {
            backgroundColor: "#754C28", // Matches header background
            height: "150px",
            color: "white",
            padding: "10px",
            maxWidth: "400px",
            margin: "auto",
            borderRadius: "10px",
            textAlign: "center",
          },
        }}
      >
        <h2 className="text-xl mb-[5px] font-bold">Log Out</h2>
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-between mt-[10px]">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-[10px]  rounded text-[14px] py-[4px]"
          >
            Cancel
          </button>
          <button
            onClick={handleLogOut}
            className="bg-red-600 text-white px-[10px]  rounded text-[14px] py-[4px]"
          >
            Log Out
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminHeader;
