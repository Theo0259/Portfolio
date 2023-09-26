import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "../../styles/crud.css";
import AddForm from "../../form/project/addForm";
import DeleteForm from "../../form/project/deleteForm";
import EditForm from "../../form/project/editForm";

function CrudProject() {
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);
  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const OpenAddForm = () => {
    setShowAddForm(true);
    setShowEditForm(false);
    setShowDeleteForm(false);
  };

  const OpenEditForm = () => {
    setShowAddForm(false);
    setShowEditForm(true);
    setShowDeleteForm(false);
  };

  const OpenDeleteForm = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowDeleteForm(true);
  };

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

  useEffect(() => {
    axios
      .get("http://localhost:8000/getAllProjects")
      .then((response) => {
        if (Array.isArray(response.data.result)) {
          const data = response.data.result;
          console.log("Données reçues :", data);
          setData(data); // Mettez à jour l'état avec les données reçues
        } else {
          console.log("Les données ne sont pas reçues :", response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!isValidToken) {
    console.log("Token is not valid, rendering nothing.");
    return null;
  }

  return (
    <section className="Competence">
      <div className="blockCRUD">
        <div className="CRUD">
          <div className="buttonCrud">
            <button onClick={OpenAddForm}>Add a Project</button>
            <button onClick={OpenEditForm}>Edit a Project</button>
            <button onClick={OpenDeleteForm}>Delete a Project</button>
          </div>
          {showAddForm && <AddForm />}
          {showEditForm && <EditForm />}
          {showDeleteForm && <DeleteForm />}
        </div>
        <div className="Liste">
          <h2>Personal List</h2>
          <div>
            {data.map((item) => (
              <div key={item.id_project} className="blockListe">
                <p>{item.title}</p>
                <p>{item.text}</p>
                <p>{item.image}</p>
                <p>{item.git}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CrudProject;
