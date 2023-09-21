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

//Create a new skill
router.post("/create-skill", userController.createSkill);

//GetSkill
router.get("/getSkill/:id", userController.getSkill);

//Modifier un skill
router.put("/skill/put/:id", userController.editskill);

//Supprimer un skill
router.delete("/skill/delete/:id", userController.deleteSkill);

//Create a new project
router.post("/create-project", userController.createProject);

//GetSkill
router.get("/getProject/:id", userController.getProject);

//Modifier une career
router.put("/project/put/:id", userController.editProject);

//Supprimer un project
router.delete("/project/delete/:id", userController.deleteProject);

module.exports = router;
