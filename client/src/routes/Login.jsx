import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_API_END_POINT } from "../utils/constant.js";
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Mail, Lock } from "lucide-react"; // Importing Lucide icons

export default function Login() {
  const initialvalues = { email: "", password: "" };
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
        toast("welcome back", {
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

  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && submit) console.log(formvalues);
  }, [formerrors]);

  const validate = (values) => {
    const errors = {};
    const regx = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i;

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

    return errors;
  };

  return (
    <>
      <div className="flex justify-center items-center mt-[100px]">
        <form
          onSubmit={handlesubmit}
          className="w-[310px] h-[400px] lg:h-[450px] lg:w-[500px] bg-[#31a022] p-8 rounded-lg"
        >
          <div className="text-center mb-6">
            <p className="text-[25px] font-bold text-white">Customer Login</p>
          </div>

          {/* Email Input */}
          <div className="mb-[20px]">
            <label className="text-[18px] text-white">Email ID:</label>
            <div className="flex items-center border-b-2 border-white py-2 mt-2">
              <Mail className="text-white mr-2" /> {/* Lucide Email Icon */}
              <input
                type="email"
                onChange={change}
                placeholder="Email"
                name="email"
                className="bg-transparent w-full text-white focus:outline-none"
                value={formvalues.email}
              />
            </div>
            <p className="text-red-500">{formerrors.email}</p>
          </div>

          {/* Password Input */}
          <div className="mb-[20px]">
            <label className="text-[18px] text-white">Password:</label>
            <div className="flex items-center border-b-2 border-white py-2 mt-2">
              <Lock className="text-white mr-2" /> {/* Lucide Lock Icon */}
              <input
                type="password"
                onChange={change}
                placeholder="Password"
                name="password"
                className="bg-transparent w-full text-white focus:outline-none"
                value={formvalues.password}
              />
            </div>
            <p className="text-red-500">{formerrors.password}</p>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between text-white text-sm mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button className="text-[20px] w-full py-2 bg-white text-[#31a022] rounded-lg font-bold">
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
      <ToastContainer />
    </>
  );
}
