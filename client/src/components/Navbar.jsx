import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginOrSignupPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const links = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Turfs", link: "/turfs" },
    // { id: 3, name: "Contact", link: "/contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("You have successfully Logged Out.", {
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
    <nav className="bg-green-600 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                src="/images/play-it.png"
                alt="Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="hidden  sm:ml-6 sm:flex sm:items-center  sm:space-x-8">
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.link}
                className={
                  user
                    ? "ml-44 text-white hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out"
                    : "text-white hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out"
                }
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/subscription"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold transition duration-150 ease-in-out"
            >
              GET PLAYit PLUS
            </Link>
            {!user ? (
              !isLoginOrSignupPage && (
                <Link
                  to="/login"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out"
                >
                  Login
                </Link>
              )
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-white hover:bg-green-700 px-3 py-2 rounded-md transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-white text-green-600 rounded-full flex items-center justify-center text-2xl font-bold leading-none">
                        {user?.fullname?.charAt(0) || "U"}
                      </div>
                      <span className="text-white font-medium hidden md:block">
                        {user?.fullname?.split(" ")[0]}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2">
                  <Link
                    to="/userprofile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-green-600 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.link}
                className="text-white hover:bg-green-700 block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 px-2 pt-4 pb-3">
              <Link
                to="/subscription"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-medium text-center transition-colors duration-200 shadow-md"
                onClick={toggleMenu}
              >
                GET PLAYit PLUS
              </Link>
              {!user && !isLoginOrSignupPage && (
                <Link
                  to="/login"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg text-base font-medium text-center transition-colors duration-200 shadow-md"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </div>
            {user && (
              <div className="pt-4 pb-3 border-t border-green-700 mt-4">
                <div className="flex items-center px-4 py-3 bg-green-700 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white text-green-600 rounded-full flex items-center justify-center text-2xl font-bold leading-none shadow-md">
                      {user?.fullname?.charAt(0) || "U"}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-semibold text-white">
                      {user.fullname}
                    </div>
                    <div className="text-sm text-green-200">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <Link
                    to="/userprofile"
                    className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-green-700 transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-green-700 transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
