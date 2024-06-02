import express from "express";
import {
  HapusServiceByIdC,
  TambahkanServiceByIdC,
} from "../controller/specMobil.controller.js";

// import verifyToken from "../middleware/auth.js";

const route = express.Router();
route.post("/tambahservice", TambahkanServiceByIdC);
route.delete("/hapusservice/:id", HapusServiceByIdC);

export default route;
