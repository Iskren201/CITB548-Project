import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/", {
        email,
        password,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
      </form>
    </>
  );
};

export default Signup;
