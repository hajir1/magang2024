import { Prisma } from "../config/prisma.js";
import ResponseError from "../error/ResponseError.js";
import { mainValidate } from "../validation/mainValidate.js";
import { pemesananValidate } from "../validation/pemesanan.validate.js";

export const TambahPemesanan = async (req) => {
  const dataValid = mainValidate(pemesananValidate, req.body);
  await Prisma.driver.update({
    where: {
      nama_driver: dataValid.nama_driver,
    },
    data: {
      bekerja: true,
    },
  });
  await Prisma.mobils.update({
    where: {
      nama_mobil: dataValid.mobil_id,
    },
    data: {
      dipakai: true,
    },
  });
  await Prisma.riwayat_pemakaian.create({
    data: {
      driver_id: dataValid.nama_driver,
      mobil_id: dataValid.mobil_id,
      waktu: dataValid.waktu,
    },
  });
  return Prisma.pemesanan.create({
    data: {
      mobil_id: dataValid.mobil_id,
      waktu: dataValid.waktu,
      deskripsi: dataValid.deskripsi,
      nama_driver: dataValid.nama_driver,
      selesai: false,
      ekspedisi: false,
    },
    include: {
      driver: true,
      mobils: true,
    },
  });
};
export const DapatSemuaPesanan = async () => {
  return await Prisma.pemesanan.findMany({
    select: {
      driver: true,
      mobils: true,
      deskripsi: true,
      id: true,
      selesai: true,
      waktu: true,
      ekspedisi: true,
    },
    where: {
      ekspedisi: false,
    },
  });
};
export const TolakPesanan = async (req) => {
  await Prisma.driver.update({
    where: {
      nama_driver: req.body.nama_driver,
    },
    data: {
      bekerja: false,
    },
  });
  await Prisma.mobils.update({
    where: {
      nama_mobil: req.body.nama_mobil,
    },
    data: {
      dipakai: false,
    },
  });
  return await Prisma.pemesanan.delete({
    where: {
      id: req.body.id,
    },
    include: {
      driver: true,
      mobils: true,
    },
  });
};
export const TerimaPesanan = async (req) => {
  return await Prisma.pemesanan.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      ekspedisi: true,
    },
    include: {
      driver: true,
      mobils: true,
    },
  });
};
export const DapatSemuaEkspedisi = async () => {
  return await Prisma.pemesanan.findMany({
    where: {
      ekspedisi: true,
    },
    include: {
      driver: true,
      mobils: true,
    },
    orderBy: {
      selesai: "asc",
    },
  });
};
export const PesananSelesai = async (req) => {
  await Prisma.driver.update({
    where: {
      nama_driver: req.body.nama_driver,
    },
    data: {
      bekerja: false,
    },
  });
  await Prisma.mobils.update({
    where: {
      nama_mobil: req.body.nama_mobil,
    },
    data: {
      dipakai: false,
    },
  });
  return await Prisma.pemesanan.delete({
    where: {
      id: req.body.id,
    },
  });
};
export const RiwayatSelesai = async (req) => {
  await Prisma.riwayat_pemakaian.delete({
    where: {
      id: Number(req?.params?.id),
    },
  });
};
export const EkspedisiSelesai = async (req) => {
  return await Prisma.mobils.findMany({
    include: {
      riwayat_pemakaian: true,
      pemesanan: true,
    },
    where: {
      pemesanan: {
        selesai: true,
      },
    },
  });
};
export const EkspedisiSelesaiByNamaDriver = async (req) => {
  return await Prisma.riwayat_pemakaian.findMany({
    where: {
      driver_id: {
        startsWith: req.params.nama,
      },
    },
    include: { mobils: true, driver: true },
  });
};
