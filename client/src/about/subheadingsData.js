// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const SubheadingsData = () => {
//   // AXIOS
//   const [data, setData] = useState({}); // Initialisez data comme un objet vide

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/getPersonal/1")
//       .then((response) => {
//         // Vérifiez si la réponse contient des données sous une certaine structure (par exemple, response.data.result)
//         if (response.data && response.data.result) {
//           // Mettez à jour l'état data avec les données pertinentes
//           setData(response.data.result[0]); // Accédez au premier élément de la tableau de résultats
//           console.log(response.data.result[0]); // Affichez les données dans la console pour déboguer
//         } else {
//           console.log("Les données ne sont pas reçues : ", response.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div>
//       <p>{data.title}</p>
//       <p>{data.text}</p>
//     </div>
//   );
// };

// export default SubheadingsData;
