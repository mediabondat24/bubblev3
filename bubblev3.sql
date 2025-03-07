-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2025 at 04:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_bubble`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `whatsapp` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `nama`, `whatsapp`, `username`, `password`, `role`, `created_at`) VALUES
(3, 'Raifa', '082334810232', 'Raifa', '$2b$10$H57YwptUX.yTq4Wa/R4aIOdLp49T1TVKWnmUsMRvh10Os2DqK7MXq', 'superadmin', '2025-03-05 18:13:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
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
  `expired_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `whatsapp`, `jenis_anggota`, `username_tiktok1`, `username_tiktok2`, `username_tiktok3`, `bukti_bayar`, `status`, `created_at`, `activated_at`, `expired_at`) VALUES
(1, 'Wafiqalfarizi', '085778639517', 'RK Agency', 'wafiqalfarizy', 'null', 'null', NULL, 'Aktif', '2025-03-07 12:48:48', '2025-03-07 12:48:48', NULL),
(2, 'TOKO MAHMUDA', '082155020971', 'RK Agency', 'toko.mahmudah', NULL, NULL, NULL, 'Aktif', '2025-03-07 13:00:06', '2025-03-07 07:08:54', NULL),
(3, 'PAK HENDRY', '082233394091', 'RK Agency', 'riskafibry1', NULL, NULL, NULL, 'Aktif', '2025-03-07 14:04:40', '2025-03-07 07:09:00', NULL),
(4, 'Ety', '085357041180', 'RK Agency', 'azudhanr.k	', NULL, NULL, NULL, 'Aktif', '2025-03-07 14:05:31', '2025-03-07 07:09:03', NULL),
(5, 'Riadi', '085368554522', 'RK Agency', 'riadi_story_01', NULL, NULL, NULL, 'Aktif', '2025-03-07 14:05:53', '2025-03-07 07:09:05', NULL),
(6, 'elis', '085814722057', 'RK Agency', 'elizha0526', NULL, NULL, NULL, 'Aktif', '2025-03-07 14:06:36', '2025-03-07 07:09:07', NULL),
(7, 'Muchlis', '082332294799', 'RK Agency', 'badutbabel0', NULL, NULL, NULL, 'Aktif', '2025-03-07 14:07:38', '2025-03-07 07:09:09', NULL),
(8, 'Al_fatihah', '081939228891', 'RK Agency', 'bismillah1rrohmanirrohim', NULL, NULL, NULL, 'Aktif', '2025-03-07 14:07:58', '2025-03-07 07:09:12', NULL),
(9, 'helen_sadewo', '082117289741', 'RK Agency', 'helen_sadewo', NULL, NULL, NULL, 'Aktif', '2025-03-07 14:08:17', '2025-03-07 07:09:15', NULL),
(10, 'curhatsantuy', '08113679070', 'RK Agency', 'curhatsantuy', NULL, NULL, NULL, 'Aktif', '2025-03-07 14:08:40', '2025-03-07 07:09:17', NULL),
(11, 'Arif', '082334810232', 'VIP', 'tawa.ceri4', 'queenbubblefoto', 'munculfotomu', NULL, 'Aktif', '2025-03-07 14:09:56', '2025-03-07 14:09:56', NULL),
(12, 'Sunaryo', '081333880220', 'VIP', 'fotomu_muncul', 'null', 'null', NULL, 'Aktif', '2025-03-07 14:10:14', '2025-03-07 14:10:14', NULL),
(13, 'Dede%20suherman', '081373808788', 'VIP', 'ayankcantika', 'null', 'null', NULL, 'Aktif', '2025-03-07 14:10:42', '2025-03-07 14:10:42', NULL),
(14, 'ayahnya_amara', '081327408291', 'VIP', 'ayahnya_amara', 'null', 'null', NULL, 'Aktif', '2025-03-07 14:10:59', '2025-03-07 14:10:59', NULL),
(16, 'ADI%20252520BARET', '087879909234', 'Member', 'adibareta', 'null', 'null', '1741356734272.png', 'Aktif', '2025-03-07 14:12:14', '2025-03-07 07:21:58', '2025-03-05 17:00:00'),
(18, 'Tengku', '085363281102', 'Member', 'tefazi8', NULL, NULL, '1741356780370.png', 'Aktif', '2025-03-07 14:13:00', '2025-03-07 07:15:03', '2025-04-07 07:15:03'),
(19, 'Eko Haryanto', '08129689035', 'Member', 'eko474516', NULL, NULL, '1741356882531.png', 'Aktif', '2025-03-07 14:14:42', '2025-03-07 07:15:08', '2025-04-07 07:15:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `whatsapp` (`whatsapp`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
