
// import React, { useEffect, useState, useCallback } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom"; // ✅ ADD THIS

// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     pending: 0,
//     overdue: 0
//   });

//   const handleLogout = () => {
//   localStorage.clear();
//   navigate("/login", { replace: true });
// };

//   const role = localStorage.getItem("role");
//   const userEmail = localStorage.getItem("email");

//   const navigate = useNavigate(); // ✅ ADD THIS
//   useEffect(() => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//       }
//     }, []);

//   const fetchTasks = useCallback(async () => {
//     try {
//       // const res = await API.get("/tasks");
//       // let data = res.data;

//       // if (role === "Member") {
//       //   data = data.filter(task => task.assigned_to === userEmail);
//       // }
//       const res = await API.get("/tasks");
//       let data = res.data;

//       const role = localStorage.getItem("role");
//       const userId = Number(localStorage.getItem("userId"));

//       if (role === "Member") {
//         data = data.filter(task => task.assigned_to === userId);
//       }

//       setTasks(data);

//       let completed = 0, pending = 0, overdue = 0;
//       const today = new Date();

//       data.forEach(task => {
//         if (task.status === "Completed") completed++;
//         else pending++;

//         if (
//           task.due_date &&
//           new Date(task.due_date) < today &&
//           task.status !== "Completed"
//         ) {
//           overdue++;
//         }
//       });

//       setStats({
//         total: data.length,
//         completed,
//         pending,
//         overdue
//       });

//     } catch (err) {
//       console.log(err);
//       alert("Failed to fetch tasks");
//     }
//   }, [role, userEmail]);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   const deleteTask = async (id) => {
//     try {
//       await API.delete(`/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await API.put(`/tasks/${id}`, { status });
//       fetchTasks();
//     } catch (err) {
//       alert("Update failed");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>{role} Dashboard</h2>
//       <button onClick={handleLogout}>
//         🚪 Logout
//       </button>

//       {/* 🔵 NAVIGATION BUTTON */}
//       <button onClick={() => navigate("/projects")}>
//         📁 Go to Projects
//       </button>

//       {/* 👑 Admin Button */}
//       {role === "Admin" && (
//         <button onClick={() => navigate("/create-task")}>
//           ➕ Create Task
//         </button>
//       )}

//       {/* 📊 Stats */}
//       <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
//         <div>📋 Total: {stats.total}</div>
//         <div>✅ Completed: {stats.completed}</div>
//         <div>⏳ Pending: {stats.pending}</div>
//         <div>⚠️ Overdue: {stats.overdue}</div>
//       </div>

//       {/* 📋 Task Table */}
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Status</th>
//             <th>Due Date</th>
//             <th>Assigned To</th>

//             {role === "Member" && <th>Update</th>}
//             {role === "Admin" && <th>Actions</th>}
//           </tr>
//         </thead>

//         <tbody>
//           {tasks.map(task => (
//             <tr key={task.id}>
//               <td>{task.title}</td>
//               <td>{task.description || "N/A"}</td>

//               <td style={{
//                 color: task.status === "Completed" ? "green" : "orange"
//               }}>
//                 {task.status}
//               </td>

//               <td>{task.due_date || "N/A"}</td>
//               <td>{task.assigned_to || "N/A"}</td>

//               {role === "Member" && (
//                 <td>
//                   <select
//                     value={task.status}
//                     onChange={(e) =>
//                       updateStatus(task.id, e.target.value)
//                     }
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                 </td>
//               )}

//               {role === "Admin" && (
//                 <td>
//                   <button onClick={() => deleteTask(task.id)}>
//                     Delete
//                   </button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {tasks.length === 0 && <p>No tasks found</p>}
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate(); // ✅ MUST BE FIRST

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });

  const role = localStorage.getItem("role");
  const userEmail = localStorage.getItem("email");
  console.log(userEmail);

  // ✅ SAFE AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // ✅ LOGOUT FIXED
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  // // ✅ FETCH TASKS
  // const fetchTasks = useCallback(async () => {
  //   try {
  //     const res = await API.get("/tasks");
  //     let data = res.data;

  //     const userId = Number(localStorage.getItem("userId"));

  //     if (role === "Member") {
  //       data = data.filter(task => task.assigned_to === userId);
  //     }

  //     setTasks(data);

  //     let completed = 0, pending = 0, overdue = 0;
  //     const today = new Date();

  //     data.forEach(task => {
  //       if (task.status === "Completed") completed++;
  //       else pending++;

  //       if (
  //         task.due_date &&
  //         new Date(task.due_date) < today &&
  //         task.status !== "Completed"
  //       ) {
  //         overdue++;
  //       }
  //     });

  //     setStats({
  //       total: data.length,
  //       completed,
  //       pending,
  //       overdue
  //     });

  //   } catch (err) {
  //     console.log(err);
  //     alert("Failed to fetch tasks");
  //   }
  // }, [role]);

  // useEffect(() => {
  //   fetchTasks();
  // }, [fetchTasks]);
  const fetchTasks = useCallback(async () => {
  try {
    const res = await API.get("/tasks");
    let data = res.data;

    const userId = Number(localStorage.getItem("userId"));

    if (role === "Member") {
      data = data.filter(task => task.assigned_to === userId);
    }

    setTasks(data);

    let completed = 0, pending = 0, overdue = 0;
    const today = new Date();

    data.forEach(task => {
      if (task.status === "Completed") completed++;
      else pending++;

      if (
        task.due_date &&
        new Date(task.due_date) < today &&
        task.status !== "Completed"
      ) {
        overdue++;
      }
    });

    setStats({
      total: data.length,
      completed,
      pending,
      overdue
    });

  } catch (err) {
    console.log(err);
    alert("Failed to fetch tasks");
  }
}, [role]);

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="container">
      
      {/* HEADER */}
      <div className="header">
        <h2>{role} Dashboard</h2>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px"
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* NAVIGATION */}
      <button onClick={() => navigate("/projects")}>
        📁 Go to Projects
      </button>

      {role === "Admin" && (
        <button onClick={() => navigate("/create-task")}>
          ➕ Create Task
        </button>
      )}

      {/* STATS */}
      <div className="stats">
        <div>📋 Total: {stats.total}</div>
        <div>✅ Completed: {stats.completed}</div>
        <div>⏳ Pending: {stats.pending}</div>
        <div>⚠️ Overdue: {stats.overdue}</div>
      </div>

      {/* TASK TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Assigned To</th>
            {role === "Member" && <th>Update</th>}
            {role === "Admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description || "N/A"}</td>

              <td style={{
                color: task.status === "Completed" ? "green" : "orange"
              }}>
                {task.status}
              </td>

              <td>{task.due_date || "N/A"}</td>
              <td>{task.assigned_to || "N/A"}</td>

              {role === "Member" && (
                <td>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(task.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              )}

              {role === "Admin" && (
                <td>
                  <button onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {tasks.length === 0 && <p>No tasks found</p>}
    </div>
  );
}

export default Dashboard;