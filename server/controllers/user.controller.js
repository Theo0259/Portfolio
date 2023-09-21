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

const createSkill = (req, res) => {
  const { title, number } = req.body;
  if (!title || !number) {
    return res.status(400).json({ error: "Données manquantes" });
  }
  const query = "INSERT INTO skill (title, number) VALUES (?, ?)";
  conn.query(query, [title, number], (e, result) => {
    if (e) {
      console.log("Erreur lors de l'insertion des données : " + e);
      res.status(500).json({
        error: "Erreur lors de l'insertion des données",
        result,
      });
    } else {
      res.status(200).json({ message: "skill enregistré" });
    }
  });
};

// Contrôleur pour obtenir un seul career par ID
const getSkill = (req, res) => {
  const skillId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
  const query = "SELECT * FROM skill WHERE id_skill = ?"; // Remplacez "users" par le nom de votre table

  conn.query(query, [skillId], (err, result) => {
    if (err) {
      console.log("Erreur lors de la récupération de career : " + err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la career" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: "Career non trouvé" });
      } else {
        res.status(200).json({ skill: result[0] }); // Vous renvoyez le premier résultat, car il ne devrait y avoir qu'un seul utilisateur avec cet ID
      }
    }
  });
};

//Modifier un skill
const editskill = (req, res) => {
  const skillId = req.params.id; // Assuming the ID is passed in the request parameters
  const { title, number } = req.body;

  // Vérifie si au moins un des champs à mettre à jour est présent
  if (!title && !number) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  // Préparation de la requête SQL pour la mise à jour des données utilisateur dans la base de données
  const query = "UPDATE skill SET title=?, number=? WHERE id_skill=?";

  // Collecte les valeurs qui doivent être mises à jour et ajoute 'skillId' as dernière valeur
  const valuesToUpdate = [
    title,
    number,
    skillId, // Using the 'skillId' extracted from URL parameters here
  ];

  // Exécute la requête SQL avec les données fournies
  conn.query(query, valuesToUpdate, (e, result) => {
    if (e) {
      console.log("Erreur lors de la mise à jour des données : " + e);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour des données", result });
    } else {
      res.status(200).json({ message: "Skill mis à jour avec succès" });
    }
  });
};

// Delete a skill
const deleteSkill = (req, res) => {
  const skillId = req.params.id; // Assuming the ID is passed in the request parameters
  // Vérifie si l'ID de l'utilisateur est présent dans les paramètres de la requêtea
  if (!skillId) {
    return res.status(400).json({ error: "Skill manquant" });
  }
  // Préparation de la requête SQL pour supprimer l'utilisateur de la base de données
  const query = "DELETE FROM skill WHERE id_skill = ?";
  // Exécute la requête SQL avec l'ID de l'utilisateur fourni
  conn.query(query, [skillId], (e, result) => {
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
        res.status(200).json({ career: result[0] }); // Vous renvoyez le premier résultat, car il ne devrait y avoir qu'un seul utilisateur avec cet ID
      }
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
  createSkill,
  getSkill,
  editskill,
  deleteSkill,
  createProject,
  getProject,
  editProject,
  deleteProject,
};
