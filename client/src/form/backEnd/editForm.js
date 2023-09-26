import React, { useState } from "react";
import axios from "axios";

function EditForm() {
  const [level, setLevel] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setLevel(e.target.value);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeId = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/back-end/put/${userId}`, { title, level })

      .then((response) => {
        if (response.status === 200) {
          setMessage("Compétence enregistrée avec succès.");
          setError("");
          setTitle("");
          setLevel("");
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
        <h2>Edit a Back End</h2>
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Compétence"
            onChange={handleChangeTitle}
            required
          />
        </div>
        <div>
          <label htmlFor="level"></label>
          <input
            type="number"
            id="level"
            value={level}
            placeholder="Compétence"
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit">Edit</button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default EditForm;
