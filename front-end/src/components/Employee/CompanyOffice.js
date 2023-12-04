import React, { useState, useEffect } from "react";

const CompanyOffice = () => {
  const [officeInfo, setOfficeInfo] = useState({
    name: "",
    location: "",
    // Add other fields as needed
  });

  const [addedOffice, setAddedOffice] = useState(null);
  const [allOffices, setAllOffices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all offices when the component mounts
    const fetchOffices = async () => {
      try {
        const response = await fetch("http://localhost:3001/offices");
        const offices = await response.json();
        setAllOffices(offices);
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };

    fetchOffices();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfficeInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that name and location are not empty
    if (!officeInfo.name || !officeInfo.location) {
      setError("Name and location are required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/addOffice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(officeInfo),
      });

      if (response.ok) {
        // Office added successfully
        const addedOfficeData = await response.json();
        setAddedOffice(addedOfficeData.office);
        console.log("Office added successfully");

        // Fetch and update the list of all offices
        const updatedResponse = await fetch("http://localhost:3001/offices");
        const updatedOffices = await updatedResponse.json();
        setAllOffices(updatedOffices);
        setError(null);
      } else {
        // Handle error cases
        console.error("Error adding office");
      }
    } catch (error) {
      console.error("Error adding office:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Office</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Office Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={officeInfo.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={officeInfo.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Add Office
        </button>
      </form>

      {addedOffice && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Added Office:</h2>
          <p>
            Name: {addedOffice.name}, Location: {addedOffice.location}
            {/* Display other fields as needed */}
          </p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">All Offices:</h2>
        <ul>
          {allOffices.map((office) => (
            <li key={office._id}>
              Name: {office.name}, Location: {office.location}
              <br />
              <br />
              {/* Display other fields as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyOffice;
