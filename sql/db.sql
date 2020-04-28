CREATE DATABASE regstr_db;

USE regstr_db;

CREATE TABLE `Users` (
    `user_id` INT(6) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL, 
    `email` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(60) NOT NULL,
    `celnumber` VARCHAR(14) NOT NULL UNIQUE,
    `genre` VARCHAR(1) NOT NULL,
    `signup_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `birthdate` DATE NOT NULL, 
     PRIMARY KEY(`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;






