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
    size: req.body.size ? req.body.size : null,
    buyingPrice: req.body.buyingPrice,
    websiteId: req.body.websiteId,
    buyingDate: req.body.buyingDate,
    sold: req.body.sold,
    sellingDate: req.body.sellingDate ? req.body.sellingDate : null,
    resellPrice: req.body.resellPrice ? req.body.resellPrice : null,
    resellWebsiteId: req.body.resellWebsiteId ? req.body.resellWebsiteId : null,
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
  try {
    const stuffs = await StuffModel.find().select();
    res.status(200).json(stuffs);
  } catch (err) {
    console.error(err);
    return res.status(404).send(err);
  }
};

/* fonction permettant d'obtenir un objet par id
@req : requête
@res: réponse
@return : donnée de l'objet
*/
const getStuffById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu");
  }

  await StuffModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Id inconnu : " + err);
    }
  }).clone();
};

/* fonction permettant d'obtenir toutes les objets par mois
@req : requête
@res: réponse
@return : liste des objets
*/
const getStuffsByMonth = async (req, res) => {
  try {
    const stuffs = await StuffModel.find({
      $and: [
        {
          $expr: {
            $eq: [
              {
                $year:
                  req.params.type === "buying" ? "$buyingDate" : "$sellingDate",
              },
              req.params.year,
            ],
          },
        },
        {
          $expr: {
            $eq: [
              {
                $month:
                  req.params.type === "buying" ? "$buyingDate" : "$sellingDate",
              },
              req.params.month,
            ],
          },
        },
      ],
    }).sort({ buyingDate: 1 });
    return res.status(200).json(stuffs);
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
};

/* fonction permettant de mettre à jour un objet
@req : requête
@res: réponse
@return : 
  - objet modifié
  - message d'erreur
*/
const updateStuff = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu");
  }

  const updateStuff = {
    type: req.body.type,
    description: req.body.description,
    colorway: req.body.colorway ? req.body.colorway : null,
    size: req.body.size ? req.body.size : null,
    buyingPrice: req.body.buyingPrice,
    websiteId: req.body.websiteId,
    buyingDate: req.body.buyingDate,
    sold: req.body.sold,
    sellingDate: req.body.sellingDate ? req.body.sellingDate : null,
    resellPrice: req.body.resellPrice ? req.body.resellPrice : null,
    resellWebsiteId: req.body.resellWebsiteId ? req.body.resellWebsiteId : null,
  };

  try {
    await StuffModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateStuff },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
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
    throw new Error("ID de l'objet invalide");
  }

  try {
    const stuffToDelete = await StuffModel.findByIdAndRemove(
      req.params.id
    ).exec();
    return res.send(stuffToDelete);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export {
  addStuff,
  getStuffs,
  getStuffById,
  getStuffsByMonth,
  updateStuff,
  deleteStuff,
};
