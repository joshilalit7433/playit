import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();

  const isLoginOrSignupPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const links = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Turfs", link: "/turfs" },
    { id: 3, name: "Contact", link: "/contact" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative bg-[#31a022] flex items-center h-[65px] px-4 lg:px-10">
      {/* Brand Name */}
      <div className="text-[24px] sm:text-[30px] lg:text-3xl font-Ubun text-white">
        Field Finder
      </div>

      {/* Centered Links Section */}
      <div className="hidden lg:flex lg:gap-x-8 lg:text-[18px] xl:text-[22px] mx-auto">
        {links.map((val) => (
          <ul key={val.id}>
            <li className="relative group">
              <Link to={val.link} className="hover:text-gray-900 text-white">
                {val.name}
              </Link>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </li>
          </ul>
        ))}
      </div>

      {/* Profile Section */}
      <div className="relative ml-auto lg:ml-4">
        <button
          onClick={toggleMenu}
          className="flex items-center space-x-2 text-white font-bold"
        >
          {user ? (
            <>
              <span>Hello, {user.fullname}</span>
              <img
                src="./images/profileImage.jpg"
                alt="Profile"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            </>
          ) : (
            <span>Menu</span>
          )}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-[200px] z-50">
            <ul className="flex flex-col text-sm">
              {links.map((val) => (
                <li
                  key={val.id}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                >
                  <Link to={val.link} onClick={() => setMenuOpen(false)}>
                    {val.name}
                  </Link>
                </li>
              ))}
              {!user ? (
                !isLoginOrSignupPage && (
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      Login
                    </Link>
                  </li>
                )
              ) : (
                <>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    <Link to="/userprofile" onClick={() => setMenuOpen(false)}>
                      Profile
                    </Link>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    <Link to="/logout" onClick={() => setMenuOpen(false)}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
