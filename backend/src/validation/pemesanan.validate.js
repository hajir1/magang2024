import joi from "joi";

export const pemesananValidate = joi.object({
  mobil_id: joi.string().min(3).max(40).required(),
  nama_driver: joi.string(),
  selesai: joi.boolean(),
  waktu: joi.string().min(3).max(40),
  deskripsi: joi.string(),
});
