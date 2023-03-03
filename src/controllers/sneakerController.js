import SneakerModel from "../models/sneakerModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

/* fonction permettant d'ajouter une paire
@req : requête
@res: réponse
@return : 
  - paire ajoutée
  - message d'erreur
*/
const addSneaker = async (req, res) => {
  const newSneaker = new SneakerModel({
    brandId: req.body.brandId,
    model: req.body.model,
    colorway: req.body.colorway,
    size: req.body.size,
    buyingPrice: req.body.buyingPrice,
    buyingDate: req.body.buyingDate,
    websiteId: req.body.websiteId,
    sold: req.body.sold,
    sellingDate: req.body.sellingDate ? req.body.sellingDate : null,
    resellPrice: req.body.resellPrice ? req.body.resellPrice : null,
    resellWebsiteId: req.body.resellWebsiteId ? req.body.resellWebsiteId : null,
  });

  try {
    const sneaker = await newSneaker.save();
    return res.status(201).json(sneaker);
  } catch (err) {
    return res.status(400).send(err);
  }
};

/* fonction permettant d'obtenir toutes les paires
@req : requête
@res: réponse
@return : liste des sneakers
*/
const getSneakers = async (req, res) => {
  const sneakers = await SneakerModel.find().select();
  res.status(200).json(sneakers);
};

/* fonction permettant d'obtenir une paire par id
@req : requête
@res: réponse
@return : donnée de la paire
*/
const getSneakerById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown");
  }

  await SneakerModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Id unknown : " + err);
    }
  }).clone();
};

/* fonction permettant d'obtenir toutes les paires par mois
@req : requête
@res: réponse
@return : liste des paires
*/
const getSneakersByMonth = async (req, res) => {
  const sneakers = await SneakerModel
    .find({
      $and: [
        { $expr: { $eq: [{ $year: (req.params.type === "buying" ? "$buyingDate" : "$sellingDate") }, req.params.year] } },
        {
          $expr: { $eq: [{ $month: (req.params.type === "buying" ? "$buyingDate" : "$sellingDate") }, req.params.month] },
        },
      ],
    })
    .sort({ buyingDate: 1 });
  res.status(200).json(sneakers);
};

/* fonction permettant de mettre à jour une paire
@req : requête
@res: réponse
@return : 
  - paire modifiée
  - message d'erreur
*/
const updateSneaker = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown");
  }

  const updateSneaker = {
    brandId: req.body.brandId,
    model: req.body.model,
    colorway: req.body.colorway,
    size: req.body.size,
    buyingPrice: req.body.buyingPrice,
    buyingDate: req.body.buyingDate,
    websiteId: req.body.websiteId,
    sold: req.body.sold,
    sellingDate: req.body.sellingDate ? req.body.sellingDate : null,
    resellPrice: req.body.resellPrice ? req.body.resellPrice : null,
    resellWebsiteId: req.body.resellWebsiteId ? req.body.resellWebsiteId : null,
  };

  try {
    await SneakerModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateSneaker },
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

/* fonction permettant de supprimer une paire
@req : requête
@res: réponse
@return : 
  - message de succès
  - message d'erreur si l'id est inconnu
*/
const deleteSneaker = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown");
  }

  await SneakerModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

export {
  addSneaker,
  updateSneaker,
  getSneakers,
  deleteSneaker,
  getSneakersByMonth,
  getSneakerById,
};
