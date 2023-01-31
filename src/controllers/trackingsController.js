import mongoose from "mongoose";
import TrackingsModel from "../models/trackingsModel.js";
const ObjectId = mongoose.Types.ObjectId;

const addTracking = async (req, res) => {
  const newTracking = new TrackingsModel({
    trackingNumber: req.body.trackingNumber,
    transporter: req.body.transporter,
  });

  try {
    const tracking = await newTracking.save();
    return res.status(201).json(tracking);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).send({ message: "Ce numéro de suivi existe déjà." });
    else res.status(400).send(err);
  }
};

const getTrackings = async (req, res) => {
  const trackings = await TrackingsModel.find().select();
  res.status(200).json(trackings);
};

const deleteTracking = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown");
  }

  TrackingsModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

export { addTracking, getTrackings, deleteTracking };