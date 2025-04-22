/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db_bubblev3
-- ------------------------------------------------------
-- Server version	10.6.18-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `whatsapp` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `whatsapp` (`whatsapp`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (3,'Raifa','082334810232','Raifa','$2b$10$H57YwptUX.yTq4Wa/R4aIOdLp49T1TVKWnmUsMRvh10Os2DqK7MXq','superadmin','2025-03-05 18:13:05');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blurred_users`
--

DROP TABLE IF EXISTS `blurred_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blurred_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tiktok_unique_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_picture_url` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tiktok_unique_id` (`tiktok_unique_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blurred_users`
--

LOCK TABLES `blurred_users` WRITE;
/*!40000 ALTER TABLE `blurred_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `blurred_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `whatsapp` varchar(20) DEFAULT NULL,
  `jenis_anggota` enum('Free','RK Agency','Member','VIP') NOT NULL,
  `username_tiktok1` varchar(100) DEFAULT NULL,
  `username_tiktok2` varchar(100) DEFAULT NULL,
  `username_tiktok3` varchar(100) DEFAULT NULL,
  `bukti_bayar` varchar(255) DEFAULT NULL,
  `status` enum('Aktif','Tidak Aktif') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `activated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expired_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Wafiqalfarizi','085778639517','RK Agency','wafiqalfarizy','null','null',NULL,'Aktif','2025-03-07 12:48:48','2025-03-07 12:48:48',NULL),(2,'TOKO MAHMUDA','082155020971','RK Agency','toko.mahmudah',NULL,NULL,NULL,'Aktif','2025-03-07 13:00:06','2025-03-07 07:08:54',NULL),(3,'PAK HENDRY','082233394091','RK Agency','riskafibry1',NULL,NULL,NULL,'Aktif','2025-03-07 14:04:40','2025-03-07 07:09:00',NULL),(4,'Ety','085357041180','RK Agency','azudhanr.k','azudhanmia','null',NULL,'Aktif','2025-03-07 14:05:31','2025-03-07 07:09:03',NULL),(5,'Riadi','085368554522','RK Agency','riadi_story_01',NULL,NULL,NULL,'Aktif','2025-03-07 14:05:53','2025-03-07 07:09:05',NULL),(6,'elis','085814722057','RK Agency','elizha0526',NULL,NULL,NULL,'Aktif','2025-03-07 14:06:36','2025-03-07 07:09:07',NULL),(7,'Muchlis','082332294799','RK Agency','badutbabel0',NULL,NULL,NULL,'Aktif','2025-03-07 14:07:38','2025-03-07 07:09:09',NULL),(8,'Al_fatihah','081939228891','RK Agency','bismillah1rrohmanirrohim',NULL,NULL,NULL,'Aktif','2025-03-07 14:07:58','2025-03-07 07:09:12',NULL),(9,'helen_sadewo','082117289741','RK Agency','helen_sadewo','pandu.viona','null',NULL,'Aktif','2025-03-07 14:08:17','2025-03-07 07:09:15',NULL),(10,'curhatsantuy','08113679070','RK Agency','curhatsantuy',NULL,NULL,NULL,'Aktif','2025-03-07 14:08:40','2025-03-07 07:09:17',NULL),(11,'Arif','082334810232','VIP','tawa.ceri4','queenbubblefoto','gilangblack1706',NULL,'Aktif','2025-03-07 14:09:56','2025-03-07 14:09:56',NULL),(12,'Sunaryo','081333880220','VIP','fotomu_muncul','alexa_indoda','null',NULL,'Aktif','2025-03-07 14:10:14','2025-03-07 14:10:14',NULL),(13,'Dede 2520suherman','081373808788','VIP','ayankcantika','fikri_bubblephoto','anak_dodol03',NULL,'Aktif','2025-03-07 14:10:42','2025-03-07 14:10:42',NULL),(14,'ayahnya_amara','081327408291','VIP','ayahnya_amara','amara.qaila.m','dillabonita',NULL,'Aktif','2025-03-07 14:10:59','2025-03-07 14:10:59',NULL),(16,'ADI%20252520BARET','087879909234','Member','adibareta','null','null','1741356734272.png','Aktif','2025-03-07 14:12:14','2025-03-07 07:21:58','2025-03-05 17:00:00'),(18,'Tengku','085363281102','Member','tefazi8','null','null','1741356780370.png','Aktif','2025-03-07 14:13:00','2025-03-07 07:15:03','2026-03-27 00:00:00'),(19,'Eko Haryanto','088298771246','RK Agency','eko474516','null','null','1741356882531.png','Aktif','2025-03-07 14:14:42','2025-03-07 07:15:08',NULL),(22,'Aiza','082226666095','Free','bakul_bubur_',NULL,NULL,NULL,'Aktif','2025-03-09 11:34:52','2025-03-09 11:34:52','2025-03-09 11:34:52'),(23,'Wak Acing','085236547492','RK Agency','pjdhjn',NULL,NULL,NULL,'Aktif','2025-03-09 19:03:50','2025-03-09 20:46:24',NULL),(24,'Panjul','082246666099','RK Agency','supersic153','null','null',NULL,'Aktif','2025-03-09 19:05:02','2025-03-09 19:05:02',NULL),(25,'Ari Rangga','089687791441','Free','@rangga_w4n',NULL,NULL,NULL,'Tidak Aktif','2025-03-10 12:33:05','2025-03-10 12:33:05','2025-03-10 12:33:05'),(26,'Firman','081572359225','Free','bang_jey28',NULL,NULL,NULL,'Tidak Aktif','2025-03-10 16:23:37','2025-03-10 16:23:37','2025-03-10 16:23:37'),(27,'Nindyshop','081220301314','RK Agency','queenbubblefoto','null','null',NULL,'Aktif','2025-03-10 16:30:52','2025-03-10 16:32:30',NULL),(28,'Irawan','085655460633','Free','@ellio3004',NULL,NULL,NULL,'Aktif','2025-03-10 21:36:04','2025-03-10 21:36:04','2025-03-10 21:36:04'),(29,'Siti','0857-5992-4829 ','Free','@variz_story',NULL,NULL,NULL,'Aktif','2025-03-11 03:50:54','2025-03-11 03:50:54','2025-03-11 03:50:54'),(30,'Gratis','1122','Free','tawa.ceri4',NULL,NULL,NULL,'Aktif','2025-03-11 14:25:57','2025-03-11 14:25:57','2025-03-11 14:25:57'),(32,'Irfan','085758665565','Member','@a_irfan_ud','null','null',NULL,'Aktif','2025-03-11 15:03:32','2025-03-11 15:03:32','2025-04-11 00:00:00'),(34,'Yuniar','085233187264','RK Agency','sayatan_duri','null','null',NULL,'Aktif','2025-03-13 13:29:03','2025-03-13 13:29:03',NULL),(35,'Zackiy','085959895196','RK Agency','kaconkzackiy','null','null',NULL,'Aktif','2025-03-14 13:57:16','2025-03-14 13:57:16',NULL),(36,'Shadik','083873086066','Member','@tampilkanpotomu','null','null',NULL,'Aktif','2025-03-15 14:05:33','2025-03-15 14:05:33','2025-06-16 00:00:00'),(37,'eka','081393067446','Free','eka.fdy',NULL,NULL,NULL,'Aktif','2025-03-15 17:04:27','2025-03-15 17:04:27','2025-03-15 17:04:27'),(38,'Bayu prayoga ramdan','0882001934777','Free','ar.cs01',NULL,NULL,NULL,'Aktif','2025-03-15 18:14:59','2025-03-15 18:14:59','2025-03-15 18:14:59'),(44,'Tino deluma','085394480935','Free','Akutinokau@77',NULL,NULL,NULL,'Tidak Aktif','2025-03-16 05:43:43','2025-03-16 05:43:43','2025-03-16 05:43:43'),(45,'Aclis','082148171535','Free','Omo_today',NULL,NULL,NULL,'Aktif','2025-03-17 11:25:17','2025-03-17 11:25:17','2025-03-17 11:25:17'),(46,'Mr.cuexs','081929744461','Free','@hendracuexs',NULL,NULL,NULL,'Aktif','2025-03-17 13:06:50','2025-03-17 13:06:50','2025-03-17 13:06:50'),(47,'Kokogion','+601160891183','VIP','sultancilik20','null','null',NULL,'Aktif','2025-03-17 13:45:34','2025-03-17 13:45:34',NULL),(48,'Aris Budi Santoso ','085933498267','Free','arisyesyou',NULL,NULL,NULL,'Aktif','2025-03-19 05:00:31','2025-03-19 05:00:31','2025-03-19 05:00:31'),(49,'Tarwanjaya','085227326898','Free','@tarwanjaya',NULL,NULL,NULL,'Aktif','2025-03-19 17:08:22','2025-03-19 17:08:22','2025-03-19 17:08:22'),(50,'Ahmad baihaki','082185544018','Free','@story20595',NULL,NULL,NULL,'Aktif','2025-03-19 17:27:40','2025-03-19 17:27:40','2025-03-19 17:27:40'),(51,'Dony Arklam','081236459306','Free','@donyarklam',NULL,NULL,NULL,'Aktif','2025-03-20 16:42:39','2025-03-20 16:42:39','2025-03-20 16:42:39'),(52,'ARIFALDO','082333113665','VIP','hosain0802','arifaldo_84','null',NULL,'Aktif','2025-03-21 18:37:58','2025-03-21 18:37:58',NULL),(53,'Oce','081233367668','RK Agency','hosain0802',NULL,NULL,NULL,'Aktif','2025-03-23 16:02:49','2025-03-23 16:03:05',NULL),(54,'Mas Gilang','082167041322','RK Agency','gilangblack1706',NULL,NULL,NULL,'Aktif','2025-03-24 15:24:39','2025-03-24 15:24:52',NULL),(55,'AZI ABDUL AZIZ','089652355223','Free','@alazizoilherbal',NULL,NULL,NULL,'Aktif','2025-03-25 09:46:48','2025-03-25 09:46:48','2025-03-25 09:46:48'),(56,'hadi santoso','089679585354','Free','@hdy.61',NULL,NULL,NULL,'Aktif','2025-03-25 15:24:29','2025-03-25 15:24:29','2025-03-25 15:24:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-26  4:29:17
