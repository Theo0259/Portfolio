import React, { useState } from "react";
import axios from "axios";

function EditForm() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleChangeTitlte = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeId = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/education/put/${userId}`, { title, text })

      .then((response) => {
        if (response.status === 200) {
          setMessage("Compétence enregistrée avec succès.");
          setError("");
          setTitle("");
          setText("");
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
        <h2>Edit an Education</h2>
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Compétence"
            onChange={handleChangeTitlte}
            required
          />
        </div>
        <div>
          <label htmlFor="text"></label>
          <input
            type="text"
            id="text"
            value={text}
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
