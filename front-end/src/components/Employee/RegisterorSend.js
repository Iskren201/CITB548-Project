import React, { useState, useEffect } from "react";

const RegisterorSend = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [packageInfo, setPackageInfo] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:3001/users?role=client");
        const clientsData = await response.json();
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleSendPackage = async () => {
    // Проверка за попълване на всички полета
    if (!selectedClient || !senderName || !receiverName || !packageInfo) {
      console.error("Please fill in all fields");
      return;
    }

    try {
      // Изпрати заявка за изпращане на пратка
      const response = await fetch("http://localhost:3001/sendPackage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName,
          senderEmail: selectedClient,
          receiverEmail: selectedClient,
          packageDescription: packageInfo,
        }),
      });

      if (response.ok) {
        console.log("Package sent successfully!");
        // Изчисти полетата след успешно изпращане
        setSenderName("");
        setReceiverName("");
        setPackageInfo("");
      } else {
        console.error("Error sending package");
      }
    } catch (error) {
      console.error("Error sending package:", error);
    }
  };

  const handleRegisterClient = async () => {
    // Проверка за попълване на всички полета
    if (!senderName || !receiverName || !packageInfo || !password) {
      console.error("Please fill in all fields");
      return;
    }

    try {
      // Изпрати заявка за регистрация на нов клиент
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: senderName,
          password: password,
          role: "client",
          userName: senderName,
        }),
      });

      if (response.ok) {
        console.log("Client registered successfully!");
        // Изчисти полетата след успешна регистрация
        setSenderName("");
        setReceiverName("");
        setPackageInfo("");
        setPassword("");
        // Обнови списъка с клиенти
        const updatedClients = await (
          await fetch("http://localhost:3001/users?role=client")
        ).json();
        setClients(updatedClients);
      } else {
        console.error("Error registering client");
      }
    } catch (error) {
      console.error("Error registering client:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Register or Send Package</h2>
      <select
        className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        <option value="">Select a Client</option>
        {clients.map((client) => (
          <option key={client._id} value={client.email}>
            {client.userName}
          </option>
        ))}
      </select>

      {!selectedClient && (
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={() => setShowRegisterForm(true)}
          >
            Register New Client
          </button>
        </div>
      )}

      {(showRegisterForm || !selectedClient) && (
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sender Name:
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
          />

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Receiver Name:
          </label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
          />

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Package Information:
          </label>
          <textarea
            value={packageInfo}
            onChange={(e) => setPackageInfo(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
          />

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
          />

          {showRegisterForm && (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800"
              onClick={handleRegisterClient}
            >
              Register
            </button>
          )}

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={handleSendPackage}
          >
            Send Package
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterorSend;
