import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

function Team() {
  const { projectId } = useParams();
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const fetchTeam = async () => {
    try {
      const res = await API.get(`/projects/${projectId}`);
      setMembers(res.data.members || []);
    } catch (err) {
      console.log(err);
      alert("Failed to load team");
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [projectId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Project Team</h2>

      <button onClick={() => navigate("/projects")}>
        ⬅ Back
      </button>

      <h3>Members:</h3>

      {members.length === 0 ? (
        <p>No members assigned</p>
      ) : (
        <ul>
          {members.map((m, index) => (
            <li key={index}>
              User ID: {m.user_id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Team;