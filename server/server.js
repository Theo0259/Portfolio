//importation des  dépendances express, body-parser et cors
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin.route");
const userRoutes = require("./routes/user.route");
const cors = require("cors");

//Connexion à la base de données
const connectDB = require("./config/db");

//Middlewares
const app = express();

//Use app express
app.use(express.json());

//Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use cors
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

//Routes
app.use("/api", adminRoutes);
app.use("/", userRoutes);

//Config et lancement du server
const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 8500;
    app.listen(port, () => {
      console.log(`Le serveur à démarré sur le port ${port}`);
    });
  } catch {
    console.log("Erreur lors du démarrage du serveur");
  }
};

start();
