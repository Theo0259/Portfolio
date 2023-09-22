import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";
import "../styles/projectsMenu.css";

export default function ProjectsMenu() {
  const [activeProject, setActiveProject] = useState(1);
  const [projectData, setProjectData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getProject/${activeProject + 1}`)
      .then((response) => {
        if (response.data && response.data.project) {
          const project = response.data.project; // Accédez à l'objet "project" dans la réponse

          // Vérifiez que tous les champs nécessaires sont présents
          if (
            project.title !== undefined &&
            project.text !== undefined &&
            project.image !== undefined &&
            project.git !== undefined
          ) {
            setProjectData(project);
            setDataLoaded(true);
          } else {
            console.log("Les données de projet sont incomplètes : ", project);
          }
        } else {
          console.log(
            "Les données de projet ne sont pas reçues : ",
            response.data
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeProject]);

  const handleProjectClick = (project) => {
    setActiveProject(project);
  };

  return (
    <div className="project-menu">
      <div className="project-items-container">
        {projectItems.map((item, index) => (
          <div
            key={index}
            className={classNames("project-item", {
              activeProject: activeProject === index + 1,
            })}
            onClick={() => handleProjectClick(index + 1)}
          >
            <h2 className="title">{item}</h2>
          </div>
        ))}
      </div>
      <div className="project-sub-container">
        {dataLoaded && (
          <div>
            <h3>{projectData.title}</h3>
            <img src={projectData.image} alt={projectData.title}></img>
            <div>{projectData.text}</div>
            <div className="link-container">
              <a
                href={projectData.git}
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const projectItems = [
  "PROJECT ONE",
  "PROJECT TWO",
  "PROJECT THREE",
  "PROJECT FOUR",
];

// import React, { useState, useEffect } from "react";
// import classNames from "classnames";
// import axios from "axios";
// import "../styles/projectsMenu.css";

// export default function ProjectsMenu() {
//   const [activeProject, setActiveProject] = useState(1);
//   const [projectData, setProjectData] = useState({});
//   const [dataLoaded, setDataLoaded] = useState(false);

//   const projectItems = ["PROJECT ONE", "PROJECT TWO", "PROJECT THREE"];

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/getProject/${activeProject + 1}`)
//       .then((response) => {
//         if (response.data && response.data.project) {
//           setProjectData(response.data.project);
//           setDataLoaded(true);
//         } else {
//           console.log(
//             "Les données de projet ne sont pas reçues : ",
//             response.data
//           );
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [activeProject]);

//   const handleProjectClick = (project) => {
//     setActiveProject(project);
//   };

//   return (
//     <div className="project-menu">
//       <div className="project-items-container">
//         {projectItems.map((item, index) => (
//           <div
//             key={index}
//             className={classNames("project-item", {
//               activeProject: activeProject === index + 1,
//             })}
//             onClick={() => handleProjectClick(index + 1)}
//           >
//             <h2 className="title">{item}</h2>
//           </div>
//         ))}
//       </div>
//       <div className="project-sub-container">
//         {dataLoaded && (
//           <div>
//             <h3>{projectData.title}</h3>
//             <img src={projectData.image} alt={projectData.title}></img>
//             <div>{projectData.description}</div>
//             <div className="link-container">
//               <a
//                 href={projectData.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 GITHUB
//               </a>
//               <a
//                 href={projectData.demo}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 DEMO
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import classNames from "classnames";
// import axios from "axios";
// import "../styles/projectsMenu.css";

// export default function ProjectsMenu() {
//   const [activeProject, setActiveProject] = useState(1);
//   const [projectData, setProjectData] = useState([]);

//   useEffect(() => {
//     // Récupération des projets depuis la base de données
//     if (projectData.length === 0) {
//       axios
//         .get("http://localhost:8000/getAllProjects")
//         .then((response) => {
//           if (response.data && response.data.result) {
//             setProjectData(response.data.result);
//           } else {
//             console.log(
//               "Les données des projets ne sont pas reçues : ",
//               response.data
//             );
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   }, [projectData]);

//   const handleProjectClick = (project) => {
//     setActiveProject(project);
//   };

//   const renderContent = (projects) => {
//     return projects.map((project, index) => (
//       <div key={index} className={`project-sub-container-${index + 1}`}>
//         <h3>{project.title}</h3>
//         <img src={project.image} alt={project.title}></img>
//         <div>{project.text}</div>
//         <div className="link-container">
//           <a href={project.git} target="_blank" rel="noopener noreferrer">
//             GITHUB
//           </a>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <div className="project-menu">
//       <div className="project-items-container">
//         {projectData.map((project, index) => (
//           <div
//             key={index}
//             className={classNames("project-item", {
//               activeProject: activeProject === index + 1,
//             })}
//             onClick={() => handleProjectClick(index + 1)}
//           >
//             <h2 className="title">{project.title}</h2>
//           </div>
//         ))}
//       </div>
//       <div className="project-sub-container">{renderContent(projectData)}</div>
//     </div>
//   );
// }
