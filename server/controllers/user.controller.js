const mysql = require("mysql");

// const db = require("../config/db");
// const conn = mysql.createConnection(db);

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const createPersonal = (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: "Données manquantes" });
  }
  const query = "INSERT INTO personal (title, text) VALUES (?, ?)";
  conn.query(query, [title, text], (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({
        error: "Erreur lors de l'insertion des données",
        result,
      });
    } else {
      res.status(200).json({ message: "Personal enregistré" });
    }
  });
};

// Contrôleur pour obtenir un seul personal par ID
const getPersonal = (req, res) => {
  const personalId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
  const query = "SELECT * FROM personal WHERE id_personal = ?"; // Remplacez "users" par le nom de votre table

  conn.query(query, [personalId], (err, result) => {
    if (err) {
      console.log("Erreur lors de la récupération de personal : " + err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la personal" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Personal non trouvé" });
      } else {
        res.status(200).json({ result }); // Vous renvoyez le premier résultat, car il ne devrait y avoir qu'un seul utilisateur avec cet ID
      }
    }
  });
};

// // Contrôleur pour obtenir un seul personal par ID
// const getPersonal = (req, res) => {
//   const personalId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
//   const query = "SELECT * FROM personal WHERE id_personal = ?"; // Remplacez "users" par le nom de votre table

//   conn.query(query, [personalId], (err, result) => {
//     if (err) {
//       console.log("Erreur lors de la récupération de personal : " + err);
//       res
//         .status(500)
//         .json({ error: "Erreur lors de la récupération de la personal" });
//     } else {
//       if (result.length === 0) {
//         res.status(404).json({ error: "Personal non trouvé" });
//       } else {
//         // Au lieu de renvoyer un objet avec une clé "result", renvoyez directement le tableau de données
//         res.status(200).json(result);
//       }
//     }
//   });
// };

//Modifier un personal
const editPersonal = (req, res) => {
  const personalId = req.params.id; // Assuming the ID is passed in the request parameters
  const { title, text } = req.body;

  // Vérifie si au moins un des champs à mettre à jour est présent
  if (!title && !text) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  // Préparation de la requête SQL pour la mise à jour des données utilisateur dans la base de données
  const query = "UPDATE personal SET title=?, text=? WHERE id_personal=?";

  // Collecte les valeurs qui doivent être mises à jour et ajoute 'personalId' as dernière valeur
  const valuesToUpdate = [
    title,
    text,
    personalId, // Using the 'personalId' extracted from URL parameters here
  ];

  // Exécute la requête SQL avec les données fournies
  conn.query(query, valuesToUpdate, (e, result) => {
    if (e) {
      console.log("Erreur lors de la mise à jour des données : " + e);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour des données", result });
    } else {
      res.status(200).json({ message: "Personal mis à jour avec succès" });
    }
  });
};

// Delete a personal by ID
const deletePersonal = (req, res) => {
  const personalId = req.params.id; // Assuming the ID is passed in the request parameters
  // Vérifie si l'ID personal est présent dans les paramètres de la requêtea
  if (!personalId) {
    return res.status(400).json({ error: "Identifiant de personal manquant" });
  }
  // Préparation de la requête SQL pour supprimer personal de la base de données
  const query = "DELETE FROM personal WHERE id_personal = ?";
  // Exécute la requête SQL avec l'ID personal fourni
  conn.query(query, [personalId], (e, result) => {
    if (e) {
      console.log("Erreur lors de la suppression de personal : " + e);
      res.status(500).json({
        error: "Erreur lors de la suppression de personal",
        result,
      });
    } else {
      // Vérifie si des lignes ont été affectées, ce qui indique que l'utilisateur a été supprimé avec succès
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Personal supprimé avec succès" });
      } else {
        // Si aucune ligne n'a été affectée, cela signifie que l'utilisateur avec l'ID donné n'a pas été trouvé
        res.status(404).json({ error: "Personal non trouvé" });
      }
    }
  });
};

const createEducation = (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: "Données manquantes" });
  }
  const query = "INSERT INTO education (title, text) VALUES (?, ?)";
  conn.query(query, [title, text], (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({
        error: "Erreur lors de l'insertion des données",
        result,
      });
    } else {
      res.status(200).json({ message: "Personal enregistré" });
    }
  });
};

