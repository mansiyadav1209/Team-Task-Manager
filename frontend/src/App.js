// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Projects from "./pages/Projects";
// import CreateTask from "./pages/CreateTask";
// import ProjectTasks from "./pages/ProjectTasks";
// import Team from "./pages/Team";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/create-task" element={<CreateTask />} />
//         <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} />
//         <Route path="/projects/:projectId/team" element={<Team />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import CreateTask from "./pages/CreateTask";
import ProjectTasks from "./pages/ProjectTasks";
import Team from "./pages/Team";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 AUTH ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔥 MAIN APP */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create-task" element={<CreateTask />} />

        {/* 🔥 PROJECT ROUTES */}
        <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} />
        <Route path="/projects/:projectId/team" element={<Team />} />

        {/* 🔥 IMPORTANT: PREVENT BLANK PAGE */}
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;