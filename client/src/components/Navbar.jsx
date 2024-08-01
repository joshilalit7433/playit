import { useState } from "react";
import { Link } from "react-router-dom";
import Close from "./Close";
import Menu from "./Menu";

export default function Navbar() {
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
      <nav>
        <div className="flex justify-center items-center lg:flex lg:justify-start lg:mt-[15px] lg:ml-[10px] mt-[20px] pb-[-80px]">
          <p className="text-[30px] lg:text-3xl font-Ubun">Field Finder</p>
        </div>

        <div className="lg:flex lg:justify-center lg:gap-x-8 lg:text-[22px] cursor-pointer lg:mt-[-32px] hidden">
          {links.map((val, id) => (
            <ul key={id}>
              <li className="relative group">
                <Link to={val.link} className="hover:text-gray-900">
                  {val.name}
                </Link>
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </li>
            </ul>
          ))}
        </div>

        <div className="lg:flex lg:justify-end lg:mr-[30px] lg:mt-[-32px] hidden">
          <Link to="/login">
            <button className="bg-black px-7 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              Login
            </button>
          </Link>
        </div>

        <div
          onClick={toggleBtn}
          className="flex justify-end pr-[30px] lg:hidden mt-[-35px] pb-[-80px]"
        >
          <button className="h-[25px] w-[25px]">
            {btn ? <Close /> : <Menu />}
          </button>
        </div>

        {btn && (
          <div>
            <div>
              <ul className="text-2xl pt-[20px] text-black w-screen bg-white opacity-95 flex flex-col align-center items-center h-screen">
                {links.map((val, id) => (
                  <li
                    key={id}
                    className="hover:text-[#576CBC] lg:px-4 my-[15px]"
                  >
                    <Link to={val.link} onClick={toggleBtn}>
                      {val.name}
                    </Link>
                  </li>
                ))}
                <li className="hover:text-[#576CBC] lg:px-4 my-[15px]">
                  <Link to="/login" onClick={toggleBtn}>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
