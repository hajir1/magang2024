import React, { useEffect, useState } from "react";
import Dashboard from "../component/fragment/Dashboard";
import Navbar from "../component/fragment/Navbar";
import {
  APIDeleteMobil,
  APIDeleteMobilById,
  APIGetKaryawan,
  APIGetKaryawanKosong,
  APIGetMobil,
  APIGetMobilById,
  APILogin,
  APIPostPemesanan,
} from "../services/API_CALL.service";
import { useDashboard, useToken } from "../state/zustand";
import { AlertGagal, AlertSukses } from "../component/element/Alert";
import { useFormik } from "formik";
import { Search } from "../component/fragment/Search";
import { CardMobil } from "../component/element/Card";
import Input from "../component/element/Input";
import Overlay from "../component/fragment/Overlay";
import { useNavigate } from "react-router-dom";
import { currentDate } from "../libs/Waktu";

const GetDataMobil = () => {
  const [mobils, setMobils] = useState([]);
  const { dashboard } = useDashboard();
  const { token } = useToken();
  const [searchMobil, setSearchMobil] = useState("");
  const [mobilById, setMobilById] = useState([]);
  const [karyawans, setKaryawans] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [pakaiById, setPakaiById] = useState(null);
  const [hapusById, setHapusById] = useState(null);
  const [hapus, setHapus] = useState(false);
  const [suksesPakai, setSuksesPakai] = useState(false);
  useEffect(() => {
    APIGetKaryawan((cb) => setKaryawans(cb?.data?.data));
  }, []);
  useEffect(() => {
    APIGetMobil((cb) => {
      setMobils(cb?.data?.data);
    });
  }, []);

  useEffect(() => {
    if (searchMobil !== "") {
      APIGetMobilById(searchMobil, (cb) => {
        if (cb?.data?.data) {
          setMobilById(cb?.data?.data);
        } else {
          setMobilById([]);
        }
      });
    } else {
      setMobilById([]);
    }
  }, [searchMobil]);
  const handleDeleteById = (e, id) => {
    e.preventDefault();
    const dataId = mobils.find((item) => item.id === id);
    setHapusById(dataId.id);
  };

  const formik = useFormik({
    initialValues: {
      username: "admin",
      password: "",
    },
    onSubmit: (value) => {
      APILogin(value, (cb) => {
        if (cb.status === 200) {
          APIDeleteMobil(cb?.data?.accessToken, (cb) => {
            if (cb.status === 200) {
              window.location.reload();
            }
          });
        } else {
          alert("password salah");
          window.location.reload();
        }
      });
    },
  });
  const formikPakai = useFormik({
    initialValues: {
      waktu: "",
      nama_driver: ``,
      deskripsi: "",
      mobil_id: ``,
    },
    onSubmit: (value) => {
      APIPostPemesanan(value, (cb) => {
        if (cb?.status === 200) {
          setPakaiById(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setSuksesPakai(true);
        } else {
          if (cb?.response?.data?.message !== "") {
            setErrorMessage(cb?.response?.data?.message);
          } else {
            setErrorMessage(cb?.message);
          }
        }
      });
    },
  });
  useEffect(() => {
    console.log(mobils);
  }, []);
  const handlePakaiById = (e, id) => {
    const dataId = mobils.find((item) => item.id === id);
    setPakaiById(dataId.id);
  };

  return (
    <div className={`${dashboard ? "w-4/5 p-1" : "w-full"} relative`}>
      {mobils.length < 1 && (
        <h1 className="lg:ml-4">
          Tidak ada data kendaraan silahkan isi di tambah kendaraan
        </h1>
      )}
      {mobils?.length > 1 && (
        <h1 className="font-semibold text-base italic text-red-600 text-right mr-2">
          jika kendaraan dalam ekspedisi tidak bisa dihapus
        </h1>
      )}
      <div className="w-full flex justify-center absolute">
        {suksesPakai ? (
          <AlertSukses
            handleClose={() => setSuksesPakai(!suksesPakai)}
            title={"sukses menambah data pemesanan"}
            quote={"silahkan cek di halaman pemesanan"}
          />
        ) : (
          <></>
        )}
      </div>
      {hapus && (
        <AlertGagal
          type={"hard"}
          height={"h-64"}
          handleDelete={formik.handleSubmit}
          handleClose={() => setHapus(false)}
          quote={"apakah anda yakin ingin menghapus seluruh data"}
        >
          <form>
            {" "}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline my-2"
              id="password"
              type="password"
              placeholder="masukkan password"
              {...formik.getFieldProps("password")}
            />
          </form>
        </AlertGagal>
      )}
      <Search
        btnClick={() => setHapus(true)}
        changeInput={(e) => setSearchMobil(e.target.value)}
        valueInput={searchMobil}
        classFormat={mobils}
      />
      <div className="w-full flex  mt-6 gap-x-6 gap-y-10 flex-wrap justify-center">
        {mobilById?.length > 0
          ? mobilById?.map((mobil) => (
              <div
                key={mobil?.id}
                className={`${
                  dashboard ? "md:w-[30%]" : "w-[45%] lg:w-[30%]"
                } relative`}
              >
                {hapusById === mobil?.id && (
                  <AlertGagal
                    handleClose={() => setHapusById(null)}
                    height={"h-40"}
                    quote={`apakah anda yakin ingin menghapus jenis kendaraan ${mobil?.nama_mobil}`}
                    handleDelete={(e) => {
                      APIDeleteMobilById(mobil?.id, (cb) => {
                        if (cb?.status === 200) {
                          window.location.reload();
                        }
                      });
                    }}
                  />
                )}
                {pakaiById === mobil?.id && (
                  <Overlay
                    close={() => setPakaiById(null)}
                    errorMessage={""}
                    handleSubmit={formikPakai.handleSubmit}
                    title={`tambahkan pesanan ${mobil?.nama_mobil}`}
                  >
                    <p className="text-red-600 text-sm italic">
                      {mobil?.dipakai
                        ? "kendaraan ini msih dlam ekspedisi"
                        : ""}
                    </p>

                    <input
                      onChange={formikPakai.handleChange}
                      type="text"
                      placeholder="salin nama kendaraan di atas"
                      name="mobil_id"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 pl-2 mt-2"
                    />
                    <Input
                      formik={formikPakai}
                      formikName={"waktu"}
                      inputType={"date"}
                    />
                    <div className="col-span-full">
                      <label
                        htmlFor="deskripsi"
                        className="block text-sm font-medium mt-4 leading-6 text-gray-900"
                      >
                        Cari Driver{" "}
                        <span className="text-red-600 text-sm italic">
                          default driver adalah null
                        </span>
                      </label>
                      <select
                        id="pemilik"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                        {...formikPakai.getFieldProps("nama_driver")}
                      >
                        {karyawans?.length > 0
                          ? karyawans.map((karyawan) => (
                              <option
                                key={karyawan?.id}
                                value={`${karyawan?.nama_driver}`}
                              >
                                {karyawan?.nama_driver} -{" "}
                                {karyawan?.bekerja
                                  ? "sedang ekspedisi"
                                  : "tidak sedang ekspedisi"}
                              </option>
                            ))
                          : ""}
                      </select>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="deskripsi"
                        className="block text-sm font-medium mt-4 leading-6 text-gray-900"
                      >
                        Deskripsi
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="deskripsi"
                          rows="3"
                          {...formikPakai.getFieldProps("deskripsi")}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none pl-4 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>
                    </div>
                  </Overlay>
                )}
                <CardMobil
                  data={mobil}
                  handlePakaiByOd={handlePakaiById}
                  handleDeleteById={handleDeleteById}
                />
              </div>
            ))
          : mobils?.map((mobil) => (
              <div
                key={mobil?.id}
                className={`${
                  dashboard ? "md:w-[30%]" : "w-[45%] lg:w-[30%]"
                } relative`}
              >
                {hapusById === mobil?.id && (
                  <AlertGagal
                    handleClose={() => setHapusById(null)}
                    height={"h-40"}
                    quote={`apakah anda yakin ingin menghapus jenis kendaraan ${mobil?.nama_mobil}`}
                    handleDelete={(e) => {
                      APIDeleteMobilById(mobil?.id, (cb) => {
                        if (cb?.status === 200) {
                          window.location.reload();
                        }
                      });
                    }}
                  />
                )}
                {pakaiById === mobil?.id && (
                  <Overlay
                    close={() => setPakaiById(null)}
                    errorMessage={""}
                    handleSubmit={formikPakai.handleSubmit}
                    title={`tambahkan pesanan ${mobil?.nama_mobil}`}
                  >
                    <p className="text-red-600 text-sm italic">
                      {mobil?.dipakai
                        ? "kendaraan ini msih dlam ekspedisi"
                        : ""}
                    </p>
                    <input
                      onChange={formikPakai.handleChange}
                      type="text"
                      placeholder="salin nama kendaraan di atas"
                      name="mobil_id"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 pl-2 mt-2"
                    />
                    <Input
                      formik={formikPakai}
                      formikName={"waktu"}
                      inputType={"date"}
                    />
                    <div className="col-span-full">
                      <label
                        htmlFor="deskripsi"
                        className="block text-sm font-medium mt-4 leading-6 text-gray-900"
                      >
                        Cari Driver{" "}
                        <span className="text-red-600 text-sm italic">
                          default driver adalah null
                        </span>
                      </label>
                      <select
                        id="pemilik"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                        {...formikPakai.getFieldProps("nama_driver")}
                      >
                        {karyawans?.length > 0
                          ? karyawans.map((karyawan) => (
                              <option
                                key={karyawan?.id}
                                value={`${karyawan?.nama_driver}`}
                              >
                                {karyawan?.nama_driver} -{" "}
                                {karyawan?.bekerja
                                  ? "sedang ekspedisi"
                                  : "tidak sedang ekspedisi"}
                              </option>
                            ))
                          : ""}
                      </select>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="deskripsi"
                        className="block text-sm font-medium mt-4 leading-6 text-gray-900"
                      >
                        Deskripsi
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="deskripsi"
                          rows="3"
                          {...formikPakai.getFieldProps("deskripsi")}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none pl-4 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>
                    </div>
                    <p className="text-red-600 text-sm italic text-center">
                      {errorMessage}
                    </p>
                  </Overlay>
                )}
                <CardMobil
                  data={mobil}
                  handlePakaiByOd={handlePakaiById}
                  handleDeleteById={handleDeleteById}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

const LihatMobilPage = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (token.username === "penerima") {
      navigate("/datapemesanan");
    }
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Dashboard />
        <GetDataMobil />
      </div>
    </div>
  );
};

export default LihatMobilPage;
