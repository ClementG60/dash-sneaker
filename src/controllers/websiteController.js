import WebsiteModel from "../models/websiteModel.js";
import ResellWebsiteModel from "../models/resellWebsiteModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

/* fonction permettant d'obtenir toutes les sites d'achats
@req : requête
@res: réponse
@return : liste des sites d'achat
*/
const getWebsite = async (req, res) => {
  const websites = await WebsiteModel.find().sort({ name: 1 }).select();
  res.status(200).json(websites);
};

/* fonction permettant d'obtenir toutes les sites de vente
@req : requête
@res: réponse
@return : liste des sites de vente
*/
const getResellWebsite = async (req, res) => {
  const websites = await ResellWebsiteModel.find().sort({ name: 1 }).select();
  res.status(200).json(websites);
};

/* fonction permettant d'ajouter une marque
@req : requête
@res: réponse
@return : 
  - site d'achat ajouté
  - message d'erreur
*/
const addWebsite = async (req, res) => {
  const newWebsite = new WebsiteModel({
    name: req.body.name,
    img: req.body.img,
  });

  try {
    const website = await newWebsite.save();
    return res.status(201).json(website);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).send({ message: "Le site existe déjà." });
    else res.status(400).send(err);
  }
};

/* fonction permettant d'ajouter une marque
@req : requête
@res: réponse
@return : 
  - site de vente ajouté
  - message d'erreur
*/
const addResellWebsite = async (req, res) => {
  const newResellWebsite = new ResellWebsiteModel({
    name: req.body.name,
    img: req.body.img,
  });

  try {
    const resellWebsite = await newResellWebsite.save();
    return res.status(201).json(resellWebsite);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).send({ message: "Le site existe déjà." });
    else res.status(400).send(err);
  }
};

const deleteResellWebsite = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown");
  }

  ResellWebsiteModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

const deleteWebsite = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown");
  }

  WebsiteModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

export {
  getWebsite,
  getResellWebsite,
  addWebsite,
  addResellWebsite,
  deleteWebsite,
  deleteResellWebsite,
};
