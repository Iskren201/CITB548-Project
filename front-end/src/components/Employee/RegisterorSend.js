import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShipmentsList from "./ShipmentsList";

const RegisterorSend = () => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    // Fetch shipments when the component mounts
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/shipments");
      setShipments(response.data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  const handleSendPackage = async () => {
    if (!senderName || !senderEmail || !receiverEmail || !packageDescription) {
      toast.error("Please fill in all fields before sending the package");
      return;
    }

    try {
      // Make an HTTP POST request to your server endpoint
      const response = await axios.post("http://localhost:3001/sendPackage", {
        senderName,
        senderEmail,
        receiverEmail,
        packageDescription,
      });

      // Handle the response from the server (if needed)
      console.log(response.data);

      // Show success toast
      toast.success("Package sent successfully!");

      // Clear the form fields
      setSenderName("");
      setSenderEmail("");
      setReceiverEmail("");
      setPackageDescription("");
    } catch (error) {
      // Handle errors
      console.error("Error sending package:", error);
      // Show error toast
      toast.error("Error sending package");
    }
  };

  const handleMarkAsShipped = async (shipmentId) => {
    try {
      // Make an HTTP POST request to mark the shipment as shipped
      await axios.post(
        `http://localhost:3001/shipments/${shipmentId}/markAsShipped`
      );

      // Refresh shipments after marking as shipped
      fetchShipments();
    } catch (error) {
      console.error("Error marking as shipped:", error);
    }
  };

  const handleUpdateShipment = async (shipmentId) => {
    // Add your logic for updating the shipment here
    console.log(`Update shipment with ID: ${shipmentId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Send Package */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Send Package</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Sender Name:
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Sender Email:
              </label>
              <input
                type="text"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Receiver Email:
              </label>
              <input
                type="text"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Package Description:
              </label>
              <textarea
                value={packageDescription}
                onChange={(e) => setPackageDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <button
              type="button"
              onClick={handleSendPackage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Send Package
            </button>
          </form>
        </div>

        {/* All Shipments */}
        <div>
          <h2 className="text-2xl font-bold mb-4">All Shipments</h2>
          <ul className="divide-y divide-gray-300">
            {shipments.map((shipment) => (
              <li
                key={shipment._id}
                className="py-2 md:flex md:items-center md:justify-between"
              >
                <div className="md:w-2/3">
                  <p className="text-sm">
                    <span className="font-semibold">Sender:</span>{" "}
                    {shipment.senderName}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Receiver:</span>{" "}
                    {shipment.receiverEmail}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Description:</span>{" "}
                    {shipment.packageDescription}
                  </p>
                </div>

                {/* Buttons for marking as shipped and updating */}
                <div className="mt-2 md:mt-0 md:w-1/3 md:flex md:space-x-2">
                  <button
                    onClick={() => handleMarkAsShipped(shipment._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                  >
                    Shipped
                  </button>
                  <button
                    onClick={() => handleUpdateShipment(shipment._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegisterorSend;
