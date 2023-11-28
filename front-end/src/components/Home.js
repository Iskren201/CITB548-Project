import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="homepage">
      <h1>Hello {location.state.id} and welcome to the home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
