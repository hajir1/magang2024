import joi from "joi";

export const mobilValidate = joi.object({
  nama_mobil: joi.string().min(3).max(20).required(),
  jenis: joi.string().min(3).max(20).required(),
  kondisi: joi.string().min(3).max(20),
  pemilik: joi.string().min(3).max(20),
  dipakai: joi.boolean(),
});
