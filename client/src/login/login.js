import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Message d'erreur :", error);
    }
  };

  return (
    <form>
      <h1>Connection</h1>
      <div>
        {/* <label htmlFor="YourMail"></label> */}
        <input
          placeholder="Enter your Mail"
          type="email"
          id="mail"
          value={email}
          onChange={(e) => setEMail(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          placeholder="Enter your Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button onClick={handleLogin} type="submit">
        Connection
      </button>
    </form>
  );
}

export default Login;
