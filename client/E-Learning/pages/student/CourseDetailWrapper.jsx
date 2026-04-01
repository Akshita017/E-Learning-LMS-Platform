import React from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "../components/CourseDetail";
import coursesData from "../data/courses.json";

const CourseDetailWrapper = () => {
  const { courseTitle } = useParams();

  const selectedCourse = coursesData.find(
    (course) =>
      course.title.toLowerCase().replace(/\s+/g, "-") ===
      courseTitle.toLowerCase()
  );

  if (!selectedCourse) {
    return <div className="p-6 text-red-500">Course not found 😢</div>;
  }

  return <CourseDetail course={selectedCourse} purchased={false} />;
};

export default CourseDetailWrapper;
