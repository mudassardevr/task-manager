import React, { useState } from "react";
//using logos
import taskLogo from "../../assets/icons/tasklogo.svg";
import taskText from "../../assets/icons/task.svg";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // logout system
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-[#624cb0] flex items-center p-2.5 justify-between relative">
        <div className="flex gap-1">
          <img src={taskLogo} alt="1" className="h-8.75" />
          <img src={taskText} alt="2" className="h-7.5" />
        </div>

        {/* hambargur  */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex flex-col justify-center items-center w-10 h-10 md:hidden"
        >
          <span
            className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"} `}
          />

          <span
            className={`bg-black transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`}
          />

          <span
            className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"}`}
          />
        </button>

        {/* desktop menu */}

        <ul className="hidden md:flex gap-7 px-5 ">
          <li>
            <Link
              to="/"
              className="font-bold text-white hover:text-blue-300 transition-colors cursor-pointer"
            >
              Home
            </Link>
          </li>
          {!token ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="font-bold text-white hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="font-bold text-white hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="font-bold text-white hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="font-bold text-white hover:bg-white hover:text-blue-500 transition-colors"
                >
                  Log Out
                </button>
              </li>
            </>
          )}

          <li>
            <Link
              to="/about"
              className="font-bold text-white hover:text-blue-300 transition-colors cursor-pointer"
            >
              About
            </Link>
          </li>
        </ul>

        {/* mobile menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full overflow-hidden shadow-xl transition-all origin-top ${isOpen ? "opacity-100 translate-y-0 duration-500 ease-out" : "opacity-0 -translate-y-0.5 duration-200 ease-in pointer-events-none"} `}
        >
          <ul className="flex flex-col bg-gray-100 gap-2">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 font-bold cursor-pointer hover:bg-white hover:text-blue-500 transition-colors active:text-blue-500"
              >
                Home
              </Link>
            </li>
            <div className="border-b border-gray-300 mx-4"></div>
            {!token ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 font-bold cursor-pointer hover:bg-white hover:text-blue-500 transition-colors active:text-blue-500"
                  >
                    Login
                  </Link>
                </li>
                <div className="border-b border-gray-300 mx-4"></div>
                <li>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 font-bold cursor-pointer hover:bg-white hover:text-blue-500 transition-colors active:text-blue-500"
                  >
                    Sign Up
                  </Link>
                </li>
                <div className="border-b border-gray-300 mx-4"></div>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 font-bold cursor-pointer hover:bg-white hover:text-blue-500 transition-colors active:text-blue-500"
                  >
                    Dashboard
                  </Link>
                </li>
                <div className="border-b border-gray-300 mx-4"></div>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="block px-4 py-2 font-bold w-full text-left hover:bg-white hover:text-blue-500 transition-colors"
                  >
                    Log Out
                  </button>
                </li>
                <div className="border-b border-gray-300 mx-4"></div>
              </>
            )}

            <li>
              <Link
                to="/about"
                className="block px-4 py-2 font-bold cursor-pointer hover:bg-white hover:text-blue-500 transition-colors active:text-blue-500"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
