import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import { HiEyeSlash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../route/protectingRoute/AuthProvider";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const { login } = useAuth(); // Retrieve login function from context
  const navigate = useNavigate(); // Navigation function

  const [show, setShow] = useState(false);

  // Validation schema using Yup
  const userSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(15, "Password must be at most 15 characters")
      .required("Password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${apiUrl}/api/v1/login`, values);

        // Check if token exists in response
        if (response.data && response.data.token) {
          const { token } = response.data;

          // Store the token in localStorage
          localStorage.setItem("token", token);

          // Call login function to update auth state
          login();

          // Notify the user and redirect
          toast.success("Successfully logged in!");
          navigate("/admin");
        } else {
          toast.error("Login failed: No token received.");
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          toast.error(
            `Login failed: ${
              error.response.data.message || "Please check your credentials."
            }`
          );
        } else if (error.request) {
          // Request was made but no response was received
          toast.error("No response from the server. Please try again later.");
        } else {
          // Something went wrong in setting up the request
          toast.error("An unexpected error occurred. Please try again.");
        }
        console.error("Error details:", error);
      }
    },
  });

  return (
    <Card
      className="mx-auto pt-4 max-w-80 font-poppins my-[30px] px-[10px] py-[10px] bg-[#9f642f]"
      color="transparent"
      shadow={false}
    >
      <Typography className="mb-[-30px] text-center" variant="h4" color="white">
        Admin Log In
      </Typography>

      <form onSubmit={formik.handleSubmit} className="mt-5 text-white">
        <div>
          <Typography variant="h6" className="mb-2 text-white">
            Your Email
          </Typography>
          <Input
            size="lg"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="name@mail.com"
            className="focus:!border-blue-900 text-white focus:!border-[2px]"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-pink-600">{formik.errors.email}</p>
          )}

          <Typography variant="h6" className="mb-2 mt-[15px] text-white ">
            Password
          </Typography>
          <div className="flex items-center relative">
            <Input
              type={show ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-blue-900 text-white focus:!border-[2px]"
              labelProps={{
                className: "before:content-none after:content-none ",
              }}
            />
            <HiEyeSlash
              onClick={() => setShow(!show)}
              className="absolute right-4 cursor-pointer text-blue-800"
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-pink-600">{formik.errors.password}</p>
          )}
        </div>

        <Button type="submit" className="mt-6" fullWidth>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;
