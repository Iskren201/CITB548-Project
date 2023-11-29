import React, { useState, useEffect } from "react";

const AcustomerOfaCompany = () => {
  const [clientUsers, setClientUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users?role=client");
        const data = await response.json();

        if (response.ok) {
          setClientUsers(data);
        } else {
          console.error("Failed to fetch client users");
        }
      } catch (error) {
        console.error("Error fetching client users", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Client Users</h2>
      <ul className="list-disc ml-4">
        {clientUsers.map((user) => (
          <li key={user.email} className="mb-2">
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcustomerOfaCompany;
