import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_API_END_POINT } from "../utils/constant.js";
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Mail, Lock } from "lucide-react"; // Importing Lucide icons

export default function Login() {
  const initialvalues = { email: "", password: "",role:"" };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [formerrors, setformerrors] = useState({});
  const [submit, setsubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setformerrors(validate(formvalues));
    setsubmit(true);

    const formData = new FormData();
    formData.append("email", formvalues.email);
    formData.append("password", formvalues.password);
    formData.append("role", formvalues.role);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, formvalues, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");

        // Success Toast
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        // Error Toast for unsuccessful login
        toast.error(res.data.message || "Login failed. Please try again.", {
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
      // Error Toast for server or network errors
      toast.error(
        "An error occurred. Please check your credentials and try again.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && submit) console.log(formvalues);
  }, [formerrors]);

  const validate = (values) => {
    const errors = {};
    const regx = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/i;

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


    if (!values.role) {
      errors.role = "Role is required";
    }

   

    return errors;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handlesubmit}
        className="w-full max-w-md bg-[#31a022] p-6 rounded-lg shadow-lg"
      >
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-white">Customer Login</p>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-sm text-white">Email ID:</label>
          <div className="flex items-center border-b-2 border-white py-2 mt-2">
            <Mail className="text-white mr-2" />
            <input
              type="email"
              onChange={change}
              placeholder="Email"
              name="email"
              className="bg-transparent w-full text-white focus:outline-none"
              value={formvalues.email}
            />
          </div>
          <p className="text-red-500 text-sm">{formerrors.email}</p>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="text-sm text-white">Password:</label>
          <div className="flex items-center border-b-2 border-white py-2 mt-2">
            <Lock className="text-white mr-2" />
            <input
              type="password"
              onChange={change}
              placeholder="Password"
              name="password"
              className="bg-transparent w-full text-white focus:outline-none"
              value={formvalues.password}
            />
          </div>
          <p className="text-red-500 text-sm">{formerrors.password}</p>
        </div>

            {/* Role Input */}
            <div className="mb-4">
          <label className="text-sm text-white">Role:</label>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="User"
                name="role"
                value="user"
                onChange={change}
                className="mr-2"
              />
              <label htmlFor="User" className="text-white">
                User
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="Admin"
                name="role"
                value="admin"
                onChange={change}
                className="mr-2"
              />
              <label htmlFor="Admin" className="text-white">
                Admin
              </label>
            </div>
          </div>
          <p className="text-red-500 text-sm">{formerrors.role}</p>
        </div>

        

        {/* Remember Me and Forgot Password */}
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

        {/* Don't have an account? */}
        <div className="text-center mt-4">
          <Link to="/signup" className="text-white underline">
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
