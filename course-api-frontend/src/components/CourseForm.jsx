import React, { useState, useEffect } from "react";

const CourseForm = () => {
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  const [prereqs, setPrereqs] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then(setAllCourses);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        courseId,
        description,
        prerequisites: prereqs.map((pid) => ({ courseId: pid })),
      }),
    })
      .then((res) =>
        res.ok ? res.json() : res.text().then((t) => Promise.reject(t))
      )
      .then(() => setMsg("Course created!"))
      .catch((err) => setMsg("Error: " + err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Course</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        placeholder="Course ID"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <div>
        <label>Prerequisites:</label>
        <select
          multiple
          value={prereqs}
          onChange={(e) =>
            setPrereqs(Array.from(e.target.selectedOptions, (o) => o.value))
          }
        >
          {allCourses.map((c) => (
            <option key={c.courseId} value={c.courseId}>
              {c.courseId} - {c.title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create</button>
      <div>{msg}</div>
    </form>
  );
};

export default CourseForm;
