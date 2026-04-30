import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("email", res.data.email);
      navigate("/dashboard");
    } catch (err) {
       console.error(err);
       alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
    <div className="auth-box">
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} /><br></br><br></br>
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} /><br></br><br></br>
      <button onClick={handleLogin}>Login</button><br></br><br></br>

      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
    </div>
  );
}

export default Login;