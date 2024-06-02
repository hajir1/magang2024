import { Prisma } from "../config/prisma.js";
import {
  Login,
  RegisterUser,
  deleteUsers,
  getUsers,
} from "../service/user.service.js";

export const RegisterUserC = async (req, res, next) => {
  try {
    const data = await RegisterUser(req.body);
    res
      .status(200)
      .json({ message: "sukses register akun untuk login!", data: data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const LoginUserC = async (req, res, next) => {
  await Login(req, res);
};
export const GetUserC = async (req, res, next) => {
  try {
    const data = await getUsers();
    res.status(200).json({ message: "sukses mendapat users", data: data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const deleteUsersC = async (req, res, next) => {
  try {
    const data = await deleteUsers(req);
    res.status(200).json({ message: "sukses menghapus users", data: data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: "tidak dapat logout" });
    }
    res.status(200).json({ msg: "sukses logout" });
  });
};

export const Me = async (req, res,next) => {
  try {
    if (!req.session.username) {
      return res.status(400).json({ msg: "silahkan login terlebih dahulu" });
    }
    const user = await Prisma.users.findUnique({
      where: {
        username: req.session.username,
      }
    });
    if (!user) {
      return res.status(400).json({ msg: "user tidak ditemukan" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
