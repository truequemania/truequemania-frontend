import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { linkBackend } from "../ts/urls";
import logoImage from "../../assets/img/logo.png";

let socket: Socket | null = null;

const NavBar = ({ toggleAside }: { toggleAside: () => void }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const userSession = localStorage.getItem("USER_SESSION");
    const parsedSession = userSession ? JSON.parse(userSession) : null;
    const userId = parsedSession?.id;

    if (userId) {
      socket = io(linkBackend);

      socket.emit("registerUser", { userId });

      socket.on("notificationCount", (data: { unreadCount: number }) => {
        setNotificationCount(data.unreadCount);
      });

      return () => {
        socket?.disconnect();
      };
    } else {
      console.error("User ID not found in session.");
    }
  }, []);

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
            <a href="/" className="flex ml-2 md:mr-24">
              <img
                src={logoImage}
                className="h-12 rounded-full bg-white"
                alt="FlowBite Logo"
              />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/chats">
              <button
                type="button"
                className="relative p-2 text-orange-500 hover:text-white focus:outline-none"
                aria-label="View notifications"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 8.75v5.408a2.032 2.032 0 01-.595 1.437L6 17h5m4 0a3 3 0 11-6 0h6z"
                  ></path>
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
