import express from "express";

const routes = express.Router();
import userRoute from "./user.route.js";
import mobilRoute from "./mobil.route.js";
import specRoute from "./specMobil.route.js";
import karyawanRoute from "./karyawan.route.js";
import pemesananRoute from "./pemesanan.route.js";
const router = [
  {
    path: "/",
    route: userRoute,
  },
  {
    path: "/mobil",
    route: mobilRoute,
  },
  {
    path: "/spec",
    route: specRoute,
  },
  {
    path: "/karyawan",
    route: karyawanRoute,
  },
  {
    path: "/pemesanan",
    route: pemesananRoute,
  },
];

router.forEach(({ path, route }) => {
  routes.use(path, route);
});

export default routes;
