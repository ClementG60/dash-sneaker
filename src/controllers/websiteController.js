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
  try {
    const websites = await WebsiteModel.find().sort({ name: 1 }).select();
    return res.status(200).json(websites);
  } catch (err) {
    console.error(err);
    return res.status(404).send(err);
  }
};

/* fonction permettant d'obtenir toutes les sites de vente
@req : requête
@res: réponse
@return : liste des sites de vente
*/
const getResellWebsite = async (req, res) => {
  try {
    const websites = await ResellWebsiteModel.find().sort({ name: 1 }).select();
    return res.status(200).json(websites);
  } catch (err) {
    console.error(err);
    return res.status(404).send(err);
  }
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
    return res
      .status(400)
      .send(err.code === 11000 ? { message: "Le site existe déjà." } : err);
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
    return res
      .status(400)
      .send(err.code === 11000 ? { message: "Le site existe déjà." } : err);
  }
};

const deleteResellWebsite = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu");
  }

  await ResellWebsiteModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

const deleteWebsite = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu");
  }

  try {
    await WebsiteModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
  } catch (err) {}
};

export {
  getWebsite,
  getResellWebsite,
  addWebsite,
  addResellWebsite,
  deleteWebsite,
  deleteResellWebsite,
};
