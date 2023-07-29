-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: amiga
-- ------------------------------------------------------
-- Server version	8.0.33
CREATE DATABASE IF NOT EXISTS amiga;
use amiga;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AnnualData`
--

DROP TABLE IF EXISTS `AnnualData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AnnualData` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `AvailableHours` varchar(255) DEFAULT NULL,
  `SpecialBenefit` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `benefit` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `dateBenefit` date DEFAULT NULL,
  `dateRegister` date DEFAULT NULL,
  `demandedStudies` varchar(255) DEFAULT NULL,
  `dependants` bit(1) NOT NULL,
  `derivation` varchar(255) DEFAULT NULL,
  `disability` varchar(255) DEFAULT NULL,
  `drivingLicence` bit(1) NOT NULL,
  `healthCoverage` varchar(255) DEFAULT NULL,
  `monthsSepe` int DEFAULT NULL,
  `numberRegistered` int NOT NULL,
  `oneAdultHousehold` bit(1) NOT NULL,
  `postalAddress` varchar(255) DEFAULT NULL,
  `profExpOrigin` varchar(255) DEFAULT NULL,
  `profExpSpain` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `registered` bit(1) NOT NULL,
  `returned` bit(1) NOT NULL,
  `sepe` bit(1) NOT NULL,
  `situation` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `socialWorker` varchar(255) DEFAULT NULL,
  `unemployedHousehold` bit(1) NOT NULL,
  `valid` bit(1) NOT NULL,
  `vehicle` bit(1) NOT NULL,
  `cohabitation_id` bigint DEFAULT NULL,
  `demand_id` bigint DEFAULT NULL,
  `employment_id` bigint DEFAULT NULL,
  `housing_id` bigint DEFAULT NULL,
  `municipality_id` bigint DEFAULT NULL,
  `participant_id` bigint DEFAULT NULL,
  `Province_id` bigint DEFAULT NULL,
  `studies_id` bigint DEFAULT NULL,
  `maritalStatus_id` bigint DEFAULT NULL,
  `approved` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc5kcwit8ue3a35gpiyxp74v2a` (`cohabitation_id`),
  KEY `FKo2kjcwwv8us5ebg8nwthg3hny` (`demand_id`),
  KEY `FK7byld6e1r5jtigq6yja3nk5f0` (`employment_id`),
  KEY `FK1h6ugs56wkar2udhhfuiod2uy` (`housing_id`),
  KEY `FKdlndlbfnluomns6vco9s2tglu` (`municipality_id`),
  KEY `FKoqrwnj16kj5rchba16dekuvuh` (`participant_id`),
  KEY `FK1q25pyurb23gsihf0s2pnjfd9` (`Province_id`),
  KEY `FKhl44m4cm6gtci08eks7kih8o1` (`studies_id`),
  KEY `FKout5jvyqp7poamftl6sblceqn` (`maritalStatus_id`),
  CONSTRAINT `FK1h6ugs56wkar2udhhfuiod2uy` FOREIGN KEY (`housing_id`) REFERENCES `Housing` (`id`),
  CONSTRAINT `FK1q25pyurb23gsihf0s2pnjfd9` FOREIGN KEY (`Province_id`) REFERENCES `Province` (`id`),
  CONSTRAINT `FK7byld6e1r5jtigq6yja3nk5f0` FOREIGN KEY (`employment_id`) REFERENCES `Employment` (`id`),
  CONSTRAINT `FKc5kcwit8ue3a35gpiyxp74v2a` FOREIGN KEY (`cohabitation_id`) REFERENCES `Cohabitation` (`id`),
  CONSTRAINT `FKdlndlbfnluomns6vco9s2tglu` FOREIGN KEY (`municipality_id`) REFERENCES `Municipality` (`id`),
  CONSTRAINT `FKhl44m4cm6gtci08eks7kih8o1` FOREIGN KEY (`studies_id`) REFERENCES `Studies` (`id`),
  CONSTRAINT `FKo2kjcwwv8us5ebg8nwthg3hny` FOREIGN KEY (`demand_id`) REFERENCES `Demand` (`id`),
  CONSTRAINT `FKoqrwnj16kj5rchba16dekuvuh` FOREIGN KEY (`participant_id`) REFERENCES `Participant` (`id`),
  CONSTRAINT `FKout5jvyqp7poamftl6sblceqn` FOREIGN KEY (`maritalStatus_id`) REFERENCES `MaritalStatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AnnualData`
--

