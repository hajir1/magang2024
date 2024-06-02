import { Prisma } from "../config/prisma.js";

export const penerimaOnly = async (req, res, next) => {
  if (!req.session.username) {
    return res.status(400).json({ msg: "silahkan login terlebih dahulu" });
  }
  const user = await Prisma.users.findUnique({
    where: {
      username: req.session.username,
    },
  });
  if (!user) {
    return res.status(400).json({ msg: "user tidak ditemukan" });
  }
  if (user.username !== "penerima") {
    return res.status(400).json({ msg: "akses terlarang" });
  }
  next();
};
