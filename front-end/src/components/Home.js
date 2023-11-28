import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:3001/userRole", {
          params: { email: location.state.id },
        });

        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (location.state && location.state.id) {
      fetchUserRole();
    }
  }, [location.state]);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="homepage">
      {/* <NavBar /> */}
      <h1>Hello {location.state.id} and welcome to the home</h1>
      {userRole && <p>Your role is: {userRole}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
