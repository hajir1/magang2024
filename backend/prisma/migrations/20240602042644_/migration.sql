-- CreateTable
CREATE TABLE `driver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_driver` VARCHAR(20) NOT NULL,
    `jasa` VARCHAR(30) NOT NULL,
    `bekerja` BOOLEAN NULL DEFAULT false,
    `gambar` VARCHAR(100) NOT NULL,
    `kode_karyawan` VARCHAR(100) NOT NULL,
    `url` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `nama_driver`(`nama_driver`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jadwal_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_service` VARCHAR(100) NULL,
    `biaya` INTEGER NULL,
    `waktu` VARCHAR(100) NOT NULL,
    `mobil_id` VARCHAR(50) NULL,

    INDEX `fk_jadwalService_to_mobils`(`mobil_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mobils` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_mobil` VARCHAR(50) NOT NULL,
    `gambar` VARCHAR(100) NULL,
    `url` VARCHAR(100) NULL,
    `jenis` VARCHAR(30) NULL,
    `kondisi` VARCHAR(100) NULL,
    `pemilik` VARCHAR(30) NULL,
    `dipakai` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `nama_mobil`(`nama_mobil`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riwayat_pemakaian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `waktu` VARCHAR(100) NULL,
    `mobil_id` VARCHAR(50) NULL,
    `driver_id` VARCHAR(30) NULL,

    INDEX `fk_riwayatPemakaian_to_mobils`(`mobil_id`),
    INDEX `fk_riwayat_driver`(`driver_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(100) NULL,
    `role` VARCHAR(40) NOT NULL,
    `uuid` VARCHAR(40) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pemesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mobil_id` VARCHAR(100) NULL,
    `nama_driver` VARCHAR(40) NULL,
    `waktu` VARCHAR(30) NOT NULL,
    `selesai` BOOLEAN NULL DEFAULT false,
    `deskripsi` VARCHAR(300) NULL,
    `ekspedisi` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `mobil_id`(`mobil_id`),
    UNIQUE INDEX `nama_driver`(`nama_driver`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `sid` VARCHAR(255) NOT NULL,
    `sess` LONGTEXT NOT NULL,
    `expired` DATETIME(0) NOT NULL,

    INDEX `sessions_expired_index`(`expired`),
    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jadwal_service` ADD CONSTRAINT `fk_jadwal_mobil` FOREIGN KEY (`mobil_id`) REFERENCES `mobils`(`nama_mobil`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `riwayat_pemakaian` ADD CONSTRAINT `fk_riwayat_driver` FOREIGN KEY (`driver_id`) REFERENCES `driver`(`nama_driver`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `riwayat_pemakaian` ADD CONSTRAINT `fk_riwayat_mobil` FOREIGN KEY (`mobil_id`) REFERENCES `mobils`(`nama_mobil`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pemesanan` ADD CONSTRAINT `fk_mobil_driver` FOREIGN KEY (`nama_driver`) REFERENCES `driver`(`nama_driver`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pemesanan` ADD CONSTRAINT `fk_mobil_pesan` FOREIGN KEY (`mobil_id`) REFERENCES `mobils`(`nama_mobil`) ON DELETE RESTRICT ON UPDATE RESTRICT;
