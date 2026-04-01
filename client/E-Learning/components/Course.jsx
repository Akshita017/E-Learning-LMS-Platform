import { Link } from "react-router-dom";

const Course = ({ course }) => {
  if (!course) return null; // Prevents crashes if course is undefined

  return (
    <Link to={`/course-detail/${course._id || "#"}`} className="block">
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">

        {/* Thumbnail with Fallback Image */}
        <div className="relative">
          <img
            src={course.courseThumbnail || "/nextpng_1732621657.png"} // Use fallback
            alt={course.courseTitle || "Course Thumbnail"}
            className="w-full h-36 object-cover rounded-t-lg"
            loading="lazy"
          />
        </div>

        <div className="px-5 py-4 space-y-3">
          {/* Course Title */}
          <h1 className="hover:underline font-bold text-lg truncate">
            {course.courseTitle || "Untitled Course"}
          </h1>

          {/* Creator Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Creator Initial */}
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                {course.creator?.name ? course.creator.name[0].toUpperCase() : "U"}
              </div>
              <h1 className="font-medium text-sm">
                {course.creator?.name || "Unknown Instructor"}
              </h1>
            </div>

            {/* Course Level */}
            <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
              {course.courseLevel || "All Levels"}
            </span>
          </div>

          {/* Course Price */}
          <div className="text-lg font-bold">
            {course.coursePrice !== undefined ? `₹${course.coursePrice}` : "Free"}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course;
