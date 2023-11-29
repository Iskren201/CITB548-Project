import React, { useState } from "react";

const ShipmentEmployee = () => {
  const [sentShipments, setSentShipments] = useState([]);
  const [receivedShipments, setReceivedShipments] = useState([]);

  const registerSentShipment = (shipment) => {
    setSentShipments((prevShipments) => [...prevShipments, shipment]);
  };

  const registerReceivedShipment = (shipment) => {
    setReceivedShipments((prevShipments) => [...prevShipments, shipment]);
  };

  const sendShipment = (shipmentDetails) => {
    const shipment = { ...shipmentDetails, date: new Date() };
    registerSentShipment(shipment);
  };

  const receiveShipment = (shipmentDetails) => {
    const shipment = { ...shipmentDetails, date: new Date() };
    registerReceivedShipment(shipment);
  };

  return (
    <div className="container mx-auto p-4 mr-10">
      <h2 className="text-2xl font-semibold mb-4">Изпратени пратки</h2>
      <ul className="list-disc pl-4">
        {sentShipments.map((shipment, index) => (
          <li key={index}>{JSON.stringify(shipment)}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold my-4">Получени пратки</h2>
      <ul className="list-disc pl-4">
        {receivedShipments.map((shipment, index) => (
          <li key={index}>{JSON.stringify(shipment)}</li>
        ))}
      </ul>

      <div className="my-8">
        {/* Форма за изпращане на пратка */}
        <h3 className="text-xl font-semibold mb-2">Изпрати пратка</h3>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const shipmentDetails = Object.fromEntries(formData.entries());
            sendShipment(shipmentDetails);
          }}
        >
          <label className="flex flex-col">
            Име на получателя:
            <input
              className="border border-gray-300 p-2 mt-1"
              type="text"
              name="recipientName"
              required
            />
          </label>
          <label className="flex flex-col">
            Адрес на получателя:
            <input
              className="border border-gray-300 p-2 mt-1"
              type="text"
              name="recipientAddress"
              required
            />
          </label>
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            Изпрати
          </button>
        </form>
      </div>

      <div className="my-8">
        {/* Форма за получаване на пратка */}
        <h3 className="text-xl font-semibold mb-2">Получи пратка</h3>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const shipmentDetails = Object.fromEntries(formData.entries());
            receiveShipment(shipmentDetails);
          }}
        >
          <label className="flex flex-col">
            Име на изпращача:
            <input
              className="border border-gray-300 p-2 mt-1"
              type="text"
              name="senderName"
              required
            />
          </label>
          <label className="flex flex-col">
            Адрес на изпращача:
            <input
              className="border border-gray-300 p-2 mt-1"
              type="text"
              name="senderAddress"
              required
            />
          </label>
          <button className="bg-green-500 text-white p-2 rounded hover:bg-green-700">
            Получи
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShipmentEmployee;
