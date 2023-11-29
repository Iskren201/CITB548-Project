import React, { useState, useEffect } from "react";

const ShipmentEmployee = () => {
  const [clientUsers, setClientUsers] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");

  const handleSendPackage = async () => {
    try {
      const response = await fetch("http://localhost:3001/sendPackage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderName, senderId, receiverEmail }),
      });

      if (response.ok) {
        console.log("Package sent successfully");
      } else {
        console.error("Failed to send package");
      }
    } catch (error) {
      console.error("Error sending package", error);
    }
  };

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
      <h2 className="text-2xl font-bold mt-4">Send Package</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sender Name:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSenderName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sender Email:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSenderId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Receiver Email:
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setReceiverEmail(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSendPackage}
        >
          Send Package
        </button>
      </form>
    </div>
  );
};

export default ShipmentEmployee;
