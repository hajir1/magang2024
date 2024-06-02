import joi from "joi"
export const karyawanValidate = joi.object({
  nama_driver: joi.string(),
  jasa: joi.string().min(3).max(40).required(),
  bekerja: joi.boolean(),
  // kode_karyawan: joi.string().min(3).max(40),
});
