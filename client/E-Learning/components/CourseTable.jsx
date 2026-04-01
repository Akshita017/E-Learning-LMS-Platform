import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
// import { Navigate } from 'react-router-dom';
function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/addcourses');
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // const handleAddCourse = async () => {
  //    navigate('/courses');


  //     try {
  //       const response = await axios.post('http://localhost:8000/api/addcourses', newCourse);
  //       setCourses([...courses, response.data]);  // Append new course from API response
  //     } catch (error) {
  //       console.error('Error adding course:', error);
  //       alert('Failed to add the course. Please try again.');
  //     }

  // };


  if (loading) return <p className='text-center text-white mt-20'>Loading...</p>;
  if (error) return <p className='text-center text-red-500 mt-20'>{error}</p>;

  return (
    <>
      <Header />
      <div className='flex'>
        <Sidebar />
      <div className='w-full min-h-screen bg-zinc-900 p-10 text-white mt-16 text-sm font-[Sen]'>

      <Link to={'/create-course'}> <button
          // onClick={handleAddCourse}
          className='bg-white text-black font-semibold px-4 py-2 rounded-lg mb-6  transition-all'
        >
          Create New Course
        </button></Link>

        <table className='w-full text-left bg-zinc-800 rounded-lg overflow-hidden'>
          <thead className='bg-zinc-700'>
            <tr>
              <th className='py-3 px-4'>Title</th>
              <th className='py-3 px-4'>Price</th>
              <th className='py-3 px-4'>Status</th>
              <th className='py-3 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className='border-b border-zinc-700 hover:bg-gray-800'>
                <td className='py-3 px-4'>{course.title}</td>
                <td className='py-3 px-4'>{course.price}₹</td>
                <td className='py-3 px-4'>
                  <span className='bg-green-500 text-black px-2 py-1 rounded-md'>
                    {course.status}
                  </span>
                </td>
                <td className='py-3 px-4'>
                  <button className='bg-yellow-500 text-black px-3 py-1 rounded-md hover:bg-yellow-600'>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default CourseTable;
