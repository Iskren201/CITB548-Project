import React, { useState, useEffect } from "react";

const ShipmentsList = ({ userEmail }) => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch("http://localhost:3001/shipments");
        const data = await response.json();
        setShipments(data);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      }
    };

    fetchShipments();
  }, []); // Заявката ще бъде направена само веднъж при зареждането на компонента

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Sent Shipments</h2>
      <ul className="list-disc pl-4">
        {shipments.map((shipment) => (
          <li key={shipment._id} className="mb-2">
            Sender: {shipment.senderName}, Receiver: {shipment.receiverEmail},
            Description: {shipment.packageDescription}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentsList;
