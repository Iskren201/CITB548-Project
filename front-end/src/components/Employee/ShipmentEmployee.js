import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShipmentEmployee = () => {
  const [clientUsers, setClientUsers] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [shipments, setShipments] = useState([]);

  const handleSendPackage = async () => {
    try {
      const response = await fetch("http://localhost:3001/sendPackage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderName, senderEmail, receiverEmail }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Package sent successfully");
        toast.update("New Shipment:", responseData.shipment);
        // Refresh the list of shipments after a successful send
        fetchShipments();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to send package: ${errorData.error}`);
      }
    } catch (error) {
      toast.error("Error sending package", error);
    }
  };

  const fetchShipments = async () => {
    try {
      const response = await fetch("http://localhost:3001/shipments");
      const data = await response.json();

      if (response.ok) {
        setShipments(data);
      } else {
        console.error("Failed to fetch shipments");
      }
    } catch (error) {
      console.error("Error fetching shipments", error);
    }
  };

  const handleDeleteShipment = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/shipments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Shipment deleted successfully");
        // Refresh the list of shipments after a successful delete
        fetchShipments();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete shipment: ${errorData.error}`);
      }
    } catch (error) {
      toast.error("Error deleting shipment", error);
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
    fetchShipments(); // Fetch shipments when the component mounts
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <ToastContainer />
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
            onChange={(e) => setSenderEmail(e.target.value)}
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
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Sent Shipments</h2>
        <ul>
          {shipments.map((shipment) => (
            <li key={shipment._id} className="mb-2">
              Sender: {shipment.senderName}, Receiver: {shipment.receiverEmail}
              <button
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleDeleteShipment(shipment._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShipmentEmployee;
