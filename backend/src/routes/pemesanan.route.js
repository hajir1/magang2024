import express from "express";

// import verifyToken from "../middleware/auth.js";
import {
  DapatSemuaPesananC,
  DapatSemuaekspedisiC,
  EkspedisiSelesaiByNamaDriverC,
  EkspedisiSelesaiC,
  PesananSelesaiC,
  RiwayatSelesaiC,
  TambahPemesananC,
  TerimaPesananC,
  TolakPesananC,
} from "../controller/pemesanan.controller.js";
import { penerimaOnly } from "../middleware/verify.js";

const route = express.Router();
route.post("/tambahpemesanan", TambahPemesananC);
route.get("/pemesanan", DapatSemuaPesananC);
route.get("/ekspedisi", DapatSemuaekspedisiC);
route.get("/ekspedisiselesai", EkspedisiSelesaiC);
route.get("/ekspedisiselesaibydriver/:nama", EkspedisiSelesaiByNamaDriverC);
route.patch("/selesai", PesananSelesaiC);
route.patch("/tolak", TolakPesananC);
route.delete("/riwayat/:id", RiwayatSelesaiC);
route.patch("/terima/:id", TerimaPesananC);

export default route;
