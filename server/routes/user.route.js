const router = require("express").Router();
const userController = require("../controllers/user.controller");

//Create a new career
router.post("/create-career", userController.createCareer);

//GetCareerById
router.get("/getCareer/:id", userController.getCareer);

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
