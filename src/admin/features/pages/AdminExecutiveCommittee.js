
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const AdminExecutiveCommittee = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    position: "",
    date: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const rowsPerPage = 10;
  const token = localStorage.getItem("token");

  // Fetch members data
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/getexecutivecommittee`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMembers(res.data.data))
      .catch((error) => {
        console.error("Error fetching members:", error);
        toast.error("Error fetching members"); // Show toast on error
      });
  }, [token]);

  // Categorize members
  const presidents = members.filter(member => member.category === "president");
  const vicePresidents = members.filter(member => member.category === "vice-president");
  const otherMembers = members.filter(member => member.category === "member");

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
    if (!formData.category) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleAdd = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check for category constraints
    const categoryCount = members.filter(member => member.category === formData.category).length;
    if (formData.category === "president" && categoryCount > 0) {
      toast.error("Cannot add more than one president.");
      return;
    }
    if (formData.category === "vice-president" && categoryCount >= 4) {
      toast.error("Cannot add more than four vice-presidents.");
      return;
    }

    try {
      const url = editingMember
        ? `${apiUrl}/api/v1/updateexecutivecommittee/${editingMember}`
        : `${apiUrl}/api/v1/uploadexecutivecommittee`;
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
        toast.success("Member updated successfully"); // Success toast
      } else {
        setMembers((prevMembers) => [...prevMembers, response.data.data]);
        toast.success("Member added successfully"); // Success toast
      }

      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form"); // Error toast
    }
  };

  const handleCancel = () => {
    resetForm();
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
        category: member.category,
      });
      setSelectedPhoto(member.imageUrl);
      setErrors({});
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/deleteexecutivecommittee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
      toast.success("Member deleted successfully"); // Success toast
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Error deleting member"); // Error toast
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
    };
  };

  const resetForm = () => {
    setFormData({
      image: null,
      name: "",
      position: "",
      date: "",
      category: "",
    });
    setSelectedPhoto(null);
    setEditingMember(null);
    setShowForm(false);
    setErrors({});
  };

  // Pagination logic for each category
  const getPaginatedMembers = (members) => {
    const indexOfLastMember = currentPage * rowsPerPage;
    const indexOfFirstMember = indexOfLastMember - rowsPerPage;
    return members.slice(indexOfFirstMember, indexOfLastMember);
  };

  const totalPages = (members) => Math.ceil(members.length / rowsPerPage);

  return (
    <div className="pt-[80px] px-[10px] font-poppins md:overflow-x-auto ">
      <ToastContainer /> {/* Toast container for notifications */}

      <div className="mb-4">
        <h3 className="text-[#754C28] underline font-poppins font-bold">Executive Committee</h3>
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
          <h2 className="text-xl font-bold mb-2 text-[#754C28] font-poppins">
            {editingMember ? "Edit Member" : "Add Member"}
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28]">Photo</label>
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
              <label className="block text-sm font-medium mb-1 text-[#754C28]">Name</label>
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
              <label className="block text-sm font-medium mb-1 text-[#754C28]">Position</label>
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
              <label className="block text-sm font-medium mb-1 text-[#754C28]">Date</label>
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
            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28]">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a category</option>
                <option value="president">President</option>
                <option value="vice-president">Vice-President</option>
                <option value="member">Member</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-500 text-white rounded"
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

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 text-[#754C28]">Presidents</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 p-2">SN</th>
              <th className="border border-gray-300 p-2">Photo</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {presidents.map((member, index) => (
              <tr key={member.id}>
                 <td className="border border-gray-300 p-2" >{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">{member.name}</td>
                <td className="border border-gray-300 p-2">{member.position}</td>
                <td className="border border-gray-300 p-2">{formatDateTime(member.date).date}</td>
                <td className="border border-gray-300 px-[20px]">
                  <button onClick={() => handleEdit(member.id)} className="text-blue-500 pr-[5px]">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-500">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 text-[#754C28]">Vice-Presidents</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr >
            <th className="border border-gray-300 p-2">SN</th>
              <th className="border border-gray-300 p-2">Photo</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vicePresidents.map((member, index) => (
              <tr key={member.id}>
                <td className="border border-gray-300 p-2" >{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">{member.name}</td>
                <td className="border border-gray-300 p-2">{member.position}</td>
                <td className="border border-gray-300 p-2">{formatDateTime(member.date).date}</td>
                <td className="border border-gray-300  px-[20px]">
                  <button onClick={() => handleEdit(member.id)} className="text-blue-500 pr-[5px]">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-500">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      <div>
        <h3 className="text-lg font-bold mb-2 text-[#754C28]">Other Members</h3>
        <table className="w-full border-collapse border border-gray-300 mb-[10px]">
          <thead className="bg-blue-500 text-white">
            <tr>
            <th className="border border-gray-300 p-2">SN</th>
              <th className="border border-gray-300 p-2">Photo</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedMembers(otherMembers).map((member, index) => (
              <tr key={member.id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">{member.name}</td>
                <td className="border border-gray-300 p-2">{member.position}</td>
                <td className="border border-gray-300 p-2">{formatDateTime(member.date).date}</td>
                <td className="border border-gray-300 px-[20px]">
                  <button onClick={() => handleEdit(member.id)} className="text-blue-500 pr-[5px]">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-500">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages(otherMembers) > 1 && (
          <div className="flex justify-between mt-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              <FaChevronLeft />
            </button>
            <span>Page {currentPage} of {totalPages(otherMembers)}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages(otherMembers)))}
              disabled={currentPage === totalPages(otherMembers)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminExecutiveCommittee;
