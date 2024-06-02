import {
  DapatSemuaEkspedisi,
  DapatSemuaPesanan,
  EkspedisiSelesai,
  EkspedisiSelesaiByNamaDriver,
  PesananSelesai,
  RiwayatSelesai,
  TambahPemesanan,
  TerimaPesanan,
  TolakPesanan,
} from "../service/pemesanan.service.js";

export const TambahPemesananC = async (req, res, next) => {
  try {
    const data = await TambahPemesanan(req);
    res.status(200).json({
      message: "sukses menambah data pemesanan",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const DapatSemuaPesananC = async (req, res, next) => {
  try {
    const data = await DapatSemuaPesanan(req);
    res.status(200).json({
      message: "sukses mendapat semua data pemesanan",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const DapatSemuaekspedisiC = async (req, res, next) => {
  try {
    const data = await DapatSemuaEkspedisi(req);
    res.status(200).json({
      message: "sukses mendapat semua data ekspedisi",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const TolakPesananC = async (req, res, next) => {
  try {
    const data = await TolakPesanan(req);
    res.status(200).json({
      message: "sukses menghapus data pemesanan",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const TerimaPesananC = async (req, res, next) => {
  try {
    const data = await TerimaPesanan(req);
    res.status(200).json({
      message: "sukses menerima data pemesanan",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const PesananSelesaiC = async (req, res, next) => {
  try {
    const data = await PesananSelesai(req);
    res.status(200).json({
      message: "sukses menyelesaikan pesanan",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const RiwayatSelesaiC = async (req, res, next) => {
  try {
    const data = await RiwayatSelesai(req);
    res.status(200).json({
      message: "sukses menyelesaikan pesanan",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const EkspedisiSelesaiC = async (req, res, next) => {
  try {
    const data = await EkspedisiSelesai(req);
    res.status(200).json({
      message: "sukses mendapat data ekspedisi selesai",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const EkspedisiSelesaiByNamaDriverC = async (req, res, next) => {
  try {
    const data = await EkspedisiSelesaiByNamaDriver(req);
    res.status(200).json({
      message: "sukses mendapat data ekspedisi selesai dengan nama driver",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
