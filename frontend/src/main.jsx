import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import "./style/customize.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LihatMobilPage from "./pages/LihatMobilPage";
import TambahMobilPage from "./pages/TambahMobilPage";
import KaryawanPage from "./pages/KaryawanPage";
import TambahKaryawan from "./pages/TambahKaryawan";
import MobilById from "./pages/MobilById";
import DataPemesanan from "./pages/DataPemesanan";
import Ekspedisi from "./pages/EkspedisiPage";
import EkspedisiSelesai from "./pages/EkspedisiSelesai";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/lihatkendaraan",
    element: <LihatMobilPage />,
  },
  {
    path: "/lihatkendaraan/:id",
    element: <MobilById />,
  },
  {
    path: "/tambahkendaraan",
    element: <TambahMobilPage />,
  },
  {
    path: "/karyawan",
    element: <KaryawanPage />,
  },
  {
    path: "/tambahkaryawan",
    element: <TambahKaryawan />,
  },
  {
    path: "/datapemesanan",
    element: <DataPemesanan />,
  },
  {
    path: "/ekspedisipage",
    element: <Ekspedisi />,
  },
  // {
  //   path: "/ekspedisiselesai",
  //   element: <EkspedisiSelesai />,
  // },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes}></RouterProvider>
);
