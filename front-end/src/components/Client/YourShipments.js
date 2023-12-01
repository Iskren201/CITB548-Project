import React, { useState, useEffect } from "react";
import axios from "axios";

const YourShipments = ({ userEmail }) => {
  const [userShipments, setUserShipments] = useState([]);

  const fetchUserShipments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/shipments?userEmail=${userEmail}`
      );
      setUserShipments(response.data);
    } catch (error) {
      console.error("Error fetching user shipments:", error);
    }
  };

  useEffect(() => {
    fetchUserShipments();
  }, [userEmail]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Your Shipments</h1>
      {userShipments.length > 0 ? (
        <ul className="list-disc list-inside">
          {userShipments.map((shipment) => (
            <li
              key={shipment._id}
              className="text-gray-800 mb-4 bg-gray-100 p-4 rounded-md shadow-md"
            >
              <p className="mb-2">
                <span className="font-semibold">Sender:</span>{" "}
                {shipment.senderName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Receiver:</span>{" "}
                {shipment.receiverEmail}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {shipment.packageDescription}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-800">No shipments found.</p>
      )}
    </div>
  );
};

export default YourShipments;