// Contrôleur pour obtenir un seul education par ID
const getEducation = (req, res) => {
  const educationId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
  const query = "SELECT * FROM education WHERE id_education = ?"; // Remplacez "users" par le nom de votre table

  conn.query(query, [educationId], (err, result) => {
    if (err) {
      console.log("Erreur lors de la récupération de personal : " + err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de education" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Personal non trouvé" });
      } else {
        res.status(200).json({ result }); // Vous renvoyez le premier résultat, car il ne devrait y avoir qu'un seul utilisateur avec cet ID
      }
    }
  });
};

//Get all users
const getAllEducation = (req, res) => {
  const query = "SELECT * FROM education";
  conn.query(query, (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({ error: "Erreur lors de l'insertion des données" });
    } else {
      res.status(200).json({ result });
    }
  });
};

//Modifier un education
const editEducation = (req, res) => {
  const educationId = req.params.id; // Assuming the ID is passed in the request parameters
  const { title, text } = req.body;

  // Vérifie si au moins un des champs à mettre à jour est présent
  if (!title && !text) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  // Préparation de la requête SQL pour la mise à jour des données utilisateur dans la base de données
  const query = "UPDATE education SET title=?, text=? WHERE id_education=?";

  // Collecte les valeurs qui doivent être mises à jour et ajoute 'educationId' as dernière valeur
  const valuesToUpdate = [
    title,
    text,
    educationId, // Using the 'personalId' extracted from URL parameters here
  ];

  // Exécute la requête SQL avec les données fournies
  conn.query(query, valuesToUpdate, (e, result) => {
    if (e) {
      console.log("Erreur lors de la mise à jour des données : " + e);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour des données", result });
    } else {
      res.status(200).json({ message: "Personal mis à jour avec succès" });
    }
  });
};

// Delete a personal by ID
const deleteEducation = (req, res) => {
  const educationId = req.params.id; // Assuming the ID is passed in the request parameters
  // Vérifie si l'ID personal est présent dans les paramètres de la requêtea
  if (!educationId) {
    return res.status(400).json({ error: "Identifiant de education manquant" });
  }
  // Préparation de la requête SQL pour supprimer personal de la base de données
  const query = "DELETE FROM education WHERE id_education = ?";
  // Exécute la requête SQL avec l'ID personal fourni
  conn.query(query, [educationId], (e, result) => {
    if (e) {
      console.log("Erreur lors de la suppression de personal : " + e);
      res.status(500).json({
        error: "Erreur lors de la suppression de personal",
        result,
      });
    } else {
      // Vérifie si des lignes ont été affectées, ce qui indique que l'utilisateur a été supprimé avec succès
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Personal supprimé avec succès" });
      } else {
        // Si aucune ligne n'a été affectée, cela signifie que l'utilisateur avec l'ID donné n'a pas été trouvé
        res.status(404).json({ error: "Personal non trouvé" });
      }
    }
  });
};

const createCareer = (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: "Données manquantes" });
  }
  const query = "INSERT INTO career (title, text) VALUES (?, ?)";
  conn.query(query, [title, text], (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({
        error: "Erreur lors de l'insertion des données",
        result,
      });
    } else {
      res.status(200).json({ message: "Career enregistré" });
    }
  });
};

// Contrôleur pour obtenir un seul career par ID
const getCareer = (req, res) => {
  const careerId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
  const query = "SELECT * FROM career WHERE id_career = ?"; // Remplacez "users" par le nom de votre table

  conn.query(query, [careerId], (err, result) => {
    if (err) {
      console.log("Erreur lors de la récupération de career : " + err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la career" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Career non trouvé" });
      } else {
        res.status(200).json({ career: result[0] }); // Vous renvoyez le premier résultat, car il ne devrait y avoir qu'un seul utilisateur avec cet ID
      }
    }
  });
};

//Get all users
const getAllCareer = (req, res) => {
  const query = "SELECT * FROM career";
  conn.query(query, (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({ error: "Erreur lors de l'insertion des données" });
    } else {
      res.status(200).json({ result });
    }
  });
};

