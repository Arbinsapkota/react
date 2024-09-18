import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { HiMiniXMark } from "react-icons/hi2";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object({
  image: Yup.mixed()
    .notRequired()
    .test(
      "fileSize",
      `File size is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`,
      (value) =>
        !value || (value && value.size <= MAX_FILE_SIZE_MB * 1024 * 1024)
    )
    .test(
      "fileType",
      "Invalid file type. Please select an image (JPEG, PNG, GIF).",
      (value) => !value || (value && ALLOWED_FILE_TYPES.includes(value.type))
    ),
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(5000, "Description cannot exceed 100 characters"),
  date: Yup.date().required("Date is required"),
  linkUrl: Yup.string()
    .required("Link URL is required")
    .url("Invalid URL format"),
});

const RecentNews = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [news, setNews] = useState([]);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/getnews`);
        if (response.data.success) {
          setNews(response.data.data);
        } else {
          toast.error("Failed to fetch news.");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        toast.error("An error occurred while fetching news.");
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(
          "Invalid file type. Please select an image (JPEG, PNG, GIF)."
        );
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(
          `File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`
        );
        return;
      }
      setFieldValue("image", file);
      setSelectedFile(file);
    }
  };

  const handleUpload = async (values, { setFieldError, resetForm }) => {
    const data = new FormData();
    data.append("image", values.image);
    data.append("description", values.description);
    data.append("date", values.date);
    data.append("linkUrl", values.linkUrl);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${apiUrl}/api/v1/uploadtonews`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("News uploaded successfully!");
        resetForm();
        setSelectedFile(null);
        const fetchNews = async () => {
          const res = await axios.get(`${apiUrl}/api/v1/getnews`);
          if (res.data.success) {
            setNews(res.data.data);
          } else {
            toast.error("Failed to fetch news.");
          }
        };
        fetchNews();
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading the image.");
    }
  };

  const handleEdit = (item) => {
    setEditingNews(item);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${apiUrl}/api/v1/deletenews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("News deleted successfully!");
        setNews(news.filter((newsItem) => newsItem.id !== id));
      } else {
        toast.error("Failed to delete news.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the news.");
    }
  };

  const handleUpdate = async (values, { setFieldError, resetForm }) => {
    const data = new FormData();
    if (values.image) {
      data.append("image", values.image);
    }
    data.append("description", values.description);
    data.append("date", values.date);
    data.append("linkUrl", values.linkUrl);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/updatenews/${editingNews.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("News updated successfully!");
        resetForm();
        setSelectedFile(null);
        setEditingNews(null);
        const fetchNews = async () => {
          const res = await axios.get(`${apiUrl}/api/v1/getnews`);
          if (res.data.success) {
            setNews(res.data.data);
          } else {
            toast.error("Failed to fetch news.");
          }
        };
        fetchNews();
      } else {
        toast.error("Failed to update news.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the news.");
    }
  };

  return (
    <>
    <div className="flex justify-center mt-[100px] font-poppins">
      <div className="p-[40px] md:p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg w-full border-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl underline font-bold text-[hsl(28,49%,31%)]">
            Recent News
          </h1>
          <button className="text-[30px]">
            <HiMiniXMark />
          </button>
        </div>

        <Formik
          enableReinitialize={true} // Add this line
          initialValues={{
            image: null,
            description: editingNews ? editingNews.description : "",
            date: editingNews ? editingNews.date : "",
            linkUrl: editingNews ? editingNews.linkUrl : "",
          }}
          validationSchema={validationSchema}
          onSubmit={editingNews ? handleUpdate : handleUpload}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="mb-4 rounded-lg p-4 w-full h-[150px] flex items-center justify-center border-[0.5px] border-[#754C28]">
                <div>
                  <div className="text-[hsl(248,75%,46%)] text-[45px] flex items-center justify-center mb-2 w-full">
                    <FiUploadCloud />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                    className="w-full"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-600 text-sm mt-[5px]"
                  />
                </div>
              </div>

              {previewUrl && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Image Preview:</h2>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full max-h-96 object-cover"
                  />
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-lg font-semibold mb-2 text-[#754C28]"
                >
                  Date:
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className="w-full rounded-lg p-2 border-[0.5px] border-[#754C28] focus:outline-none focus:ring-1 focus:ring-[#754C28]"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-600 text-sm mt-[5px]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-lg font-semibold mb-2 text-[#754C28]"
                >
                  Description:
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full rounded-lg p-2 border-[0.5px] border-[#754C28] focus:outline-none focus:ring-1 focus:ring-[#754C28]"
                  rows="4"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm mt-[5px]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="linkUrl"
                  className="block text-lg font-semibold mb-2 text-[#754C28]"
                >
                  Link URL:
                </label>
                <Field
                  type="text"
                  id="linkUrl"
                  name="linkUrl"
                  className="w-full rounded-lg p-2 border-[0.5px] border-[#754C28] focus:outline-none focus:ring-1 focus:ring-[#754C28]"
                />
                <ErrorMessage
                  name="linkUrl"
                  component="div"
                  className="text-red-600 text-sm mt-[5px]"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-[#754C28] text-white px-4 py-2 rounded-lg"
                >
                  {editingNews ? "Update" : "Upload"}
                </button>
                {editingNews && (
                  <button
                    type="button"
                    onClick={() => setEditingNews(null)}
                    className="text-red-600 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>

        
        <ToastContainer />
      </div>
    </div>

    <div className="mt-6 font-poppins mr-[20px]">
          <h2 className="text-lg  mb-4 text-[#754C28] font-semibold font-poppins">
            News List:
          </h2>
          <ul className="grid grid-cols-3 md:grid-cols-1  gap-[20px] ">
            {news.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 border-[0.5px] border-[#754C28] rounded-lg "
              >
                <div className="grid ">
                  <img
                    src={item.imageUrl}
                    alt={item.description}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold mb-[5px]">{item.description}</p>
                    <p className="text-sm text-gray-600 mb-[5px]">
                      Date: {new Date(item.date).toLocaleDateString()}
                    </p>
                    <a
                      href={item.linkUrl}
                      className="text-blue-500 max-w-10 overflow-hidden "
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.linkUrl}
                    </a>
                    <div className="flex space-x-10 mb-2 mt-[10px]">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
    </>
  );
};

export default RecentNews;
