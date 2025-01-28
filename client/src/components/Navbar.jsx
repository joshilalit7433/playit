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
    { id: 3, name: "Contact", link: "/contact" },
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
    <nav className="bg-green-600 shadow-lg fix">
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
                    <span className="text-white font-medium">
                      Hello, {user.fullname}
                    </span>
                    <img
                      src="/images/profileImage.jpg"
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
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
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.id}
                to={link.link}
                className="text-white hover:bg-green-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-row space-x-2 px-2 pt-2 pb-3">
              <Link
                to="/subscription"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium text-center"
                onClick={toggleMenu}
              >
                GET PLAYit PLUS
              </Link>
              {!user && !isLoginOrSignupPage && (
                <Link
                  to="/login"
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-base font-medium text-center"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </div>
            {user && (
              <div className="pt-4 pb-3 border-t border-green-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/images/profileImage.jpg"
                      alt="Profile"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.fullname}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    to="/userprofile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700"
                  >
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
