-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: USER
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `email` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(30) NOT NULL DEFAULT '',
  `creationDate` datetime NOT NULL,
  `expiryTime` int(11) NOT NULL DEFAULT '60',
  `status` int(11) NOT NULL DEFAULT '1',
  `gender` varchar(30) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COMMENT='latin1_swedish_ci';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nevada Helstrom','Nevada@yahoo.com','$2a$10$9qI8NykVNTcNk736nr2NkeX','2016-01-28 01:03:12',60,0,'Male','http://localhost:8081/uploads/1464379392484.jpg'),(2,'Cassandra Sherer','Cassandra@gmail.com','$2a$10$lSBU0x6M/haJHuVI/4St8.Z','2016-02-28 01:04:11',60,0,'Male','http://localhost:8081/uploads/1464379451971.jpg'),(3,'Eve Pacifico','Eve@gmail.com','$2a$10$wMUpEs9PXRJvoN0u09ATPem','2016-03-28 01:04:44',60,0,'Male','http://localhost:8081/uploads/1464379485394.jpg'),(4,'Celina Candela','Celina113@gmail.com','$2a$10$tu3aFSZj0ZKY4ZlspIlt6.N','2016-04-28 01:05:20',60,0,'Male','http://localhost:8081/uploads/1464379521129.jpg'),(5,'Buck Klock','Buck11@gmail.com','$2a$10$dNDH1.KgNudzz6R.G2zB5eU','2016-05-28 01:05:57',60,1,'Male','http://localhost:8081/uploads/1464379557942.jpg'),(6,'Kelly Haugland','Kelly_Haugland@gmail.com','$2a$10$zKy/UzhwlarnmMicGIK4hO8','2016-01-28 01:06:34',60,0,'Male','http://localhost:8081/uploads/1464379595165.jpg'),(7,'Harley Chon','HarleyChon@gmail.com','$2a$10$VwCjG8KAmbenFyyJEEChw.H','2016-02-28 01:06:53',60,0,'Male','http://localhost:8081/uploads/1464379614747.jpg'),(8,'Emile Ranney','Emile.Ranney@gmail.com','$2a$10$zszTm1LHoLrCTvnO/29sDuD','2016-03-28 01:07:10',60,0,'Male','http://localhost:8081/uploads/1464379630672.jpg'),(9,'Lindsay Petties','Lindsay_Petties@gmail.com','$2a$10$4aaRfT37dQX3EIDexCsP8Ol','2016-04-28 01:07:37',60,0,'Male','http://localhost:8081/uploads/1464379658007.jpg'),(10,'Gaylord Humphries','GaylordHumphries@gmail.com','$2a$10$dX7UVFdZZx75Gq2oADbFjOf','2016-05-28 01:08:28',60,1,'Male','http://localhost:8081/uploads/1464379708604.jpg'),(11,'Romeo Motton','Romeo8Mottons@gmail.com','$2a$10$p.Ieds4.IAxlhrEJ7Dmdru5','2016-01-28 01:08:53',60,0,'Male','http://localhost:8081/uploads/1464379733593.jpg'),(12,'Coralie Cuthbertson','Coralie_Cuthbertson@yahoo.com','$2a$10$s/8HC2.PwOGEUwYEmy4Ycuc','2016-01-01 01:12:12',60,0,'Female','http://localhost:8081/uploads/1464379932800.jpg'),(13,'Madelaine Matheson','MadelainMatheson@yahoo.com','$2a$10$o4pwLdKeaw9Ol.vpQhI3eur','2016-04-02 01:12:32',60,0,'Female','http://localhost:8081/uploads/1464379953138.jpg'),(14,'Amber Peck','AmberPeck@yahoo.com','$2a$10$BsizC4WxlGpyPJ/09ZqH4Or','2016-02-28 01:12:49',60,0,'Female','http://localhost:8081/uploads/1464379969821.jpg'),(15,'Daria Brink','DariaBrink@yahoo.com','$2a$10$g3cNAvK6LqQnceLviv2QA.m','2016-05-23 01:13:08',60,0,'Female','http://localhost:8081/uploads/1464379989070.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-28  1:26:14
