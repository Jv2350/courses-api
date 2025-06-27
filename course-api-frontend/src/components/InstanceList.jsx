import React, { useState } from "react";

const InstanceList = () => {
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [instances, setInstances] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchInstances = (e) => {
    e.preventDefault();
    fetch(`/api/instances/${year}/${semester}`)
      .then((res) => res.json())
      .then(setInstances)
      .catch((err) => setMsg("Error: " + err));
  };

  const handleDelete = (instance) => {
    if (!window.confirm("Delete this instance?")) return;
    fetch(`/api/instances/${instance.year}/${instance.semester}/${instance.course.courseId}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setMsg("Deleted!");
          setInstances((prev) => prev.filter(i => i.id !== instance.id));
        } else {
          return res.text().then((t) => Promise.reject(t));
        }
      })
      .catch((err) => setMsg("Error: " + err));
  };

  return (
    <div>
      <h2>Course Instances</h2>
      <form onSubmit={fetchInstances} style={{marginBottom:10}}>
        <input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" required style={{marginRight:5}} />
        <input value={semester} onChange={e => setSemester(e.target.value)} placeholder="Semester" required style={{marginRight:5}} />
        <button type="submit">List Instances</button>
      </form>
      <ul>
        {instances.map((i) => (
          <li key={i.id}>
            {i.course.courseId} - {i.course.title} ({i.year} S{i.semester})
            <button style={{marginLeft:8}} onClick={() => handleDelete(i)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>{msg}</div>
    </div>
  );
};

export default InstanceList;
