import React, { useEffect, useState } from "react";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import { useDashboard } from "../state/zustand";
import {
  APIGetEkspedisi,
  APIPesananSelesai,
} from "../services/API_CALL.service";
import IconGembok from "../component/element/Icon/IconGembok";
import { ButtonCard } from "../component/element/Button";

const GetDataEkspedisi = () => {
  const { dashboard } = useDashboard();
  const [ekspedisis, setEkspedisis] = useState([]);
  useEffect(() => {
    APIGetEkspedisi((cb) => setEkspedisis(cb?.data?.data));
  }, []);
  const handlePesananSelesai = (e, id, nama_mobil, nama_driver) => {
    e.preventDefault();
    APIPesananSelesai({ id, nama_driver, nama_mobil }, (cb) => {
      if (cb.status === 200) {
       
        alert("sukses menyelesaikan tugas");
        window.location.reload();
      } else {
        alert("kesalahan tak terduga");
        window.location.reload();
      }
    });
  };
  return (
    <div
      className={`${
        dashboard ? "w-4/5" : "w-full"
      } p-2 relative flex flex-wrap gap-4 justify-center`}
    >
      {ekspedisis?.length > 0 ? (
        ekspedisis.map((ekspedisi) => (
          <div
            key={ekspedisi?.id}
            className="max-w-sm w-full lg:w-[48%] h-auto lg:h-64 lg:max-w-full lg:flex"
          >
            <div
              className="h-48 lg:h-auto lg:w-48  flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{ backgroundImage: `url(${ekspedisi?.driver?.url})` }}
              title="Woman holding a mug"
            ></div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <p className="text-sm text-gray-600 uppercase flex items-center">
                  <IconGembok />
                  {ekspedisi?.driver?.kode_karyawan}
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {ekspedisi?.driver?.nama_driver}
                </div>
                <p className="text-gray-700 text-base">
                  profesi sebagai driver {ekspedisi?.driver?.jasa}
                </p>
                <p className="text-gray-700 text-base">
                  nama kendaraan {ekspedisi?.mobils?.nama_mobil}
                </p>
                <p className="text-gray-700 text-base">
                  kondisi kendaraan {ekspedisi?.mobils?.kondisi}
                </p>
                <p className="text-gray-700 font-semibold text-base">
                  deskripsi : {ekspedisi?.deskripsi}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 mr-4"
                  src={`${ekspedisi?.mobils?.url}`}
                  alt="Avatar of Jonathan Reinink"
                />
                <div className="text-sm mx-2">
                  <p className="text-gray-600">{ekspedisi?.waktu}</p>
                  <p
                    className={`${
                      ekspedisi?.selesai ? "text-red-600" : "text-gray-900"
                    }  leading-none`}
                  >
                    {ekspedisi?.selesai ? "selesai" : "belum selesai"}
                  </p>
                </div>
                <ButtonCard
                  model={"selesai"}
                  style={`${ekspedisi?.selesai && "hidden"} w-32`}
                  handleClick={(e) => {
                    handlePesananSelesai(
                      e,
                      ekspedisi?.id,
                      ekspedisi?.mobils?.nama_mobil,
                      ekspedisi?.driver?.nama_driver
                    );
                  }}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>tidak ada data yang diterima oleh user penerima</h1>
      )}
    </div>
  );
};
const Ekspedisi = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Dashboard />
        <GetDataEkspedisi />
      </div>
    </div>
  );
};

export default Ekspedisi;
