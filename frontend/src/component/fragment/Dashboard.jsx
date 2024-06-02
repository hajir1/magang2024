import React from "react";
import { useDashboard, useToken } from "../../state/zustand";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { dashboard, setDashboard } = useDashboard();
  const { token } = useToken();
  return (
    <div
      className={`${
        dashboard ? "w-1/3" : "hidden"
      } lg:block lg:w-1/5 min-h-screen bg-indigo-500 text-white`}
    >
      <div className="flex flex-col w-full items-center p-4">
        <Link
          className={`${
            token.username === "penerima" && "hidden"
          } border-b border-b-white p-2 w-full text-center`}
          to={`/lihatkendaraan`}
        >
          Lihat Kendaraan
        </Link>
        <Link
          className={`${
            token.username === "penerima" && "hidden"
          } border-b border-b-white p-2 w-full text-center`}
          to={`/tambahkendaraan`}
        >
          Tambah Kendaraan
        </Link>
        <Link
          className={`${
            token.username === "penerima" && "hidden"
          } border-b border-b-white p-2 w-full text-center`}
          to={`/karyawan`}
        >
          Pegawai Drivers
        </Link>
        <Link
          className={`${
            token.username === "penerima" && "hidden"
          } border-b border-b-white p-2 w-full text-center`}
          to={`/tambahkaryawan`}
        >
          Tambah Pegawai
        </Link>
        <Link
          className="border-b border-b-white p-2 w-full text-center"
          to={`/datapemesanan`}
        >
          Data Pemesanan
        </Link>
        <Link
          className="border-b border-b-white p-2 w-full text-center"
          to={`/ekspedisipage`}
        >
          Ekspedisi
        </Link>
        {/* <Link
          className="border-b border-b-white p-2 w-full text-center"
          to={`/ekspedisiselesai`}
        >
          Ekspedisi Selesai
        </Link> */}
      </div>
    </div>
  );
};

export default Dashboard;
