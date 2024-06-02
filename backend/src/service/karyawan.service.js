import { Prisma } from "../config/prisma.js";
import ResponseError from "../error/ResponseError.js";
import { karyawanValidate } from "../validation/karyawan.validate.js";
import { mainValidate } from "../validation/mainValidate.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
export const TambahKaryawan = async (req) => {
  const file = req.files.file;
  const dataValid = mainValidate(karyawanValidate, req.body);
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
    const dataId = await Prisma.driver.findMany({
      where: { nama_driver: dataValid.nama_driver },
    });
    if (dataId.length > 0) {
      throw new ResponseError(
        400,
        "nama karyawan telah digunakan wajib unique"
      );
    }
    return await Prisma.driver.create({
      data: {
        gambar: fileName,
        url: url,
        nama_driver: dataValid.nama_driver,
        jasa: dataValid.jasa,
        bekerja: dataValid.bekerja,
        kode_karyawan: uuidv4(),
      },
    });
  } catch (error) {
    console.log(error.message);
    throw new ResponseError(500, error.message);
  }
};
export const DapatSemuaKaryawan = async () => {
  return await Prisma.driver.findMany({ orderBy: { nama_driver: "asc" } });
};
export const DapatKaryawanKosong = async () => {
  return await Prisma.driver.findMany({
    where: {
      bekerja: false,
    },
  });
};
export const HapusKaryawanById = async (req) => {
  return await Prisma.driver.delete({
    where: {
      id: Number(req.params.id),
    },
  });
};
