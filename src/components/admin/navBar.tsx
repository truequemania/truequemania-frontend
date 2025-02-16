import logoImage from "../../assets/img/logo.png";
import user from "../../assets/img/user.png";
import { useState } from "react";

const NavBar = ({ toggleAside, showModal }: { toggleAside: () => void; showModal: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b shadow-md bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleAside}
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="/home-admin" className="flex ml-2 md:mr-24">
              <img
                src={logoImage}
                className="h-12 rounded-full bg-white"
                alt="FlowBite Logo"
              />
            </a>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-white focus:outline-none"
            >
              <img src={user} className="w-10 h-10 rounded-full" alt="User" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-50">
                <ul className="py-2 text-white">
                  <li>
                    <button
                      onClick={showModal}
                      className="transition duration-300 transform hover:scale-105 flex items-center p-2 text-white rounded-lg bg-gray-800 hover:bg-orange-500 w-full text-left"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
