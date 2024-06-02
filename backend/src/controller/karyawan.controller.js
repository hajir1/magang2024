import {
  DapatKaryawanKosong,
  DapatSemuaKaryawan,
  HapusKaryawanById,
  TambahKaryawan,
} from "../service/karyawan.service.js";

export const TambahKaryawanC = async (req, res, next) => {
  try {
    const data = await TambahKaryawan(req);
    res.status(200).json({ message: "sukses menambah data karyawan", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};

export const DapatSemuaKaryawanC = async (req, res, next) => {
  try {
    const data = await DapatSemuaKaryawan(req);
    res
      .status(200)
      .json({ message: "sukses mendapat data para karyawan", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const DapatKaryawanKosongC = async (req, res, next) => {
  try {
    const data = await DapatKaryawanKosong(req);
    res
      .status(200)
      .json({ message: "sukses mendapat data para karyawan", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const HapusKaryawanByIdC = async (req, res, next) => {
  try {
    const data = await HapusKaryawanById(req);
    res
      .status(200)
      .json({ message: "sukses mendapat data para karyawan", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
