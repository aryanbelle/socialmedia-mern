import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");  // Set "Home" as default active tab
  const [myUsername, setMyUsername] = useState("");
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // Close dropdown when clicking outside of it
  useEffect(() => {

    const my_user_name = localStorage.getItem("username");
    setMyUsername(my_user_name);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogOut = ()=>{
    localStorage.removeItem("mytoken");
    localStorage.removeItem("username");
    navigate("/signup");
  }

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-transparent w-full">
      {/* Left: Logo and Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="text-gray-800 font-semibold">SOCIAL MEDIA</div>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M15 10a5 5 0 11-10 0 5 5 0 0110 0z"
            />
          </svg>
        </div>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center space-x-6">
        {/* Home Icon */}
        <div
          onClick={() => handleTabClick("Home")}
          className={`flex items-center space-x-2 cursor-pointer transition-all duration-200 ${
            activeTab === "Home" ? "bg-white rounded-full px-3 py-1" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${activeTab === "Home" ? "text-blue-500" : "text-gray-700"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 9.75L12 3l9 6.75V18a3 3 0 01-3 3H6a3 3 0 01-3-3V9.75z"
            />
          </svg>
          {activeTab === "Home" && (
            <span className="font-medium text-gray-700">Home</span>
          )}
        </div>

        {/* Communities Icon */}
        <div
          onClick={() => handleTabClick("Communities")}
          className={`flex items-center space-x-2 cursor-pointer transition-all duration-200 ${
            activeTab === "Communities" ? "bg-white rounded-full px-3 py-1" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${activeTab === "Communities" ? "text-blue-500" : "text-gray-700"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 10V8a4 4 0 00-8 0v2m-2 10a8 8 0 1116 0H6z"
            />
          </svg>
          {activeTab === "Communities" && (
            <span className="font-medium text-gray-700">Communities</span>
          )}
        </div>

        {/* Notification Icon */}
        <div
          onClick={() => handleTabClick("Notifications")}
          className={`flex items-center space-x-2 cursor-pointer transition-all duration-200 ${
            activeTab === "Notifications" ? "bg-white rounded-full px-3 py-1" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${activeTab === "Notifications" ? "text-blue-500" : "text-gray-700"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11zm-7 0a3 3 0 106 0"
            />
          </svg>
          {activeTab === "Notifications" && (
            <span className="font-medium text-gray-700">Notifications</span>
          )}
        </div>

        {/* Messages Icon with Badge */}
        <div
          onClick={() => handleTabClick("Messages")}
          className={`relative flex items-center justify-center min-w-[48px] cursor-pointer transition-all duration-200 ${
            activeTab === "Messages" ? "bg-white rounded-full px-3 py-1" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${activeTab === "Messages" ? "text-blue-500" : "text-gray-700"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {activeTab === "Messages" && (
            <span className="font-medium text-gray-700">Messages</span>
          )}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            5
          </span>
        </div>

        {/* Profile with Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full shadow cursor-pointer transition-all duration-200 hover:bg-gray-300"
            onClick={toggleDropdown}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium text-gray-700 select-none">
              {myUsername}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-300 opacity-0 transform scale-90"
              style={{
                opacity: dropdownOpen ? "1" : "0",
                transform: dropdownOpen ? "scale(1)" : "scale(0.9)",
              }}
            >
              <ul>
                <li onClick={handleLogOut} className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer transition duration-150">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: scaleY(0.9);
            }
            100% {
              opacity: 1;
              transform: scaleY(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
            transform-origin: top;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
