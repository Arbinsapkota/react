import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const AdminNotice = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    description: "",
    date: "",
  });
  const [preview, setPreview] = useState(""); // State for image preview
  const [errors, setErrors] = useState({});
  const rowsPerPage = 10;

  const token = localStorage.getItem("token");

  // Fetch notices data
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/getnotice`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNotices(res.data.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch notices.");
      });
  }, [token]);

  // Pagination
  const indexOfLastNotice = currentPage * rowsPerPage;
  const indexOfFirstNotice = indexOfLastNotice - rowsPerPage;
  const currentNotices = Array.isArray(notices)
    ? notices.slice(indexOfFirstNotice, indexOfLastNotice)
    : []; // Default to empty array if notices is not an array
  const totalPages = Array.isArray(notices)
    ? Math.ceil(notices.length / rowsPerPage)
    : 0;

  // Form data handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prevState) => ({ ...prevState, [name]: file }));
      setPreview(URL.createObjectURL(file)); // Create image preview
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 40) {
      newErrors.description = "Description must be at least 40 characters long";
    } 
    if (!formData.date || isNaN(new Date(formData.date).getTime())) {
      newErrors.date = "Valid date is required";
    }
    if (!formData.image) {
      newErrors.image = "Image is required";
    }
    return newErrors;
  };

  const handleAdd = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);

    try {
      const url = editingNotice
        ? `${apiUrl}/api/v1/updatenotice/${editingNotice}`
        : `${apiUrl}/api/v1/uploadtonotice`;
      const method = editingNotice ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formDataToSend, // Send FormData for file upload
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      });

      if (editingNotice) {
        setNotices((prevNotices) =>
          prevNotices.map((notice) =>
            notice.id === editingNotice ? response.data.data : notice
          )
        );
        toast.success("Notice updated successfully.");
      } else {
        setNotices((prevNotices) => [...prevNotices, response.data.data]);
        toast.success("Notice added successfully.");
      }

      setFormData({ image: null, description: "", date: "" });
      setPreview(""); // Clear preview
      setEditingNotice(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Failed to ${editingNotice ? "update" : "add"} notice.`);
    }
  };

  const handleCancel = () => {
    setFormData({ image: null, description: "", date: "" });
    setPreview(""); // Clear preview
    setErrors({});
    setEditingNotice(null);
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const notice = notices.find((notice) => notice.id === id);
    if (notice) {
      setEditingNotice(id);
      setFormData({
        image: notice.imageUrl, // Image cannot be pre-filled
        description: notice.description,
        date: new Date(notice.date).toISOString().split("T")[0],
      });
      setPreview(notice.imageUrl); // Set preview URL
      setErrors({});
      setShowForm(true);
    } else {
      toast.error("Notice not found.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/deletenotice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice.id !== id)
      );
      toast.success("Notice deleted successfully.");
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Failed to delete notice.");
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
        <h3 className="text-[#754C28] underline font-poppins font-bold">
          Notices{" "}
        </h3>
        <div className="w-full flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Notice
          </button>
        </div>
      </div>
      {showForm && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-[#754C28] font-poppins">
            {editingNotice ? "Edit Notice" : "Add Notice"}
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}
              {preview && (
                <img
                  src={preview}
                  alt="ImagePreview"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">
                Description
              </label>
              <textarea
                rows={10}
                cols={80}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                minLength={40} // HTML5 validation
                maxLength={5000} // HTML5 validation
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#754C28] ">
                Date
              </label>
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
                {editingNotice ? "Update" : "Add"}
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
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.map((notice, index) => {
            const { date } = formatDateTime(notice.date);
            return (
              <tr key={notice.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={notice.imageUrl}
                    alt="Images"
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-4 py-2">{notice.description}</td>
                <td className="px-4 py-2">{date}</td>
                <td className="px-4 pt-[20px] ">
                  <button
                    onClick={() => handleEdit(notice.id)}
                    className="text-blue-500 pr-[15px]"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
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
          Showing {currentNotices.length}{" "}
          {currentNotices.length === 1 ? "notice" : "notices"}
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

export default AdminNotice;
