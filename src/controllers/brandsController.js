import mongoose from "mongoose";
import BrandsModel from "../models/brandsModel.js";
const ObjectId = mongoose.Types.ObjectId;

const addBrand = async (req, res) => {
  const newBrand = new BrandsModel({
    name: req.body.name,
  });

  try {
    const brand = await newBrand.save();
    return res.status(201).json(brand);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getBrands = async (req, res) => {
  const brands = await BrandsModel.find().select();
  res.status(200).json(brands);
};

const deleteBrand = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown");
  }

  BrandsModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

export { addBrand, deleteBrand, getBrands };
