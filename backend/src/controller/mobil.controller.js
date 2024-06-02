import {
  DapatMobilById,
  DapatMobilByIdExtra,
  DapatSemuaMobil,
  HapusMobilById,
  HapusSemuaMobil,
  TambahMobil,
} from "../service/mobil.service.js";

export const TambahMobilC = async (req, res, next) => {
  try {
    const data = await TambahMobil(req);
    res
      .status(200)
      .json({ message: "sukses menambah data mobil kendaraan", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};

export const DapatSemuaMobilC = async (req, res, next) => {
  try {
    const data = await DapatSemuaMobil();
    res
      .status(200)
      .json({ message: "sukses mendapatkan semua data mobil", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const DapatMobilByOdC = async (req, res, next) => {
  try {
    const data = await DapatMobilById(req);
    res
      .status(200)
      .json({ message: "sukses mendapatkan semua data mobil", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const HapusSemuaMobilC = async (req, res, next) => {
  try {
    const data = await HapusSemuaMobil();
    res
      .status(200)
      .json({ message: "sukses menghapus semua data mobil", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const HapusMobilByIdC = async (req, res, next) => {
  try {
    const data = await HapusMobilById(req);
    res.status(200).json({
      message: `sukses menghapus mobil dengan id ${req.params.id}`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const DapatMobilByIdExtraC = async (req, res, next) => {
  try {
    const data = await DapatMobilByIdExtra(req);
    res.status(200).json({
      message: `sukses mendapat data mobil dengan id ${req.params.id}`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