//Modifier une career
const editCareer = (req, res) => {
  const careerId = req.params.id; // Assuming the ID is passed in the request parameters
  const { title, text } = req.body;

  // Vérifie si au moins un des champs à mettre à jour est présent
  if (!title && !text) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  // Préparation de la requête SQL pour la mise à jour des données utilisateur dans la base de données
  const query = "UPDATE career SET title=?, text=? WHERE id_career=?";

  // Collecte les valeurs qui doivent être mises à jour et ajoute 'userId' as dernière valeur
  const valuesToUpdate = [
    title,
    text,
    careerId, // Using the 'userId' extracted from URL parameters here
  ];

  // Exécute la requête SQL avec les données fournies
  conn.query(query, valuesToUpdate, (e, result) => {
    if (e) {
      console.log("Erreur lors de la mise à jour des données : " + e);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour des données", result });
    } else {
      res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    }
  });
};

// Delete a career by ID
const deleteCareer = (req, res) => {
  const careerId = req.params.id; // Assuming the ID is passed in the request parameters
  // Vérifie si l'ID de l'utilisateur est présent dans les paramètres de la requêtea
  if (!careerId) {
    return res
      .status(400)
      .json({ error: "Identifiant de l'utilisateur manquant" });
  }
  // Préparation de la requête SQL pour supprimer l'utilisateur de la base de données
  const query = "DELETE FROM career WHERE id_career = ?";
  // Exécute la requête SQL avec l'ID de l'utilisateur fourni
  conn.query(query, [careerId], (e, result) => {
    if (e) {
      console.log("Erreur lors de la suppression de l'utilisateur : " + e);
      res.status(500).json({
        error: "Erreur lors de la suppression de l'utilisateur",
        result,
      });
    } else {
      // Vérifie si des lignes ont été affectées, ce qui indique que l'utilisateur a été supprimé avec succès
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
      } else {
        // Si aucune ligne n'a été affectée, cela signifie que l'utilisateur avec l'ID donné n'a pas été trouvé
        res.status(404).json({ error: "Utilisateur non trouvé" });
      }
    }
  });
};

const createFrontEnd = (req, res) => {
  const { title, level } = req.body;
  if (!title || !level) {
    return res.status(400).json({ error: "Données manquantes" });
  }
  const query = "INSERT INTO front_end (title, level) VALUES (?, ?)";
  conn.query(query, [title, level], (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({
        error: "Erreur lors de l'insertion des données",
        result,
      });
    } else {
      res.status(200).json({ message: "front-end enregistré" });
    }
  });
};

// Contrôleur pour obtenir un seul career par ID
const getFrontEnd = (req, res) => {
  const frontEndId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
  const query = "SELECT * FROM front-end WHERE id_front_end = ?"; // Remplacez "users" par le nom de votre table

  conn.query(query, [frontEndId], (err, result) => {
    if (err) {
      console.log("Erreur lors de la récupération de front-end : " + err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la front-end" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Front-end non trouvé" });
      } else {
        res.status(200).json({ skill: result[0] }); // Vous renvoyez le premier résultat, car il ne devrait y avoir qu'un seul utilisateur avec cet ID
      }
    }
  });
};

//Get all users
const getAllFrontEnd = (req, res) => {
  const query = "SELECT * FROM front_end";
  conn.query(query, (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({ error: "Erreur lors de l'insertion des données" });
    } else {
      res.status(200).json({ result });
    }
  });
};

//Modifier un skill
const editFrontEnd = (req, res) => {
  const frontEndId = req.params.id; // Assuming the ID is passed in the request parameters
  const { title, level } = req.body;

  // Vérifie si au moins un des champs à mettre à jour est présent
  if (!title && !level) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  // Préparation de la requête SQL pour la mise à jour des données utilisateur dans la base de données
  const query = "UPDATE front-end SET title=?, level=? WHERE id_front_end=?";

  // Collecte les valeurs qui doivent être mises à jour et ajoute 'skillId' as dernière valeur
  const valuesToUpdate = [
    title,
    level,
    frontEndId, // Using the 'skillId' extracted from URL parameters here
  ];

  // Exécute la requête SQL avec les données fournies
  conn.query(query, valuesToUpdate, (e, result) => {
    if (e) {
      console.log("Erreur lors de la mise à jour des données : " + e);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour des données", result });
    } else {
      res.status(200).json({ message: "Front-end mis à jour avec succès" });
    }
  });
};

