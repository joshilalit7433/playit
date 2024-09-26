import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Close from "./Close";
import Menu from "./Menu";
import { useSelector } from "react-redux";
export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();

  // Check if the current path is either "/login" or "/signup"
  const isLoginOrSignupPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const links = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Turfs",
      link: "/turfs",
    },
    {
      id: 3,
      name: "Contact",
      link: "/contact",
    },
  ];

  const [btn, setBtn] = useState(false);

  const toggleBtn = () => {
    setBtn(!btn);
  };

  return (
    <>
      <div className="lg:h-[65px] h-[55px] bg-[#06D001]  ">
        <nav>
          <div className="flex justify-center items-center lg:flex lg:justify-start lg:pt-[10px] lg:ml-[10px] mt-[0px] pb-[-80px]">
            <p className="text-[30px] lg:text-3xl font-Ubun">Field Finder</p>
          </div>

          <div className="lg:flex lg:justify-center lg:gap-x-8 lg:text-[22px] cursor-pointer lg:mt-[-32px] hidden">
            {links.map((val, id) => (
              <ul key={id}>
                <li className="relative group">
                  <Link to={val.link} className="hover:text-gray-900">
                    {val.name}
                  </Link>
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>
              </ul>
            ))}
          </div>

          {/* Conditionally render the Login button in the desktop version */}
          {!user ? (
            !isLoginOrSignupPage && (
              <div className="lg:flex lg:justify-end lg:mr-[30px] lg:mt-[-32px] hidden">
                <Link to="/login">
                  <button className="bg-black px-7 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                    Login
                  </button>
                </Link>
              </div>
            )
          ) : (
            <div>
              <img
                src="./images/profileImage.jpg"
                alt="Profile"
                className=" lg:float-right lg:mr-8 lg:mt-[-40px] lg:w-[40px]  lg:h-[40px] rounded-full object-cover"
              />
            </div>
          )}

          <div
            onClick={toggleBtn}
            className="flex justify-end pr-[30px] lg:hidden mt-[-35px] pb-[-80px]"
          >
            <button className="h-[25px] w-[25px]">
              {btn ? <Close /> : <Menu />}
            </button>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out ${
              btn ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden lg:hidden`}
          >
            <div className="bg-white opacity-95 ">
              <ul className=" text-2xl mt-[20px] pt-[20px] text-black w-screen flex flex-col align-center items-center h-screen">
                {links.map((val, id) => (
                  <li
                    key={id}
                    className=" z-0 hover:text-[#576CBC] lg:px-4 my-[15px]"
                  >
                    <Link to={val.link} onClick={toggleBtn}>
                      {val.name}
                    </Link>
                  </li>
                ))}
                {/* Conditionally render the Login link in the mobile menu */}

                {!user ? (
                  !isLoginOrSignupPage && (
                    <li className="hover:text-[#576CBC] lg:px-4 my-[15px]">
                      <Link to="/login" onClick={toggleBtn}>
                        Login
                      </Link>
                    </li>
                  )
                ) : (
                  <div>
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
        </nav>
      </div>
    </>
  );
}
