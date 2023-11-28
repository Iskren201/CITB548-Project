import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/signup", {
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exists");
          } else if (res.data === "notexist") {
            history("/home", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>

        <form onSubmit={submit}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Signup
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center">OR</p>
        </div>

        <div className="mt-4">
          <Link
            to="/"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center justify-center flex"
          >
            Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
