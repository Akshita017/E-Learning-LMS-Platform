import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyLearning() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true' || !storedUser?.email) {
      navigate('/login');
      return;
    }

    async function fetchEnrolledCourses() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/enrolled-courses?email=${storedUser.email}`
        );
        const enrolledCourses = response.data.enrolledCourses;

        if (enrolledCourses && enrolledCourses.length > 0) {
          const enrichedCourses = enrolledCourses.map((course, index) => ({
            ...course,
            progress: Math.floor(Math.random() * 50) + 50,
            id: `${course.title}-${index}`,
          }));
          setCourses(enrichedCourses);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error('Failed to fetch enrolled courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrolledCourses();
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-white dark:bg-zinc-900 pb-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-zinc-900 dark:text-white">
          <h1 className="text-4xl font-bold mb-10 text-center text-yellow-400 mt-24">
            My Learning
          </h1>

          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  className="rounded-xl bg-white dark:bg-zinc-800 shadow-md hover:shadow-xl transition-all p-4 flex flex-col justify-between"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="rounded-lg w-full h-40 object-cover mb-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold mb-2 truncate">{course.title}</h2>
                    <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full mb-1">
                      <div
                        className="h-2 bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                      {course.progress}% Complete
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-semibold text-yellow-500">
                      ${course.price}
                    </span>
                    {course.purchasedAt && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Purchased on{' '}
                        {new Date(course.purchasedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
              You haven't enrolled in any courses yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default MyLearning;