// Delete a skill
const deleteFrontEnd = (req, res) => {
  const frontEndId = req.params.id; // Assuming the ID is passed in the request parameters
  // Vérifie si l'ID de l'utilisateur est présent dans les paramètres de la requêtea
  if (!frontEndId) {
    return res.status(400).json({ error: "FrontEnd manquant" });
  }
  // Préparation de la requête SQL pour supprimer l'utilisateur de la base de données
  const query = "DELETE FROM front_end WHERE id_front_end = ?";
  // Exécute la requête SQL avec l'ID de l'utilisateur fourni
  conn.query(query, [frontEndId], (e, result) => {
    if (e) {
      console.log("Erreur lors de la suppression du skill : " + e);
      res.status(500).json({
        error: "Erreur lors de la suppression du skill",
        result,
      });
    } else {
      // Vérifie si des lignes ont été affectées, ce qui indique que l'utilisateur a été supprimé avec succès
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Skill supprimé avec succès" });
      } else {
        // Si aucune ligne n'a été affectée, cela signifie que l'utilisateur avec l'ID donné n'a pas été trouvé
        res.status(404).json({ error: "Skill non trouvé" });
      }
    }
  });
};

const createBackEnd = (req, res) => {
  const { title, level } = req.body;
  if (!title || !level) {
    return res.status(400).json({ error: "Données manquantes" });
  }
  const query = "INSERT INTO back_end (title, level) VALUES (?, ?)";
  conn.query(query, [title, level], (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({
        error: "Erreur lors de l'insertion des données",
        result,
      });
    } else {
      res.status(200).json({ message: "back-end enregistré" });
    }
  });
};

// Contrôleur pour obtenir un seul career par ID
const getBackEnd = (req, res) => {
  const backEndId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
  const query = "SELECT * FROM back_end WHERE id_back_end = ?"; // Remplacez "users" par le nom de votre table

  conn.query(query, [backEndId], (err, result) => {
    if (err) {
      console.log("Erreur lors de la récupération de back-end : " + err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la back-end" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Back-end non trouvé" });
      } else {
        res.status(200).json({ skill: result[0] }); // Vous renvoyez le premier résultat, car il ne devrait y avoir qu'un seul utilisateur avec cet ID
      }
    }
  });
};

//Get all users
const getAllBackEnd = (req, res) => {
  const query = "SELECT * FROM back_end";
  conn.query(query, (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({ error: "Erreur lors de l'insertion des données" });
    } else {
      res.status(200).json({ result });
    }
  });
};

//Modifier un skill
const editBackEnd = (req, res) => {
  const backEndId = req.params.id; // Assuming the ID is passed in the request parameters
  const { title, level } = req.body;

  // Vérifie si au moins un des champs à mettre à jour est présent
  if (!title && !level) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  // Préparation de la requête SQL pour la mise à jour des données utilisateur dans la base de données
  const query = "UPDATE back_end SET title=?, level=? WHERE id_back_end=?";

  // Collecte les valeurs qui doivent être mises à jour et ajoute 'skillId' as dernière valeur
  const valuesToUpdate = [
    title,
    level,
    backEndId, // Using the 'skillId' extracted from URL parameters here
  ];

  // Exécute la requête SQL avec les données fournies
  conn.query(query, valuesToUpdate, (e, result) => {
    if (e) {
      console.log("Erreur lors de la mise à jour des données : " + e);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour des données", result });
    } else {
      res.status(200).json({ message: "Back-end mis à jour avec succès" });
    }
  });
};

// Delete a skill
const deleteBackEnd = (req, res) => {
  const backEndId = req.params.id; // Assuming the ID is passed in the request parameters
  // Vérifie si l'ID de l'utilisateur est présent dans les paramètres de la requêtea
  if (!backEndId) {
    return res.status(400).json({ error: "BackEnd manquant" });
  }
  // Préparation de la requête SQL pour supprimer l'utilisateur de la base de données
  const query = "DELETE FROM back-end WHERE id_back_end = ?";
  // Exécute la requête SQL avec l'ID de l'utilisateur fourni
  conn.query(query, [backEndId], (e, result) => {
    if (e) {
      console.log("Erreur lors de la suppression du skill : " + e);
      res.status(500).json({
        error: "Erreur lors de la suppression du skill",
        result,
      });
    } else {
      // Vérifie si des lignes ont été affectées, ce qui indique que l'utilisateur a été supprimé avec succès
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Skill supprimé avec succès" });
      } else {
        // Si aucune ligne n'a été affectée, cela signifie que l'utilisateur avec l'ID donné n'a pas été trouvé
        res.status(404).json({ error: "Skill non trouvé" });
      }
    }
  });
};

