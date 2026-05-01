import React, { useEffect, useState, useCallback} from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

function ProjectTasks() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // const fetchTasks = async () => {
  //   try {
  //     const res = await API.get(`/projects/${projectId}/tasks`);
  //     setTasks(res.data);
  //   } catch (err) {
  //     console.log(err);
  //     alert("Failed to load tasks");
  //   }
  // };

  // useEffect(() => {
  //   fetchTasks();
  // }, [fetchTasks,projectId]);
  const fetchTasks = useCallback(async () => {
  try {
    const res = await API.get(`/projects/${projectId}/tasks`);
    setTasks(res.data);
  } catch (err) {
    console.log(err);
  }
}, [projectId]);

useEffect(() => {
  fetchTasks();
}, [fetchTasks]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Project Tasks</h2>

      <button onClick={() => navigate("/projects")}>
        ⬅ Back
      </button>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th> 
            <th>Status</th>
            <th>Assigned To</th>
            <th>Due Date</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description || "N/A"}</td>
              <td>{t.status}</td>
              <td>{t.assigned_to}</td>
              <td>{t.due_date || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {tasks.length === 0 && <p>No tasks found for this project</p>}
    </div>
  );
}

export default ProjectTasks;