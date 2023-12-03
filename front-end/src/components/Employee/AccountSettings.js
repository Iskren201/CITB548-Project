import React, { useState } from "react";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState("user@example.com");
  const [newPassword, setNewPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const handleUpdateUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUserEmail, // Подменете с реалния имейл на текущия потребител
          newPassword,
          newUserName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User updated successfully:", data);
      } else {
        console.error("Error updating user:", data.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <label htmlFor="newPassword" className="block text-sm font-semibold">
        New Password:
      </label>
      <input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full py-2 px-3 border border-gray-300 rounded-md mb-4"
      />
      <label htmlFor="newUserName" className="block text-sm font-semibold">
        New User Name:
      </label>
      <input
        type="text"
        id="newUserName"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        className="w-full py-2 px-3 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={handleUpdateUser}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Update User
      </button>
    </div>
  );
};

export default AccountSettings;
