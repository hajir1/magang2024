import express from "express";
import {
  DapatKaryawanKosongC,
  DapatSemuaKaryawanC,
  HapusKaryawanByIdC,
  TambahKaryawanC,
} from "../controller/karyawan.controller.js";

// import verifyToken from "../middleware/auth.js";

const route = express.Router();
route.post("/tambahkaryawan", TambahKaryawanC);
route.get("/karyawan", DapatSemuaKaryawanC);
route.get("/karyawankosong", DapatKaryawanKosongC);
route.delete("/hapuskaryawan/:id", HapusKaryawanByIdC);

export default route;
