import React, { useEffect, useState } from "react";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import { useDashboard, useToken } from "../state/zustand";
import {
  APIGetPemesanan,
  APITerimaPesanan,
  APITolakPesanan,
} from "../services/API_CALL.service";
import { Table2 } from "../component/element/Table";
// import { currentDate } from "../libs/Waktu";

const GetDataPemesanan = () => {
  const { token } = useToken();
  const { dashboard } = useDashboard();
  const [pemesanans, setPemesanans] = useState([]);
  //   const [tolakPesanan, terimaPesanan] = useState(null);
  useEffect(() => {
    APIGetPemesanan((cb) => setPemesanans(cb?.data?.data));
  }, []);
  const handleTolakPesanan = (e, id, nama_mobil, nama_driver) => {
    e.preventDefault();
    if (token.username === "penerima") {
      APITolakPesanan({ id, nama_driver, nama_mobil }, (cb) => {
        if (cb.status === 200) {
          alert("sukses menolak permintaan", window.location.reload());
        } else {
          alert("gagal menghapus permintaan", window.location.reload());
        }
      });
    } else {
      alert("Akses terlarang , Anda harus login sebagai penerima");
      window.location.reload();
    }
  };
  return (
    <div className={`${dashboard ? "w-4/5" : "w-full"} p-2 relative`}>
      {pemesanans?.length < 1 ? (
        <h1>
          tidak ada data silahkan isi pesanan di dashboard lihat kendaraan
        </h1>
      ) : (
        <Table2>
          {pemesanans?.map((pemesanan) => (
            <tr
              key={pemesanan?.id}
              className="border-b border-neutral-200 dark:border-white/10"
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {pemesanan?.driver?.nama_driver}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {pemesanan?.driver?.jasa}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {pemesanan?.mobils?.nama_mobil}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {pemesanan?.mobils?.kondisi}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {pemesanan?.waktu}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (token.username === "penerima") {
                      APITerimaPesanan(pemesanan?.id, (cb) => {
                        if (cb.status === 200) {
                          alert("sukses menerima pesanan");
                          window.location.reload();
                        }
                      });
                    } else {
                      alert(
                        "Akses terlarang , Anda harus login sebagai penerima"
                      );
                    }
                  }}
                  className=" text-gray-800 font-semibold py-2 px-4 border-b border-b-gray-500 rounded shadow"
                >
                  Terima
                </button>
                <button
                  onClick={(e) =>
                    handleTolakPesanan(
                      e,
                      pemesanan?.id,
                      pemesanan?.mobils?.nama_mobil,
                      pemesanan?.driver?.nama_driver
                    )
                  }
                  className=" text-gray-800 font-semibold py-2 px-4 border-b border-b-gray-500 rounded shadow"
                >
                  Tolak
                </button>
              </td>
            </tr>
          ))}
        </Table2>
      )}
    </div>
  );
};

const DataPemesanan = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Dashboard />
        <GetDataPemesanan />
      </div>
    </div>
  );
};

export default DataPemesanan;
