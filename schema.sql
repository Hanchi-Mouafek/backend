-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema foodini
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema foodini
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `foodini` DEFAULT CHARACTER SET utf8 ;
USE `foodini` ;

-- -----------------------------------------------------
-- Table `foodini`.`restaurents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`restaurents` (
  `idRestaurent` INT NOT NULL AUTO_INCREMENT,
  `restaurentName` VARCHAR(45) NOT NULL,
  `restaurentAddress` VARCHAR(100) NOT NULL,
  `restaurentNumber` VARCHAR(45) NOT NULL,
  `restaurentImage` LONGTEXT NOT NULL,
  `restaurentDescription` LONGTEXT NULL,
  `restaurentSpecialite` VARCHAR(45) NULL,
  `restaurentMenu` LONGTEXT NULL,
  `restaurentTiming` VARCHAR(45) NULL,
  `restaurentEmail` VARCHAR(255) NOT NULL,
  `restaurentPassword` VARCHAR(100) NOT NULL,
  `restaurentRates` INT NULL,
  `restaurentsNumberRates` VARCHAR(45) NULL,
  `restaurentsMatricule` VARCHAR(255) NOT NULL,
  `restaurentsStatus` ENUM('active', 'banned', 'pending', 'validated') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`idRestaurent`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodini`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`clients` (
  `idClient` INT NOT NULL AUTO_INCREMENT,
  `ClientName` VARCHAR(45) NOT NULL,
  `ClientNumber` VARCHAR(45) NULL,
  `ClientEmail` VARCHAR(45) NULL,
  `clientsStatus` ENUM('validated', 'pending', 'active', 'banned') NULL DEFAULT 'pending',
  PRIMARY KEY (`idClient`),
  UNIQUE INDEX `ClientEmail_UNIQUE` (`ClientEmail` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodini`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`posts` (
  `idPosts` INT NOT NULL AUTO_INCREMENT,
  `PostsImage` LONGTEXT NOT NULL,
  `PostsDescription` LONGTEXT NULL,
  `restaurent_idRestaurent` INT NOT NULL,
  PRIMARY KEY (`idPosts`),
  INDEX `fk_Posts_restaurent1_idx` (`restaurent_idRestaurent` ASC) VISIBLE,
  CONSTRAINT `fk_Posts_restaurent1`
    FOREIGN KEY (`restaurent_idRestaurent`)
    REFERENCES `foodini`.`restaurents` (`idRestaurent`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodini`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`comments` (
  `idcomments` INT NOT NULL AUTO_INCREMENT,
  `commentsBody` LONGTEXT NULL,
  `commented_at` TIMESTAMP NULL,
  `posts_idPosts` INT NOT NULL,
  `clients_idClient` INT NOT NULL,
  PRIMARY KEY (`idcomments`),
  INDEX `fk_comments_posts1_idx` (`posts_idPosts` ASC) VISIBLE,
  INDEX `fk_comments_clients1_idx` (`clients_idClient` ASC) VISIBLE,
  CONSTRAINT `fk_comments_posts1`
    FOREIGN KEY (`posts_idPosts`)
    REFERENCES `foodini`.`posts` (`idPosts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_clients1`
    FOREIGN KEY (`clients_idClient`)
    REFERENCES `foodini`.`clients` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodini`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`likes` (
  `idlikes` INT NOT NULL AUTO_INCREMENT,
  `liked` TINYINT NOT NULL DEFAULT 1,
  `Client_idClient` INT NOT NULL,
  `posts_idPosts` INT NOT NULL,
  PRIMARY KEY (`idlikes`, `Client_idClient`, `posts_idPosts`),
  INDEX `fk_likes_Client1_idx` (`Client_idClient` ASC) VISIBLE,
  INDEX `fk_likes_posts1_idx` (`posts_idPosts` ASC) VISIBLE,
  CONSTRAINT `fk_likes_Client1`
    FOREIGN KEY (`Client_idClient`)
    REFERENCES `foodini`.`clients` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_likes_posts1`
    FOREIGN KEY (`posts_idPosts`)
    REFERENCES `foodini`.`posts` (`idPosts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodini`.`reservations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`reservations` (
  `idreservations` INT NOT NULL AUTO_INCREMENT,
  `reservationsStatus` ENUM('confirmed', 'rejected', 'pending', 'cancelled') NULL DEFAULT 'pending',
  `clients_idClient` INT NOT NULL,
  `posts_idPosts` INT NOT NULL,
  PRIMARY KEY (`idreservations`, `clients_idClient`, `posts_idPosts`),
  INDEX `fk_reservations_clients1_idx` (`clients_idClient` ASC) VISIBLE,
  INDEX `fk_reservations_posts1_idx` (`posts_idPosts` ASC) VISIBLE,
  CONSTRAINT `fk_reservations_clients1`
    FOREIGN KEY (`clients_idClient`)
    REFERENCES `foodini`.`clients` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservations_posts1`
    FOREIGN KEY (`posts_idPosts`)
    REFERENCES `foodini`.`posts` (`idPosts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;