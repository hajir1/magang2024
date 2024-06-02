import {
  HapusServiceById,
  TambahkanServiceById,
} from "../service/specMobil.service.js";

export const TambahkanServiceByIdC = async (req, res, next) => {
  try {
    const data = await TambahkanServiceById(req);
    res.status(200).json({
      message: "sukses menambah data service mobil kendaraan",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const HapusServiceByIdC = async (req, res, next) => {
  try {
    const data = await HapusServiceById(req);
    res.status(200).json({
      message: "sukses menambah data service mobil kendaraan",
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
