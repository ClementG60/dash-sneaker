import SneakerModel from "../models/sneakerModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// const getUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new Error('Invalid user ID');
//     }

//     const user = await User.findById(id);

//     if (!user) {
//       throw new Error('User not found');
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

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
    console.error(err);
    return res.status(400).send(err);
  }
};

/* fonction permettant d'obtenir toutes les paires
@req : requête
@res: réponse
@return : liste des sneakers
*/
const getSneakers = async (req, res) => {
  try {
    const sneakers = await SneakerModel.find().sort({ buyingDate: 1 });
    res.status(200).json(sneakers);
  } catch (err) {
    console.error(err);
    return res.status(404).send(err);
  }
};

/* fonction permettant d'obtenir une paire par id
@req : requête
@res: réponse
@return : donnée de la paire
*/
const getSneakerById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID inconnu");
  }

  await SneakerModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Id inconnu : " + err);
    }
  }).clone();
};

/* fonction permettant d'obtenir toutes les paires par mois
@req : requête
@res: réponse
@return : liste des paires
*/
const getSneakersByMonth = async (req, res) => {
  try {
    const sneakers = await SneakerModel.find({
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
    res.status(200).json(sneakers);
  } catch (err) {
    console.error(err);
    return res.status(404).send(err);
  }
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
    throw new Error("ID de la paire invalide");
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
    const sneakerToUpdate = await SneakerModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateSneaker },
      { new: true }
    ).exec();
    return res.send(sneakerToUpdate);
  } catch (error) {
    return res.status(404).json({ error: error.message });
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
    throw new Error("ID de la sneaker invalide");
  }

  try {
    const sneakerToDelete = await SneakerModel.findByIdAndRemove(
      req.params.id
    ).exec();
    return res.send(sneakerToDelete);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export {
  addSneaker,
  updateSneaker,
  getSneakers,
  deleteSneaker,
  getSneakersByMonth,
  getSneakerById,
};
