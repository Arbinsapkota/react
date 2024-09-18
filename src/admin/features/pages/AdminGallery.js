import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { HiMiniXMark } from "react-icons/hi2";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const validationSchema = Yup.object({
  image: Yup.mixed()
    .required("Image is required")
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
    .min(10, "Description must be at least 10 characters")
    .max(150, "Description cannot exceed 150 characters"),
  date: Yup.date().required("Date is required"),
});

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/getgallery`);
      if (response.data.success) {
        setGalleryItems(response.data.data);
      } else {
        toast.error("Failed to fetch gallery items.");
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      toast.error("An error occurred while fetching gallery items.");
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl("");
    }
  }, [selectedFile]);

  const token = localStorage.getItem("token");

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

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/uploadtogallery`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Image uploaded successfully!");
        fetchGalleryItems(); // Refresh the gallery items
        resetForm();
        setSelectedFile(null); // Clear the selected file and preview
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading the image.");
    }
  };

  const handleEdit = async (item) => {
    setEditingItem(item);
    setPreviewUrl(item.imageUrl); // Set preview to the existing image URL
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/v1/deletegallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Image deleted successfully!");
        fetchGalleryItems(); // Refresh the gallery items
      } else {
        toast.error("Failed to delete image.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the image.");
    }
  };

  const handleUpdate = async (values, { setFieldError, resetForm }) => {
    const data = new FormData();
    data.append("description", values.description);
    data.append("date", values.date);
    if (values.image) {
      data.append("image", values.image);
    }

    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/updategallery/${editingItem.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Image updated successfully!");
        fetchGalleryItems(); // Refresh the gallery items
        setEditingItem(null); // Clear editing state
        resetForm();
        setSelectedFile(null); // Clear the selected file and preview
      } else {
        toast.error("Failed to update image.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the image.");
    }
  };

  return (
    <div>
    <div className="flex justify-center mt-[100px] font-poppins">
      <div className="p-[40px] md:p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg w-full border-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl underline font-bold text-[hsl(28,49%,31%)]">
            Gallery
          </h1>
          <button className="text-[30px]">
            <HiMiniXMark />
          </button>
        </div>
        <Formik
          initialValues={{
            image: null,
            description: editingItem ? editingItem.description : "",
            date: editingItem ? new Date(editingItem.date).toISOString().split("T")[0] : "",
          }}
          validationSchema={validationSchema}
          onSubmit={editingItem ? handleUpdate : handleUpload}
          enableReinitialize
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
                  className="w-full rounded-lg p-2 border-[0.5px] border-[#754C28]"
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
                  rows="4"
                  className="w-full rounded-lg p-2 border-[0.5px] border-[#754C28]"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm mt-[5px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#754C28] text-white rounded-lg"
              >
                {editingItem ? "Update Gallery Item" : "Upload to Gallery"}
              </button>
            </Form>
          )}
        </Formik>

        
        <ToastContainer />
      </div>
    </div>
    <di className="mt-[40px] mx-[10px]">
          <h2 className="text-xl font-bold text-[#754C28] mb-4 ml-[10px]">Gallery Items</h2>
          <div className="grid md:grid-cols-1 grid-cols-3 gap-4 mx-[10px]">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={item.imageUrl}
                  alt={item.description}
                  className="w-full h-48 object-cover mt-[5px] "
                />
                <div className="p-4">
                  <p className="text-lg font-semibold mb-2">{item.description}</p>
                  <p className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      className="py-2 px-4 bg-blue-500 text-white rounded-lg"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="py-2 px-4 bg-red-500 text-white rounded-lg"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </di>
    </div>
  );
};

export default AdminGallery;
