import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const EditMembers = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phoneNumber: "",
    panNumber: "",
  });
  const [errors, setErrors] = useState({});
  const rowsPerPage = 10;

  const token = localStorage.getItem("token");

  // Fetch members data
  const fetchMembers = () => {
    axios
      .get(`${apiUrl}/api/v1/getMember`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMembers(res.data.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMembers();
  }, [token]);

  // Pagination
  const indexOfLastMember = currentPage * rowsPerPage;
  const indexOfFirstMember = indexOfLastMember - rowsPerPage;
  const currentMembers = Array.isArray(members)
    ? members.slice(indexOfFirstMember, indexOfLastMember)
    : []; // Default to empty array if members is not an array
  const totalPages = Array.isArray(members)
    ? Math.ceil(members.length / rowsPerPage)
    : 0;

  // Form data handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.panNumber) newErrors.panNumber = "Pan Number is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } 

    return newErrors;
  };

  const handleAdd = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const url = editingMember
        ? `${apiUrl}/api/v1/updateMember/${editingMember}`
        : `${apiUrl}/api/v1/uploadMember`;
      const method = editingMember ? "put" : "post";

      await axios({
        method,
        url,
        data: formData, // Send data as JSON
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set content type to JSON
        },
      });

      fetchMembers(); // Fetch updated data after submit

      setFormData({ name: "", location: "", panNumber: "", phoneNumber: "" });
      setEditingMember(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // toast.error(`Failed to ${editingMember ? "update" : "add"} member.`);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", location: "", panNumber: "", phoneNumber: "" });
    setErrors({});
    setEditingMember(null);
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const member = members.find((member) => member?.id === id);
    if (member) {
      setEditingMember(id);
      setFormData({
        ...member,
        date: new Date(member.date).toISOString().split("T")[0],
      });
      setErrors({});
      setShowForm(true);
    } else {
      // toast.error("Member not found.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/deleteMember/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMembers(); // Fetch updated data after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
      // toast.error("Failed to delete member.");
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="pt-[80px] px-[10px] font-poppins">
      {/* <ToastContainer /> */}
      <div className="mb-4">
        <h3 className="text-[#754C28] underline font-poppins font-bold">
          Members List
        </h3>
        <div className="w-full flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
          >
            <FaPlus className="mr-2 " /> Add Member
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2  text-[#754C28] font-poppins">
            {editingMember ? "Edit Member" : "Add Member"}
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">
                Shop Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">
                Pan Number
              </label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.panNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.panNumber && (
                <p className="text-red-500 text-sm">{errors.panNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleAdd}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {editingMember ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="w-full table-auto border-collapse border border-[#2e0fe0]">
        <thead>
          <tr className="bg-blue-400 border-b text-[#754C28]">
            <th className="px-4 py-2">SN</th>
            <th className="px-4 py-2">Shop Name</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Pan Number</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member, index) => {
            return (
              <tr key={member?.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{member?.name}</td>
                <td className="px-4 py-2">{member?.location}</td>
                <td className="px-4 py-2">{member?.panNumber}</td>
                <td className="px-4 py-2">{member?.phoneNumber}</td>
                <td className="justify-center pt-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(member?.id)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(member?.id)}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex items-center">
        <div className="mr-auto text-gray-700">
          Showing {currentMembers.length}{" "}
          {currentMembers.length === 1 ? "entity" : "entities"}
        </div>

        <div className="ml-auto flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded flex items-center"
          >
            <FaChevronLeft className="mr-2" />
          </button>
          <div className="flex-1 text-center text-gray-700 mt-[10px]">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded flex items-center"
          >
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMembers;
