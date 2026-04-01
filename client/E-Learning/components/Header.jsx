import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdNightsStay } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Added state for login status
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set `isLoggedIn` to true if token exists
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      setIsLoggedIn(false); // Update state
      navigate("/login");
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 font-[Sen] tracking-wide transition-all duration-300 ${
        isScrolled ? "bg-zinc-900/80 backdrop-blur-lg shadow-md" : "bg-zinc-900 "
      }`}
    >
      <div className="container mx-auto flex text-sm justify-evenly items-center px-6 py-4 font-[Sen]">
        <motion.h1
          className="text-3xl font-extrabold text-[#FACC15] font-[Sen]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", repeatType: "mirror" }}
        >
          E-Learning
        </motion.h1>

        <nav>
          <ul className="flex space-x-6 font-semibold tracking-wide text-white text-lg">
            <li>
              <a
                href="/dashboard"
                className="hover:text-[#FACC15] transition"
              >
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FACC15] transition">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FACC15] transition">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div
          className="flex items-center space-x-9 relative"
          ref={dropdownRef}
        >
          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-[2px] border-white"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="/wallpaperflare.com_wallpaper.jpg"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {isDropdownOpen && (
            <motion.div
              className="absolute top-14 right-0 bg-slate-800 text-white shadow-lg rounded-lg w-44 py-2 px-2 font-semibold tracking-wide z-20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ul className="text-md font-[Poppins]">
                <Link to={"/profile"}>
                  <li className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer font-semibold text-[#Facc15]">
                    Profile
                  </li>
                </Link>
                <Link to={"/My-learning"}>
                  <li className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer font-light ">
                    My Learning
                  </li>
                </Link>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer font-light">
                  Settings
                </li>
                <hr />
                <li
                  className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer mt-2 "
                  onClick={handleLogout}
                >
                  {isLoggedIn ? "Logout" : "Sign In"}
                </li>
              </ul>
            </motion.div>
          )}

          <MdNightsStay className="text-2xl text-white cursor-pointer hover:text-gray-600 transition" />
        </div>
      </div>
    </header>
  );
}

export default Header;
