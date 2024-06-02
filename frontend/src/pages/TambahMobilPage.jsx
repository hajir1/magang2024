import React, { useEffect, useState } from "react";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import { useFormik } from "formik";
import { APIPostMobil } from "../services/API_CALL.service";
import { AlertSukses } from "../component/element/Alert";
import { useDashboard, useToken } from "../state/zustand";
import { ErrorMessage } from "../component/element/Message";
import IconGambar from "../component/element/Icon/IconGambar";
import { useNavigate } from "react-router-dom";
import { currentDate } from "../libs/Waktu";

const PostDataMobil = () => {
  const [file, setFile] = useState(null);
  const { dashboard } = useDashboard();
  const { token } = useToken();
  const [sukses, setSukses] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleImageChange = (e) => {
    const files = e.target.files[0];
    if (files) {
      setFile(files);
    }
  };
  const formik = useFormik({
    initialValues: {
      nama_mobil: "",
      jenis: "pengangkut orang",
      kondisi: "",
      pemilik: "milik pribadi",
      dipakai: false,
    },
    onSubmit: (value) => {
      const form = new FormData();
      form.append("file", file);
      form.append("nama_mobil", value.nama_mobil);
      form.append("jenis", value.jenis);
      form.append("kondisi", value.kondisi);
      form.append("pemilik", value.pemilik);
      form.append("dipakai", value.dipakai);
      APIPostMobil(form, (cb) => {
        if (cb?.status === 200) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setSukses(true);
          value.nama_mobil = "";
          setFile(null);
          value.kondisi = "";
          setErrorMessage("");
         
        } else {
          setErrorMessage(cb?.response?.data?.message);
        }
      });
    },
  });
  return (
    <div className={`w-full flex justify-center p-2 `}>
      <div className=" flex justify-center absolute p-2">
        {sukses ? (
          <AlertSukses
            handleClose={() => setSukses(!sukses)}
            title={"sukses menambah data"}
            quote={"silahkan cek lihat kendaraan untuk memastikan"}
          />
        ) : (
          <></>
        )}
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className={`${dashboard ? "w-4/5" : "w-full"} lg:w-4/5 `}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Tambahkan Jenis Kendaraan
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div className="">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 border-none outline-none sm:max-w-md">
                    <input
                      type="text"
                      id="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="nama kendaraan"
                      {...formik.getFieldProps("nama_mobil")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  photo kendaraan
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="flex justify-center">
                      {" "}
                      {file ? (
                        <img
                          className="w-44 h-44"
                          src={URL.createObjectURL(file)}
                          alt=""
                        />
                      ) : (
                        <IconGambar />
                      )}
                    </div>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={(e) => handleImageChange(e)}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Informasi Lengkap
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Kondisi Kendaraan
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("kondisi")}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="pemilik"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pemilik Kendaran
                </label>
                <div className="mt-2">
                  <select
                    id="pemilik"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-xs sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("pemilik")}
                  >
                    <option value={"Milik Perusahaan Pribadi"}>
                      Milik Pribadi
                    </option>
                    <option value={"Disewa dari PT Lain"}>
                      Disewa dari PT Lain
                    </option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="jenis"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Jenis Kendaran
                </label>
                <div className="mt-2">
                  <select
                    id="jenis"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-xs sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("jenis")}
                  >
                    <option value={"pengangkut orang"}>Pengangkut Orang</option>
                    <option value={"pengangkut barang"}>
                      Pengangkut Barang
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative flex justify-center">
            <ErrorMessage message={errorMessage} />
          </div>
          <div className="mt-2 flex justify-center gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-3/4 lg:w-1/4"
            >
              Save
            </button>
          </div>
        </div>
        ;
      </form>
    </div>
  );
};

const TambahMobilPage = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (token.username === "penerima") {
      alert(
        "anda bukan admin!! , silahkan logout dari penerima terlebih dahulu"
      );
      navigate("/datapemesanan");
    }
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Dashboard />
        <PostDataMobil />
      </div>
    </div>
  );
};

export default TambahMobilPage;
