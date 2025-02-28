import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_API_END_POINT } from "../utils/constant.js";
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const initialValues = { email: "", password: "", role: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setSubmit(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, formValues, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));

        // Redirect based on role
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (res.data.user.role === "owner") {
          navigate("/turfform");
        } else {
          navigate("/");
        }

        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        toast.error(res.data.message || "Login failed. Please try again.", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(
        "An error occurred. Please check your credentials and try again.",
        {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        }
      );
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    }

    if (!values.role) {
      errors.role = "Role is required";
    }

    return errors;
  };

  return (
    <div className="flex  justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full  max-w-md bg-[#31a022] p-6 rounded-lg shadow-lg"
      >
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-white">Login</p>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-sm text-white">Email ID:</label>
          <div className="flex items-center border-b-2 border-white py-2 mt-2">
            <Mail className="text-white mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              className="bg-transparent w-full text-white focus:outline-none"
            />
          </div>
          <p className="text-red-500 text-sm">{formErrors.email}</p>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="text-sm text-white">Password:</label>
          <div className="flex items-center border-b-2 border-white py-2 mt-2">
            <Lock className="text-white mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              className="bg-transparent w-full text-white focus:outline-none"
            />
          </div>
          <p className="text-red-500 text-sm">{formErrors.password}</p>
        </div>

        {/* Role Input */}
        <div className="mb-4">
          <label className="text-sm text-white">Role:</label>
          <div className="flex items-center space-x-4 mt-2">
            {["user", "owner", "admin"].map((role) => (
              <div key={role} className="flex items-center">
                <input
                  type="radio"
                  id={role}
                  name="role"
                  value={role}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor={role} className="text-white capitalize">
                  {role}
                </label>
              </div>
            ))}
          </div>
          <p className="text-red-500 text-sm">{formErrors.role}</p>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-between text-white text-sm mb-6">
          <Link to="/forgot-password" className="underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="w-full py-2 bg-white text-[#31a022] rounded-lg font-bold hover:bg-gray-200 transition">
            LOGIN
          </button>
        </div>

        {/* Signup Link */}
        <div className="text-center mt-4">
          <Link to="/signup" className="text-white underline">
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
