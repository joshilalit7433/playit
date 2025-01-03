import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Close from "../components/Close";
import Menu from "../components/Menu";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // Import the logout action
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoginOrSignupPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const links = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Turfs", link: "/turfs" },
    { id: 3, name: "Contact", link: "/contact" },
  ];

  const [btn, setBtn] = useState(false);

  const toggleBtn = () => {
    setBtn(!btn);
  };

  const handleLogout = () => {
    dispatch(logout()); // Clear user data in Redux store

    // Show toast message on logout
    toast.success("You have successfully logged out.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="bg-[#31a022] flex flex-row items-center justify-between p-4 relative z-50">
        {/* Brand Name */}
        <div className="text-[24px] lg:text-[30px] font-bold text-white">
          <Link to="/">Field Finder</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex lg:items-center lg:space-x-8 lg:justify-center lg:flex-1">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.link}
              className="text-white hover:text-gray-300 text-lg"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Login/Profile Section */}
        <div className="hidden lg:flex lg:items-center relative z-50">
          {!user ? (
            !isLoginOrSignupPage && (
              <Link
                to="/login"
                className="bg-black text-white px-4 py-2 rounded-full text-center hover:bg-gray-800 transition"
              >
                Login
              </Link>
            )
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center space-x-4 cursor-pointer">
                  {/* Display user name */}
                  <span className="text-white font-medium">
                    Hello, {user?.fullname || "User"}
                  </span>

                  {/* Display user profile picture */}
                  <img
                    src={user?.userPhoto || "./images/profileImage.jpg"} // Default profile picture
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="p-4 bg-white rounded-lg shadow-md border border-gray-300 z-50"
              >
                <ul className="flex flex-col space-y-2 text-gray-700">
                  <li className="hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer">
                    <Link to="/userprofile">Profile</Link>
                  </li>
                  <li
                    className="hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer"
                    onClick={handleLogout} // Trigger logout
                  >
                    Logout
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex">
          <button
            onClick={toggleBtn}
            className="text-white"
            style={{ width: "25px", height: "25px" }}
          >
            {btn ? <Close /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-[60px] left-0 w-full ${
            btn ? "block" : "hidden"
          } bg-black text-white p-4 space-y-4 z-50`}
        >
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.link}
              onClick={toggleBtn}
              className="block hover:text-gray-300 text-lg"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            !isLoginOrSignupPage && (
              <Link
                to="/login"
                onClick={toggleBtn}
                className="block bg-gray-700 text-white px-4 py-2 rounded-full text-center hover:bg-gray-800 transition"
              >
                Login
              </Link>
            )
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <span className="text-white">Hello, {user?.fullname}</span>
              <img
                src={user?.userPhoto || "./images/profileImage.jpg"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <button
                onClick={handleLogout} // Trigger logout
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}
