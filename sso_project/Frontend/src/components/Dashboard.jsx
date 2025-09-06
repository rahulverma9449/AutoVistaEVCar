import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { getUser, logout } from "../API/api_test";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      if (!data) {
        navigate("/login"); // redirect if not logged in
      } else {
        setUser(data);
      }
    }
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // redirect after logout
  };

  return (
    <div className="dashboard-page">
      <header>
        <h1>Dashboard</h1>
        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main>
        {user ? (
          <div className="user-info">
            <h2>Welcome, {user.name}</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
