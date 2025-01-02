import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Close from "./Close";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
// import { logout } from "../store/authSlice"; // Import your logout action

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // const handleLogout = () => {
  //   // Dispatch logout action to clear user data
  //   dispatch(logout());
  //   // Redirect user to the login page
  //   navigate("/login");
  // };

  return (
    <>
      <div className="lg:h-[65px] h-[55px] bg-[#31a022] flex items-center">
        <nav className="flex justify-between items-center w-full px-4 lg:px-10">
          {/* Brand Name */}
          <div className="text-[30px] lg:text-3xl font-Ubun text-black">
            Field Finder
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex lg:gap-x-8 lg:text-[22px]">
            {links.map((val) => (
              <ul key={val.id}>
                <li className="relative group">
                  <Link to={val.link} className="hover:text-gray-900 text-black">
                    {val.name}
                  </Link>
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
              </ul>
            ))}
          </div>

          {/* Desktop Greeting and Profile */}
          <div className="hidden lg:flex lg:items-center">
            {!user ? (
              !isLoginOrSignupPage && (
                <Link to="/login">
                  <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                    Login
                  </button>
                </Link>
              )
            ) : (
              <Popover>
                <PopoverTrigger>
                  <div className="flex items-center cursor-pointer">
                    <span className="text-black font-bold mr-4">
                      Hello, {user.fullname}
                    </span>
                    <img
                      src="./images/profileImage.jpg"
                      alt="Profile"
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="p-2 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <ul className="flex flex-col text-sm">
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                      <Link to="/userprofile">Profile</Link>
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                      
                    >
                      Logout
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button className="h-[25px] w-[25px]" onClick={toggleBtn}>
              {btn ? <Close /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            btn ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden lg:hidden`}
        >
          <div className="bg-white opacity-95">
            <ul className="text-2xl mt-[20px] pt-[20px] text-black w-screen flex flex-col align-center items-center h-screen">
              {links.map((val) => (
                <li key={val.id} className="hover:text-[#576CBC] my-[15px]">
                  <Link to={val.link} onClick={toggleBtn}>
                    {val.name}
                  </Link>
                </li>
              ))}

              {/* Mobile Greeting and Profile */}
              {!user ? (
                !isLoginOrSignupPage && (
                  <li className="hover:text-[#576CBC] my-[15px]">
                    <Link to="/login" onClick={toggleBtn}>
                      Login
                    </Link>
                  </li>
                )
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-black font-bold mb-2">
                    Hello, {user.fullname}
                  </p>
                  <img
                    src="./images/profileImage.jpg"
                    alt="Profile"
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
