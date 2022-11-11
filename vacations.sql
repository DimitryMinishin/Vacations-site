CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `liked_vacations`
--

DROP TABLE IF EXISTS `liked_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_vacations` (
  `vacation_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`vacation_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_vacations`
--

LOCK TABLES `liked_vacations` WRITE;
/*!40000 ALTER TABLE `liked_vacations` DISABLE KEYS */;
INSERT INTO `liked_vacations` VALUES (1,9),(2,-1),(2,9),(3,9),(4,9),(5,9),(8,9);
/*!40000 ALTER TABLE `liked_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Dima','8cd7b4fd7528824db97ce0eb34532ba8','Admin','Dima','Dima'),(7,'Misha','4df93363af723e39f599dc8d506c669e','Customer','Misha','Misha'),(8,'Shlomi ','a630159a44c9a248e7cf8979e03dba43','Customer','Shlomi','Malfuf'),(9,'Avi','a630159a44c9a248e7cf8979e03dba43','Customer','Avi','Edri'),(10,'Tom','c5724ea9a640e3c2fcd919dd989f0759','Customer','Tom','Rubin'),(11,'Guy','a630159a44c9a248e7cf8979e03dba43','Customer','Guy','Gaichovski');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations_table`
--

DROP TABLE IF EXISTS `vacations_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `amount_of_followers` int DEFAULT 0,
  `is_followed` varchar(45) DEFAULT 0,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) NOT NULL,
  `image_Url` varchar(250) DEFAULT NULL,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations_table`
--

LOCK TABLES `vacations_table` WRITE;
/*!40000 ALTER TABLE `vacations_table` DISABLE KEYS */;
INSERT INTO `vacations_table` VALUES (1,'Toronto','345',3,'1','22-08-2022','30-08-2022','https://i.ibb.co/4WnYqS8/Toronto2.png'),(2,'London','456',2,'1','12-05-2022','17-05-2022','https://i.ibb.co/kJwjHHr/London2.png'),(3,'San Francisco','879',4,'1','05-04-2022','08-04-2022','https://i.ibb.co/rF6C4F7/San-Francisco2.png'),(4,'Berlin','450',2,'1','03-04-2022','07-04-2022','https://i.ibb.co/RCWL7bD/Berlin2.png'),(5,'Pisa','326',2,'1','25-03-2022','27-03-2022','https://i.ibb.co/X8P2jvv/Pisa2.png'),(6,'Dubai','250',4,'1','10-08-2022','17-08-2022','https://i.ibb.co/DzXXzNx/Dubai2.png'),(7,'Budapest','375',2,'1','30-09-2022','4-10-2022','https://i.ibb.co/fDnLMMT/Budapest2.png'),(8,'Amsterdam','510',5,'1','23-10-2022','04-11-2022','https://i.ibb.co/DzssNGW/Amsterdam2.png'),(9,'Paris','650',6,'1','15-08-2022','23-08-2022','https://i.ibb.co/G0D5FdL/Paris2.png');
/*!40000 ALTER TABLE `vacations_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-20 12:52:46
