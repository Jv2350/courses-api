import React, { useEffect, useState } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then(setCourses);
  }, []);
  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((c) => (
          <li key={c.courseId}>
            <b>{c.courseId}</b>: {c.title} <br />
            Prerequisites:{" "}
            {c.prerequisites?.map((p) => p.courseId).join(", ") || "None"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
