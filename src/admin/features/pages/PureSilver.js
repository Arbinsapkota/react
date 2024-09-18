import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
const apiUrl = process.env.REACT_APP_BACKEND_URL;
const validationSchema = Yup.object({
  sellingPer10g: Yup.number()
    .required("विक्रि गर्नु अनिवार्य छ।")
    .min(0, "विक्रि एक सकारात्मक संख्या हुनुपर्छ।"),
  buyingPer10g: Yup.number()
    .required("किन्ने अनिवार्य छ।")
    .min(0, "किन्ने एक सकारात्मक संख्या हुनुपर्छ।"),
  sellingPerTola: Yup.number()
    .required("विक्रि एक सकारात्मक संख्या हुनुपर्छ।")
    .min(0, "विक्रि एक सकारात्मक संख्या हुनुपर्छ।"),
  buyingPerTola: Yup.number()
    .required("किन्ने अनिवार्य छ।")
    .min(0, "किन्ने एक सकारात्मक संख्या हुनुपर्छ।"),
});

const PureSilver = () => {
  const handleSubmit = async (values, { resetForm }) => {
    const data = {
      metal: "SILVER",
      buyingPer10g: values.buyingPer10g,
      sellingPer10g: values.sellingPer10g,
      buyingPerTola: values.buyingPerTola,
      sellingPerTola: values.sellingPerTola,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post(`${apiUrl}/api/v1/updatecurrentrate`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Updated successfully!");
      resetForm();
    } catch (error) {
      if (error.response) {
        toast.error(
          `Failed to update rate: ${
            error.response.data.message || "Unknown error occurred"
          }`
        );
      } else {
        toast.error("Failed to update rate: No response from the server.");
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          sellingPer10g: "",
          buyingPer10g: "",
          sellingPerTola: "",
          buyingPerTola: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <div className="mt-[80px]">
            <h1 className="text-[20px] font-semibold mx-[20px] text-[#754C28] underline">
              असल चाँदी
            </h1>
            <div className="flex justify-center">
              <Form className="h-auto md:w-[70%] w-[50%] border-[2px] shadow-md p-4">
                <h2 className="text-lg font-semibold text-[#754C28]">
                  १० ग्राम
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-1 md:gap-0 gap-[20px]">
                  {/* Selling per 10g */}
                  <div className="mb-4">
                    <label
                      htmlFor="sellingPer10g"
                      className="block text-sm font-semibold text-[#754C28]"
                    >
                      बिक्री
                    </label>
                    <Field
                      id="sellingPer10g"
                      name="sellingPer10g"
                      type="number"
                      className="mt-1 w-full border-[0.5px] border-[#754C28] rounded-md shadow-sm sm:text-sm focus:border-[0.5px] focus:border-blue-800 pl-[4px]"
                    />
                    <ErrorMessage
                      name="sellingPer10g"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  {/* Buying per 10g */}
                  <div>
                    <div className="mb-4">
                      <label
                        htmlFor="buyingPer10g"
                        className="block text-sm font-semibold text-[#754C28]"
                      >
                        खरिद
                      </label>
                      <Field
                        id="buyingPer10g"
                        name="buyingPer10g"
                        type="number"
                        className="mt-1 w-full border-[0.5px] border-[#754C28] rounded-md shadow-sm sm:text-sm focus:border-[0.5px] focus:border-blue-800 pl-[4px]"
                      />
                      <ErrorMessage
                        name="buyingPer10g"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-[#754C28]">
                    प्रति तोला
                  </h2>
                  <div className="grid md:grid-cols-1 grid-cols-2 md:gap-0 gap-[20px]">
                    {/* Selling per Tola */}
                    <div className="mb-4">
                      <label
                        htmlFor="sellingPerTola"
                        className="block text-sm font-semibold text-[#754C28]"
                      >
                        बिक्री
                      </label>
                      <Field
                        id="sellingPerTola"
                        name="sellingPerTola"
                        type="number"
                        className="mt-1 w-full border-[0.5px] border-[#754C28] rounded-md shadow-sm sm:text-sm focus:border-[0.5px] focus:border-blue-800 pl-[4px]"
                      />
                      <ErrorMessage
                        name="sellingPerTola"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    {/* Buying per Tola */}
                    <div className="mb-4">
                      <label
                        htmlFor="buyingPerTola"
                        className="block text-sm font-semibold text-[#754C28]"
                      >
                        खरिद
                      </label>
                      <Field
                        id="buyingPerTola"
                        name="buyingPerTola"
                        type="number"
                        className="mt-1 w-full border-[0.5px] border-[#754C28] rounded-md shadow-sm sm:text-sm focus:border-[0.5px] focus:border-blue-800 pl-[4px]"
                      />
                      <ErrorMessage
                        name="buyingPerTola"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-[-20px]">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default PureSilver;
