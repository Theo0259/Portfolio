import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "../styles/skillsMenu.css";
import frontendIcon from "../assets/eagle-emblem.png";
import backendIcon from "../assets/hawk-emblem.png";
import axios from "axios";

export default function SkillsMenu() {
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [frontEndSkills, setFrontEndSkills] = useState([]);
  const [backEndSkills, setBackEndSkills] = useState([]);

  useEffect(() => {
    // Récupération des compétences Front-End
    if (activeMenuItem === 1 && frontEndSkills.length === 0) {
      axios
        .get("http://localhost:8000/getAllFrontEnd")
        .then((response) => {
          if (response.data && response.data.result) {
            setFrontEndSkills(response.data.result);
          } else {
            console.log(
              "Les données de compétences Front-End ne sont pas reçues : ",
              response.data
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Récupération des compétences Back-End
    if (activeMenuItem === 2 && backEndSkills.length === 0) {
      axios
        .get("http://localhost:8000/getAllBackEnd")
        .then((response) => {
          if (response.data && response.data.result) {
            setBackEndSkills(response.data.result);
          } else {
            console.log(
              "Les données de compétences Back-End ne sont pas reçues : ",
              response.data
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activeMenuItem, frontEndSkills, backEndSkills]);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const renderContent = (skills) => {
    return skills.map((skill, index) => (
      <div key={index} className={`skill-sub-container-${activeMenuItem}`}>
        <h3>{skill.title}</h3>
        <div className="level-container">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`level-point ${
                i < skill.level ? "filled" : "unfilled"
              }`}
            />
          ))}
        </div>
      </div>
    ));
  };

  const menuItems = ["FRONT-END", "BACK-END"];

  const currentIcon = activeMenuItem === 1 ? frontendIcon : backendIcon;

  return (
    <div className="skill-menu">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={classNames("skill-item", {
            activeSkill: activeMenuItem === index + 1,
          })}
          onClick={() => handleMenuItemClick(index + 1)}
        >
          <h2 className="skill-title">{item}</h2>
        </div>
      ))}
      <img className="skill-icon" src={currentIcon} alt="current skill" />
      <div className="skill-sub-container">
        {renderContent(activeMenuItem === 1 ? frontEndSkills : backEndSkills)}
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import classNames from "classnames";
// import "../styles/skillsMenu.css";
// import skills from "./skillsData";
// import frontendIcon from "../assets/eagle-emblem.png";
// import backendIcon from "../assets/hawk-emblem.png";
// import axios from "axios";

// export default function Skills() {
//   const [frontEndSkills, setFrontEndSkills] = useState([]);
//   const [backEndSkills, setBackEndSkills] = useState([]);
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [activeMenuItem, setActiveMenuItem] = useState(1); // Ajout de l'état pour gérer le menu actif

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/getAllFrontEnd")
//       .then((response) => {
//         if (response.data && response.data.result) {
//           setFrontEndSkills(response.data.result);
//         } else {
//           console.log(
//             "Les données de compétences front-end ne sont pas reçues : ",
//             response.data
//           );
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/getAllBackEnd")
//       .then((response) => {
//         if (response.data && response.data.result) {
//           setBackEndSkills(response.data.result);
//           setDataLoaded(true);
//         } else {
//           console.log(
//             "Les données de compétences back-end ne sont pas reçues : ",
//             response.data
//           );
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   // Gestion du changement de menu
//   const handleMenuItemClick = (menuItem) => {
//     setActiveMenuItem(menuItem);
//   };

//   return (
//     <div className="skills">
//       <div className="menu-icons">
//         <img
//           src={frontendIcon}
//           alt="Frontend Icon"
//           className={classNames("menu-icon", {
//             active: activeMenuItem === 1,
//           })}
//           onClick={() => handleMenuItemClick(1)}
//         />
//         <img
//           src={backendIcon}
//           alt="Backend Icon"
//           className={classNames("menu-icon", {
//             active: activeMenuItem === 2,
//           })}
//           onClick={() => handleMenuItemClick(2)}
//         />
//       </div>
//       {dataLoaded ? (
//         <>
//           <div>
//             <h2>Front-End</h2>
//             <ul>
//               {frontEndSkills.map((skill, index) => (
//                 <li key={index}>
//                   <strong>{skill.title}</strong>: Niveau {skill.level}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h2>Back-End</h2>
//             <ul>
//               {backEndSkills.map((skill, index) => (
//                 <li key={index}>
//                   <strong>{skill.title}</strong>: Niveau {skill.level}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <p>Chargement des données...</p>
//       )}
//     </div>
//   );
// }
