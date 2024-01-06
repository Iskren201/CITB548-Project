import React, { useState, useEffect } from "react";
import ShipmentsList from "./ShipmentsList";
import ClientList from "./ClientList";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState(""); // Добавете този стейт

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/users?role=employee"
        );
        const data = await response.json();
        setEmployees(data);

        // Задайте текущия логнат потребителски емайл тук
        setCurrentUserEmail("example@example.com"); // Заменете този емайл със стойността от вашата аутентикация
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="flex justify-between p-8">
      {/* Employee Users Section */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
        <ul className="list-disc pl-4">
          {employees.map((employee) => (
            <li key={employee._id} className="mb-2">
              {employee.email}
            </li>
          ))}
        </ul>
        <br />
        {employees.length > 0 && <ShipmentsList userEmail={currentUserEmail} />}
      </div>

      {/* Client Users Section */}
      <div className="w-1/2">
        <ClientList />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
