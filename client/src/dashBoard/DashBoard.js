import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../styles/dashBoard.css";
import { Link } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found, redirecting to login.");
      navigate("/login");
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwt_decode(token);

      setIsValidToken(true); // Marquez le token comme valide dès qu'il est décodé avec succès
    } catch (error) {
      console.error("Erreur lors du décodage du token : ", error);
      navigate("/login");
    }
  }, [navigate]);

  if (!isValidToken) {
    console.log("Token is not valid, rendering nothing.");
    return null;
  }

  console.log("Rendering Dashboard component.");
  return (
    <section className="dashBoard">
      <h1>Welcome to the Admin Page</h1>
      <div className="choice">
        <Link to="/CrudPersonal">
          <div className="case">
            <p>Personal</p>
          </div>
        </Link>
        <Link to="/CrudEducation">
          <div className="case">
            <p>Education</p>
          </div>
        </Link>
        <Link to="/CrudCareer">
          <div className="case">
            <p>Career</p>
          </div>
        </Link>
        <Link to="/CrudFrontEnd">
          <div className="case">
            <p>FontEnd</p>
          </div>
        </Link>
        <Link to="/CrudBackEnd">
          <div className="case">
            <p>Backend</p>
          </div>
        </Link>
        <Link to="/CrudProject">
          <div className="case">
            <p>Projects</p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default DashBoard;
