import express from "express";
import {
  DapatMobilByIdExtraC,
  DapatMobilByOdC,
  DapatSemuaMobilC,
  HapusMobilByIdC,
  HapusSemuaMobilC,
  TambahMobilC,
} from "../controller/mobil.controller.js";

import verifyToken from "../middleware/auth.js";

const route = express.Router();
route.post("/tambahmobil", TambahMobilC);
route.get("/mobil", DapatSemuaMobilC);
route.get("/extra/:id", DapatMobilByIdExtraC);
route.get("/mobil/:id", DapatMobilByOdC);
route.delete("/hapusmobil", verifyToken, HapusSemuaMobilC);
route.delete("/hapusmobil/:id", HapusMobilByIdC);

export default route;
