
// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [form, setForm] = useState({ name: "", description: "" });

//   const role = localStorage.getItem("role");
//   const navigate = useNavigate();

//   // 📥 Fetch Projects
//   const fetchProjects = async () => {
//     try {
//       const res = await API.get("/projects");
//       setProjects(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load projects");
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // ➕ Create Project (Admin)
//   const createProject = async () => {
//     if (!form.name) {
//       alert("Project name required");
//       return;
//     }

//     try {
//       await API.post("/projects", form);
//       alert("Project Created ✅");
//       setForm({ name: "", description: "" });
//       fetchProjects();
//     } catch (err) {
//       console.log(err);
//       alert("Error creating project");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📁 Projects Page</h2>
      
//       {/* 🔙 Back to Dashboard */}
//       <button onClick={() => navigate("/dashboard")}>
//         ⬅ Back to Dashboard
//       </button>

//       {/* 👑 Admin Create Project */}
//       {role === "Admin" && (
//         <div style={{ margin: "20px 0", border: "1px solid gray", padding: "10px" }}>
//           <h3>Create Project</h3>

//           <input
//             placeholder="Project Name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />

//           <input
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) =>
//               setForm({ ...form, description: e.target.value })
//             }
//           />

//           <button onClick={createProject}>
//             ➕ Create Project
//           </button>
//         </div>
//       )}

//       {/* 📋 Project List */}
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Team</th>
//             <th>Tasks</th>
//           </tr>
//         </thead>

//         <tbody>
//           {projects.map((proj) => (
//             <tr key={proj.id}>
//               <td>{proj.name}</td>
//               <td>{proj.description}</td>

//               {/* 👥 Manage Team */}
//               <td>
//                 <button
//                   onClick={() =>
//                     navigate(`/projects/${proj.id}/team`)
//                   }
//                 >
//                   👥 Manage
//                 </button>
//               </td>

//               {/* 📋 Tasks */}
//               <td>
              
//                 <button
//                   onClick={() =>
//                     navigate(`/create-task?project=${proj.id}`)
//                   }
//                 >
//                   ➕ Add Task
//                 </button> 
              
//                 <button
//                   onClick={() =>
//                     navigate(`/tasks?project=${proj.id}`)
//                   }
//                   style={{ marginLeft: "10px" }}
//                 >
//                   📋 View Tasks
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {projects.length === 0 && <p>No projects found</p>}
//     </div>
//   );
// }

// export default Projects;import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // 📥 Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      console.log("PROJECTS API RESPONSE:", res.data);
      setProjects(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ➕ Create Project (Admin)
  const createProject = async () => {
    if (!form.name) {
      alert("Project name required");
      return;
    }

    try {
      await API.post("/projects", form);
      alert("Project Created ✅");
      setForm({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      console.log(err);
      alert("Error creating project");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📁 Projects Page</h2>

      {/* 🔙 Back */}
      <button onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>

      {/* 👑 CREATE PROJECT (ADMIN ONLY) */}
      {role === "Admin" && (
        <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Create Project</h3>

          <input
            placeholder="Project Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button onClick={createProject}>
            ➕ Create Project
          </button>
        </div>
      )}

      {/* 📋 PROJECT TABLE */}
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Team</th>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((proj) => (
            <tr key={proj.id}>
              <td>{proj.name}</td>
              <td>{proj.description}</td>

              {/* 👥 TEAM */}
              <td>
                <button
                  onClick={() => {
                    if (!proj.id) {
                      alert("Project ID missing");
                      return;
                    }

                    navigate(`/projects/${proj.id}/team`);
                  }}
                >
                  👥 Manage Team
                </button>
                                {/* <button
                  onClick={() =>
                    navigate(`/projects/${proj.id}/team`)
                  }
                >
                  👥 Manage Team
                </button> */}
              </td>

              {/* 📋 TASK NAVIGATION */}
              <td>
                <button
                  onClick={() =>
                    navigate(`/projects/${proj.id}/tasks`)
                  }
                >
                  📋 View Tasks
                </button>
              </td>

              {/* ⚡ NEW ACTIONS */}
              <td style={{ display: "flex", flexDirection: "column", gap: "5px" }}>

                {/* ➕ ADD TASK */}
                <button
                  onClick={async () => {
                    const title = prompt("Enter task title");
                    const description = prompt("Enter task description");

                    if (!title) return alert("Title required");

                    try {
                      await API.post("/tasks", {
                        title,
                        description,
                        project_id: proj.id,
                        assigned_to: 1, // later dynamic
                        due_date: null
                      });

                      alert("Task created ✅");
                    } catch (err) {
                      console.log(err);
                      alert("Task creation failed");
                    }
                  }}
                >
                  ➕ Add Task
                </button>

                {/* 👤 ASSIGN MEMBER */}
                <button
                  onClick={async () => {
                    const userId = prompt("Enter User ID");

                    if (!userId) return;

                    try {
                      await API.post(
                        `/projects/${proj.id}/assign/${userId}`
                      );

                      alert("Member assigned ✅");
                    } catch (err) {
                      console.log(err);
                      alert("Assignment failed");
                    }
                  }}
                >
                  👤 Assign Member
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {projects.length === 0 && <p>No projects found</p>}
    </div>
  );
}

export default Projects;