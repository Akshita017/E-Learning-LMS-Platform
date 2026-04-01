import React from 'react';
import courses from '../../../server/data/Courses.json'; // Adjust the path as per your setup
import { useNavigate } from 'react-router-dom';

function OurCourses() {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900 text-white py-12 px-4 sm:px-6 lg:px-8 font-[Sen]  ">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#FACC15]">Our Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-10/12 mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <p className='p-2 mt-5 ml-4'>{course.description}</p>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{course.title}</h3>

              <div className="flex justify-between items-center mb-4">
                <span className="text-[#FACC15] font-bold">${course.price}</span>

              </div>
              <button
                className="w-full bg-[#4F46E5] text-white py-2 rounded-lg hover:bg-[#3B37C9] transition"
                onClick={() => navigate('/course-details', { state: { course } })}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default OurCourses;
