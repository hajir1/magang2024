import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/fragment/Navbar";
import Dashboard from "../component/fragment/Dashboard";
import {
  APIDeleteServiceById,
  APIGetMobilByIdExtra,
  APIHapusRiwayat,
  APIPostService,
} from "../services/API_CALL.service";
import { useDashboard, useToken } from "../state/zustand";
import { ButtonCard } from "../component/element/Button";
import { useFormik } from "formik";
import { AlertSukses } from "../component/element/Alert";
import { Table } from "../component/element/Table";
import Input from "../component/element/Input";
import Overlay from "../component/fragment/Overlay";
import { currentDate } from "../libs/Waktu";

const DataMobilById = () => {
  const { id } = useParams();
  const { dashboard } = useDashboard();
  const [mobil, setMobil] = useState([]);
  const { token } = useToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [sukses, setSukses] = useState(false);
  const [service, setService] = useState(false);
  useEffect(() => {
    APIGetMobilByIdExtra(id, (cb) => setMobil(cb?.data?.data));
  }, []);

  const formik = useFormik({
    initialValues: {
      jenis_service: "",
      biaya: "",
      waktu: ``,
      mobil_id: ``,
    },
    onSubmit: (value) => {
      APIPostService(value, (cb) => {
        if (cb.status === 200) {
          setService(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setSukses(true);
        } else {
          setErrorMessage(cb?.response?.data?.message);
        }
      });
    },
  });
  useEffect(() => {
    if (mobil?.length > 0) {
      formik.setFieldValue("mobil_id", mobil[0]?.nama_mobil);
    }
  }, [mobil]);
  const exportToExcel = (tableID, filename = "") => {
    let downloadurl;
    let dataFileType = "application/vnd.ms-excel";
    let tableSelect = document.getElementById(tableID);
    let tableHTMLData = tableSelect.outerHTML.replace(/ /g, "%20");

    filename = filename ? filename + ".xls" : "export_excel_data.xls";

    downloadurl = document.createElement("a");

    document.body.appendChild(downloadurl);

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(["\ufeff", tableHTMLData], {
        type: dataFileType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadurl.href = "data:" + dataFileType + ", " + tableHTMLData;

      downloadurl.download = filename;

      downloadurl.click();
    }
  };
  return (
    <div
      className={`${
        dashboard ? "w-4/5" : "w-full"
      } relative flex justify-center mt-4`}
    >
      <div className="w-full flex justify-center absolute p-1">
        {sukses ? (
          <AlertSukses
            handleClose={() => {
              setSukses(!sukses);
              window.location.reload();
            }}
            title={"sukses menambah data"}
            quote={"sukses memambahkan data service kendaraan"}
          />
        ) : (
          <></>
        )}
      </div>
      {mobil?.length > 0
        ? mobil?.map((data) => (
            <div key={data?.id} className="flex flex-col items-center w-[95%]">
              {service ? (
                <Overlay
                  close={() => setService(!service)}
                  errorMessage={errorMessage}
                  title={"tambahkan service"}
                  handleSubmit={formik.handleSubmit}
                >
                  {" "}
                  <Input
                    formik={formik}
                    formikName={"jenis_service"}
                    inputPlaceholder={"jenis service"}
                    inputType={"text"}
                  />
                  <Input
                    formik={formik}
                    formikName={"biaya"}
                    inputPlaceholder={"biaya"}
                    inputType={"number"}
                  />
                  <Input
                    formik={formik}
                    formikName={"waktu"}
                    inputType={"date"}
                  />
                </Overlay>
              ) : (
                ""
              )}
              <h1 className="font-semibold text-slate-900 text-2xl tracking-wider uppercase py-2">
                {data?.nama_mobil}
              </h1>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={`${data?.url}`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="w-full py-2">
                <p className="text-slate-700 lg:py-2">
                  type mobil : {data?.jenis}
                </p>
                <p className="text-slate-700 lg:py-2">
                  kondisi saat ini : {data?.kondisi} dan&nbsp; sedang&nbsp;
                  <span className="font-bold text-slate-600">
                    {data?.dipakai ? " dipakai" : "tidak dipakai"}
                  </span>
                </p>
                <p className="text-slate-700 lg:py-2">
                  pemilik : {data?.pemilik}
                </p>
                <p className="font-semibold text-xl text-slate-800 pt-4 uppercase">
                  data service
                </p>
                {data?.jadwal_service?.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <p className="text-center mt-4 text-red-500 text-md">
                          jika service mempunyai data , maka kendaraan tidak
                          bisa dihapus
                        </p>
                        <div className="overflow-hidden">
                          <Table
                            tableId={"table-service"}
                            th1={"jenis service"}
                            th2={"biaya"}
                          >
                            {data?.jadwal_service?.map((service) => (
                              <tr
                                key={service?.id}
                                className="border-b border-neutral-200 dark:border-white/10"
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {service?.jenis_service}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {Number(service?.biaya).toLocaleString(
                                    "id-ID",
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    }
                                  )}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {service?.waktu}
                                </td>
                                <td
                                  onClick={() =>
                                    APIDeleteServiceById(service?.id, (cb) => {
                                      if (cb.status === 200) {
                                        window.location.reload();
                                      }
                                    })
                                  }
                                  className="whitespace-nowrap px-6 py-4 cursor-pointer"
                                >
                                  hapus
                                </td>
                              </tr>
                            ))}
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h1>belum pernah di service sama sekali</h1>
                )}

                <div className="w-full flex justify-center py-4 gap-4">
                  <ButtonCard
                    model={"service"}
                    handleClick={() => setService(!service)}
                    style={"w-[47%] lg:w-1/4"}
                  />
                  <ButtonCard
                    model={"Export service to excel"}
                    handleClick={() => exportToExcel("table-service")}
                    style={"w-[47%] lg:w-1/4"}
                  />
                </div>
                <p className="font-semibold text-xl text-slate-800 pt-4 uppercase">
                  riwayat pemakaian
                </p>

                {data?.riwayat_pemakaian.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <p className="text-center mt-4 text-red-500 text-md">
                          jika kendaraan mempunyai riwayat pemakaian , maka
                          kendaraan tidak bisa dihapus
                        </p>
                        <div className="overflow-hidden">
                          <Table
                            tableId={"table-riwayat"}
                            th1={"nama mobil"}
                            th2={"nama driver"}
                          >
                            {data?.riwayat_pemakaian?.map((riwayat) => (
                              <tr
                                key={riwayat?.id}
                                className="border-b border-neutral-200 dark:border-white/10"
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {riwayat?.mobil_id}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {riwayat?.driver_id}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {riwayat?.waktu}
                                </td>
                                <td
                                  onClick={() =>
                                    APIHapusRiwayat(riwayat?.id, (cb) => {
                                      if (cb.status === 200) {
                                        window.location.reload();
                                      }
                                    })
                                  }
                                  className="whitespace-nowrap px-6 py-4 cursor-pointer"
                                >
                                  hapus
                                </td>
                              </tr>
                            ))}
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h1>belum pernah di pakai sama sekali</h1>
                )}
                <div className="w-full flex justify-center">
                  <ButtonCard
                    model={"Export riwayat to excel"}
                    handleClick={() => exportToExcel("all-table")}
                    style={"w-1/2"}
                  />
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

const MobilById = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (token.username === "penerima") {
      alert("anda bukan admin!!");
      navigate("/datapemesanan");
    }
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Dashboard />
        <DataMobilById />
      </div>
    </div>
  );
};

export default MobilById;
