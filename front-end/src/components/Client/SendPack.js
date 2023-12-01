import React, { useState, useEffect } from "react";
import axios from "axios";

const SendPack = () => {
  const [shipments, setShipments] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [packageDescription, setPackageDescription] = useState("");

  const fetchShipments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/shipments");
      setShipments(response.data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleSendPackage = async () => {
    try {
      await axios.post("http://localhost:3001/sendPackage", {
        senderName,
        senderEmail,
        receiverEmail,
        packageDescription,
      });
      // Презареждане на пратките след изпращане на новата пратка
      fetchShipments();
    } catch (error) {
      console.error("Error sending package:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">SendPack.js</h1>
      <form className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Sender Name:
        </label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Sender Email:
        </label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Receiver Email:
        </label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">
          Package Description:
        </label>
        <textarea
          className="mt-1 p-2 w-full border rounded-md"
          value={packageDescription}
          onChange={(e) => setPackageDescription(e.target.value)}
        />

        <button
          type="button"
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          onClick={handleSendPackage}
        >
          Send Package
        </button>
      </form>

      <ul>
        {shipments.map((shipment) => (
          <li key={shipment._id} className="text-gray-800 mb-2">
            Sender: {shipment.senderName}, Receiver: {shipment.receiverEmail}{" "}
            Description: {shipment.packageDescription}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SendPack;
