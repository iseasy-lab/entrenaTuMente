-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: bdd_ludotest
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `educador`
--

DROP TABLE IF EXISTS `educador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educador` (
  `id_educador` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `user_password` varchar(120) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  PRIMARY KEY (`id_educador`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educador`
--

LOCK TABLES `educador` WRITE;
/*!40000 ALTER TABLE `educador` DISABLE KEYS */;
INSERT INTO `educador` VALUES (1,'cristopher.perez@epn.edu.ec','genesis123','Cristopher','Perez'),(2,'liz.freire@epn.edu.ec','liz123','Lizbeth','Freire'),(3,'gtromero@puce.edu.ec','genesis123','Génesis','Romero'),(4,'ariel.rosero@epn.edu.ec','ariel123','Ariel','Rosero'),(5,'miguel.muenala@epn.edu.ec','miguel123','Miguel','Muenala'),(6,'francisco.rodriguez@epn.edu.ec','francisco123','Francisco','Rodriguez'),(7,'','','',''),(8,'','','',''),(9,'','','',''),(10,'','','',''),(11,'kenny.perez@epn.edu.ec','kenny123','Kenny','Pérez');
/*!40000 ALTER TABLE `educador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educador_niño`
--

DROP TABLE IF EXISTS `educador_niño`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educador_niño` (
  `id_e_n` int NOT NULL AUTO_INCREMENT,
  `id_educador` int DEFAULT NULL,
  `id_niño` int DEFAULT NULL,
  PRIMARY KEY (`id_e_n`),
  KEY `id_educador` (`id_educador`),
  KEY `id_niño` (`id_niño`),
  CONSTRAINT `educador_niño_ibfk_1` FOREIGN KEY (`id_educador`) REFERENCES `educador` (`id_educador`) ON DELETE CASCADE,
  CONSTRAINT `educador_niño_ibfk_2` FOREIGN KEY (`id_niño`) REFERENCES `niño` (`id_ninio`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educador_niño`
--

LOCK TABLES `educador_niño` WRITE;
/*!40000 ALTER TABLE `educador_niño` DISABLE KEYS */;
INSERT INTO `educador_niño` VALUES (1,1,8),(5,1,13),(6,1,14),(8,1,16),(9,2,12),(10,2,9),(17,2,17),(18,1,17),(20,1,19);
/*!40000 ALTER TABLE `educador_niño` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `muestra`
--

DROP TABLE IF EXISTS `muestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `muestra` (
  `id_muestra` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(100) NOT NULL,
  PRIMARY KEY (`id_muestra`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `muestra`
--

LOCK TABLES `muestra` WRITE;
/*!40000 ALTER TABLE `muestra` DISABLE KEYS */;
INSERT INTO `muestra` VALUES (1,'00-00.png'),(2,'Imagen de WhatsApp 2023-12-06 a las 19.45.40_9cacd895.jpg'),(3,'eresTu.png'),(4,'Imagen de WhatsApp 2023-12-06 a las 20.01.00_d55c1a8d.jpg'),(5,'Imagen de WhatsApp 2023-12-06 a las 20.33.46_fcf60485.jpg'),(6,'laCosaMasBella.png'),(7,'theManWhoCantBeMoved.png'),(8,'Imagen de WhatsApp 2023-12-06 a las 20.33.46_fcf60485.jpg'),(9,'Imagen de WhatsApp 2023-12-06 a las 20.38.18_b99293d5.jpg'),(10,'Imagen de WhatsApp 2023-12-06 a las 20.08.42_e1107fda.jpg'),(11,'patadasDeAhogado.png'),(12,'paisaje-de-montanas-en-el-bosque-diseno-minimalista_3840x2160_xtrafondos.com.jpg'),(13,'paisaje-digital-de-montanas-deserticas_3840x2160_xtrafondos.com.jpg'),(14,'0b00647ea6910a1c03e982ac4024c66a.jpg'),(15,'3d-abstracto-luz-neon-triangulo_3840x2160_xtrafondos.com.jpg'),(16,'3-36073_blood-moon-1920x1080-pixel-art-fondos-de-pantalla.jpg'),(17,'29367.jpg'),(18,'paisaje-de-lago-en-el-bosque-alberta-canada_5120x3481_xtrafondos.com.jpg'),(19,'paisaje-de-rick-y-morty_3840x2160_xtrafondos.com.jpg'),(20,'paisaje-low-poly_3840x2160_xtrafondos.com.jpg'),(21,'persona-viendo-paisaje-de-torre-en-las-montanas-artwork_3840x2160_xtrafondos.com.jpg'),(22,'97-974956_skye-cave-bing-wallpaper-hd.jpg'),(23,'coven-zyra-league-of-legends-arte_3840x2160_xtrafondos.com.jpg'),(24,'Draven.jpeg'),(25,'escenario-de-the-last-of-us_3248x1773_xtrafondos.com.jpg'),(26,'el-sol-al-amanecer-entre-las-nubes_5120x2880_xtrafondos.com.jpg'),(27,'muralla-china_3840x2559_xtrafondos.com.jpg'),(28,'paisaje-ilustracion-del-bosque_5120x2880_xtrafondos.com.jpg'),(29,'zorros-3d-low-poly_3840x2160_xtrafondos.com.jpg'),(30,'wallpapersden.com_leona-in-league-of-legends_1920x1080.jpg'),(31,'gettyimages-56317085-1024x1024.jpg');
/*!40000 ALTER TABLE `muestra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `niño`
--

DROP TABLE IF EXISTS `niño`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niño` (
  `id_ninio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `edad` int NOT NULL,
  PRIMARY KEY (`id_ninio`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niño`
--

LOCK TABLES `niño` WRITE;
/*!40000 ALTER TABLE `niño` DISABLE KEYS */;
INSERT INTO `niño` VALUES (8,'Emilia Romero Lascano',7),(9,'Paula Romero',9),(12,'Cristopher Pérez Nieto',7),(13,'Santiago Pérez Tigrero',5),(14,'Cristopher Santiago Pérez ',2),(15,'Cristopher Romero',5),(16,'Flor Nieto Castro',5),(17,'Vinicio Romero Guamán',5),(18,'Boris Astudillo',8),(19,'Boris Astudillo Espinoza',5),(20,'Benjamín Castelo Pérez',2);
/*!40000 ALTER TABLE `niño` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `id_pregunta` int NOT NULL AUTO_INCREMENT,
  `id_seccion` int DEFAULT NULL,
  `pregunta` varchar(1000) NOT NULL,
  PRIMARY KEY (`id_pregunta`),
  KEY `id_seccion` (`id_seccion`),
  CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`id_seccion`) REFERENCES `seccion` (`id_seccion`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (49,2,'Pregunta de semejanzas 1'),(51,2,'Pregunta de semejanzas 2'),(56,4,'Pregunta de comprensión 1'),(58,2,'Pregunta de semejanzas 3'),(59,7,'Pregunta de matrices 1'),(70,3,'Pregunta de vocabulario 1'),(71,3,'Pregunta de vocabulario 2'),(72,3,'Pregunta de vocabulario 3'),(74,2,'Pregunta de semejanzas 5'),(75,6,'Pregunta de nombres 1'),(77,5,'Basurero'),(101,8,'Conceptos 1'),(102,8,'conceptos 2'),(103,8,'conceptos 3'),(104,8,'conceptos 4'),(105,8,'Conceptos 5'),(106,9,'Pregunta de reconocimiento 1'),(108,10,'Pregunta de búsqueda 1'),(109,10,'Pregunta de búsqueda 2'),(110,9,'Pregunta de reconocimiento 2'),(111,5,'Spiderman'),(112,1,'De las siguientes imágenes, selecciona la que contiene a Spiderman.'),(113,1,'De las siguientes imágenes, selecciona la que contiene a Zyra.'),(114,1,'De las siguientes imágenes, selecciona la que contiene a Draven.'),(115,1,'De las siguientes imágenes, selecciona la que contiene una cara sonriente.'),(117,1,'De las siguientes preguntas, selecciona aquella que contiene un paisaje cálido.'),(119,4,'Pregunta de comprensión 2'),(128,1,'Pregunta de Información 1'),(130,2,'Pregunta de Semejanzas 4'),(132,3,'Pregunta de vocabulario 4'),(133,4,'Pregunta de comprensión 3'),(135,5,'Paisaje de Rick y Morty'),(136,6,'Pregunta de Nombres 4'),(138,7,'Pregunta de Matrices 2'),(140,8,'Conceptos 6'),(142,9,'Pregunta de Reconocimiento 3'),(144,10,'Búsqueda 3'),(145,6,'Pregunta de nombres 2');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta_muestra`
--

DROP TABLE IF EXISTS `pregunta_muestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta_muestra` (
  `id_p_m` int NOT NULL AUTO_INCREMENT,
  `id_pregunta` int DEFAULT NULL,
  `id_muestra` int DEFAULT NULL,
  PRIMARY KEY (`id_p_m`),
  KEY `id_pregunta` (`id_pregunta`),
  KEY `id_muestra` (`id_muestra`),
  CONSTRAINT `pregunta_muestra_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id_pregunta`) ON DELETE CASCADE,
  CONSTRAINT `pregunta_muestra_ibfk_2` FOREIGN KEY (`id_muestra`) REFERENCES `muestra` (`id_muestra`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta_muestra`
--

LOCK TABLES `pregunta_muestra` WRITE;
/*!40000 ALTER TABLE `pregunta_muestra` DISABLE KEYS */;
INSERT INTO `pregunta_muestra` VALUES (46,49,2),(47,49,4),(48,49,10),(52,51,1),(53,51,3),(54,51,6),(55,58,12),(56,58,13),(57,59,14),(58,59,15),(59,59,16),(63,70,14),(64,71,14),(65,72,17),(66,74,18),(67,74,19),(68,74,20),(69,75,21),(70,106,16),(71,106,14),(74,108,14),(75,109,22),(76,110,23),(77,110,24),(81,130,26),(82,130,25),(83,130,27),(86,132,28),(87,136,21),(91,138,13),(92,138,12),(93,138,21),(96,142,29),(97,142,19),(99,144,30),(100,145,31);
/*!40000 ALTER TABLE `pregunta_muestra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta_respuesta`
--

DROP TABLE IF EXISTS `pregunta_respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta_respuesta` (
  `id_p_rp` int NOT NULL AUTO_INCREMENT,
  `id_pregunta` int DEFAULT NULL,
  `id_respuesta` int DEFAULT NULL,
  `respuesta_correcta` int DEFAULT '0',
  `numero_fila` int DEFAULT '0',
  PRIMARY KEY (`id_p_rp`),
  KEY `id_pregunta` (`id_pregunta`),
  KEY `id_respuesta` (`id_respuesta`),
  CONSTRAINT `pregunta_respuesta_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id_pregunta`) ON DELETE CASCADE,
  CONSTRAINT `pregunta_respuesta_ibfk_2` FOREIGN KEY (`id_respuesta`) REFERENCES `respuesta` (`id_respuesta`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=550 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta_respuesta`
--

LOCK TABLES `pregunta_respuesta` WRITE;
/*!40000 ALTER TABLE `pregunta_respuesta` DISABLE KEYS */;
INSERT INTO `pregunta_respuesta` VALUES (101,49,40,0,0),(102,49,41,0,0),(103,49,42,0,0),(104,49,51,1,0),(109,51,45,0,0),(110,51,44,0,0),(111,51,46,0,0),(112,51,49,1,0),(121,56,53,0,0),(122,56,58,0,0),(123,56,54,0,0),(124,56,57,0,0),(129,58,58,0,0),(130,58,53,0,0),(131,58,57,0,0),(132,58,61,0,0),(133,59,62,0,0),(134,59,63,0,0),(135,59,64,1,0),(136,59,65,0,0),(143,74,61,0,0),(144,74,70,0,0),(145,74,71,0,0),(146,74,72,0,0),(147,77,61,0,0),(148,77,70,0,0),(149,77,72,0,0),(150,77,58,0,0),(151,77,56,0,0),(152,77,57,0,0),(153,77,54,0,0),(154,77,55,0,0),(155,77,53,0,0),(323,101,53,1,1),(324,101,58,0,1),(325,101,57,0,2),(326,101,54,0,2),(327,101,55,1,3),(328,101,56,0,3),(329,102,53,1,1),(330,102,58,0,1),(331,102,57,0,2),(332,102,54,0,2),(333,102,55,1,3),(334,102,56,0,3),(335,103,53,1,1),(336,103,73,0,3),(337,103,57,0,1),(338,103,58,0,1),(339,103,54,0,1),(340,103,55,1,2),(341,103,56,0,2),(342,103,74,0,3),(343,103,75,0,3),(344,103,60,0,2),(345,103,59,0,2),(346,103,76,1,3),(347,104,58,0,3),(348,104,70,0,1),(349,104,61,1,1),(350,104,72,0,1),(351,104,68,0,2),(352,104,82,0,2),(353,104,84,1,2),(354,104,53,0,3),(355,104,57,0,3),(356,104,89,0,1),(357,104,63,1,3),(358,104,90,0,2),(359,105,65,1,3),(360,105,68,0,3),(361,105,62,0,1),(362,105,63,0,2),(363,105,91,0,1),(364,105,93,1,1),(365,105,92,0,3),(366,105,94,0,1),(367,105,64,0,3),(368,105,95,1,2),(369,105,96,0,2),(370,105,97,0,2),(371,106,58,1,0),(372,106,57,0,0),(373,106,56,0,0),(374,106,53,1,0),(375,106,54,0,0),(376,106,55,0,0),(377,106,60,0,0),(378,106,59,0,0),(383,108,53,1,0),(384,108,58,0,0),(385,108,57,0,0),(386,108,54,0,0),(387,109,54,1,0),(388,109,94,0,0),(389,109,59,0,0),(390,109,58,0,0),(391,109,77,0,0),(392,109,98,0,0),(393,110,53,0,0),(394,110,93,0,0),(395,110,65,1,0),(396,110,63,1,0),(397,110,64,0,0),(398,110,99,0,0),(399,110,100,0,0),(400,110,101,0,0),(401,111,58,0,0),(402,111,57,0,0),(403,111,54,0,0),(404,111,53,1,0),(405,111,55,0,0),(406,111,56,0,0),(407,111,60,0,0),(408,111,73,0,0),(409,111,59,0,0),(410,112,53,1,0),(411,112,58,0,0),(412,112,57,0,0),(413,112,55,0,0),(414,112,54,0,0),(415,112,56,0,0),(416,113,53,0,0),(417,113,78,0,0),(418,113,55,0,0),(419,113,63,1,0),(420,114,65,1,0),(421,114,64,0,0),(422,114,54,0,0),(423,114,62,0,0),(424,115,93,1,0),(425,115,102,0,0),(426,115,104,0,0),(427,115,103,0,0),(428,117,66,1,0),(429,117,70,0,0),(430,117,61,0,0),(431,117,105,0,0),(434,119,70,0,0),(435,119,72,0,0),(436,119,61,1,0),(459,128,70,1,0),(460,128,72,0,0),(461,128,61,0,0),(471,130,83,1,0),(472,130,71,0,0),(473,130,107,0,0),(474,130,108,0,0),(476,133,68,0,0),(477,133,82,0,0),(478,133,67,1,0),(479,133,66,0,0),(489,135,68,0,0),(490,135,82,0,0),(491,135,67,0,0),(492,135,69,0,0),(493,135,66,0,0),(494,135,106,0,0),(495,135,84,1,0),(496,135,90,0,0),(497,135,71,0,0),(501,138,58,0,0),(502,138,53,1,0),(503,138,57,0,0),(504,138,93,0,0),(517,140,70,0,3),(518,140,68,1,1),(519,140,72,0,3),(520,140,82,0,1),(521,140,61,0,3),(522,140,67,0,1),(523,140,69,0,1),(524,140,58,0,2),(525,140,53,1,2),(526,140,57,0,2),(527,140,54,0,2),(528,140,102,1,3),(535,142,66,0,0),(536,142,108,0,0),(537,142,107,0,0),(538,142,84,1,0),(539,142,82,0,0),(540,142,66,0,0),(541,142,83,1,0),(542,142,71,0,0),(544,144,58,0,0),(545,144,53,0,0),(546,144,57,0,0),(547,144,97,0,0),(548,144,59,0,0),(549,144,110,1,0);
/*!40000 ALTER TABLE `pregunta_respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuesta` (
  `id_respuesta` int NOT NULL AUTO_INCREMENT,
  `texto` varchar(100) DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_respuesta`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
INSERT INTO `respuesta` VALUES (15,NULL,'yo.jpg'),(16,NULL,'yo3.png'),(17,NULL,'yo2.jpeg'),(40,NULL,'00-00.png'),(41,NULL,'eresTu.png'),(42,NULL,'laCosaMasBella.png'),(43,NULL,'patadasDeAhogado.png'),(44,NULL,'Imagen de WhatsApp 2023-12-06 a las 19.45.40_9cacd895.jpg'),(45,NULL,'Imagen de WhatsApp 2023-12-06 a las 20.01.00_d55c1a8d.jpg'),(46,NULL,'Imagen de WhatsApp 2023-12-06 a las 20.08.42_e1107fda.jpg'),(47,NULL,'Imagen de WhatsApp 2023-12-06 a las 20.38.18_b99293d5.jpg'),(48,NULL,'workSong.png'),(49,NULL,'siTuNoEstas.png'),(50,NULL,'theManWhoCantBeMoved.png'),(51,NULL,'Imagen de WhatsApp 2023-12-06 a las 20.30.14_4e9033a9.jpg'),(52,NULL,'Imagen de WhatsApp 2023-12-06 a las 20.16.23_70795592.jpg'),(53,NULL,'0b00647ea6910a1c03e982ac4024c66a.jpg'),(54,NULL,'97-974956_skye-cave-bing-wallpaper-hd.jpg'),(55,NULL,'11761.jpg'),(56,NULL,'29366.jpg'),(57,NULL,'3d-abstracto-luz-neon-triangulo_3840x2160_xtrafondos.com.jpg'),(58,NULL,'3-36073_blood-moon-1920x1080-pixel-art-fondos-de-pantalla.jpg'),(59,NULL,'alguien-viendo-la-luna_3840x2160_xtrafondos.com.jpg'),(60,NULL,'29367.jpg'),(61,NULL,'persona-viendo-paisaje-de-torre-en-las-montanas-artwork_3840x2160_xtrafondos.com.jpg'),(62,NULL,'ciudad-futurista-estilo-retro_7680x4224_xtrafondos.com.jpg'),(63,NULL,'coven-zyra-league-of-legends-arte_3840x2160_xtrafondos.com.jpg'),(64,NULL,'dj-perro_3840x2160_xtrafondos.com.jpg'),(65,NULL,'Draven.jpeg'),(66,NULL,'paisaje-de-lago-al-atardecer_3840x2160_xtrafondos.com.jpg'),(67,NULL,'muralla-china_3840x2559_xtrafondos.com.jpg'),(68,NULL,'el-sol-al-amanecer-entre-las-nubes_5120x2880_xtrafondos.com.jpg'),(69,NULL,'paisaje-de-china-al-atardecer_5120x2880_xtrafondos.com.jpg'),(70,NULL,'paisaje-de-montanas-en-el-bosque-diseno-minimalista_3840x2160_xtrafondos.com.jpg'),(71,NULL,'paisaje-ilustracion-del-bosque_5120x2880_xtrafondos.com.jpg'),(72,NULL,'paisaje-digital-de-montanas-deserticas_3840x2160_xtrafondos.com.jpg'),(73,NULL,'atardecer-en-la-montanas-ilustracion_3840x2160_xtrafondos.com.jpg'),(74,NULL,'atardecer-en-paisaje-nevado-arte-digital_3840x2160_xtrafondos.com.jpg'),(75,NULL,'atardecer-rosado-arte-digital_3840x2160_xtrafondos.com.jpg'),(76,NULL,'amanecer-en-las-montanas-arte-digital_5120x2880_xtrafondos.com.jpg'),(77,NULL,'ilustracion-atardecer-en-el-bosque_3840x2400_xtrafondos.com.jpg'),(78,NULL,'espiral-deformada-en-rosa-y-azul_3840x2160_xtrafondos.com.jpg'),(79,NULL,'noche-colorida-en-las-montanas-arte-digital_7680x4320_xtrafondos.com.jpg'),(80,NULL,'ilustracion-atardecer-en-el-bosque_3840x2400_xtrafondos.com.jpg'),(81,NULL,'noche-colorida-en-las-montanas-arte-digital_7680x4320_xtrafondos.com.jpg'),(82,NULL,'escenario-de-the-last-of-us_3248x1773_xtrafondos.com.jpg'),(83,NULL,'zorros-3d-low-poly_3840x2160_xtrafondos.com.jpg'),(84,NULL,'paisaje-de-rick-y-morty_3840x2160_xtrafondos.com.jpg'),(85,NULL,'escenario-de-the-last-of-us_3248x1773_xtrafondos.com.jpg'),(86,NULL,'paisaje-de-rick-y-morty_3840x2160_xtrafondos.com.jpg'),(87,NULL,'zorros-3d-low-poly_3840x2160_xtrafondos.com.jpg'),(88,NULL,'espiral-deformada-en-rosa-y-azul_3840x2160_xtrafondos.com.jpg'),(89,NULL,'wallpapersden.com_tree-alone-dark-evening-4k_1920x1080.jpg'),(90,NULL,'paisaje-en-noruega-atardecer-en-las-montanas_3840x2400_xtrafondos.com.jpg'),(91,NULL,'bosque-durante-navidad-arte-digital_3840x2160_xtrafondos.com.jpg'),(92,NULL,'edificio-alto-en-el-atardecer_5120x2880_xtrafondos.com.jpg'),(93,NULL,'cara-sonrisa-ilustracion_3840x2400_xtrafondos.com.jpg'),(94,NULL,'ciudad-al-atardecer-artwork_3840x2160_xtrafondos.com.jpg'),(95,NULL,'cuarto-con-luces-neon_2880x1800_xtrafondos.com.jpg'),(96,NULL,'dia-en-la-playa-lofi_3840x2160_xtrafondos.com.jpg'),(97,NULL,'depositphotos_160212984-stock-photo-crab-nebula-is-a-remnant.jpg'),(98,NULL,'figuras-geometricas-de-colores-abstractas_3840x2400_xtrafondos.com.jpg'),(99,NULL,'Houses_Skyscrapers_Synthwave_By_SynthEx_Moon_Night_562745_1920x1080.jpg'),(100,NULL,'espiral-colorido-abstracto-macos_3840x2160_xtrafondos.com.jpg'),(101,NULL,'poligonos-abstractos_3840x2160_xtrafondos.com.jpg'),(102,NULL,'hermoso-desierto-en-noche-estrellada-ilustracion_3840x2160_xtrafondos.com.jpg'),(103,NULL,'gettyimages-56317085-1024x1024.jpg'),(104,NULL,'la-luna-entre-llamarada-arte-digital_5120x2880_xtrafondos.com.jpg'),(105,NULL,'playstation-abstracto_3840x2160_xtrafondos.com.jpg'),(106,NULL,'paisaje-de-lago-en-el-bosque-alberta-canada_5120x3481_xtrafondos.com.jpg'),(107,NULL,'silueta-de-hombre-en-las-nubes_5120x2880_xtrafondos.com.jpg'),(108,NULL,'paisaje-low-poly_3840x2160_xtrafondos.com.jpg'),(109,NULL,'hombre-a-la-luz-de-la-luna-arte-digital_3840x2160_xtrafondos.com.jpg'),(110,NULL,'wallpapersden.com_leona-in-league-of-legends_1920x1080.jpg');
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultado`
--

DROP TABLE IF EXISTS `resultado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultado` (
  `id_resultado` int NOT NULL AUTO_INCREMENT,
  `id_niño` int DEFAULT NULL,
  `id_test` int DEFAULT NULL,
  PRIMARY KEY (`id_resultado`),
  KEY `id_niño` (`id_niño`),
  KEY `id_test` (`id_test`),
  CONSTRAINT `resultado_ibfk_1` FOREIGN KEY (`id_niño`) REFERENCES `niño` (`id_ninio`) ON DELETE CASCADE,
  CONSTRAINT `resultado_ibfk_2` FOREIGN KEY (`id_test`) REFERENCES `test` (`id_test`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultado`
--

LOCK TABLES `resultado` WRITE;
/*!40000 ALTER TABLE `resultado` DISABLE KEYS */;
/*!40000 ALTER TABLE `resultado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seccion`
--

DROP TABLE IF EXISTS `seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seccion` (
  `id_seccion` int NOT NULL AUTO_INCREMENT,
  `nombre_seccion` varchar(45) NOT NULL,
  `informacion` varchar(1000) NOT NULL,
  PRIMARY KEY (`id_seccion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seccion`
--

LOCK TABLES `seccion` WRITE;
/*!40000 ALTER TABLE `seccion` DISABLE KEYS */;
INSERT INTO `seccion` VALUES (1,'Información','Estas evaluaciones son pruebas de comprensión verbal para niños prescolares. El niño deberá seleccionar el dibujo que mejor responde a una pregunta sobre conocimientos generales. El objetivo de este test es “medir” la aptitud del niño para adquirir, almacenar y recuperar los conocimientos referidos a hechos generales. Esto también se relaciona con la inteligencia cristalizada, la memoria a largo plazo y la aptitud para almacenar y recuperar información del entorno.'),(2,'Semejanzas','Estas evaluaciones son pruebas de comprensión verbal para niños prescolares. El niño deberá observar varios dibujos que pertenecen a una categoría, y debe seleccionar de entre las opciones de respuesta la que pertenece a la misma categoría. El objetivo de esta prueba es la formación de conceptos pero también se relaciona con la inteligencia cristalizada, la comprensión auditiva, la memoria, el pensamiento asociativo y categórico y la capacidad de distinguir entre características esenciales y secundarias. '),(3,'Vocabulario','Estas evaluaciones son pruebas de comprensión verbal para niños prescolares. El niño deberá nombrar o definir el dibujo que se le muestra en pantalla. El objetivo de esta prueba es medir el léxico del sujeto, así como la formación de conceptos verbales. Además, mide la inteligencia cristalizada los conocimientos adquiridos, la capacidad de aprendizaje, la expresión verbal, la memoria a largo plazo y el nivel de desarrollo del vocabulario.'),(4,'Comprensión','Estas evaluaciones son pruebas de comprensión verbal para niños prescolares. El niño deberá escoger la opción de respuesta que mejor responde a la pregunta del examinador sobre normas de conducta y reglas sociales. El objetivo de esta prueba es medir el razonamiento y conceptualización verbal, la comprensión y expresión verbal, la aptitud para evaluar y utilizar la experiencia, así como para demostrar el conocimiento y juicio práctico del sujeto. Se relaciona con la inteligencia cristalina, el conocimiento de las normas de conducta convencionales, el juicio social, la memoria a largo plazo y el sentido común.'),(5,'Dibujos','Estas evaluaciones son pruebas de comprensión verbal para niños prescolares. El niño deberá señalar el dibujo que mejor representa la palabra que se muestra en pantalla (lado izquierdo). EL objetivo de esta prueba es medir el lenguaje receptivo y el desarrollo del vocabulario. Se relaciona con el conocimiento léxico, la información adquirida, la memoria a largo plazo y la percepción de estímulos significativos.'),(6,'Nombres','Estas evaluaciones son pruebas de comprensión verbal para niños prescolares. El niño deberá nombrar la imagen que se muestra en pantalla. El objetivo de esta prueba es medir el lenguaje expresivo, específicamente en el área de desarrollo semántico (conocimiento léxico). También se relaciona con el conocimiento y la información adquiridos, la memoria a largo plazo y la percepción de estímulos significativos.'),(7,'Matrices','Estas evaluaciones son pruebas de razonamiento fluído para niños prescolares. El niño observará una matriz incompleta y debe seleccionar la opción de respuesta que completa la matriz. El objetivo de esta prueba es medir la inteligencia fluida, la inteligencia visual general, la aptitud espacial y la clasificación, el conocimiento de las relaciones parte-todo, el procesamiento simultáneo y la organización perceptiva. '),(8,'Conceptos','Estas evaluaciones son pruebas de razonamiento fluido para niños prescolares. El niño observará tres filas de imágenes y deberá elegir un dibujo de cada fila para formar un grupo con una característica común. El objetivo de esta prueba es medir el razonamiento fluido e inductivo, el reconocimiento y procesamiento visoperceptivos y el pensamiento conceptual, así como el conocimiento cristalizado.'),(9,'Reconocimiento','Estas evaluaciones son pruebas de memoria de trabajo para niños prescolares. El niño observará en pantalla una serie de estímulos con dos o más dibujos durante un tiempo límite. Luego, debe seleccionar los dibujos que observó en la pantalla de respuestas. Esta prueba se asemeja a otras tareas de memoria de trabajo visual, pero es relativamente innovadora porque los estímulos tienen un significado para los niños pequeños. Para esta prueba de memoria de trabajo, los requisitos se basan en la interferencia proactiva en lugar de la secuenciación.'),(10,'Búsqueda','Estas evaluaciones son pruebas de velocidad de procesamiento para niños prescolares. El niño observará un estímulo objetivo (imagen de un animal) y un grupo de búsqueda (cinco animales). Después, el niño deberá seleccionar el animal en el grupo de búsqueda que coincide con el estímulo objetivo. El objetivo de esta prueba es medir la velocidad perceptiva, la memoria visual a corto plazo, la flexibilidad cognitiva, la discriminación visual y la concentración. Se recomienda que los estímulos de este tipo de preguntas sean imágenes sencillas y grandes, sugerentes para los niños pequeños.');
/*!40000 ALTER TABLE `seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id_test` int NOT NULL AUTO_INCREMENT,
  `nombre_test` varchar(100) NOT NULL,
  `id_seccion` int DEFAULT NULL,
  PRIMARY KEY (`id_test`),
  KEY `id_seccion` (`id_seccion`),
  CONSTRAINT `test_ibfk_1` FOREIGN KEY (`id_seccion`) REFERENCES `seccion` (`id_seccion`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (54,'Test de Información 2',1),(63,'Test de Información 3',1),(65,'Test de Información 1',1),(66,'Test de Semejanzas 1',2),(68,'Test de Semejanzas 2',2),(71,'Test de Vocabulario 1',3),(72,'Test de comprensión 1',4),(73,'Test de dibujos 1',5),(75,'Test de matrices 1',7),(76,'Teste de Conceptos 1',8),(77,'Test de Reconocimiento 1',9),(78,'Test de Búsqueda 1',10),(79,'Test de Nombres 1',6);
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_ninio`
--

DROP TABLE IF EXISTS `test_ninio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_ninio` (
  `id_t_n` int NOT NULL AUTO_INCREMENT,
  `id_test` int DEFAULT NULL,
  `id_ninio` int DEFAULT NULL,
  `puntaje` int DEFAULT '0',
  PRIMARY KEY (`id_t_n`),
  KEY `id_test` (`id_test`),
  KEY `id_ninio` (`id_ninio`),
  CONSTRAINT `test_ninio_ibfk_1` FOREIGN KEY (`id_test`) REFERENCES `test` (`id_test`),
  CONSTRAINT `test_ninio_ibfk_2` FOREIGN KEY (`id_ninio`) REFERENCES `niño` (`id_ninio`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_ninio`
--

LOCK TABLES `test_ninio` WRITE;
/*!40000 ALTER TABLE `test_ninio` DISABLE KEYS */;
INSERT INTO `test_ninio` VALUES (52,54,14,1),(53,54,13,3),(54,54,17,2),(55,54,16,0),(64,65,14,6),(65,65,13,5),(66,65,16,3),(67,66,14,2),(69,68,14,2),(71,71,14,3),(72,72,14,2),(73,73,14,2),(75,75,14,3),(76,76,14,2),(77,77,14,3),(78,78,14,3),(79,65,17,0),(80,66,13,2),(81,71,13,3),(82,79,14,2);
/*!40000 ALTER TABLE `test_ninio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_pregunta`
--

DROP TABLE IF EXISTS `test_pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_pregunta` (
  `id_t_p` int NOT NULL AUTO_INCREMENT,
  `id_test` int DEFAULT NULL,
  `id_pregunta` int DEFAULT NULL,
  PRIMARY KEY (`id_t_p`),
  KEY `id_test` (`id_test`),
  KEY `id_pregunta` (`id_pregunta`),
  CONSTRAINT `test_pregunta_ibfk_1` FOREIGN KEY (`id_test`) REFERENCES `test` (`id_test`),
  CONSTRAINT `test_pregunta_ibfk_2` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id_pregunta`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_pregunta`
--

LOCK TABLES `test_pregunta` WRITE;
/*!40000 ALTER TABLE `test_pregunta` DISABLE KEYS */;
INSERT INTO `test_pregunta` VALUES (133,54,114),(134,54,117),(135,54,115),(160,63,112),(161,63,113),(162,63,114),(163,63,117),(164,63,115),(170,65,113),(171,65,112),(172,65,114),(173,65,115),(174,65,117),(175,65,128),(176,66,51),(177,66,49),(178,66,58),(180,66,74),(184,68,58),(185,68,51),(186,68,130),(194,71,132),(195,71,72),(196,71,70),(197,71,71),(198,72,119),(199,72,56),(200,72,133),(201,73,77),(202,73,111),(203,73,135),(207,75,59),(208,75,138),(209,75,59),(210,76,103),(211,76,140),(212,76,104),(213,76,105),(214,77,106),(215,77,142),(216,77,110),(217,78,108),(218,78,109),(219,78,144),(220,79,75),(221,79,136),(222,79,145);
/*!40000 ALTER TABLE `test_pregunta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-03 22:21:13
