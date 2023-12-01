import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import NavBar from "./NavBar";

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
                // console.log("User role:", response.data.role);
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
    // тест
    return (
        <>
            <Header user={location.state.id} role={userRole} onLogout={handleLogout} />
            <NavBar />
        </>
    );
}

export default Home;
