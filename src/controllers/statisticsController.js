import SneakerModel from "../models/sneakerModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const getSalesByMonth = async (req, res) => {
  const salesByMonth = await SneakerModel.find()
    .sort({ sellingDate: 1 })
    .select("sellingDate");
  res.status(200).json(salesByMonth);
};

const getSalesByYear = async (req, res) => {
  const salesByMonth = await SneakerModel.find()
    .sort({ sellingDate: 1 })
    .select("sellingDate");
  res.status(200).json(salesByMonth);
};

const getAllSales = async (req, res) => {
  const salesByMonth = await SneakerModel.find()
    .sort({ sellingDate: 1 })
    .select("sellingDate");
  res.status(200).json(salesByMonth);
};

export { getSalesByMonth, getAllSales, getSalesByYear };
