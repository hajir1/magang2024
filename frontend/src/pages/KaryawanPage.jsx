import React, { useEffect, useState } from "react";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import { useDashboard, useToken } from "../state/zustand";
import {
  APIDeleteKaryawanById,
  APIGetKaryawan,
} from "../services/API_CALL.service";
import { ButtonCard } from "../component/element/Button";
import { AlertGagal } from "../component/element/Alert";
import IconGembok from "../component/element/Icon/IconGembok";
import { useNavigate } from "react-router-dom";

const GetDataKaryawan = () => {
  const { dashboard } = useDashboard();
  const [hapusCard, setHapusCard] = useState(null);
  const [karyawans, setKaryawans] = useState([]);
  useEffect(() => {
    APIGetKaryawan((cb) => {
      setKaryawans(cb?.data?.data);
    });
  }, []);
  const handleDelete = (e, id) => {
    const dataId = karyawans.find((item) => item.id === id);
    setHapusCard(dataId.id);
  };
  return (
    <div className={`${dashboard ? "w-4/5" : "w-full"} p-2 relative`}>
      {karyawans.length > 0 && (
        <h1 className="font-semibold text-base italic text-red-600 text-right my-4">
          jika karyawan dalam ekspedisi tidak bisa dihapus
        </h1>
      )}
      <h1 className="text-center my-5 uppercase font-semibold text-slate-900 text-2xl">
        seluruh pegawai driver
      </h1>
      <div className="flex justify-evenly flex-wrap gap-x-1 gap-y-3 ">
        {karyawans.length > 0
          ? karyawans?.map((karyawan) => (
              <div
                key={karyawan?.id}
                className="max-w-sm w-full lg:max-w-[48%] lg:flex relative "
              >
                {hapusCard === karyawan?.id && (
                  <AlertGagal
                    quote={"apakah anda yakin ingin menghapus data karyawan"}
                    handleClose={() => setHapusCard(null)}
                    handleDelete={(e) =>
                      APIDeleteKaryawanById(karyawan?.id, (cb) => {
                        if (cb?.status === 200) {
                          window.location.reload();
                        }
                      })
                    }
                  />
                )}
                <div
                  className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden object-cover object-center"
                  style={{ backgroundImage: `url(${karyawan?.url})` }}
                ></div>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div className="mb-8">
                    <p className="text-sm text-gray-600 flex tracking-wider items-center uppercase">
                      <IconGembok />
                      {karyawan?.kode_karyawan}
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2 uppercase">
                      {karyawan?.nama_driver}
                    </div>
                    <p className="text-gray-700 text-base">
                      berpengalaman sebagai : sopir {karyawan?.jasa}
                    </p>
                  </div>
                  <div className="flex items-center justify-evenly">
                    <div className="text-sm">
                      <p>saat ini</p>
                      <p
                        className={`${
                          karyawan?.bekerja ? "text-red-600" : "text-gray-900"
                        }   leading-none`}
                      >
                        {karyawan?.bekerja
                          ? "sedang dalam ekspedisi "
                          : "tidak dalam ekspedisi"}
                      </p>
                    </div>
                    <ButtonCard
                      model={"hapus"}
                      style={"w-32"}
                      handleClick={(e) => handleDelete(e, karyawan?.id)}
                    />
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};
const KaryawanPage = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (token.username === "penerima") {
      alert("anda bukan admin!! silahkan logout dari penerima terlebih dahulu");
      navigate("/datapemesanan");
    }
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Dashboard />
        <GetDataKaryawan />
      </div>
    </div>
  );
};

export default KaryawanPage;
