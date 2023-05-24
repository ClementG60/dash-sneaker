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
  const Model = req.body.type === "website" ? WebsiteModel : ResellWebsiteModel;
  const newWebsite = new Model({
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

// const deleteResellWebsite = async (req, res) => {
//   if (!ObjectId.isValid(req.params.id)) {
//     return res.status(400).send("ID inconnu");
//   }

//   await ResellWebsiteModel.findByIdAndRemove(req.params.id, (err, docs) => {
//     if (!err) res.send(docs);
//     else console.log("Delete error : " + err);
//   });
// };

const deleteWebsite = async (req, res) => {
  const Model =
    req.params.type === "website" ? WebsiteModel : ResellWebsiteModel;

  if (!ObjectId.isValid(req.params.id)) {
    throw new Error("ID du site invalide");
  }

  try {
    const websiteToDelete = await Model.findByIdAndRemove(req.params.id).exec();
    return res.send(websiteToDelete);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export {
  getWebsite,
  getResellWebsite,
  addWebsite,
  deleteWebsite,
  //deleteResellWebsite,
};
