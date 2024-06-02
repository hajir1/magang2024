import React, { useEffect, useState } from "react";
import { APIGetEkspedisiselesai } from "../services/API_CALL.service";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import { useDashboard } from "../state/zustand";
import IconGembok from "../component/element/Icon/IconGembok";
import { ButtonCard } from "../component/element/Button";
import { Search } from "../component/fragment/Search";

const GetDataEkspedisiSelesai = () => {
  const { dashboard } = useDashboard();
  const [searchDriver, setsearchDriver] = useState("");
  const [ekspedisis, setEkspedisis] = useState([]);
  const [driverEkspedisi, setDriverEkspedisi] = useState([]);
  useEffect(() => {
    APIGetEkspedisiselesai((cb) => setEkspedisis(cb?.data?.data));
  }, []);
  useEffect(() => {
    if (searchDriver !== "") {
      APIGetMobilById(searchDriver, (cb) => {
        if (cb?.data?.data) {
          setDriverEkspedisi(cb?.data?.data);
        } else {
          setDriverEkspedisi([]);
        }
      });
    } else {
      setDriverEkspedisi([]);
    }
  }, [EkspedisiSelesai]);
  return (
    <div className={`${dashboard ? "w-4/5" : "w-full"} p-2 relative`}>
      <Search
        // btnClick={() => setHapus(true)}
        changeInput={(e) => setsearchDriver(e.target.value)}
        valueInput={searchDriver}
        classFormat={ekspedisis}
      />
      <div className="flex flex-wrap justify-center mt-6 gap-4 lg:p-2">
        {ekspedisis?.length > 0
          ? ekspedisis?.map((ekspedisi) => (
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
                      <p className={`text-red-600 leading-none`}>selesai</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};
const EkspedisiSelesai = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Dashboard />
        <GetDataEkspedisiSelesai />
      </div>
    </div>
  );
};

export default EkspedisiSelesai;
