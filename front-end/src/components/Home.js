import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import MainMenu from "./MainMenu";
import MainMenuClient from "./Client/MainMenuClient";
import CompanyInformation from "./Client/CompanyInformation";
import ShipmentHistory from "./Client/ShipmentHistory";
import SendingShipment from "./Client/SendingShipment";
import CompanyOffice from "./Client/CompanyOffice";
import ShipmentReference from "./Client/ShipmentReference";
import LogisticCompany from "./Employee/LogisticCompany";
import CompanyEmployee from "./Employee/CompanyEmployee";
import AcustomerOfaCompany from "./Employee/AcustomerOfaCompany";
import CompanyOfficeEmplooye from "./Employee/CompanyOfficeEmplooye";
import ShipmentEmployee from "./Employee/ShipmentEmployee";


function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

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
        if (userRole === "client") {
            navigate("/MainMenuClient");
        } else if (userRole === "employee") {
            navigate("/MainMenu");
        } else {
            navigate("/error");
        }
    };

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <>
            <NavBar
                user={location.state.id}
                role={userRole}
                onLogout={handleLogout}
            />
            <div className="flex h-screen">
                <main className="w-1/6">
                    {userRole === "client" ? (
                        <MainMenuClient onItemClick={handleMenuItemClick} />
                    ) : (
                        <MainMenu onItemClick={handleMenuItemClick} />
                    )}
                </main>
                <section className="w-2/3 ml-2">
                    {selectedMenuItem === "companyInfo" && <CompanyInformation />}
                    {selectedMenuItem === "ShipmentHistory" && <ShipmentHistory />}
                    {selectedMenuItem === "SendingShipment" && <SendingShipment />}
                    {selectedMenuItem === "CompanyOffice" && <CompanyOffice />}
                    {selectedMenuItem === "ShipmentReference" && <ShipmentReference />}
                </section>

                <section className="w-2/3 ml-2">
                    {selectedMenuItem === "LogisticCompany" && <LogisticCompany />}
                    {selectedMenuItem === "CompanyEmployee" && <CompanyEmployee />}
                    {selectedMenuItem === "AcustomerOfaCompany" && <AcustomerOfaCompany />}
                    {selectedMenuItem === "CompanyOfficeEmplooye" && <CompanyOfficeEmplooye />}
                    {selectedMenuItem === "ShipmentEmployee" && <ShipmentEmployee />}
                </section>
                <div></div>
            </div>
        </>
    );
}

export default Home;