//Create Project
const createProject = (req, res) => {
  const { title, text, image, git } = req.body;
  if (!title || !text || !image || !git) {
    return res.status(400).json({ error: "Données manquantes" });
  }
  const query =
    "INSERT INTO project (title, text, image , git) VALUES (?, ?, ?, ?)";
  conn.query(query, [title, text, image, git], (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({
        error: "Erreur lors de l'insertion des données",
        result,
      });
    } else {
      res.status(200).json({ message: "Project enregistré" });
    }
  });
};

// Contrôleur pour obtenir un project
const getProject = (req, res) => {
  const projectId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
  const query = "SELECT * FROM project WHERE id_project = ?"; // Remplacez "users" par le nom de votre table

  conn.query(query, [projectId], (err, result) => {
    if (err) {
      console.log("Erreur lors de la récupération de project : " + err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du project" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Project non trouvé" });
      } else {
        res.status(200).json({ project: result[0] }); // Vous renvoyez le premier résultat, car il ne devrait y avoir qu'un seul utilisateur avec cet ID
      }
    }
  });
};

//Get all users
const getAllProjects = (req, res) => {
  const query = "SELECT * FROM project";
  conn.query(query, (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({ error: "Erreur lors de l'insertion des données" });
    } else {
      res.status(200).json({ result });
    }
  });
};

//Modifier un skill
const editProject = (req, res) => {
  const projectId = req.params.id; // Assuming the ID is passed in the request parameters
  const { title, text, image, git } = req.body;

  // Vérifie si au moins un des champs à mettre à jour est présent
  if (!title && !text && !image && !git) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  // Préparation de la requête SQL pour la mise à jour des données utilisateur dans la base de données
  const query =
    "UPDATE project SET title=?, text=?, image=?, git=? WHERE id_project=?";

  // Collecte les valeurs qui doivent être mises à jour et ajoute 'skillId' as dernière valeur
  const valuesToUpdate = [
    title,
    text,
    image,
    git,
    projectId, // Using the 'skillId' extracted from URL parameters here
  ];

  // Exécute la requête SQL avec les données fournies
  conn.query(query, valuesToUpdate, (e, result) => {
    if (e) {
      console.log("Erreur lors de la mise à jour des données : " + e);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour des données", result });
    } else {
      res.status(200).json({ message: "Project mis à jour avec succès" });
    }
  });
};

// Delete a skill
const deleteProject = (req, res) => {
  const projectId = req.params.id; // Assuming the ID is passed in the request parameters
  // Vérifie si l'ID de l'utilisateur est présent dans les paramètres de la requêtea
  if (!projectId) {
    return res.status(400).json({ error: "Project manquant" });
  }
  // Préparation de la requête SQL pour supprimer l'utilisateur de la base de données
  const query = "DELETE FROM project WHERE id_project = ?";
  // Exécute la requête SQL avec l'ID de l'utilisateur fourni
  conn.query(query, [projectId], (e, result) => {
    if (e) {
      console.log("Erreur lors de la suppression du project : " + e);
      res.status(500).json({
        error: "Erreur lors de la suppression du project",
        result,
      });
    } else {
      // Vérifie si des lignes ont été affectées, ce qui indique que l'utilisateur a été supprimé avec succès
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Project supprimé avec succès" });
      } else {
        // Si aucune ligne n'a été affectée, cela signifie que l'utilisateur avec l'ID donné n'a pas été trouvé
        res.status(404).json({ error: "Project non trouvé" });
      }
    }
  });
};

module.exports = {
  createPersonal,
  getPersonal,
  editPersonal,
  deletePersonal,
  createEducation,
  getEducation,
  getAllEducation,
  editEducation,
  deleteEducation,
  createCareer,
  getCareer,
  getAllCareer,
  editCareer,
  deleteCareer,
  createFrontEnd,
  getFrontEnd,
  getAllFrontEnd,
  editFrontEnd,
  deleteFrontEnd,
  createBackEnd,
  getBackEnd,
  getAllBackEnd,
  editBackEnd,
  deleteBackEnd,
  createProject,
  getProject,
  getAllProjects,
  editProject,
  deleteProject,
};
