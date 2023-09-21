// import React, { useState, useEffect } from "react";
// import AboutMenuItem from "./AboutMenuItem";
// import AboutSubheading from "./AboutSubheading";
// import axios from "axios";
// import personalIcon from "../assets/moebius-triangle.png";
// import educationIcon from "../assets/upgrade.png";
// import careerIcon from "../assets/triple-corn.png";

// export default function AboutMenu() {
//   const [activeMenuItem, setActiveMenuItem] = useState(1);
//   const [activeSubheading, setActiveSubheading] = useState(1);
//   const [subheadingsData, setSubheadingsData] = useState({});
//   const [dataLoaded, setDataLoaded] = useState(false);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/getPersonal/1")
//       .then((response) => {
//         if (response.data && response.data.result) {
//           setSubheadingsData(response.data.result[0]);
//           console.log(response.data.result[0]);
//           setDataLoaded(true);
//         } else {
//           console.log("Les données ne sont pas reçues : ", response.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const handleMenuItemClick = (menuItem) => {
//     setActiveMenuItem(menuItem);
//     setActiveSubheading(1);
//   };

//   const handleSubheadingClick = (subheading) => {
//     setActiveSubheading(subheading);
//   };

//   const menuItems = ["PERSONAL", "EDUCATION", "CAREER"];
//   const activeMenuTitle = menuItems[activeMenuItem - 1];
//   const activeMenuIcon =
//     activeMenuTitle === "PERSONAL"
//       ? personalIcon
//       : activeMenuTitle === "EDUCATION"
//       ? educationIcon
//       : careerIcon;

//   return (
//     <>
//       <div className="menu">
//         {menuItems.map((item, index) => (
//           <AboutMenuItem
//             key={index}
//             title={item}
//             active={activeMenuItem === index + 1}
//             onClick={() => handleMenuItemClick(index + 1)}
//           />
//         ))}
//       </div>
//       <div className="sub-container">
//         <div className="icon-title-container">
//           <img src={activeMenuIcon} alt={activeMenuTitle} className="icon" />
//           <h3>{activeMenuTitle}</h3>
//         </div>
//         {activeMenuTitle === "PERSONAL" && dataLoaded && (
//           <div>
//             {/* Affichez les données de subheadingsData ici */}
//             <p>{subheadingsData.title}</p>
//             <p>{subheadingsData.text}</p>
//           </div>
//         )}
//         {/* Le reste du code pour afficher les autres sous-titres */}
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import AboutMenuItem from "./AboutMenuItem";
import AboutSubheading from "./AboutSubheading";
import axios from "axios";
import personalIcon from "../assets/moebius-triangle.png";
import educationIcon from "../assets/upgrade.png";
import careerIcon from "../assets/triple-corn.png";

export default function AboutMenu() {
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [activeSubheading, setActiveSubheading] = useState(1);
  const [subheadingsData, setSubheadingsData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [careerData, setCareerData] = useState([]);
  const [careerDataLoaded, setCareerDataLoaded] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [educationDataLoaded, setEducationDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getPersonal/1")
      .then((response) => {
        if (response.data && response.data.result) {
          // setSubheadingsData(response.data.result[0]);
          if (response.data.result.length > 0) {
            setSubheadingsData(response.data.result[0]);
          } else {
            console.log("Aucune donnée personnelle n'a été renvoyée.");
          }
          setDataLoaded(true);
        } else {
          console.log("Les données ne sont pas reçues : ", response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (activeMenuItem === 3 && !educationDataLoaded) {
      axios
        .get("http://localhost:8000/getAllEducation")
        .then((response) => {
          if (response.data && response.data.result) {
            setEducationData(response.data.result);
            setEducationDataLoaded(true);
          } else {
            console.log(
              "Les données de education ne sont pas reçues : ",
              response.data
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activeMenuItem, educationDataLoaded]);

  useEffect(() => {
    if (activeMenuItem === 3 && !careerDataLoaded) {
      axios
        .get("http://localhost:8000/getAllCareer")
        .then((response) => {
          if (response.data && response.data.result) {
            setCareerData(response.data.result);
            setCareerDataLoaded(true);
          } else {
            console.log(
              "Les données de carrière ne sont pas reçues : ",
              response.data
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activeMenuItem, careerDataLoaded]);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    setActiveSubheading(1);
  };

  const handleSubheadingClick = (subheading) => {
    setActiveSubheading(subheading);
  };

  const menuItems = ["PERSONAL", "EDUCATION", "CAREER"];
  const activeMenuTitle = menuItems[activeMenuItem - 1];
  const activeMenuIcon =
    activeMenuTitle === "PERSONAL"
      ? personalIcon
      : activeMenuTitle === "EDUCATION"
      ? educationIcon
      : careerIcon;

  return (
    <>
      <div className="menu">
        {menuItems.map((item, index) => (
          <AboutMenuItem
            key={index}
            title={item}
            active={activeMenuItem === index + 1}
            onClick={() => handleMenuItemClick(index + 1)}
          />
        ))}
      </div>
      <div className="sub-container">
        <div className="icon-title-container">
          <img src={activeMenuIcon} alt={activeMenuTitle} className="icon" />
          <h3>{activeMenuTitle}</h3>
        </div>
        {activeMenuTitle === "PERSONAL" && dataLoaded && (
          <div>
            <p>{subheadingsData.title}</p>
            <p>{subheadingsData.text}</p>
          </div>
        )}
        {activeMenuTitle === "EDUCATION" && educationDataLoaded && (
          <div>
            {educationData.map((educationItem, index) => (
              <div key={index}>
                <h3>{educationItem.title}</h3>
                <p>{educationItem.text}</p>
              </div>
            ))}
          </div>
        )}
        {activeMenuTitle === "CAREER" && careerDataLoaded && (
          <div>
            {careerData.map((careerItem, index) => (
              <div key={index}>
                <h3>{careerItem.title}</h3>
                <p>{careerItem.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
