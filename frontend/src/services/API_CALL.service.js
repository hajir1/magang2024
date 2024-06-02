import axios from "axios";

const API_BASE_URL = `http://192.168.0.103:3000`;

export const APILogin = (data, cb) => {
  axios
    .post(`${API_BASE_URL}/login`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};

// get
export const APIGetMobil = (cb) => {
  axios
    .get(`${API_BASE_URL}/mobil/mobil`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetMobilById = (nama, cb) => {
  axios
    .get(`${API_BASE_URL}/mobil/mobil/${nama}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetKaryawan = (cb) => {
  axios
    .get(`${API_BASE_URL}/karyawan/karyawan`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetMobilByIdExtra = (id, cb) => {
  axios
    .get(`${API_BASE_URL}/mobil/extra/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetKaryawanKosong = (cb) => {
  axios
    .get(`${API_BASE_URL}/karyawan/karyawankosong`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetPemesanan = (cb) => {
  axios
    .get(`${API_BASE_URL}/pemesanan/pemesanan`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetEkspedisi = (cb) => {
  axios
    .get(`${API_BASE_URL}/pemesanan/ekspedisi`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetEkspedisiselesai = (cb) => {
  axios
    .get(`${API_BASE_URL}/pemesanan/ekspedisiselesai`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIGetEkspedisiselesaiByDriver = (nama, cb) => {
  axios
    .get(`${API_BASE_URL}/pemesanan/ekspedisiselesaibydriver/${nama}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};

// post
export const APIPostMobil = (data, cb) => {
  axios
    .post(`${API_BASE_URL}/mobil/tambahmobil`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIPostKaryawan = (data, cb) => {
  axios
    .post(`${API_BASE_URL}/karyawan/tambahkaryawan`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIPostService = (data, cb) => {
  axios
    .post(`${API_BASE_URL}/spec/tambahservice`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIPostPemesanan = (data, cb) => {
  axios
    .post(`${API_BASE_URL}/pemesanan/tambahpemesanan`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
// delete
export const APIDeleteMobilById = (id, cb) => {
  axios
    .delete(`${API_BASE_URL}/mobil/hapusmobil/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIDeleteServiceById = (id, cb) => {
  axios
    .delete(`${API_BASE_URL}/spec/hapusservice/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIDeleteKaryawanById = (id, cb) => {
  axios
    .delete(`${API_BASE_URL}/karyawan/hapuskaryawan/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};

export const APILogout = (cb) => {
  axios
    .delete(`${API_BASE_URL}/logout`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIHapusRiwayat = (id, cb) => {
  axios
    .delete(`${API_BASE_URL}/pemesanan/riwayat/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIDeleteMobil = (token, cb) => {
  axios
    .delete(`${API_BASE_URL}/mobil/hapusmobil`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
// update
export const APITolakPesanan = (data, cb) => {
  axios
    .patch(`${API_BASE_URL}/pemesanan/tolak`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APITerimaPesanan = (id, cb) => {
  axios
    .patch(`${API_BASE_URL}/pemesanan/terima/${id}`)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};
export const APIPesananSelesai = (data, cb) => {
  axios
    .patch(`${API_BASE_URL}/pemesanan/selesai`, data)
    .then((res) => cb(res))
    .catch((err) => cb(err));
};

