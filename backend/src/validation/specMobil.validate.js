import joi from "joi";

export const serviceValidate = joi.object({
  jenis_service: joi.string().min(3).max(50).required(),
  biaya: joi.number(),
  waktu: joi.string(),
  mobil_id: joi.string(),
});
