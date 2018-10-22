-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Okt 2018 pada 09.21
-- Versi server: 10.1.31-MariaDB
-- Versi PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_shopee`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `currency`
--

CREATE TABLE `currency` (
  `id` int(11) NOT NULL,
  `name_currency` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `currency`
--

INSERT INTO `currency` (`id`, `name_currency`) VALUES
(1, 'GBP'),
(2, 'USD'),
(3, 'IDR'),
(4, 'JPY');

-- --------------------------------------------------------

--
-- Struktur dari tabel `daily_exchange_rate`
--

CREATE TABLE `daily_exchange_rate` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `id_exchange_rate` int(11) NOT NULL,
  `rate` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `daily_exchange_rate`
--

INSERT INTO `daily_exchange_rate` (`id`, `date`, `id_exchange_rate`, `rate`) VALUES
(12, '2018-10-19', 1, 1.3081),
(13, '2018-10-18', 1, 1.3018),
(14, '2018-10-17', 1, 1.3115),
(15, '2018-10-16', 1, 1.3187),
(16, '2018-10-15', 1, 1.3153),
(17, '2018-10-14', 1, 1.3103),
(18, '2018-10-13', 1, 1.3133),
(19, '2018-10-12', 1, 1.3155),
(20, '2018-10-11', 1, 1.3236),
(21, '2018-10-10', 1, 1.3196),
(22, '2018-10-09', 1, 1.3144),
(23, '2018-10-08', 1, 1.309),
(24, '2018-10-07', 1, 1.3127),
(25, '2018-10-06', 1, 1.3027),
(26, '2018-10-05', 1, 1.3123),
(27, '2018-10-04', 1, 1.302),
(28, '2018-10-03', 1, 1.294),
(29, '2018-10-02', 1, 1.2979),
(30, '2018-10-01', 1, 1.3043),
(31, '2018-10-19', 2, 0.765),
(32, '2018-10-18', 2, 0.7681),
(33, '2018-10-17', 2, 0.7625),
(34, '2018-10-16', 2, 0.7583),
(35, '2018-10-15', 2, 0.7603),
(36, '2018-10-14', 2, 0.7632),
(37, '2018-10-13', 2, 0.7432),
(38, '2018-10-12', 2, 0.7601),
(39, '2018-10-11', 2, 0.7556),
(40, '2018-10-10', 2, 0.7578),
(41, '2018-10-09', 2, 0.7608),
(42, '2018-10-08', 2, 0.764),
(43, '2018-10-07', 2, 0.7618),
(44, '2018-10-06', 2, 0.76),
(45, '2018-10-05', 2, 0.762),
(46, '2018-10-04', 2, 0.768),
(48, '2018-10-03', 2, 0.7728),
(49, '2018-10-02', 2, 0.7705),
(50, '2018-10-01', 2, 0.7667),
(52, '2018-10-19', 3, 15187),
(53, '2018-10-18', 3, 15193),
(54, '2018-10-17', 3, 15155),
(55, '2018-10-16', 3, 15200),
(56, '2018-10-15', 3, 15210),
(57, '2018-10-14', 3, 15205),
(58, '2018-10-13', 3, 15211),
(59, '2018-10-12', 3, 15205),
(60, '2018-10-11', 3, 15235),
(61, '2018-10-10', 3, 15203),
(62, '2018-10-09', 3, 15230),
(63, '2018-10-08', 3, 15217),
(64, '2018-10-07', 3, 15180),
(65, '2018-10-06', 3, 15280),
(66, '2018-10-05', 3, 15180),
(67, '2018-10-04', 3, 15170),
(68, '2018-10-03', 3, 15075),
(69, '2018-10-02', 3, 15045),
(70, '2018-10-01', 3, 14910);

-- --------------------------------------------------------

--
-- Struktur dari tabel `exchange_rate`
--

CREATE TABLE `exchange_rate` (
  `id` int(11) NOT NULL,
  `from_currency` int(11) NOT NULL,
  `to_currency` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `exchange_rate`
--

INSERT INTO `exchange_rate` (`id`, `from_currency`, `to_currency`) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 2, 3),
(14, 4, 3);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `daily_exchange_rate`
--
ALTER TABLE `daily_exchange_rate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_exchange_rate` (`id_exchange_rate`);

--
-- Indeks untuk tabel `exchange_rate`
--
ALTER TABLE `exchange_rate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_from_currency` (`from_currency`),
  ADD KEY `fk_to_currency` (`to_currency`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `daily_exchange_rate`
--
ALTER TABLE `daily_exchange_rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT untuk tabel `exchange_rate`
--
ALTER TABLE `exchange_rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `daily_exchange_rate`
--
ALTER TABLE `daily_exchange_rate`
  ADD CONSTRAINT `fk_id_exchange_rate` FOREIGN KEY (`id_exchange_rate`) REFERENCES `exchange_rate` (`id`);

--
-- Ketidakleluasaan untuk tabel `exchange_rate`
--
ALTER TABLE `exchange_rate`
  ADD CONSTRAINT `fk_from_currency` FOREIGN KEY (`from_currency`) REFERENCES `currency` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_to_currency` FOREIGN KEY (`to_currency`) REFERENCES `currency` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
