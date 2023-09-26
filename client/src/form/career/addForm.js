import React, { useState } from "react";
import axios from "axios";

function AddForm() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleChangeTitlte = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/create-career", { title, text })
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
        <h2>Add a Career</h2>
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
        <button type="submit">Add</button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default AddForm;
