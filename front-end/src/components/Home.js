import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import MainMenu from "./MainMenu";

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
    <div>
      <NavBar user={location.state.id} role={userRole} />
      <main>
        <MainMenu />

      </main>
    </div>
  );
}

export default Home;
