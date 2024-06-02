import React, { useEffect, useState } from "react";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import { useDashboard, useToken } from "../state/zustand";
import { useFormik } from "formik";
import { APIPostKaryawan} from "../services/API_CALL.service";
import { AlertSukses } from "../component/element/Alert";
import { ErrorMessage } from "../component/element/Message";
import IconGambar from "../component/element/Icon/IconGambar";
import { useNavigate } from "react-router-dom";

const PostDataKaryawan = () => {
  const { dashboard } = useDashboard();
  const [file, setFile] = useState(null);
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
      nama_driver: "",
      jasa: "Pengangkut Barang",
      bekerja: false,
    },
    onSubmit: (value) => {
      const form = new FormData();
      form.append("file", file);
      form.append("nama_driver", value.nama_driver);
      form.append("jasa", value.jasa);
      form.append("bekerja", value.bekerja);
      APIPostKaryawan(form, (cb) => {
        if (cb?.status === 200) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        
          setSukses(true);
          value.nama_driver = "";
          setFile(null);
          setErrorMessage("");
        } else {
          setErrorMessage(cb?.response?.data?.message);
        }
      });
    },
  });
  return (
    <div
      className={`${
        dashboard ? "w-4/5" : "w-full"
      } relative lg:flex lg:justify-center`}
    >
      <div className="w-full flex justify-center absolute p-2">
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
      <form onSubmit={formik.handleSubmit} className="p-2 lg:w-4/5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-center text-gray-900">
              Tambahkan Profile Karyawan
            </h2>

            <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6">
              <div className="col-span-full">
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
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file"
                          type="file"
                          onChange={(e) => handleImageChange(e)}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, JEPG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="nama_driver"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  nama lengkap
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="nama_driver"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 pl-3"
                    {...formik.getFieldProps("nama_driver")}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="jasa"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Jasa
                </label>
                <div className="mt-2">
                  <select
                    id="jasa"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                    {...formik.getFieldProps("jasa")}
                  >
                    <option>Pengangkut Barang</option>
                    <option>Pengangkut Orang</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <ErrorMessage message={errorMessage} />
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-1/2 lg:w-1/4"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
const TambahKaryawan = () => {
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
        <PostDataKaryawan />
      </div>
    </div>
  );
};

export default TambahKaryawan;
