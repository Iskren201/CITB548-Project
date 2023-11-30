// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import NavBar from "./NavBar";
// import MainMenu from "./MainMenu";
// import MainMenuClient from "./Client/MainMenuClient";
// import CompanyInformation from "./Client/CompanyInformation";
// import ShipmentHistory from "./Client/ShipmentHistory";
// import SendingShipment from "./Client/SendingShipment";
// import CompanyOffice from "./Client/CompanyOffice";
// import ShipmentReference from "./Client/ShipmentReference";
// import LogisticCompany from "./Employee/LogisticCompany";
// import CompanyEmployee from "./Employee/CompanyEmployee";
// import AcustomerOfaCompany from "./Employee/AcustomerOfaCompany";
// import CompanyOfficeEmplooye from "./Employee/CompanyOfficeEmplooye";
// import ShipmentEmployee from "./Employee/ShipmentEmployee";

// function Home() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [userRole, setUserRole] = useState(null);
//     const [selectedMenuItem, setSelectedMenuItem] = useState(null);

//     useEffect(() => {
//         const fetchUserRole = async () => {
//             try {
//                 const response = await axios.get("http://localhost:3001/userRole", {
//                     params: { email: location.state.id },
//                 });

//                 setUserRole(response.data.role);
//             } catch (error) {
//                 console.error("Error fetching user role:", error);
//             }
//         };

//         if (location.state && location.state.id) {
//             fetchUserRole();
//         }
//     }, [location.state]);

//     const handleLogout = () => {
//         if (userRole === "client") {
//             navigate("/MainMenuClient");
//         } else if (userRole === "employee") {
//             navigate("/MainMenu");
//         } else {
//             navigate("/error");
//         }
//     };

//     const menuComponents = {
// client: {
//     MainMenu: MainMenuClient,
//     CompanyInformation,
//     ShipmentHistory,
//     SendingShipment,
//     CompanyOffice,
//     ShipmentReference,
// },
// employee: {
//     MainMenu,
//     LogisticCompany,
//     CompanyEmployee,
//     AcustomerOfaCompany,
//     CompanyOfficeEmplooye,
//     ShipmentEmployee,
// },
//     };
//     const renderMenuItem = () => {
//         const Component = menuComponents[userRole]?.MainMenu;
//         return Component ? <Component onItemClick={handleMenuItemClick} /> : null;
//     };

//     const renderSelectedMenuItem = () => {
//         const Component = menuComponents[userRole]?.[selectedMenuItem];
//         return Component ? <Component /> : null;
//     };

//     const handleMenuItemClick = (menuItem) => {
//         setSelectedMenuItem(menuItem);
//     };

//     return (
//         <>
//             {/* <NavBar user={location.state.id} role={userRole} onLogout={handleLogout} />
//             <div className="flex h-screen">
//                 <main className="w-1/6">{renderMenuItem()}</main>
//                 <section className="w-2/3 ml-2">{renderSelectedMenuItem()}</section>
//                 <div></div>
//             </div> */}

//             {/* Fix */}
//             {/* <NavBar user={location.state.id} role={userRole} onLogout={handleLogout} />
//             <div className="flex h-screen">

//                 <h1>Test</h1>
//             </div> */}
//         </>
//     );
// }

// export default Home;


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

    const renderMainMenu = () => {
        if (userRole === "client") {
            return <MainMenuClient onItemClick={handleMenuItemClick} />;
        } else if (userRole === "employee") {
            return <MainMenu onItemClick={handleMenuItemClick} />;
        }
        // Handle other roles or show a default component
        return <MainMenu />;
    };

    const renderSelectedMenuItem = () => {
        const menuComponents = {
            client: {
                MainMenu: MainMenuClient,
                CompanyInformation,
                ShipmentHistory,
                SendingShipment,
                CompanyOffice,
                ShipmentReference,
            },
            employee: {
                MainMenu,
                LogisticCompany,
                CompanyEmployee,
                AcustomerOfaCompany,
                CompanyOfficeEmplooye,
                ShipmentEmployee,
            },
        };

        const Component = menuComponents[userRole]?.[selectedMenuItem];
        return Component ? <Component /> : null;
    };

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <>
            <NavBar user={location.state.id} role={userRole} onLogout={handleLogout} />
            <div className="flex h-screen">
                <main className="w-1/6">{renderMainMenu()}</main>
                <section className="w-2/3 ml-2">{renderSelectedMenuItem()}</section>
                <div></div>
            </div>
        </>
    );
}

export default Home;
