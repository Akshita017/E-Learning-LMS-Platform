import React from 'react';
import { Progress } from "../components/ui/progress";
import Header from '../components/Header';
import { motion } from 'framer-motion';
import purchasedCourses from '../../../server/data/Purchased.json'; // Update the path as needed

function MyLearning() {
  // Add dummy progress and image (you can later fetch real data using courseId)
  const coursesWithExtras = purchasedCourses.map((course, index) => ({
    ...course,
    progress: Math.floor(Math.random() * 50) + 50,  
    image: course.image, // Or map courseId/title to real images if needed
    id: index + 1, // Add an id for mapping
  }));

  return (
    <>
      <Header />
      <div className='w-full h-cover bg-zinc-900 bg- font-[Poppins] pb-20'>
        <div className="w-7xl m-auto p-6 my-16 text-white">
          <h1 className="text-4xl font-bold mb-10 mt-20 text-center text-[#Facc15] animate-bounce">
            My Learning
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
            {coursesWithExtras.map((course) => (
              <motion.div
                key={course.id}
                className="p-4 rounded-lg shadow-lg bg-zinc-800 overflow-hidden transform hover:scale-105 transition-all duration-100"
                whileHover={{ scale: 1.05 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
              >
                <img
                  src={course.image}
                  alt={course.courseTitle}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{course.courseTitle}</h2>

                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1.5 }}
                >
                  <Progress value={course.progress} className="mb-2" />
                </motion.div>

                <p className="text-sm text-gray-400">
                  {course.progress}% Complete
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Purchased on {new Date(course.purchasedAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyLearning;