LOCK TABLES `AnnualData` WRITE;
/*!40000 ALTER TABLE `AnnualData` DISABLE KEYS */;
INSERT INTO `AnnualData` VALUES (5,NULL,NULL,'C. san diego','IMV','2023-06-06','2021-12-20','2004-03-20','Pintar coches',_binary '\0','Especial','LESS_33',_binary '','sanidad publica',20,0,_binary '','','Trabajo en un taller','Ninguna','Arreglar coches',_binary '\0',_binary '\0',_binary '','REGULAR','Sordo','cruz roja',_binary '',_binary '\0',_binary '',2,2,2,2,30,8,1,2,5,NULL),(6,NULL,NULL,'C. pizza','OTRA','2023-06-06','2001-07-12',NULL,'wrewrw',_binary '\0','grande','MORE_33',_binary '','',4,0,_binary '\0','','wrwerwerwerqwertqwertqwrtqwert','rewrwerewrtqterter','wrewrw',_binary '\0',_binary '\0',_binary '','IRREGULAR','efewrewrqrtewtewr','',_binary '',_binary '',_binary '',2,2,4,2,103,9,2,4,3,NULL),(7,'gfdgdf','','C. san diego','OTRA','2023-06-10','2023-06-16','2023-06-01','fegdgd',_binary '','dfgdgdfg','LESS_33',_binary '','fgdgdg',4,4,_binary '','15008','dfgfd','fdgdg','fdgfdg',_binary '',_binary '\0',_binary '','REGULAR','dfgdgd','rgegrf',_binary '',_binary '',_binary '',3,2,2,1,3,10,1,2,5,NULL),(8,'fjhf','','fdhgfjhfg','OTRA','2023-06-10','2023-06-14','2023-06-08','etjruyk',_binary '','dfgdffgfdg','MORE_33',_binary '','tretete',7,6,_binary '','gfjfjfg','fjh','gffjhg','vhjghjfgjh',_binary '',_binary '\0',_binary '','REGULAR','hjfgj','6yrttytry',_binary '',_binary '',_binary '',1,3,3,2,6,11,1,2,2,NULL),(9,'qewq','asdfaf','dfsdfsf','OTRA','2023-06-10','2023-06-22','2023-06-22','weqe',_binary '','wdas','LESS_33',_binary '','asddas',34,23,_binary '','sdffsf','qewqe','eqwe','weqwe',_binary '',_binary '\0',_binary '','REGULAR','wqe','asdasd',_binary '',_binary '',_binary '',5,2,2,2,1,12,1,2,6,NULL);
/*!40000 ALTER TABLE `AnnualData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cohabitation`
--

DROP TABLE IF EXISTS `Cohabitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cohabitation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cohabitation`
--

LOCK TABLES `Cohabitation` WRITE;
/*!40000 ALTER TABLE `Cohabitation` DISABLE KEYS */;
INSERT INTO `Cohabitation` VALUES (1,'Pareja'),(2,'Familia monoparental'),(3,'Familia nulear'),(4,'Agrupación voluntaria'),(5,'Familia propia ampliada');
/*!40000 ALTER TABLE `Cohabitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Country` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'Afganistán'),(2,'Albania'),(3,'Alemania'),(4,'Andorra'),(5,'Angola'),(6,'Anguila'),(7,'Antártida'),(8,'Antigua y Barbuda'),(9,'Arabia Saudita'),(10,'Argelia'),(11,'Argentina'),(12,'Armenia'),(13,'Aruba'),(14,'Australia'),(15,'Austria'),(16,'Azerbaiyán'),(17,'Bélgica'),(18,'Bahamas'),(19,'Bahrein'),(20,'Bangladesh'),(21,'Barbados'),(22,'Belice'),(23,'Benín'),(24,'Bhután'),(25,'Bielorrusia'),(26,'Birmania'),(27,'Bolivia'),(28,'Bosnia y Herzegovina'),(29,'Botsuana'),(30,'Brasil'),(31,'Brunéi'),(32,'Bulgaria'),(33,'Burkina Faso'),(34,'Burundi'),(35,'Cabo Verde'),(36,'Camboya'),(37,'Camerún'),(38,'Canadá'),(39,'Chad'),(40,'Chile'),(41,'China'),(42,'Chipre'),(43,'Ciudad del Vaticano'),(44,'Colombia'),(45,'Comoras'),(46,'República del Congo'),(47,'República Democrática del Congo'),(48,'Corea del Norte'),(49,'Corea del Sur'),(50,'Costa de Marfil'),(51,'Costa Rica'),(52,'Croacia'),(53,'Cuba'),(54,'Curazao'),(55,'Dinamarca'),(56,'Dominica'),(57,'Ecuador'),(58,'Egipto'),(59,'El Salvador'),(60,'Emiratos Árabes Unidos'),(61,'Eritrea'),(62,'Eslovaquia'),(63,'Eslovenia'),(64,'España'),(65,'Estados Unidos de América'),(66,'Estonia'),(67,'Etiopía'),(68,'Filipinas'),(69,'Finlandia'),(70,'Fiyi'),(71,'Francia'),(72,'Gabón'),(73,'Gambia'),(74,'Georgia'),(75,'Ghana'),(76,'Gibraltar'),(77,'Granada'),(78,'Grecia'),(79,'Groenlandia'),(80,'Guadalupe'),(81,'Guam'),(82,'Guatemala'),(83,'Guayana Francesa'),(84,'Guernsey'),(85,'Guinea'),(86,'Guinea Ecuatorial'),(87,'Guinea-Bissau'),(88,'Guyana'),(89,'Haití'),(90,'Honduras'),(91,'Hong kong'),(92,'Hungría'),(93,'India'),(94,'Indonesia'),(95,'Irán'),(96,'Irak'),(97,'Irlanda'),(98,'Isla Bouvet'),(99,'Isla de Man'),(100,'Isla de Navidad'),(101,'Isla Norfolk'),(102,'Islandia'),(103,'Islas Bermudas'),(104,'Islas Caimán'),(105,'Islas Cocos (Keeling)'),(106,'Islas Cook'),(107,'Islas de Åland'),(108,'Islas Feroe'),(109,'Islas Georgias del Sur y Sandwich del Sur'),(110,'Islas Heard y McDonald'),(111,'Islas Maldivas'),(112,'Islas Malvinas'),(113,'Islas Marianas del Norte'),(114,'Islas Marshall'),(115,'Islas Pitcairn'),(116,'Islas Salomón'),(117,'Islas Turcas y Caicos'),(118,'Islas Ultramarinas Menores de Estados Unidos'),(119,'Islas Vírgenes Británicas'),(120,'Islas Vírgenes de los Estados Unidos'),(121,'Israel'),(122,'Italia'),(123,'Jamaica'),(124,'Japón'),(125,'Jersey'),(126,'Jordania'),(127,'Kazajistán'),(128,'Kenia'),(129,'Kirguistán'),(130,'Kiribati'),(131,'Kuwait'),(132,'Líbano'),(133,'Laos'),(134,'Lesoto'),(135,'Letonia'),(136,'Liberia'),(137,'Libia'),(138,'Liechtenstein'),(139,'Lituania'),(140,'Luxemburgo'),(141,'México'),(142,'Mónaco'),(143,'Macao'),(144,'Macedônia'),(145,'Madagascar'),(146,'Malasia'),(147,'Malawi'),(148,'Mali'),(149,'Malta'),(150,'Marruecos'),(151,'Martinica'),(152,'Mauricio'),(153,'Mauritania'),(154,'Mayotte'),(155,'Micronesia'),(156,'Moldavia'),(157,'Mongolia'),(158,'Montenegro'),(159,'Montserrat'),(160,'Mozambique'),(161,'Namibia'),(162,'Nauru'),(163,'Nepal'),(164,'Nicaragua'),(165,'Niger'),(166,'Nigeria'),(167,'Niue'),(168,'Noruega'),(169,'Nueva Caledonia'),(170,'Nueva Zelanda'),(171,'Omán'),(172,'Países Bajos'),(173,'Pakistán'),(174,'Palau'),(175,'Palestina'),(176,'Panamá'),(177,'Papúa Nueva Guinea'),(178,'Paraguay'),(179,'Perú'),(180,'Polinesia Francesa'),(181,'Polonia'),(182,'Portugal'),(183,'Puerto Rico'),(184,'Qatar'),(185,'Reino Unido'),(186,'República Centroafricana'),(187,'República Checa'),(188,'República Dominicana'),(189,'República de Sudán del Sur'),(190,'Reunión'),(191,'Ruanda'),(192,'Rumanía'),(193,'Rusia'),(194,'Sahara Occidental'),(195,'Samoa'),(196,'Samoa Americana'),(197,'San Bartolomé'),(198,'San Cristóbal y Nieves'),(199,'San Marino'),(200,'San Martín (Francia)'),(201,'San Pedro y Miquelón'),(202,'San Vicente y las Granadinas'),(203,'Santa Elena'),(204,'Santa Lucía'),(205,'Santo Tomé y Príncipe'),(206,'Senegal'),(207,'Serbia'),(208,'Seychelles'),(209,'Sierra Leona'),(210,'Singapur'),(211,'Sint Maarten'),(212,'Siria'),(213,'Somalia'),(214,'Sri lanka'),(215,'Sudáfrica'),(216,'Sudán'),(217,'Suecia'),(218,'Suiza'),(219,'Surinám'),(220,'Svalbard y Jan Mayen'),(221,'Swazilandia'),(222,'Tayikistán'),(223,'Tailandia'),(224,'Taiwán'),(225,'Tanzania'),(226,'Territorio Británico del Océano Índico'),(227,'Territorios Australes y Antárticas Franceses'),(228,'Timor Oriental'),(229,'Togo'),(230,'Tokelau'),(231,'Tonga'),(232,'Trinidad y Tobago'),(233,'Tunez'),(234,'Turkmenistán'),(235,'Turquía'),(236,'Tuvalu'),(237,'Ucrania'),(238,'Uganda'),(239,'Uruguay'),(240,'Uzbekistán'),(241,'Vanuatu'),(242,'Venezuela'),(243,'Vietnam'),(244,'Wallis y Futuna'),(245,'Yemen'),(246,'Yibuti'),(247,'Zambia'),(248,'Zimbabue');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Demand`
--

DROP TABLE IF EXISTS `Demand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Demand` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Demand`
--

LOCK TABLES `Demand` WRITE;
/*!40000 ALTER TABLE `Demand` DISABLE KEYS */;
INSERT INTO `Demand` VALUES (1,'Acogida'),(2,'Sociolaboral'),(3,'Jurídico'),(4,'Sociolaboral-Jurídico');
/*!40000 ALTER TABLE `Demand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employment`
--

DROP TABLE IF EXISTS `Employment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employment`
--

LOCK TABLES `Employment` WRITE;
/*!40000 ALTER TABLE `Employment` DISABLE KEYS */;
INSERT INTO `Employment` VALUES (1,'Desempleado/a'),(2,'Desempleado/a de larga duración'),(3,'Inactiva/o'),(4,'Inactiva/o, integrada/o en los sistemas de educación o formación'),(5,'Ocupada/o'),(6,'Subempleado/a por insuficiencia de horas');
/*!40000 ALTER TABLE `Employment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExclusionFactor`
--

DROP TABLE IF EXISTS `ExclusionFactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExclusionFactor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExclusionFactor`
--

LOCK TABLES `ExclusionFactor` WRITE;
/*!40000 ALTER TABLE `ExclusionFactor` DISABLE KEYS */;
INSERT INTO `ExclusionFactor` VALUES (1,'Adiciones, en proceso de rehabilitación social'),(2,'Discapacidad (más del 33%)'),(3,'Cargas familiares no compartidas'),(4,'Emigrantes retornados'),(5,'Enfermedad mental'),(6,'Escasez de recursos'),(7,'Exclusión territorial'),(8,'Exreclusión'),(9,'Inmigrantes/Refugiados'),(10,'Problemas de salud'),(11,'Prostitución, en proceso de abandono'),(12,'Sin techo o infravivienda'),(13,'Víctima de violencia de género');
/*!40000 ALTER TABLE `ExclusionFactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Housing`
--

DROP TABLE IF EXISTS `Housing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Housing` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Housing`
--

LOCK TABLES `Housing` WRITE;
/*!40000 ALTER TABLE `Housing` DISABLE KEYS */;
INSERT INTO `Housing` VALUES (1,'Propia'),(2,'Alquilada'),(3,'Cedida');
/*!40000 ALTER TABLE `Housing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Kid`
--

DROP TABLE IF EXISTS `Kid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Kid` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `birthDate` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `participant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1u3k8980nxday02ru39sc5cif` (`participant_id`),
  CONSTRAINT `FK1u3k8980nxday02ru39sc5cif` FOREIGN KEY (`participant_id`) REFERENCES `Participant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Kid`
--

LOCK TABLES `Kid` WRITE;
/*!40000 ALTER TABLE `Kid` DISABLE KEYS */;
INSERT INTO `Kid` VALUES (1,'2023-06-15','H',10),(2,'2023-06-15','H',11),(3,'2023-06-06','H',12);
/*!40000 ALTER TABLE `Kid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Language`
--

DROP TABLE IF EXISTS `Language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Language` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Language`
--

LOCK TABLES `Language` WRITE;
/*!40000 ALTER TABLE `Language` DISABLE KEYS */;
INSERT INTO `Language` VALUES (1,'afrikáans'),(2,'akan'),(3,'albanés'),(4,'amárico'),(5,'arábigo'),(6,'aragonés'),(7,'armenio'),(8,'asamés'),(9,'avaro'),(10,'avéstico'),(11,'aymara'),(12,'azerbaiyano'),(13,'bashkir'),(14,'euskera'),(15,'bielorruso'),(16,'bengalí'),(17,'bhojpuri'),(18,'bichelamar'),(19,'bosnio'),(20,'bretón'),(21,'búlgaro'),(22,'birmano'),(23,'catalán'),(24,'chamorro'),(25,'checheno'),(26,'chino'),(27,'eslavo eclesiástico'),(28,'chuvasio'),(29,'córnico'),(30,'corso'),(31,'cree'),(32,'croata'),(33,'checo'),(34,'danés'),(35,'divehi'),(36,'neerlandés'),(37,'dzongkha'),(38,'inglés'),(39,'esperanto'),(40,'estonio'),(41,'ewé'),(42,'faroés'),(43,'fijiano'),(44,'finlandés'),(45,'francés'),(46,'frisón'),(47,'fula'),(48,'gaélico'),(49,'gallego'),(50,'georgiano'),(51,'alemán'),(52,'griego'),(53,'groenlandés'),(54,'guaraní'),(55,'gujarati'),(56,'haitiano'),(57,'hausa'),(58,'hebreo'),(59,'herero'),(60,'hindi'),(61,'hiri motu'),(62,'húngaro'),(63,'islandés'),(64,'ido'),(65,'igbo'),(66,'indonesio'),(67,'interlingua'),(68,'interlingüe'),(69,'inuktitut'),(70,'inupiaq'),(71,'irlandés'),(72,'italiano'),(73,'japonés'),(74,'javanés'),(75,'kalaallisut'),(76,'kannada'),(77,'kanuri'),(78,'kashmiri'),(79,'kazajo'),(80,'khmer'),(81,'kikuyu'),(82,'kimbundu'),(83,'konkani'),(84,'coreano'),(85,'kuanyama'),(86,'kurdo'),(87,'kirguís'),(88,'ladino'),(89,'lao'),(90,'latín'),(91,'letón'),(92,'limburgués'),(93,'lingala'),(94,'lituano'),(95,'luba-katanga'),(96,'luxemburgués'),(97,'ganda'),(98,'macedonio'),(99,'malgache'),(100,'malayo'),(101,'malayalam'),(102,'maltés'),(103,'manx'),(104,'maorí'),(105,'maratí'),(106,'marshallese'),(107,'mongol'),(108,'nauruano'),(109,'navajo'),(110,'ndonga'),(111,'nepalí'),(112,'noruego'),(113,'noruego bokmål'),(114,'noruego nynorsk'),(115,'nuosu'),(116,'occitano'),(117,'ojibwa'),(118,'oriya'),(119,'oromo'),(120,'osético'),(121,'pali'),(122,'pashto'),(123,'persa'),(124,'polaco'),(125,'portugués'),(126,'quechua'),(127,'romanche'),(128,'rumano'),(129,'ruso'),(130,'sami septentrional'),(131,'sánscrito'),(132,'sardo'),(133,'serbio'),(134,'shona'),(135,'cingalés'),(136,'eslovaco'),(137,'esloveno'),(138,'somalí'),(139,'sotho del sur'),(140,'español'),(141,'sundanés'),(142,'suajili'),(143,'sueco'),(144,'suizo-alemán'),(145,'sirio'),(146,'tagalo'),(147,'tahitiano'),(148,'tamil'),(149,'tártaro'),(150,'telugu'),(151,'tetun'),(152,'tailandés'),(153,'tibetano'),(154,'tigrinya'),(155,'tok pisin'),(156,'tonga'),(157,'tsonga'),(158,'turco'),(159,'turcomano'),(160,'tuvano'),(161,'twi'),(162,'ucraniano'),(163,'udmurt'),(164,'urdu'),(165,'uzbeko'),(166,'venda'),(167,'vietnamita'),(168,'volapük'),(169,'wallisiano'),(170,'galés'),(171,'occidental'),(172,'wolof'),(173,'xhosa'),(174,'yídish'),(175,'yoruba'),(176,'zhuang'),(177,'zulú');
/*!40000 ALTER TABLE `Language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaritalStatus`
--

DROP TABLE IF EXISTS `MaritalStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaritalStatus` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaritalStatus`
--

LOCK TABLES `MaritalStatus` WRITE;
/*!40000 ALTER TABLE `MaritalStatus` DISABLE KEYS */;
INSERT INTO `MaritalStatus` VALUES (1,'Casado/a'),(2,'Divorciado/a'),(3,'Separado/a'),(4,'Soltero/a'),(5,'Unión de hecho registrada'),(6,'Unión de hecho no registrada'),(7,'Viudo/a');
/*!40000 ALTER TABLE `MaritalStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Municipality`
--

DROP TABLE IF EXISTS `Municipality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Municipality` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `province_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnpkdnrnks57uy5my36irggbny` (`province_id`),
  CONSTRAINT `FKnpkdnrnks57uy5my36irggbny` FOREIGN KEY (`province_id`) REFERENCES `Province` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=318 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Municipality`
--

LOCK TABLES `Municipality` WRITE;
/*!40000 ALTER TABLE `Municipality` DISABLE KEYS */;
INSERT INTO `Municipality` VALUES (1,'Abegondo',1),(2,'Ames',1),(3,'Aranga',1),(4,'Ares',1),(5,'Arteixo',1),(6,'Arzúa',1),(7,'Baña (A)',1),(8,'Bergondo',1),(9,'Betanzos',1),(10,'Boimorto',1),(11,'Boiro',1),(12,'Boqueixón',1),(13,'Brión',1),(14,'Cabana de Bergantiños',1),(15,'Cabanas',1),(16,'Camariñas',1),(17,'Cambre',1),(18,'Capela (A)',1),(19,'Carballo',1),(20,'Carnota',1),(21,'Carral',1),(22,'Cedeira',1),(23,'Cee',1),(24,'Cerceda',1),(25,'Cerdido',1),(26,'Cesuras',1),(27,'Coirós',1),(28,'Corcubión',1),(29,'Coristanco',1),(30,'Coruña (A)',1),(31,'Culleredo',1),(32,'Curtis',1),(33,'Dodro',1),(34,'Dumbría',1),(35,'Fene',1),(36,'Ferrol',1),(37,'Fisterra',1),(38,'Frades',1),(39,'Irixoa',1),(40,'Laxe',1),(41,'Laracha (A)',1),(42,'Lousame',1),(43,'Malpica de Bergantiños',1),(44,'Mañón',1),(45,'Mazaricos',1),(46,'Melide',1),(47,'Mesía',1),(48,'Miño',1),(49,'Moeche',1),(50,'Monfero',1),(51,'Mugardos',1),(52,'Muxía',1),(53,'Muros',1),(54,'Narón',1),(55,'Neda',1),(56,'Negreira',1),(57,'Noia',1),(58,'Oleiros',1),(59,'Ordes',1),(60,'Oroso',1),(61,'Ortigueira',1),(62,'Outes',1),(63,'Oza dos Ríos',1),(64,'Paderne',1),(65,'Padrón',1),(66,'Pino (O)',1),(67,'Pobra do Caramiñal (A)',1),(68,'Ponteceso',1),(69,'Pontedeume',1),(70,'Pontes de García Rodríguez (As)',1),(71,'Porto do Son',1),(72,'Rianxo',1),(73,'Ribeira',1),(74,'Rois',1),(75,'Sada',1),(76,'San Sadurniño',1),(77,'Santa Comba',1),(78,'Santiago de Compostela',1),(79,'Santiso',1),(80,'Sobrado',1),(81,'Somozas (As)',1),(82,'Teo',1),(83,'Toques',1),(84,'Tordoia',1),(85,'Touro',1),(86,'Trazo',1),(87,'Valdoviño',1),(88,'Val do Dubra',1),(89,'Vedra',1),(90,'Vilasantar',1),(91,'Vilarmaior',1),(92,'Vimianzo',1),(93,'Zas',1),(94,'Cariño',1),(95,'Oza-Cesuras',1),(96,'Arbo',2),(97,'Barro',2),(98,'Baiona',2),(99,'Bueu',2),(100,'Caldas de Reis',2),(101,'Cambados',2),(102,'Campo Lameiro',2),(103,'Cangas',2),(104,'Cañiza (A)',2),(105,'Catoira',2),(106,'Cerdedo',2),(107,'Cotobade',2),(108,'Covelo',2),(109,'Crecente',2),(110,'Cuntis',2),(111,'Dozón',2),(112,'Estrada (A)',2),(113,'Forcarei',2),(114,'Fornelos de Montes',2),(115,'Agolada',2),(116,'Gondomar',2),(117,'Grove (O)',2),(118,'Guarda (A)',2),(119,'Lalín',2),(120,'Lama (A)',2),(121,'Marín',2),(122,'Meaño',2),(123,'Meis',2),(124,'Moaña',2),(125,'Mondariz',2),(126,'Mondariz-Balneario',2),(127,'Moraña',2),(128,'Mos',2),(129,'Neves (As)',2),(130,'Nigrán',2),(131,'Oia',2),(132,'Pazos de Borbén',2),(133,'Pontevedra',2),(134,'Porriño (O)',2),(135,'Portas',2),(136,'Poio',2),(137,'Ponteareas',2),(138,'Ponte Caldelas',2),(139,'Pontecesures',2),(140,'Redondela',2),(141,'Ribadumia',2),(142,'Rodeiro',2),(143,'Rosal (O)',2),(144,'Salceda de Caselas',2),(145,'Salvaterra de Miño',2),(146,'Sanxenxo',2),(147,'Silleda',2),(148,'Soutomaior',2),(149,'Tomiño',2),(150,'Tui',2),(151,'Valga',2),(152,'Vigo',2),(153,'Vilaboa',2),(154,'Vila de Cruces',2),(155,'Vilagarcía de Arousa',2),(156,'Vilanova de Arousa',2),(157,'Illa de Arousa (A)',2),(158,'Cerdedo-Cotobade',2),(159,'Abadín',3),(160,'Alfoz',3),(161,'Antas de Ulla',3),(162,'Baleira',3),(163,'Barreiros',3),(164,'Becerreá',3),(165,'Begonte',3),(166,'Bóveda',3),(167,'Carballedo',3),(168,'Castro de Rei',3),(169,'Castroverde',3),(170,'Cervantes',3),(171,'Cervo',3),(172,'Corgo (O)',3),(173,'Cospeito',3),(174,'Chantada',3),(175,'Folgoso do Courel',3),(176,'Fonsagrada (A)',3),(177,'Foz',3),(178,'Friol',3),(179,'Xermade',3),(180,'Guitiriz',3),(181,'Guntín',3),(182,'Incio (O)',3),(183,'Xove',3),(184,'Láncara',3),(185,'Lourenzá',3),(186,'Lugo',3),(187,'Meira',3),(188,'Mondoñedo',3),(189,'Monforte de Lemos',3),(190,'Monterroso',3),(191,'Muras',3),(192,'Navia de Suarna',3),(193,'Negueira de Muñiz',3),(194,'Nogais (As)',3),(195,'Ourol',3),(196,'Outeiro de Rei',3),(197,'Palas de Rei',3),(198,'Pantón',3),(199,'Paradela',3),(200,'Páramo (O)',3),(201,'Pastoriza (A)',3),(202,'Pedrafita do Cebreiro',3),(203,'Pol',3),(204,'Pobra do Brollón (A)',3),(205,'Pontenova (A)',3),(206,'Portomarín',3),(207,'Quiroga',3),(208,'Ribadeo',3),(209,'Ribas de Sil',3),(210,'Ribeira de Piquín',3),(211,'Riotorto',3),(212,'Samos',3),(213,'Rábade',3),(214,'Sarria',3),(215,'Saviñao (O)',3),(216,'Sober',3),(217,'Taboada',3),(218,'Trabada',3),(219,'Triacastela',3),(220,'Valadouro (O)',3),(221,'Vicedo (O)',3),(222,'Vilalba',3),(223,'Viveiro',3),(224,'Baralla',3),(225,'Burela',3),(226,'Allariz',4),(227,'Amoeiro',4),(228,'Arnoia (A)',4),(229,'Avión',4),(230,'Baltar',4),(231,'Bande',4),(232,'Baños de Molgas',4),(233,'Barbadás',4),(234,'Barco de Valdeorras (O)',4),(235,'Beade',4),(236,'Beariz',4),(237,'Blancos (Os)',4),(238,'Boborás',4),(239,'Bola (A)',4),(240,'Bolo (O)',4),(241,'Calvos de Randín',4),(242,'Carballeda de Valdeorras',4),(243,'Carballeda de Avia',4),(244,'Carballiño (O)',4),(245,'Cartelle',4),(246,'Castrelo do Val',4),(247,'Castrelo de Miño',4),(248,'Castro Caldelas',4),(249,'Celanova',4),(250,'Cenlle',4),(251,'Coles',4),(252,'Cortegada',4),(253,'Cualedro',4),(254,'Chandrexa de Queixa',4),(255,'Entrimo',4),(256,'Esgos',4),(257,'Xinzo de Limia',4),(258,'Gomesende',4),(259,'Gudiña (A)',4),(260,'Irixo (O)',4),(261,'Xunqueira de Ambía',4),(262,'Xunqueira de Espadanedo',4),(263,'Larouco',4),(264,'Laza',4),(265,'Leiro',4),(266,'Lobeira',4),(267,'Lobios',4),(268,'Maceda',4),(269,'Manzaneda',4),(270,'Maside',4),(271,'Melón',4),(272,'Merca (A)',4),(273,'Mezquita (A)',4),(274,'Montederramo',4),(275,'Monterrei',4),(276,'Muíños',4),(277,'Nogueira de Ramuín',4),(278,'Oímbra',4),(279,'Ourense',4),(280,'Paderne de Allariz',4),(281,'Padrenda',4),(282,'Parada de Sil',4),(283,'Pereiro de Aguiar (O)',4),(284,'Peroxa (A)',4),(285,'Petín',4),(286,'Piñor',4),(287,'Porqueira',4),(288,'Pobra de Trives (A)',4),(289,'Pontedeva',4),(290,'Punxín',4),(291,'Quintela de Leirado',4),(292,'Rairiz de Veiga',4),(293,'Ramirás',4),(294,'Ribadavia',4),(295,'San Xoán de Río',4),(296,'Riós',4),(297,'Rúa (A)',4),(298,'Rubiá',4),(299,'San Amaro',4),(300,'San Cibrao das Viñas',4),(301,'San Cristovo de Cea',4),(302,'Sandiás',4),(303,'Sarreaus',4),(304,'Taboadela',4),(305,'Teixeira (A)',4),(306,'Toén',4),(307,'Trasmiras',4),(308,'Veiga (A)',4),(309,'Verea',4),(310,'Verín',4),(311,'Viana do Bolo',4),(312,'Vilamarín',4),(313,'Vilamartín de Valdeorras',4),(314,'Vilar de Barrio',4),(315,'Vilar de Santos',4),(316,'Vilardevós',4),(317,'Vilariño de Conso',4);
/*!40000 ALTER TABLE `Municipality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Participant`
--

DROP TABLE IF EXISTS `Participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Participant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `birthDate` date DEFAULT NULL,
  `datePi` date DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `interviewPi` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nie` varchar(255) DEFAULT NULL,
  `pas` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `surnames` varchar(255) DEFAULT NULL,
  `country_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK66tkg9kqpbysvpbqm0fekl8au` (`country_id`),
  CONSTRAINT `FK66tkg9kqpbysvpbqm0fekl8au` FOREIGN KEY (`country_id`) REFERENCES `Country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Participant`
--

LOCK TABLES `Participant` WRITE;
/*!40000 ALTER TABLE `Participant` DISABLE KEYS */;
INSERT INTO `Participant` VALUES (8,NULL,'2008-04-20','54153223E','crespo.rozados@gmail.com','H','2015-12-30','Miguel','3213132123','232132131','684350303','Crespo Rozados',7),(9,'2001-06-29',NULL,'32123322F','m.crespo.rozados@udc.es','H',NULL,'Nico','24342423424','434234234','231231231, 21321312313','Portela',4),(10,'2023-06-02','2023-06-06','4324342e','crespo.rozados@gmail.com','H','2023-05-31','Oscar','','','684350303','Crespo Rozados',64),(11,'2023-06-09','2023-05-30','353474564','y.rozados@gmail.com','M','2023-06-22','Yolanda','5474747','57457547','45346363','Rozados Rodríguez',3),(12,'2023-06-02','2023-06-07','5423434523','dfsdfs@dsffd','H','2023-06-01','Miguel','2344234','3423424','46532','Lozano',4);
/*!40000 ALTER TABLE `Participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Participant_yearList`
--

DROP TABLE IF EXISTS `Participant_yearList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Participant_yearList` (
  `Participant_id` bigint NOT NULL,
  `yearList` int DEFAULT NULL,
  KEY `FKamu4kys04n0oxc40fi77o396f` (`Participant_id`),
  CONSTRAINT `FKamu4kys04n0oxc40fi77o396f` FOREIGN KEY (`Participant_id`) REFERENCES `Participant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Participant_yearList`
--

LOCK TABLES `Participant_yearList` WRITE;
/*!40000 ALTER TABLE `Participant_yearList` DISABLE KEYS */;
INSERT INTO `Participant_yearList` VALUES (8,2023),(9,2023),(10,2023),(11,2023),(12,2023);
/*!40000 ALTER TABLE `Participant_yearList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Program`
--

DROP TABLE IF EXISTS `Program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Program` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Program`
--

LOCK TABLES `Program` WRITE;
/*!40000 ALTER TABLE `Program` DISABLE KEYS */;
INSERT INTO `Program` VALUES (1,'PGIS SOCIOLBORAL'),(2,'PGIS SOCIOJURÍDICO'),(3,'IRPF SOCIOLABORAL'),(4,'IRPF SOCIOJURÍDICO'),(5,'OTROS PROGRAMAS IRPF'),(6,'OTROS PROGRAMAS PGIS'),(7,'CONVENIOS AYUNTAMIENTOS');
/*!40000 ALTER TABLE `Program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Province`
--

DROP TABLE IF EXISTS `Province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Province` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Province`
--

LOCK TABLES `Province` WRITE;
/*!40000 ALTER TABLE `Province` DISABLE KEYS */;
INSERT INTO `Province` VALUES (1,'A Coruna'),(2,'Pontevedra'),(3,'Lugo'),(4,'Ourense');
/*!40000 ALTER TABLE `Province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Studies`
--

DROP TABLE IF EXISTS `Studies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Studies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Studies`
--

LOCK TABLES `Studies` WRITE;
/*!40000 ALTER TABLE `Studies` DISABLE KEYS */;
INSERT INTO `Studies` VALUES (1,'Analfabeto/a'),(2,'Estudios sen homologar'),(3,'Estudios primarios incompletos'),(4,'Educación Primaria'),(5,'Certificado de Escolaridad'),(6,'Educación Básica de Adultos'),(7,'Graduado Escolar'),(8,'Graduado en Educación Secundaria (ESO)'),(9,'Certificados de Profesionalidad de Nivel 1 e similares'),(10,'Certificados de Profesionalidad de Nivel 2 e similares'),(11,'Certificados de Profesionalidad de Nivel 3 e similares'),(12,'FP I / Formación Profesional de Grado Medio'),(13,'FP II / Formación Profesional de Grado Superior'),(14,'Bachiller'),(15,'Estudios Universitarios'),(16,'Másteres y Postgrados'),(17,'Doctorado');
/*!40000 ALTER TABLE `Studies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'m.crespo.rozados@udc.es','','','$2a$10$zZnDjiu51rH1SeuL6HqH9ORE1ZHRaJGLBzNi.vjYfhLJ5ZVYF0RMC',0,'miguel');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant_countrie`
--

DROP TABLE IF EXISTS `participant_countrie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_countrie` (
  `participant_id` bigint NOT NULL,
  `country_id` bigint NOT NULL,
  PRIMARY KEY (`participant_id`,`country_id`),
  KEY `FKb5aro9j0ih27e2wu9iyrwno7a` (`country_id`),
  CONSTRAINT `FKb5aro9j0ih27e2wu9iyrwno7a` FOREIGN KEY (`country_id`) REFERENCES `Country` (`id`),
  CONSTRAINT `FKjeeg9gy2ynykekk4ot6byadk2` FOREIGN KEY (`participant_id`) REFERENCES `AnnualData` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant_countrie`
--

LOCK TABLES `participant_countrie` WRITE;
/*!40000 ALTER TABLE `participant_countrie` DISABLE KEYS */;
INSERT INTO `participant_countrie` VALUES (6,2),(6,4),(9,4),(6,5),(8,5),(9,6),(7,7),(8,7),(5,64),(5,182);
/*!40000 ALTER TABLE `participant_countrie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant_exclusionFactor`
--

DROP TABLE IF EXISTS `participant_exclusionFactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_exclusionFactor` (
  `participant_id` bigint NOT NULL,
  `exclusionFactor_id` bigint NOT NULL,
  PRIMARY KEY (`participant_id`,`exclusionFactor_id`),
  KEY `FK93xomq58xug3i00k6yqet7fq7` (`exclusionFactor_id`),
  CONSTRAINT `FK93xomq58xug3i00k6yqet7fq7` FOREIGN KEY (`exclusionFactor_id`) REFERENCES `ExclusionFactor` (`id`),
  CONSTRAINT `FKd1r11lwqvvcs0y529vvnjenk8` FOREIGN KEY (`participant_id`) REFERENCES `AnnualData` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant_exclusionFactor`
--

LOCK TABLES `participant_exclusionFactor` WRITE;
/*!40000 ALTER TABLE `participant_exclusionFactor` DISABLE KEYS */;
INSERT INTO `participant_exclusionFactor` VALUES (9,2),(6,3),(8,3),(5,4),(8,4),(7,6),(8,6),(5,7),(6,7);
/*!40000 ALTER TABLE `participant_exclusionFactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant_language`
--

DROP TABLE IF EXISTS `participant_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_language` (
  `participant_id` bigint NOT NULL,
  `language_id` bigint NOT NULL,
  PRIMARY KEY (`participant_id`,`language_id`),
  KEY `FKry8xm9pxk0ystbfs7c9pkwo0q` (`language_id`),
  CONSTRAINT `FKnjlo75ygr6yvi4d0wysiyn8dm` FOREIGN KEY (`participant_id`) REFERENCES `AnnualData` (`id`),
  CONSTRAINT `FKry8xm9pxk0ystbfs7c9pkwo0q` FOREIGN KEY (`language_id`) REFERENCES `Language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant_language`
--

LOCK TABLES `participant_language` WRITE;
/*!40000 ALTER TABLE `participant_language` DISABLE KEYS */;
INSERT INTO `participant_language` VALUES (5,2),(7,2),(8,2),(9,2),(6,3),(5,5);
/*!40000 ALTER TABLE `participant_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant_program`
--

DROP TABLE IF EXISTS `participant_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participant_program` (
  `participant_id` bigint NOT NULL,
  `exclusionFactor_id` bigint NOT NULL,
  PRIMARY KEY (`participant_id`,`exclusionFactor_id`),
  KEY `FK34p4d7c9k26qw5v0o467kfhtx` (`exclusionFactor_id`),
  CONSTRAINT `FK34p4d7c9k26qw5v0o467kfhtx` FOREIGN KEY (`exclusionFactor_id`) REFERENCES `Program` (`id`),
  CONSTRAINT `FKqrijplmpk0vqqpt0ap5hy061q` FOREIGN KEY (`participant_id`) REFERENCES `AnnualData` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant_program`
--

LOCK TABLES `participant_program` WRITE;
/*!40000 ALTER TABLE `participant_program` DISABLE KEYS */;
INSERT INTO `participant_program` VALUES (6,1),(5,2),(7,2),(8,2),(9,2),(6,3);
/*!40000 ALTER TABLE `participant_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'amiga'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-13  8:20:29
