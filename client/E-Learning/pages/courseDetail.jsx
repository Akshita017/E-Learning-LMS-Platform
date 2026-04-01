import React from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

const CourseDetail = ({ purchased }) => {
  const location = useLocation();
  const course = location.state?.course;
   const navigate = useNavigate();

  if (!course) {
    return (
      <div className="text-center py-20 text-xl text-gray-400 bg-zinc-900 min-h-screen">
        Course details not found. Please go back and select a course.
      </div>
    );
  }

  const {
    title = "Untitled Course",
    description = "No description available.",
    price = "0",
    image = "",
    rating = 0,
    lectures = [
      {
        lectureTitle: "Sample Lecture",
        videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
    ],
    creator = { name: "Anonymous" },
    createdAt = new Date().toISOString(),
    enrolledStudents = [],
  } = course;

  return (
    <>
    <Header/>
    <div className="bg-zinc-900 text-white min-h-screen mt-16 p-5">
      {/* Header Section */}
      <div className="bg-zinc-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-lg text-gray-300">Comprehensive course overview</p>
          <p>
            Created By{" "}
            <span className="text-yellow-400 underline italic">
              {creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>ℹ️</span>
            <p>Last updated {createdAt.split("T")[0]}</p>
          </div>
          <p className="text-gray-400">Students enrolled: {enrolledStudents.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-6 px-4 flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-yellow-300 mb-2">Description</h2>
            <p className="text-sm text-gray-300">{description}</p>
          </div>

          <div className="border border-gray-700 bg-zinc-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-yellow-300 mb-1">Course Content</h2>
            <p className="text-sm text-gray-400 mb-4">
              {lectures.length} lectures
            </p>
            <img src = {course.image} className="w-5/8"></img>
            <ul className="space-y-2">
              {lectures.map((lecture, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-blue-400">▶️</span>
                  <p>{lecture.lectureTitle}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 border border-gray-700 bg-zinc-800 rounded-lg p-4">
          <div className="aspect-video mb-4 rounded overflow-hidden">
            <ReactPlayer
              url={lectures[0].videoUrl}
              width="100%"
              height="100%"
              controls
            />
          </div>
          <h3 className="font-semibold text-lg text-gray-200 mb-2">
            {lectures[0].lectureTitle}
          </h3>
          <div className="border-t border-gray-700 my-2"></div>
          <p className="text-lg font-bold text-yellow-300 mb-4">Price: ₹{price}</p>
          {purchased ? (
            <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Continue Course
            </button>
          ) : (
            <button className="w-full py-2 bg-white text-black rounded hover:bg-black hover:text-white transition" onClick={() => navigate('/checkout', { state: { course } })}>

              Buy Course
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default CourseDetail;
