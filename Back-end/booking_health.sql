-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2024 at 09:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_health`
--

-- --------------------------------------------------------

--
-- Table structure for table `allcode`
--

CREATE TABLE `allcode` (
  `id` int(11) NOT NULL,
  `keyCode` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `valueEn` varchar(255) DEFAULT NULL,
  `valueVi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `allcode`
--

INSERT INTO `allcode` (`id`, `keyCode`, `type`, `valueEn`, `valueVi`, `createdAt`, `updatedAt`) VALUES
(1, 'R1', 'ROLE', 'Admin', 'Quản trị viên', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'R2', 'ROLE', 'Doctor', 'Bác sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'R3', 'ROLE', 'Patient', 'Bệnh nhân', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'S1', 'STATUS', 'New', 'Lịch hẹn mới', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'S2', 'STATUS', 'Confirmed', 'Đã xác nhận', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'S3', 'STATUS', 'Done', 'Đã khám xong', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'S4', 'STATUS', 'Cancel', 'Đã hủy', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'T1', 'TIME', '8:00 AM - 9:00 AM', '8:00 - 9:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'T2', 'TIME', '9:00 AM - 10:00 AM', '9:00 - 10:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'T3', 'TIME', '10:00 AM - 11:00 AM', '10:00 - 11:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'T4', 'TIME', '11:00 AM - 0:00 PM', '11:00 - 12:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'T5', 'TIME', '1:00 PM - 2:00 PM', '13:00 - 14:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'T6', 'TIME', '2:00 PM - 3:00 PM', '14:00 - 15:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'T7', 'TIME', '3:00 PM - 4:00 PM', '15:00 - 16:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'T8', 'TIME', '4:00 PM - 5:00 PM', '16:00 - 17:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'P0', 'POSITION', 'None', 'Bác sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'P1', 'POSITION', 'Master', 'Thạc sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'P2', 'POSITION', 'Doctor', 'Tiến sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'P3', 'POSITION', 'Associate Professor', 'Phó giáo sư', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'P4', 'POSITION', 'Professor', 'Giáo sư', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'M', 'GENDER', 'Male', 'Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'F', 'GENDER', 'Female', 'Nữ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'O', 'GENDER', 'Other', 'Khác', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 'PRI1', 'PRICE', '10', '200000', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 'PRI2', 'PRICE', '15', '250000', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 'PRI3', 'PRICE', '20', '300000', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 'PRI4', 'PRICE', '25', '350000', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 'PRI5', 'PRICE', '30', '400000', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 'PRI6', 'PRICE', '35', '450000', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 'PRI7', 'PRICE', '40', '500000', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, 'PAY1', 'PAYMENT', 'Cash', 'Tiền mặt', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 'PAY2', 'PAYMENT', 'Credit card', 'Thẻ ATM', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, 'PAY3', 'PAYMENT', 'All payment method', 'Tất cả', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, 'PRO1', 'PROVINCE', 'Ha Noi', 'Hà Nội', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, 'PRO2', 'PROVINCE', 'Ho Chi Minh', 'Hồ Chí Minh', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 'PRO3', 'PROVINCE', 'Da Nang', 'Đà Nẵng', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, 'PRO4', 'PROVINCE', 'Can Tho', 'Cần Thơ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 'PRO5', 'PROVINCE', 'Binh Duong', 'Bình Dương', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 'PRO6', 'PROVINCE', 'Dong Nai', 'Đồng Nai', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, 'PRO7', 'PROVINCE', 'Quang Ninh', 'Quảng Ninh', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(41, 'PRO8', 'PROVINCE', 'Hue', 'Thừa Thiên Huế', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, 'PRO9', 'PROVINCE', 'Quang Binh', 'Quảng Bình', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(43, 'PRO10', 'PROVINCE', 'Khanh Hoa', 'Khánh Hòa', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `booking_doctor`
--

CREATE TABLE `booking_doctor` (
  `id` int(11) NOT NULL,
  `statusId` varchar(255) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `patientId` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `timeType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clinic`
--

CREATE TABLE `clinic` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `descriptionEn` text DEFAULT NULL,
  `descriptionVi` varchar(255) DEFAULT NULL,
  `valueVi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_clinic_specialty`
--

CREATE TABLE `doctor_clinic_specialty` (
  `id` int(11) NOT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `clinicId` int(11) DEFAULT NULL,
  `specialtyId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `patientId` int(11) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `descriptionEn` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `titleVi` varchar(255) DEFAULT NULL,
  `titleEn` varchar(255) DEFAULT NULL,
  `descriptionVi` text DEFAULT NULL,
  `descriptionEn` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` varchar(255) default "active"
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `post` (`id`, `owner`, `titleVi`, `titleEn`, `descriptionVi`, `descriptionEn`, `image`, `createdAt`, `updatedAt`, `status`) VALUES
(1, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(2, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(3, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(4, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(5, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(6, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(7, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(8, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(9, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(10, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(11, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active'),
(12, 'Phan Phùng Phi', 'Title Vi nè', 'This title en', 'Đây là mô tả tổng bộ bằng tiếng việt', 'This is english description', 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg', '2024-01-18 13:37:14', '2024-01-18 13:37:14', 'active');


-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `currentNumber` int(11) DEFAULT NULL,
  `maxNumber` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `timeType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('migration-create-allcode.js'),
('migration-create-booking-doctor.js'),
('migration-create-clinic.js'),
('migration-create-doctor-clinic-specialty.js'),
('migration-create-history.js'),
('migration-create-post.js'),
('migration-create-schedule.js'),
('migration-create-specialty.js'),
('migration-create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `specialty`
--

CREATE TABLE `specialty` (
  `id` int(11) NOT NULL,
  `nameVi` varchar(255) DEFAULT NULL,
  `nameEn` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `descriptionVi` text DEFAULT NULL,
  `descriptionEn` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `address`, `firstName`, `lastName`, `gender`, `phoneNumber`, `image`, `roleId`, `position`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@gmail.com', '123456', NULL, NULL, 'admin', 'M', '09999999', NULL, 'R1', NULL, '2024-01-01 09:36:07', '2024-01-01 09:36:07'),
(2, 'khanhduy8768@gmail.com', '123123', 'Long An ', 'Huynh', 'Duy', 'M', '034556215', NULL, 'R1', NULL, '2024-01-03 15:02:35', '2024-01-03 15:02:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allcode`
--
ALTER TABLE `allcode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_doctor`
--
ALTER TABLE `booking_doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clinic`
--
ALTER TABLE `clinic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_clinic_specialty`
--
ALTER TABLE `doctor_clinic_specialty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `specialty`
--
ALTER TABLE `specialty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allcode`
--
ALTER TABLE `allcode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `booking_doctor`
--
ALTER TABLE `booking_doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clinic`
--
ALTER TABLE `clinic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor_clinic_specialty`
--
ALTER TABLE `doctor_clinic_specialty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `specialty`
--
ALTER TABLE `specialty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
