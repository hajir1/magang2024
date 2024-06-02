import { Prisma } from "../config/prisma.js";
import ResponseError from "../error/ResponseError.js";

import { mainValidate } from "../validation/mainValidate.js";
import path from "path";
import { mobilValidate } from "../validation/mobils.validate.js";
export const TambahMobil = async (req) => {
  const file = req.files.file;
  const dataValid = mainValidate(mobilValidate, req.body);
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const filePath = `./public/images/${fileName}`;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedtype = [".jpg", ".jpeg", ".png"];
  if (!allowedtype.includes(ext.toLowerCase())) {
    throw new ResponseError(400, "ekstensi gambar tidak di izinkan");
  }
  if (fileSize > 5000000) {
    throw new ResponseError(400, "file gambar terlalu besar");
  }

  try {
    if (file) {
      await file.mv(filePath);
    }
    const dataId = await Prisma.mobils.findMany({
      where: { nama_mobil: dataValid.nama_mobil },
    });
    if (dataId.length > 0) {
      throw new ResponseError(400, "nama mobil telah digunakan");
    }
    return await Prisma.mobils.create({
      data: {
        gambar: fileName,
        url: url,
        nama_mobil: dataValid.nama_mobil,
        dipakai: dataValid.dipakai,
        jenis: dataValid.jenis,
        kondisi: dataValid.kondisi,
        pemilik: dataValid.pemilik,
      },
    });
  } catch (error) {
    console.log(error.message);
    throw new ResponseError(500, error.message);
  }
};

export const DapatSemuaMobil = async () => {
  return await Prisma.mobils.findMany();
};
export const DapatMobilById = async (req) => {
  return await Prisma.mobils.findMany({
    where: {
      nama_mobil: {
        startsWith: req.params.id,
      },
    },
  });
};
export const DapatMobilByIdExtra = async (req) => {
  return await Prisma.mobils.findMany({
    where: {
      id: Number(req.params.id),
    },
    include: {
      jadwal_service: true,
      riwayat_pemakaian: true,
    },
  });
};
export const HapusSemuaMobil = async () => {
  return await Prisma.mobils.deleteMany({});
};
export const HapusMobilById = async (req) => {
  return await Prisma.mobils.delete({
    where: {
      id: Number(req.params.id),
    },
  });
};
