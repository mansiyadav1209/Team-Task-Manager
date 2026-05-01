import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";

function CreateTask() {
  const [projects, setProjects] = useState([]);

  // eslint-disable-next-line no-unused-vars
   const [users, setUsers] = useState([]);
  

  const [form, setForm] = useState({
    title: "",
    description: "",
    project_id: "",
    assigned_to: "",
    due_date: "",
    status: "Pending"
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // prefill project from URL
  useEffect(() => {
    const projectId = searchParams.get("project");
    if (projectId) {
      setForm((prev) => ({ ...prev, project_id: projectId }));
    }
  }, [searchParams]);

  // fetch projects
  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  // fetch users (you may need backend endpoint later)
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users"); // if not available, we can fix later
      setUsers(res.data);
    } catch (err) {
      console.log("Users API missing");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  // create task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", form);
      alert("Task Created ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Task creation failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Create Task</h2>

      <button onClick={() => navigate("/dashboard")}>
        ⬅ Back
      </button>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

        {/* Title */}
        <input
          placeholder="Task Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />
        <br /><br />

        {/* Description */}
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <br /><br />

        {/* Project */}
        <select
          value={form.project_id}
          onChange={(e) =>
            setForm({ ...form, project_id: e.target.value })
          }
          required
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <br /><br />

        {/* Assign To */}
        <input
          placeholder="Assign To (User ID)"
          value={form.assigned_to}
          onChange={(e) =>
            setForm({ ...form, assigned_to: e.target.value })
          }
        />
        <br /><br />

        {/* Due Date */}
        <input
          type="date"
          value={form.due_date}
          onChange={(e) =>
            setForm({ ...form, due_date: e.target.value })
          }
        />
        <br /><br />

        {/* Status */}
        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <br /><br />

        <button type="submit">
          ➕ Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;