import StuffModel from "../models/stuffModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

/* fonction permettant d'ajouter un objet
@req : requête
@res: réponse
@return : 
  - objet ajouté
  - message d'erreur
*/
const addStuff = async (req, res) => {
  const newStuff = new StuffModel({
    type: req.body.type,
    description: req.body.description,
    colorway: req.body.colorway ? req.body.colorway : null,
    buyingPrice: req.body.buyingPrice,
    websiteId: req.body.websiteId,
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

/* fonction permettant d'obtenir toutes les objets
@req : requête
@res: réponse
@return : liste des objets
*/
const getStuffs = async (req, res) => {
  const stuffs = await StuffModel.find().select();
  res.status(200).json(stuffs);
};

/* fonction permettant d'obtenir toutes les objets par mois
@req : requête
@res: réponse
@return : liste des paires
*/
const getStuffsByMonth = async (req, res) => {
  const stuffs = await StuffModel
    .find({
      $and: [
        { $expr: { $eq: [{ $year: (req.params.type === "buying" ? "$buyingDate" : "$sellingDate") }, req.params.year] } },
        {
          $expr: { $eq: [{ $month: (req.params.type === "buying" ? "$buyingDate" : "$sellingDate") }, req.params.month] },
        },
      ],
    })
    .sort({ buyingDate: 1 })
    .select();
  res.status(200).json(stuffs);
};

/* fonction permettant de supprimer un objet
@req : requête
@res: réponse
@return : 
  - message de succès
  - message d'erreur si l'id est inconnu
*/
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
    getStuffsByMonth,
    deleteStuff
};
