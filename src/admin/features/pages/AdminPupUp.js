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

const AdminPupUp = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    category: "Published", // New category field
  });
  const [preview, setPreview] = useState(""); // State for image preview
  const [errors, setErrors] = useState({});
  const rowsPerPage = 10;

  const token = localStorage.getItem("token");

  // Fetch notices data
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/getpopupnotice`, {
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

  // Separate notices by category
  const publishedNotices = notices.filter(
    (notice) => notice.category === "Published"
  );
  const unpublishedNotices = notices.filter(
    (notice) => notice.category === "Unpublished"
  );

  // Pagination for published notices
  const indexOfLastNotice = currentPage * rowsPerPage;
  const indexOfFirstNotice = indexOfLastNotice - rowsPerPage;
  const currentPublishedNotices = publishedNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );
  const totalPages = Math.ceil(publishedNotices.length / rowsPerPage);

  // Form data handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prevState) => ({ ...prevState, [name]: file }));
      setPreview(file ? URL.createObjectURL(file) : ""); // Update preview only if a file is selected
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleAdd = async () => {
    const formDataToSend = new FormData();
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Only append image if it's provided
    }
    formDataToSend.append("category", formData.category); // Add category to form data

    try {
      const url = editingNotice
        ? `${apiUrl}/api/v1/updatepopupnotice/${editingNotice}`
        : `${apiUrl}/api/v1/uploadtopopupnotice`;
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

      setFormData({ image: null, category: "Published" }); // Reset form data
      setPreview(""); // Clear preview
      setEditingNotice(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Failed to ${editingNotice ? "update" : "add"} notice.`);
    }
  };

  const handleCancel = () => {
    setFormData({ image: null, category: "Published" });
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
        image: null, // Image cannot be pre-filled
        category: notice.category,
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
      await axios.delete(`${apiUrl}/api/v1/deletepopupnotice/${id}`, {
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

  return (
    <div className="pt-[80px] px-[10px] font-poppins">
      <ToastContainer />
      <div className="mb-4">
        <h3 className="text-[#754C28] underline font-poppins font-bold">
          PupUp Message
        </h3>
        <div className="w-full flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add PopUp
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
              <label className="block text-sm font-medium mb-1 text-[#754C28]">
                Image (Optional)
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
              <label className="block text-sm font-medium mb-1 text-[#754C28]">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="Published">Published</option>
                <option value="Unpublished">Unpublished</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-500 text-white rounded"
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

      {/* Published Notices */}
      <div>
        <h2 className="text-[#754C28] underline font-poppins font-bold text-[20px]">
          Published Notices
        </h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPublishedNotices.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-2 px-4 text-center text-gray-500">
                  No notices found.
                </td>
              </tr>
            ) : (
              currentPublishedNotices.map((notice) => (
                <tr key={notice.id}>
                  <td className="py-2 px-4 border-b">
                    {notice.imageUrl ? (
                      <img
                        src={notice.imageUrl}
                        alt="Notice"
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{notice.category}</td>
                  <td className="py-2 px-4 border-b ">
                    <button
                      onClick={() => handleEdit(notice.id)}
                      className="text-blue-500 hover:underline pr-[15px]"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="text-red-500 hover:underline"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Unpublished Notices */}
      <div className="mt-8">
        <h2 className="text-[#754C28] underline font-poppins font-bold text-[20px]">
          Unpublished Notices
        </h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {unpublishedNotices.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-2 px-4 text-center text-gray-500">
                  No notices found.
                </td>
              </tr>
            ) : (
              unpublishedNotices.map((notice) => (
                <tr key={notice.id}>
                  <td className="py-2 px-4 border-b">
                    {notice.imageUrl ? (
                      <img
                        src={notice.imageUrl}
                        alt="Notice"
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{notice.category}</td>
                  <td className="py-2 px-4 border-b ">
                    <button
                      onClick={() => handleEdit(notice.id)}
                      className="text-blue-500 hover:underline mr-[15px]"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="text-red-500 hover:underline"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPupUp;
