import React from 'react';
import { Input, Textarea } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import GmsTola from "./GmsTola";
import ScrollTop from "../../Scroll/ScrollTop";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const TapaikoGunaso = () => {
  const contactSchema = Yup.object({
    name: Yup.string()
      .max(20, "Less than 40 characters"),

    email: Yup.string()
      .email("Invalid email address"),

    message: Yup.string()
      .required("Required")
      .min(20, "At least 20 characters")
      .max(3000, "Less than 3000 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      subject: "Gunaso", // Static value for subject
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Send form data to the backend
        await axios.post(`${apiUrl}/api/contact`, values); // Update the URL to your backend endpoint

        // Handle the response
        toast.success("Message submitted successfully");

        // Reset the form if needed
        resetForm();
        // Navigate back after form submission
        // nav(-1);
      } catch (error) {
        toast.error("Error submitting message:", error);
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: contactSchema,
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <>
      {/* Contact Form */}
      <GmsTola />
      <ScrollTop />
      <ToastContainer />
      <div className="mx-[10%] my-[20px] font-poppins">
        <div className="bg-red-50 rounded-[20px] p-[4%] px-[10%]">
          <h1 className="w-full text-center font-semibold mb-[20px] sm:text-[20px]">
            तपाईको गुनासो
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="md:space-y-[40px] space-y-[50px]"
          >
            {/* Name Input */}
            <div>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="name"
                value={formik.values.name}
                placeholder="Your Name"
                className="!border !border-orange-100 bg-white text-black shadow-lg focus:shadow-red-50 ring-4 ring-transparent placeholder:text-gray-600 placeholder:text-[16px] placeholder:opacity-100 focus:!orange-gray-900 focus:!orange-t-gray-900 focus:ring-red-100 !h-[62px]"
                labelProps={{ className: "hidden" }}
                containerProps={{ className: "min-w-[100px]" }}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 mt-[20px] m-[2%]">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>

            {/* Email Input */}
            <div>
              <Input
                size="lg"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter Email"
                className="!border !border-orange-100 bg-white text-black shadow-lg focus:shadow-red-50 ring-4 ring-transparent placeholder:text-gray-600 placeholder:text-[16px] placeholder:opacity-100 focus:!orange-gray-900 focus:!orange-t-gray-900 focus:ring-red-100 !h-[62px]"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 mt-[20px] m-[2%]">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            {/* Message Textarea */}
            <div>
              <Textarea
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Message"
                name="message"
                value={formik.values.message}
                labelProps={{ className: "hidden" }}
                className="border border-orange-100 bg-white shadow-lg focus:shadow-red-50 ring-4 ring-transparent placeholder:text-gray-600 placeholder:text-[18px] placeholder:opacity-100 focus:orange-gray-900 focus:orange-t-gray-900 focus:ring-red-100 
                 md:h-[260px] h-[410px] text-black"
                containerProps={{ className: "min-w-[100px] w-auto" }}
                label="Message"
              />
              {formik.touched.message && formik.errors.message ? (
                <p className="text-red-500 px-[2%]">{formik.errors.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              className="bg-brown-700 w-full text-[18px] py-[14px] text-white rounded-[15px] hover:bg-blue-800 hover:duration-1000 duration-1000 font-semibold"
              disabled={formik.isSubmitting}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TapaikoGunaso;
