import mongoose from "mongoose";
import BrandsModel from "../models/brandsModel.js";
const ObjectId = mongoose.Types.ObjectId;

/* fonction permettant d'ajouter une marque
@req : requête
@res: réponse
@return : 
  - marque ajoutée
  - message d'erreur
*/
const addBrand = async (req, res) => {
  const newBrand = new BrandsModel({
    name: req.body.name,
  });

  try {
    const brand = await newBrand.save();
    return res.status(201).json(brand);
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).send({ message: "La marque existe déjà." });
    else res.status(400).send(err);
  }
};

/* fonction permettant d'obtenir toutes les marques
@req : requête
@res: réponse
@return : liste des marques
*/
const getBrands = async (req, res) => {
  const brands = await BrandsModel.find().sort({ name: 1 }).select();
  res.status(200).json(brands);
};

/* fonction permettant de supprimer une marque
@req : requête
@res: réponse
@return : 
  - message de succès
  - message d'erreur si l'id est inconnu
*/
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
