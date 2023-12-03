import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import NavBar from "./NavBar";
import SendPack from "./Client/SendPack";
import YourShipments from './Client/YourShipments'
import HomeClient from './Client/HomeClient'
import Account from './Client/Account'
import ТrackShipment from './Client/ТrackShipment'
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import AccountSettings from "./Employee/AccountSettings";
import EmployeeTask from "./Employee/EmployeeTask";

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get("http://localhost:3001/userRole", {
                    params: { email: location.state.id },
                });

                setUserRole(response.data.role);
                // Set user email in the state
                setUserEmail(location.state.id);
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
    const componentFiles = {
        "Home": HomeClient,  // Заменете тези със съответните файлове
        "Account": Account,
        "messages": null,
        "Тrack Shipment": ТrackShipment,
        "File Manager": null,
        "Your Shipments": YourShipments,
        "Send": SendPack,  // Пример: SendPack.js
        "Saved": null,
        'Employee Dashboard': EmployeeDashboard,
        'Account Settings': AccountSettings,
        'Task': EmployeeTask,


        // ... Добави още
    };

    const handleMenuItemClick = (component) => {
        setSelectedComponent(component);

        // Зареждане на съответния файл, ако е дефиниран
        const ComponentFile = componentFiles[component];
        if (ComponentFile) {
            setSelectedComponent(<ComponentFile />);
        }
    };

    return (
        <>
            <Header user={location.state.id} role={userRole} onLogout={handleLogout} />
            <NavBar userRole={userRole} selectedComponent={selectedComponent} onMenuItemClick={handleMenuItemClick} />
        </>
    );
}

export default Home;
