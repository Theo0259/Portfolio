import React, { useState } from "react";
import axios from "axios";

function DeleteForm() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangeId = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/career/delete/${userId}`)

      .then((response) => {
        if (response.status === 200) {
          setMessage("Compétence enregistrée avec succès.");
          setError("");
          setUserId("");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setMessage("");
          setError("Erreur lors de l'enregistrement de la compétence");
        }
      })
      .catch((err) => {
        setMessage("");
        setError("Erreur lors de l'enregistrement de la compétence.");
        console.error(err);
      });
  };

  return (
    <div className="formulaire">
      <form onSubmit={handleSubmit}>
        <h2>Delete a Career</h2>
        <div>
          <label htmlFor="id"></label>
          <input
            type="number"
            id="id"
            value={userId}
            placeholder="id"
            onChange={handleChangeId}
            required
          />
        </div>
        <button type="submit">Delete</button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default DeleteForm;
