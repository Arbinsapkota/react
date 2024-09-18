import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
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
});

const BannerPage = () => {
  const [bannerImages, setBannerImages] = useState([]);
  
  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/getbanner`);
        if (response.data.success) {
          setBannerImages(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch banner images.");
        }
      } catch (error) {
        console.error("Error fetching banner images:", error);
        toast.error("Failed to fetch banner images.");
      }
    };
    
    fetchBannerImages();
  }, []);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type and size
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

      // Set the file to Formik's field value
      setFieldValue("image", file);
    }
  };

  const handleUpload = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("images", values.image);

    const token = localStorage.getItem("token");

    try {
      // Ensure the token exists and has correct authorization
      if (!token) {
        toast.error("Authorization token is missing.");
        return;
      }

      await axios.post(`${apiUrl}/api/v1/uploadbanner`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded successfully!");
      resetForm();
      // Re-fetch images to update the display
      const response = await axios.get(`${apiUrl}/api/v1/getbanner`);
      if (response.data.success) {
        setBannerImages(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch updated banner images.");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      if (error.response) {
        toast.error(
          `Failed to upload image: ${
            error.response.data.message || "Unknown error occurred."
          }`
        );
      } else {
        toast.error("Failed to upload image: No response from server.");
      }
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        toast.error("Authorization token is missing.");
        return;
      }

      await axios.delete(`${apiUrl}/api/v1/deletebanner/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Image deleted successfully!");
      // Update the state to remove the deleted image
      setBannerImages(bannerImages.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  return (
    <>
    <div className="flex flex-col items-center mt-[100px] font-poppins">
      <div className="p-[40px] md:p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg w-full border-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl underline font-bold text-[hsl(28,49%,31%)]">
            Banner
          </h1>
          <button className="text-[30px]">
            <HiMiniXMark />
          </button>
        </div>
        <Formik
          initialValues={{ image: null }}
          validationSchema={validationSchema}
          onSubmit={handleUpload}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <div className="mb-4 rounded-lg p-4 w-full h-[150px] flex items-center justify-center border-[0.5px] border-[#754C28]">
                <div>
                  <div className="text-[hsl(248,75%,46%)] text-[45px] flex items-center justify-center mb-2 w-full">
                    <FiUploadCloud />
                  </div>
                  <input
                    id="bannerImage"
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

              {values.image && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">Image Preview:</h2>
                  <img
                    src={URL.createObjectURL(values.image)}
                    alt="Preview"
                    className="max-w-full max-h-96 object-cover"
                  />
                </div>
              )}

              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>

        
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
    <div className="mt-8 font-poppins">
    <h2 className="text-xl font-semibold mb-2 text-[#754C28]">
      Existing Banners:</h2>
    <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
      {bannerImages.map((banner) => (
        <div
          key={banner.id}
          className="bg-white shadow-md rounded-lg border p-4 relative"
        >
         
          <img
            src={banner.imageUrl}
            alt={`Banner ${banner.id}`}
            className="w-full h-32 object-cover rounded"
          />
          <div className="flex justify-center mt-[6px]">
           <button
            onClick={() => handleDelete(banner.id)}
            className=" top-2 right-2 text-red-600 hover:text-red-800 font-semibold font-poppins bg-blue-500 hover:bg-blue-800 px-[25px] py-[2px] rounded-md justify-center"
          >Delete
          </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  </>
  );
};

export default BannerPage;
