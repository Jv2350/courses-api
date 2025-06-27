import React, { useEffect, useState } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    fetch("/api/courses")
      .then((res) => res.json())
      .then(setCourses)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = (courseId) => {
    if (!window.confirm("Delete this course?")) return;
    fetch(`/api/courses/${courseId}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setMsg("Deleted!");
          fetchCourses();
        } else {
          return res.text().then((t) => Promise.reject(t));
        }
      })
      .catch((err) => setMsg("Error: " + err));
  };

  return (
    <div>
      <h2>Courses</h2>
      {loading && <div>Loading...</div>}
      <ul>
        {courses.map((c) => (
          <li key={c.courseId}>
            <b>{c.courseId}</b>: {c.title} <br />
            Prerequisites:{" "}
            {c.prerequisites?.map((p) => p.courseId).join(", ") || "None"}
            <button
              style={{ marginLeft: 8 }}
              onClick={() => handleDelete(c.courseId)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>{msg}</div>
    </div>
  );
};

export default CourseList;
