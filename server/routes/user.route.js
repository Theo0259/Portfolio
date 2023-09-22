const router = require("express").Router();
const userController = require("../controllers/user.controller");

//Create a new personal
router.post("/create-personal", userController.createPersonal);

//GetPersonalById
router.get("/getPersonal/:id", userController.getPersonal);

//Modifier une personal
router.put("/personal/put/:id", userController.editPersonal);

//Supprimer une career
router.delete("/personal/delete/:id", userController.deletePersonal);

//Create a new education
router.post("/create-education", userController.createEducation);

//GetEducationById
router.get("/getEducation/:id", userController.getEducation);

//GetAllCareer
router.get("/getAllEducation", userController.getAllEducation);

//Modifier une education
router.put("/education/put/:id", userController.editEducation);

//Supprimer une education
router.delete("/education/delete/:id", userController.deleteEducation);

//Create a new career
router.post("/create-career", userController.createCareer);

//GetCareerById
router.get("/getCareer/:id", userController.getCareer);

//GetAllCareer
router.get("/getAllCareer", userController.getAllCareer);

//Modifier une career
router.put("/career/put/:id", userController.editCareer);

//Supprimer une career
router.delete("/career/delete/:id", userController.deleteCareer);

//Create a new front-end
router.post("/create-front-end", userController.createFrontEnd);

//Getfront-end
router.get("/getFrontEnd/:id", userController.getFrontEnd);

//GetAllFrontEnd
router.get("/getAllFrontEnd", userController.getAllFrontEnd);

//Modifier un front-end
router.put("/front-end/put/:id", userController.editFrontEnd);

//Supprimer un front-end
router.delete("/front-end/delete/:id", userController.deleteFrontEnd);

//Create a new back-end
router.post("/create-back-end", userController.createBackEnd);

//Getback-end
router.get("/getBackEnd/:id", userController.getBackEnd);

//GetAllBackEnd
router.get("/getAllBackEnd", userController.getAllBackEnd);

//Modifier un back-end
router.put("/back-end/put/:id", userController.editBackEnd);

//Supprimer un back-end
router.delete("/back-end/delete/:id", userController.deleteBackEnd);

//Create a new project
router.post("/create-project", userController.createProject);

//GetProject
router.get("/getProject/:id", userController.getProject);

//GetallProject
router.get("/getAllProjects", userController.getAllProjects);

//Modifier une career
router.put("/project/put/:id", userController.editProject);

//Supprimer un project
router.delete("/project/delete/:id", userController.deleteProject);

module.exports = router;
