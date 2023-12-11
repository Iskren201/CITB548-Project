import React, { useState, useEffect } from "react";
import axios from "axios";

const ShipmentsList = ({ userEmail }) => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        // Използваме API endpoint за заявка към пратките на дадения потребител
        const response = await axios.get(
          `/userShipments?userEmail=${userEmail}`
        );
        setShipments(response.data);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      }
    };

    fetchShipments();
  }, [userEmail]);

  return (
    <div>
      <h2>Пратки изпратени от {userEmail}</h2>
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment._id}>
            <strong>Име на изпращач:</strong> {shipment.senderName}
            <br />
            <strong>Имейл на изпращач:</strong> {shipment.senderEmail}
            <br />
            <strong>Описание на пакета:</strong> {shipment.packageDescription}
            <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentsList;
