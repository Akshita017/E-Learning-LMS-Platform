import React from "react";
import { FiBarChart2 } from "react-icons/fi"; // Dashboard icon
import { PiBooksDuotone } from "react-icons/pi"; // Courses icon
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-black text-white p-4 border-r border-gray-800 mt-16">
      <div className="flex flex-col gap-6 mt-4 font-[Sen]">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200 hover:bg-gray-400"
        >
          <FiBarChart2 size={20} />
          <span className="text-sm">Dashboard</span>
        </Link>

        <Link
          to="/add-course"
          className="flex items-center gap-3 text-blue-400 hover:text-white transition-all duration-200"
        >
          <PiBooksDuotone size={20} />
          <span className="text-sm">Courses</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
