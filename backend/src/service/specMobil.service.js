import { Prisma } from "../config/prisma.js";
import ResponseError from "../error/ResponseError.js";
import { mainValidate } from "../validation/mainValidate.js";
import { serviceValidate } from "../validation/specMobil.validate.js";

// delete
export const HapusServiceById = async (req) => {
  return await Prisma.jadwal_service.delete({
    where: { id: Number(req.params.id) },
  });
};
// post
export const TambahkanServiceById = async(req) => {
  const dataValid = mainValidate(serviceValidate, req.body);

  return await Prisma.jadwal_service.create({
    data: {
      waktu: dataValid.waktu,
      biaya: dataValid.biaya,
      jenis_service: dataValid.jenis_service,
      mobil_id: dataValid.mobil_id,
    },
  });
};
