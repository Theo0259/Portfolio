-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 14 sep. 2023 à 09:04
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `portfolio`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id_Admin` int NOT NULL AUTO_INCREMENT,
  `email_Admin` varchar(255) DEFAULT NULL,
  `password_Admin` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_Admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `association`
--

DROP TABLE IF EXISTS `association`;
CREATE TABLE IF NOT EXISTS `association` (
  `id_Admin` int NOT NULL AUTO_INCREMENT,
  `id_career` int NOT NULL,
  `id_skill` int NOT NULL,
  `id_project` int NOT NULL,
  PRIMARY KEY (`id_Admin`,`id_career`,`id_skill`,`id_project`),
  KEY `FK_association_id_career` (`id_career`),
  KEY `FK_association_id_skill` (`id_skill`),
  KEY `FK_association_id_project` (`id_project`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `career`
--

DROP TABLE IF EXISTS `career`;
CREATE TABLE IF NOT EXISTS `career` (
  `id_career` int NOT NULL AUTO_INCREMENT,
  `title_career` varchar(255) DEFAULT NULL,
  `text_career` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_career`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `id_project` int NOT NULL AUTO_INCREMENT,
  `title_project` varchar(255) DEFAULT NULL,
  `text_project` varchar(255) DEFAULT NULL,
  `image_project` varchar(255) DEFAULT NULL,
  `git_project` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_project`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `skill`
--

DROP TABLE IF EXISTS `skill`;
CREATE TABLE IF NOT EXISTS `skill` (
  `id_skill` int NOT NULL AUTO_INCREMENT,
  `number_skill` int DEFAULT NULL,
  PRIMARY KEY (`id_skill`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `association`
--
ALTER TABLE `association`
  ADD CONSTRAINT `FK_association_id_Admin` FOREIGN KEY (`id_Admin`) REFERENCES `admin` (`id_Admin`),
  ADD CONSTRAINT `FK_association_id_career` FOREIGN KEY (`id_career`) REFERENCES `career` (`id_career`),
  ADD CONSTRAINT `FK_association_id_project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_project`),
  ADD CONSTRAINT `FK_association_id_skill` FOREIGN KEY (`id_skill`) REFERENCES `skill` (`id_skill`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
