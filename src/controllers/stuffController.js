import StuffModel from "../models/stuffModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const addStuff = async (req, res) => {
  const newStuff = new StuffModel({
    type: req.body.type,
    description: req.body.description,
    colorway: req.body.colorway ? req.body.colorway : null,
    buyingPrice: req.body.buyingPrice,
    buyingDate: req.body.buyingDate,
    sold: req.body.sold,
    sellingDate: req.body.sellingDate ? req.body.sellingDate : null,
    resellPrice: req.body.resellPrice ? req.body.resellPrice : null,
  });

  try {
    const stuff = await newStuff.save();
    return res.status(201).json(stuff);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getStuffs = async (req, res) => {
  const stuffs = await StuffModel.find().select();
  res.status(200).json(stuffs);
};

const deleteStuff = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown");
  }

  StuffModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

export {
    addStuff,
    getStuffs,
    deleteStuff
};
