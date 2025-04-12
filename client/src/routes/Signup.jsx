import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_API_END_POINT } from "../utils/constant.js";
import { Mail, Lock, Phone, User } from "lucide-react"; // Importing Lucide icons

export default function Signup() {
  const initialvalues = {
    fullname: "",
    email: "",
    password: "",
    mobilenumber: "",
    role: "",
  };

  const navigate = useNavigate();
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});
  // eslint-disable-next-line
  const [submit, setsubmit] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setformerrors(validate(formvalues));
    setsubmit(true);

    const formData = new FormData();
    formData.append("fullname", formvalues.fullname);
    formData.append("email", formvalues.email);
    formData.append("mobilenumber", formvalues.mobilenumber);
    formData.append("password", formvalues.password);
    formData.append("role", formvalues.role);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      if (res.data.success) {
        navigate("/login");
        toast("Registered successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("error", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regx = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/i;

    if (!values.fullname) {
      errors.fullname = "Full name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regx.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password should not be less than 4 characters";
    }

    if (!values.mobilenumber) {
      errors.mobilenumber = "Mobile number is required";
    } else if (
      values.mobilenumber.length < 10 ||
      values.mobilenumber.length > 11
    ) {
      errors.mobilenumber = "Invalid mobile number";
    }

    if (!values.role) {
      errors.role = "Role Is Required";
    }

    return errors;
  };

  return (
    <>
      <div className="flex mt-[100px] justify-center items-center px-4 py-6 sm:py-8 md:py-10 lg:py-12">
        <form
          onSubmit={handlesubmit}
          className="w-full max-w-md bg-[#31a022] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg"
        >
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-xl sm:text-2xl font-bold text-white">Sign Up</p>
          </div>

          {/* Full Name Input */}
          <div className="mb-4">
            <label className="text-base sm:text-lg text-white">
              Full Name:
            </label>
            <div className="flex items-center border-b-2 border-white py-2 mt-1">
              <User className="text-white mr-2 h-5 w-5" />
              <input
                type="text"
                onChange={change}
                placeholder="Full Name"
                name="fullname"
                className="bg-transparent w-full text-white focus:outline-none text-sm sm:text-base"
                value={formvalues.fullname}
              />
            </div>
            <p className="text-black text-xs sm:text-sm mt-1">
              {formerrors.fullname}
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="text-base sm:text-lg text-white">Email:</label>
            <div className="flex items-center border-b-2 border-white py-2 mt-1">
              <Mail className="text-white mr-2 h-5 w-5" />
              <input
                type="email"
                onChange={change}
                placeholder="Email"
                name="email"
                className="bg-transparent w-full text-white focus:outline-none text-sm sm:text-base"
                value={formvalues.email}
              />
            </div>
            <p className="text-black text-xs sm:text-sm mt-1">
              {formerrors.email}
            </p>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="text-base sm:text-lg text-white">Password:</label>
            <div className="flex items-center border-b-2 border-white py-2 mt-1">
              <Lock className="text-white mr-2 h-5 w-5" />
              <input
                type="password"
                onChange={change}
                placeholder="Password"
                name="password"
                className="bg-transparent w-full text-white focus:outline-none text-sm sm:text-base"
                value={formvalues.password}
              />
            </div>
            <p className="text-black text-xs sm:text-sm mt-1">
              {formerrors.password}
            </p>
          </div>

          {/* Mobile Number Input */}
          <div className="mb-4">
            <label className="text-base sm:text-lg text-white">
              Mobile Number:
            </label>
            <div className="flex items-center border-b-2 border-white py-2 mt-1">
              <Phone className="text-white mr-2 h-5 w-5" />
              <input
                type="number"
                onChange={change}
                placeholder="Mobile Number"
                name="mobilenumber"
                className="bg-transparent w-full text-white focus:outline-none text-sm sm:text-base"
                value={formvalues.mobilenumber}
              />
            </div>
            <p className="text-black text-xs sm:text-sm mt-1">
              {formerrors.mobilenumber}
            </p>
          </div>

          {/* Role Input */}
          <div className="mb-4">
            <label className="text-base sm:text-lg text-white">Role:</label>
            <div className="flex items-center space-x-4 border-b-2 border-white py-2 mt-1">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="User"
                  name="role"
                  value="user"
                  onChange={change}
                  className="mr-2"
                />
                <label
                  htmlFor="User"
                  className="text-white text-sm sm:text-base"
                >
                  User
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="Owner"
                  name="role"
                  value="owner"
                  onChange={change}
                  className="mr-2"
                />
                <label
                  htmlFor="Owner"
                  className="text-white text-sm sm:text-base"
                >
                  Owner
                </label>
              </div>
            </div>
            <p className="text-black text-xs sm:text-sm mt-1">
              {formerrors.role}
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button className="text-base sm:text-lg w-full py-2 bg-white text-[#31a022] rounded-lg font-bold transition-colors hover:bg-gray-100">
              SIGN UP
            </button>
          </div>

          {/* Already have an account? */}
          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-white text-sm sm:text-base underline hover:text-gray-200"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
