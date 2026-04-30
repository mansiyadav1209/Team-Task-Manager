
import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member"
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
    <div className="auth-box">
      <h2>Signup</h2>

      <input placeholder="Name" onChange={(e)=>setForm({...form, name:e.target.value})}/><br></br><br></br>
      <input placeholder="Email" onChange={(e)=>setForm({...form, email:e.target.value})}/><br></br><br></br>
      <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, password:e.target.value})}/><br></br><br></br>

      <select value={form.role} onChange={(e)=>setForm({...form, role:e.target.value})}>
        <option value="Member">Member</option>
        <option value="Admin">Admin</option>
      </select><br></br><br></br>

      <button onClick={handleSignup}>Signup</button><br></br><br></br>
    </div>
    </div>
  );
}

export default Signup;