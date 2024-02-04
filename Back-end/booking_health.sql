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
  `type` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `titleImg` longblob DEFAULT NULL,
  `description` text DEFAULT NULL,
  `fullContent` longtext DEFAULT NULL,
  `viewCount` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `post` (`id`, `owner`, `type`, `title`, `titleImg`, `description`, `fullContent`, `viewCount`, `createdAt`, `updatedAt`, `status`) VALUES
(1, 'Nguyễn Tiến Đạt', 'Xét nghiệm covid', 'Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu', 0x68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f64686961653966617a2f696d6167652f75706c6f61642f76313730363739393232312f706f73742f77317265726c75766172336476696b777a6e6b652e706e67, 'Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.', '<div class=\'catalogue\'>\n   <li><a href=\"#section1\" >Xét nghiệm NIPT có những ưu điểm gì?</a></li>\n   <li><a href=\"#section2\">Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</a>\n        <ol className=\'level2\'>\n              <li><a href=\"#subsection2.1\">Phòng xét nghiệm Y khoa C- STAR Vũng Tàu</a></li>\n              <li><a href=\"#subsection2.2\">Phòng khám chuyên khoa xét nghiệm MEDLATEC Vũng Tàu</a></li>\n              <li><a href=\"#subsection2.3\">Trung tâm xét nghiệm Gentis</a></li>\n        </ol>\n   </li>\n</div>\n\n<p class=\'text-content\'>Xét nghiệm NIPT hiện nay là một trong những thủ thuật sàng lọc trước sinh được các mẹ bầu quan tâm và vô cùng cẩn trọng khi tìm hiểu. Tại Vũng Tàu, địa chỉ nào sàng lọc NIPT nhanh chóng, chính xác?</p>\n\n<p class=\'text-content\'>Trong bài viết dưới đây, chúng tôi đã tìm hiểu, tổng hợp thông tin 3 địa chỉ xét nghiệm NIPT Vũng Tàu được nhiều gia đình tin tưởng, bạn đọc có thể tham khảo và lựa chọn địa chỉ phù hợp. </p>\n\n<h2 id=\"section1\" class=\'heading\'>Xét nghiệm NIPT có những ưu điểm gì?</h2>\n\n<p class=\'text-content\'>NIPT (Xét nghiệm tiền sản không xâm lấn) là phương pháp sàng lọc sử dụng DNA trong máu của mẹ bầu để đánh giá, theo dõi quá trình phát triển của thai nhi và phát hiện các bệnh di truyền bất thường.</p>\n\n<p class=\'text-content\'>Phương pháp NIPT mang lại nhiều ưu điểm vượt trội, giúp cung cấp thông tin chính xác về nguy cơ các tình trạng gen không bình thường của thai nhi mà không đòi hỏi phải can thiệp vào tử cung của người mẹ</p>\n\n<ul class=\'list\'>\n            <li class=\'text-content\'><span class=\'text-bold\'>Non-Invasive (Không xâm lấn):</span> Một trong những ưu điểm chính của NIPT là không cần phải chọc dò vào tử cung như các phương pháp xét nghiệm truyền thống khác. Bằng cách lấy một mẫu máu nhỏ từ người mẹ, qua quá trình phân tích, đánh giá sẽ giúp phát hiện các dấu hiệu bất thường trên các nhiễm sắc thể của thai nhi.</li>\n             <li class=\'text-content\'><span class=\'text-bold\'>Tỉ lệ chính xác cao:</span> NIPT thường có tỷ lệ chính xác cao trong việc phát hiện các tình trạng gen không bình thường, đặc biệt là các trisomies như trisomy 21 (gây ra hội chứng Down), trisomy 18 (gây ra hội chứng Edwards), và trisomy 13 (gây ra hội chứng Patau).</li>\n             <li class=\'text-content\'><span class=\'text-bold\'>Nhanh chóng, chính xác:</span> Kết quả của NIPT thường được cung cấp nhanh chóng, giúp bác sĩ tư vấn kịp thời và mẹ bầu cũng có thêm thời gian lên kế hoạch nếu cần thiết.</li>\n             <li class=\'text-content\'><span class=\'text-bold\'>Tiện ích cho nhóm nguy cơ cao:</span> Đối với những người mang thai có nguy cơ cao về các tình trạng gen không bình thường, NIPT có thể cung cấp thông tin quan trọng để quyết định liệu pháp tiếp theo và quản lý thai kỳ.</li>\n</ul>\n\n<p class=\'text-content\'>Để thực hiện an toàn phương pháp này và nhận kết quả chính xác, tư vấn cần thiết, mẹ bầu cần tìm kiếm các bệnh viện, phòng khám hay trung tâm xét nghiệm uy tín có dịch vụ xét nghiệm NIPT chất lượng.</p>\n\n<h2 id=\"section2\" class=\'heading\'>Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h2>\n\n<p class=\'text-content\'>Chúng tôi đã tìm hiểu và tổng hợp thông tin các địa chỉ xét nghiệm NIPT uy tín tại Vũng Tàu dựa trên các tiêu chí như hệ thống xét nghiệm hiện đại, thời gian trả kết quả nhanh chóng, có thực hiện lấy mẫu tại nhà,... bạn đọc cùng tham khảo.</p>\n\n<h3 id=\'subsection2.1\' class=\'subsection\'>1. Phòng xét nghiệm Y khoa C- STAR Vũng Tàu</h3>\n\n<ul class=\'list\'>\n               <li class=\'text-content\'>Địa chỉ: 99A Đường 3/2, Phường 8, Thành phố Vũng Tàu, Bà Rịa - Vũng Tàu</li>\n               <li class=\'text-content\'>Giờ làm việc: Cả tuần\n                       <ul>\n                                <li class=\'text-content\'>Thứ 2 - thứ 7: Sáng: 06h00 - 11h00; Chiều: 14h00 - 18h00</li>\n                                 <li class=\'text-content\'>Chủ nhật: Sáng: 06h00 - 12h00; Chiều: Nghỉ</li>\n                       </ul>\n                </li>\n</ul>\n\n<p class=\'text-content\'>Phòng xét nghiệm Y khoa C- Star là địa chỉ xét nghiệm NIPT có tiếng tại Vũng Tàu được nhiều mẹ bầu tin tưởng. Tuy mới đi vào hoạt động từ năm 2021 nhưng C- Star đã đem lại sự hài lòng, tin tưởng cho khách hàng bởi đội ngũ kỹ thuật viên chuyên nghiệp và hệ thông xét nghiệm hiện đại, mang đến kết quả nhanh, chính xác.</p>\n\n<figure class=\'text-center\'>\n            <img alt=\'img-element\' src=\'https://res.cloudinary.com/dhiae9faz/image/upload/v1706799603/post/er0fsq7i9rxnpl2u44yv.png\' class=\' text-content w-100\' />\n            <figcaption>Phòng xét nghiệm Y khoa C-star được nhiều mẹ bầu tin tưởng thực hiện xét nghiệm NIPT - Ảnh: cstarlabs.vn</figcaption>\n</figure>\n\n<h2 class=\'subsection\'>Ưu điểm tại Phòng xét nghiệm Y khoa C- Star</h2>\n\n<ul class=\'list\'>\n            <li class=\'text-content\'>Sở hữu đội ngũ kỹ thuật viên y khoa chuyên môn tốt, thái độ làm việc chuyên nghiệp</li>\n            <li class=\'text-content\'>Thực hiện đa dạng các dịch vụ như xét nghiệm máu tổng quát, xét nghiệm ADN huyết thống, NIPT thai sản, tiền hôn nhân, vi chất dinh dưỡng trẻ em, xét nghiệm ký sinh trùng</li>\n            <li class=\'text-content\'>Hệ thống thiết bị xét nghiệm tự động, hiện đại, công nghệ tiên tiến từ các hãng danh tiếng trên thế giới như: Beckman Coulter (Mỹ), Roche (Thụy Sĩ), Sysmex (Nhật Bản),… </li>\n            <li class=\'text-content\'>Phòng xét nghiệm tuân thủ thủ chặt chẽ quy trình xét nghiệm theo tiêu chí 2429- BYT, hướng đến tiêu chuẩn ISO 15189, cũng như chủ động nội kiểm tự động và ngoại kiểm kết quả xét nghiệm tại Trung tâm Kiểm chuẩn Chất lượng Xét nghiệm Y học (Đại học Y Dược Hồ Chí Minh).</li>\n            <li class=\'text-content\'>Có thực hiện lấy mẫu tận nhà, miễn phí nội thành Vũng Tàu.</li>\n            <li class=\'text-content\'>Kết quả trả trực tiếp/zalo OA....</li>\n</ul>\n\n<h2 class=\'subsection\'>Chi phí xét nghiệm NIPT</h2>\n\n<p class=\'text-content\'>Bảng giá các dịch vụ xét nghiệm luôn được Phòng xét nghiệm C-Star công bố minh bạch tại website, bao gồm chi phí gói dịch vụ và các dịch vụ riêng lẻ, khách hàng có thể dễ dàng tham khảo.</p>\n\n<p class=\'text-content\'>Về chi phí xét nghiệm NIPT tại C- Star, bạn đọc có thể tìm hiểu ngay tại đây:</p>\n\n<ul class=\'list\'>\n             <li class=\'text-content\'>NIPT-precare basic: 2.000.000 đồng (Giá khuyến mại: 1.650.000 đồng, áp dụng đến 30/4/2024)</li>\n             <li class=\'text-content\'>NIPT-precare 7: 2.750.000 đồng</li>\n             <li class=\'text-content\'>NIPT - precare 7 + BLM10: 3.400.000 đồng</li>\n</ul>\n\n<h2 class=\'subsection\'>Review của khách hàng</h2>\n\n<p class=\'text-content\'>Phòng xét nghiệm Y khoa C - Star nhận được nhiều phản hồi tốt từ khách hàng tại Bà Rịa - Vũng Tàu vì dịch vụ nhanh chóng, kỹ thuật viên làm việc tận tình, có chuyên môn. Các mẹ bầu cũng đánh giá cao với dịch vụ lấy mẫu xét nghiệm tại nhà, trả kết quả online, có thể giảm bớt thời gian di chuyển, thuận tiện hơn cho khách hàng. </p>\n\n<h3 id=\'subsection2.2\' class=\'subsection\'>2. Phòng khám chuyên khoa xét nghiệm MEDLATEC Vũng Tàu</h3>\n\n<h3 id=\'subsection2.3\' class=\'subsection\'>3. Trung tâm xét nghiệm Gentis </h3>', 0, '2024-02-01 15:01:02', '2024-02-02 07:03:20', 'active');


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
