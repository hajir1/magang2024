import bcrypt from "bcrypt";
import { mainValidate } from "../validation/mainValidate.js";
import { Prisma } from "../config/prisma.js";
import ResponseError from "../error/ResponseError.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { loginValidate, userValidate } from "../validation/user.validate.js";
export const RegisterUser = async (req) => {
  const dataValid = mainValidate(userValidate, req);
  const dataId = await Prisma.users.findUnique({
    where: {
      username: dataValid.username,
    },
  });
  if (dataId) {
    throw new ResponseError(401, "username telah digunakan");
  }
  const password = await bcrypt.hash(dataValid.password, 10);
  return await Prisma.users.create({
    data: {
      uuid: uuidv4(),
      username: dataValid.username,
      password: password,
      role: dataValid.role,
    },
  });
};
export const Login = async (req, res) => {
  try {
    const dataValid = mainValidate(loginValidate, req.body);
    const dataId = await Prisma.users.findUnique({
      where: {
        username: dataValid.username,
      },
    });
    if (!dataId) {
      throw new ResponseError(401, "username tidak ditemukan");
    }
    const comparingPass = await bcrypt.compare(
      dataValid.password,
      dataId.password
    );
    if (!comparingPass) {
      throw new ResponseError(401, "password salah");
    }
    req.session.username = dataId.username;
    const id = dataId.id;
    const username = dataId.username;
    const uuid = dataId.uuid;
    const accessToken = jwt.sign(
      { id, username, uuid },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "16h",
      }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
  }
};
export const getUsers = async () => {
  return await Prisma.users.findMany({
    select: {
      username: true,
      uuid: true,
      role: true,
    },
  });
};
export const deleteUsers = async (req) => {
  const dataId = await Prisma.pemesanan.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!dataId) {
    throw new ResponseError(400, "id tidak ditemukan");
  }
  return await Prisma.users.delete({
    where: {
      id: Number(req.params.id),
    },
  });
};
