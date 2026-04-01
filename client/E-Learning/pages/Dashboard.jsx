import React, { useState } from "react";
import Header from "../components/Header";
import {
  FaLaptopCode,
  FaBook,
  FaBrain,
  FaUsers,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Courses from "../components/Courses";
import OurCourses from "../components/OurCourses";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [platform, setPlatform] = useState("YouTube"); // State for platform selection
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleExploreClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if not logged in
    } else {
      // Continue exploring courses
      console.log("Exploring courses...");
    }
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="w-full h-screen font-[Sen] font-semibold bg-gradient-to-b from-[#1E1E2E] to-[#121212] flex flex-col items-center justify-center  text-md  mt-10">
        <div className="max-w-7xl w-full text-center bg-gray-800/90 shadow-lg rounded-2xl p-8 text-white">
          <h1 className="text-4xl font-bold text-[#FACC15] drop-shadow-md">
            Unlock Your Potential with the Perfect Course!
          </h1>
          <p className="text-gray-300 mt-3 text-lg">
            Discover, Learn, and Upskill with our wide range of courses.
          </p>

          {/* Search Input and Platform Dropdown */}
          <div className="mt-6 flex items-center justify-center space-x-3">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full max-w-md px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Dropdown for Platform Selection */}
            <select
              className="bg-gray-700 text-white px-4 py-3 rounded-lg"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="YouTube">YouTube</option>
              <option value="Coursera">Coursera</option>
              <option value="Udemy">Udemy</option>
            </select>

            <button
              className="bg-[#fffffff2] hover:bg-[#ffffffa9] px-5 py-3 text-black font-semibold rounded-lg transition-all shadow-md hover:shadow-xl"
              onClick={() => setSearchQuery(searchQuery)}
            >
              Search
            </button>
          </div>

          <p className="text-gray-400 mt-4 text-sm">
            🌟 Explore **1000+ courses** across different categories.
          </p>
          <button className="bg-white px-6 py-2 text-black rounded-lg transition-all mt-10 shadow-md font-semibold cursor-pointer hover:shadow-xl" onClick={handleExploreClick}>
            Explore Courses
          </button>
        </div>

        <motion.div
          className="text-3xl font-bold text-white flex flex-col items-center mt-18 "
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaArrowCircleDown className="text-gray-400 text-5xl" />
        </motion.div>
      </section>

      {/* Courses Section with Dynamic Search and Platform */}
      <section className="  bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto text-center">

          <Courses searchQuery={searchQuery} platform={platform} />
        </div>
      </section>
      <OurCourses />

          <section className="py-20 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#FACC15]">
            Featured Courses
          </h2>
          <p className="text-gray-300 mt-2">
            Handpicked courses for you to get started.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "React for Beginners", instructor: "John Doe" },
              { title: "Python for Data Science", instructor: "Jane Smith" },
              { title: "SEO & Digital Marketing", instructor: "Alex Johnson" },
            ].map((course, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-gray-400 mt-1">
                  Instructor: {course.instructor}
                </p>
                <button className="mt-4 bg-[#4F46E5] px-4 py-2 rounded-lg text-white font-medium hover:bg-[#3B37C9]">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
