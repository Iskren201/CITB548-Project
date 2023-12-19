import React, { useState } from "react";
import axios from "axios";

const RegisterorSend = () => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [packageDescription, setPackageDescription] = useState("");

  const handleSendPackage = async () => {
    console.log({
      senderName,
      senderEmail,
      receiverEmail,
      packageDescription,
    });

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
    } catch (error) {
      // Handle errors
      console.error("Error sending package:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
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
  );
};

export default RegisterorSend;
