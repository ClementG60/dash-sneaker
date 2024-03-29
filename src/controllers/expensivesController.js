import ExpensivesModel from "../models/expensivesModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

/* fonction permettant d'ajouter une dépense
@req : requête
@res: réponse
@return : 
  - dépense ajouté
  - message d'erreur
*/
const addExpensive = async (req, res) => {
  const newExpensive = new ExpensivesModel({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    date: req.body.date,
  });

  try {
    const expensive = await newExpensive.save();
    return res.status(201).json(expensive);
  } catch (err) {
    return res.status(400).send(err);
  }
};

/* fonction permettant d'obtenir toutes les dépenses
@req : requête
@res: réponse
@return : liste des dépenses
*/
const getExpensives = async (req, res) => {
  try {
    const expensives = await ExpensivesModel.find().select();
    return res.status(200).json(expensives);
  } catch (err) {
    return res.status(404).send(err);
  }
};

/* fonction permettant d'obtenir toutes les dépenses par mois
@req : requête
@res: réponse
@return : liste des dépenses
*/
const getExpensivesByMonth = async (req, res) => {
  const expensives = await ExpensivesModel.find({
    $and: [
      { $expr: { $eq: [{ $year: "$date" }, req.params.year] } },
      {
        $expr: { $eq: [{ $month: "$date" }, req.params.month] },
      },
    ],
  }).select();
  res.status(200).json(expensives);
};

/* fonction permettant de supprimer une dépense
@req : requête
@res: réponse
@return : 
  - message de succès
  - message d'erreur si l'id est inconnu
*/
const deleteExpensive = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    throw new Error("ID de la dépense invalide");
  }

  try {
    const expensiveToDelete = await ExpensivesModel.findByIdAndRemove(
      req.params.id
    ).exec();
    return res.send(expensiveToDelete);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export { addExpensive, deleteExpensive, getExpensives, getExpensivesByMonth };
