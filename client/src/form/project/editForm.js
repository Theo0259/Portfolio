import React, { useState } from "react";
import axios from "axios";

function EditForm() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [git, setGit] = useState("");
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
  const handleChangeImage = (e) => {
    setImage(e.target.value);
  };
  const handleChangeGit = (e) => {
    setGit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/project/put/${userId}`, {
        title,
        text,
        image,
        git,
      })

      .then((response) => {
        if (response.status === 200) {
          setMessage("Compétence enregistrée avec succès.");
          setError("");
          setTitle("");
          setText("");
          setImage("");
          setGit("");
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
        <h2>Ajouter une compétence</h2>
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
          <label htmlFor="image"></label>
          <input
            type="text"
            id="image"
            value={image}
            placeholder="Compétence"
            onChange={handleChangeImage}
            required
          />
          <div>
            <label htmlFor="git"></label>
            <input
              type="text"
              id="git"
              value={git}
              placeholder="Compétence"
              onChange={handleChangeGit}
              required
            />
          </div>
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
