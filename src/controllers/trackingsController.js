import mongoose from "mongoose";
import TrackingsModel from "../models/trackingsModel.js";
const ObjectId = mongoose.Types.ObjectId;

/* fonction permettant d'ajouter un suivi
@req : requête
@res: réponse
@return : 
  - suivi ajouté
  - message d'erreur
*/
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

/* fonction permettant d'obtenir toutes les suivis
@req : requête
@res: réponse
@return : liste des suivis
*/
const getTrackings = async (req, res) => {
  const trackings = await TrackingsModel.find().select();
  res.status(200).json(trackings);
};

/* fonction permettant de supprimer un suivi
@req : requête
@res: réponse
@return : 
  - message de succès
  - message d'erreur si l'id est inconnu
*/
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