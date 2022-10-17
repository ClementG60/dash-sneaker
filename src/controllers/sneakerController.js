import SneakerModel from "../models/sneakerModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const addSneaker = async (req, res) => {
    const newSneaker = new SneakerModel({
        name: req.body.name,
        size: req.body.size,
        buyingPrice: req.body.buyingPrice,
        buyingDate: req.body.buyingDate,
        websiteId: req.body.websiteId,
        sold: req.body.sold,
        sellingDate : req.body.sellingDate ? req.body.sellingDate : null,
        resellPrice: req.body.resellPrice ? req.body.resellPrice : null,
        resellWebsiteId: req.body.resellWebsiteId ? req.body.resellWebsiteId : null
    });

    try {
        const sneaker = await newSneaker.save();
        return res.status(201).json(sneaker);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const getSneakers = async (req, res) => {
    const sneakers = await SneakerModel.find().select();
    res.status(200).json(sneakers);
};

const updateSneaker = async (req, res) => {
    //permet de vérifier si l'id de la paire à supprimer existe
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID unknown");
    }

    const updateSneaker = {
        name: req.body.name,
        size: req.body.size,
        buyingPrice: req.body.buyingPrice,
        buyingDate: req.body.buyingDate,
        websiteId: req.body.websiteId,
        sold: req.body.sold,
        sellingDate : req.body.sellingDate ? req.body.sellingDate : null,
        resellPrice: req.body.resellPrice ? req.body.resellPrice : null,
        resellWebsiteId: req.body.resellWebsiteId ? req.body.resellWebsiteId : null
    };

    try {
        SneakerModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateSneaker },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else res.status(400).send(err);
            }
        )

    } catch (err) {
        return res.status(400).send(err);
    }
}

const deleteSneaker = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID unknown");
    }

    SneakerModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + err);
        }
    )

};

export { addSneaker, updateSneaker, getSneakers, deleteSneaker };