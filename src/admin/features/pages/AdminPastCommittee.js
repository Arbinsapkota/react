import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const AdminPastCommittee = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    position: "",
    date: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const rowsPerPage = 10;
  const token = localStorage.getItem("token");

  // Fetch members data
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/getpostcommittee`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMembers(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
        toast.error("Error fetching members");
      });
  }, [token]);

  // Pagination
  const indexOfLastMember = currentPage * rowsPerPage;
  const indexOfFirstMember = indexOfLastMember - rowsPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(members.length / rowsPerPage);

  // Form data handlers
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      setSelectedPhoto(URL.createObjectURL(files[0]));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.date || isNaN(new Date(formData.date).getTime()))
      newErrors.date = "Valid date is required";
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
        ? `${apiUrl}/api/v1/updatepostcommittee/${editingMember}`
        : `${apiUrl}/api/v1/uploadpostcommittee`;
      const method = editingMember ? "put" : "post";

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (editingMember) {
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === editingMember ? response.data.data : member
          )
        );
        toast.success("Member updated successfully");
      } else {
        setMembers((prevMembers) => [...prevMembers, response.data.data]);
        toast.success("Member added successfully");
      }

      setFormData({ image: null, name: "", position: "", date: "" });
      setSelectedPhoto(null);
      setEditingMember(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  const handleCancel = () => {
    setFormData({ image: null, name: "", position: "", date: "" });
    setErrors({});
    setEditingMember(null);
    setShowForm(false);
    setSelectedPhoto(null);
  };

  const handleEdit = (id) => {
    const member = members.find((member) => member.id === id);
    if (member) {
      setEditingMember(id);
      setFormData({
        name: member.name,
        position: member.position,
        date: new Date(member.date).toISOString().split("T")[0],
        image: member.imageUrl,
      });
      setSelectedPhoto(member.imageUrl);
      setErrors({});
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/deletepostcommittee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
      toast.success("Member deleted successfully");
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Error deleting member");
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  return (
    <div className="pt-[80px] px-[10px] font-poppins">
      <ToastContainer />
      <div className="mb-4">
        <h3 className="text-[#754C28] underline font-bold  font-poppins">Past Committee</h3>
        <div className="w-full flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Member
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
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">Photo</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:font-semibold file:bg-gray-100 file:text-blue-700 hover:file:bg-gray-200"
              />
              <div className="mt-2">
                {selectedPhoto && (
                  <img
                    src={selectedPhoto}
                    alt="Selected"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                )}
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">Name</label>
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
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.position ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.position && (
                <p className="text-red-500 text-sm">{errors.position}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
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

      <div>
        <table className="w-full table-auto border-collapse border border-[#2e0fe0]">
          <thead>
            <tr className="bg-blue-400 border-b text-[#754C28]">
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="px-4 py-2">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{member.name}</td>
                <td className="px-4 py-2">{member.position}</td>
                <td className="px-4 py-2">
                  {formatDateTime(member.date).date}
                </td>
                <td className="px-4 pt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(member.id)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          <div className="flex-1 text-center text-gray-700 mt-[3px]">
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

export default AdminPastCommittee;
