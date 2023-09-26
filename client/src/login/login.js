import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(""); // Réinitialisez les messages d'erreur à chaque tentative de connexion.
    setPasswordError("");
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // L'authentification a échoué, définissez les messages d'erreur appropriés.
          setEmailError("Email invalide.");
          setPasswordError("Mot de passe invalide.");
        } else {
          setError("Une erreur s'est produite lors de la connexion.");
        }
      }
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:8000/api/login", {
  //       email,
  //       password,
  //     });
  //     localStorage.setItem("token", response.data.token);
  //     navigate("/dashboard");
  //   } catch (error) {
  //     setError("Message d'erreur :", error);
  //   }
  // };

  return (
    <form>
      <div>
        <input
          placeholder="Enter your Mail"
          type="email"
          id="mail"
          value={email}
          onChange={(e) => setEMail(e.target.value)}
        ></input>
        {emailError && <p className="error-message">{emailError}</p>}
      </div>
      <div>
        <input
          placeholder="Enter your Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      <button onClick={handleLogin} type="submit">
        Connection
      </button>
    </form>
    // <form>
    //   <div>
    //     {/* <label htmlFor="YourMail"></label> */}
    //     <input
    //       placeholder="Enter your Mail"
    //       type="email"
    //       id="mail"
    //       value={email}
    //       onChange={(e) => setEMail(e.target.value)}
    //     ></input>
    //   </div>
    //   <div>
    //     <input
    //       placeholder="Enter your Password"
    //       type="password"
    //       id="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     ></input>
    //   </div>
    //   <button onClick={handleLogin} type="submit">
    //     Connection
    //   </button>
    // </form>
  );
}

export default Login;
