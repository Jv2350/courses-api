import React, { useState, useEffect } from "react";

const InstanceForm = () => {
  const [courseId, setCourseId] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then(setAllCourses);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/instances", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        year: parseInt(year),
        semester: parseInt(semester),
      }),
    })
      .then((res) =>
        res.ok ? res.json() : res.text().then((t) => Promise.reject(t))
      )
      .then(() => setMsg("Instance created!"))
      .catch((err) => setMsg("Error: " + err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Course Instance</h2>
      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        required
      >
        <option value="">Select Course</option>
        {allCourses.map((c) => (
          <option key={c.courseId} value={c.courseId}>
            {c.courseId} - {c.title}
          </option>
        ))}
      </select>
      <input
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year (e.g. 2025)"
        required
      />
      <input
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        placeholder="Semester (e.g. 1)"
        required
      />
      <button type="submit">Create Instance</button>
      <div>{msg}</div>
    </form>
  );
};

export default InstanceForm;
