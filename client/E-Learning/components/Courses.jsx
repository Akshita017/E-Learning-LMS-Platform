import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "../components/ui/skeleton";

const Courses = ({ searchQuery, platform }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchCourses = async () => {
      let options = {};

      if (platform === "YouTube") {
        options = {
          method: "GET",
          url: "https://youtube138.p.rapidapi.com/search/",
          params: {
            q: searchQuery + " course for study not any entertainment please",
            hl: "en",
            gl: "US",
          },
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host": "youtube138.p.rapidapi.com",
          },
        };
      } else if (platform === "Coursera") {
        options = {
          method: "GET",
          url: "https://api.coursera.org/api/courses.v1",
        };
      } else if (platform === "Udemy") {
        options = {
          method: 'GET',
          url: 'https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/',
          params: {
            page: '1',
            page_size: '10',
            query: searchQuery
          },
          headers: {
            'x-rapidapi-key': 'd7d53838bfmsha3f525617852c30p13b5bdjsna4f9fb790769',
            'x-rapidapi-host': 'udemy-paid-courses-for-free-api.p.rapidapi.com'
          }
        };
      }

      try {
        setLoading(true);
        const response = await axios.request(options);
        console.log(response.data);

        const results = response.data.courses || [];

        const filteredCourses = results.map((item) => ({
          id: item.id,
          name: item.name || "Untitled Course",
          thumbnail: item.image || "/default-thumbnail.jpg",
          instructor: item.instructors?.[0]?.display_name || "Unknown Instructor",
          url: item.url || `https://www.udemy.com/course/${item.id}/`,
        }));

        setCourses(filteredCourses);
      } catch (err) {
        console.error(`Error fetching ${platform} courses:`, err);
        setError(`Failed to load ${platform} courses: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchQuery, platform]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-[#Facc15] font-[Inter] mt-5">
        {platform} Courses
      </h1>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Array.from({ length: 8 }).map((_, index) => (
            <CourseSkeleton key={index} />
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && courses.length === 0 && (
        <p className="text-gray-400 text-center">No courses found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8">
        {courses.map((course) => (
          <a
            key={course.id}
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-800 p-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300"
          >
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="mt-4 text-lg font-semibold">{course.name}</h2>
            <p className="text-sm text-gray-400 mt-2">by {course.instructor}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-zinc-800 p-4 rounded-xl shadow-md animate-pulse">
      <Skeleton className="w-full h-40 rounded-md" />
      <div className="mt-4 space-y-3">
        <Skeleton className="h-6 w-3/4 rounded" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-1/4 rounded" />
      </div>
    </div>
  );
};
