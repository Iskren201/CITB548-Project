import React, { useState, useEffect } from "react";
import ShipmentsList from "./ShipmentsList";
const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/users?role=employee"
        );
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
      <ul className="list-disc pl-4">
        {employees.map((employee) => (
          <li key={employee._id} className="mb-2">
            {employee.email}
          </li>
        ))}
      </ul>
      {employees.length > 0 && <ShipmentsList userEmail={employees[0].email} />}
    </div>
  );
};

export default EmployeeDashboard;
