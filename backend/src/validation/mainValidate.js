import ResponseError from "../error/ResponseError.js";

export const mainValidate = (schema, req) => {
  const result = schema.validate(req);
  if (result.error) {
    throw new ResponseError(400, "data tidak sesuai validasi");
  } else {
    return result.value;
  }
};
