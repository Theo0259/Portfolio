import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./nav/Nav.js";
import About from "./about/About";
import Skills from "./skills/Skills";
import Projects from "./projects/Projects";
import Contact from "./contact/Contact";
import "./styles/app.css";
import Background from "./background/Background.js";
import PlayerStats from "./playerStats/PlayerStats.js";
import Login from "./login/login.js";
import DashBoard from "./dashBoard/DashBoard.js";
import CrudPersonal from "./dashBoard/crud/crudPersonal.js";
import CrudEducation from "./dashBoard/crud/crudEducation.js";
import CrudCareer from "./dashBoard/crud/crudCareer.js";
import CrudFrontEnd from "./dashBoard/crud/crudFrontEnd.js";
import CrudBackEnd from "./dashBoard/crud/crudBackEnd.js";
import CrudProject from "./dashBoard/crud/crudProject.js";

const App = () => {
  return (
    <Router>
      <Nav />
      <Background />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/CrudPersonal" element={<CrudPersonal />} />
        <Route path="/CrudEducation" element={<CrudEducation />} />
        <Route path="/CrudCareer" element={<CrudCareer />} />
        <Route path="/CrudFrontEnd" element={<CrudFrontEnd />} />
        <Route path="/CrudBackEnd" element={<CrudBackEnd />} />
        <Route path="/CrudProject" element={<CrudProject />} />
      </Routes>
      <PlayerStats />
    </Router>
  );
};

export default App;
