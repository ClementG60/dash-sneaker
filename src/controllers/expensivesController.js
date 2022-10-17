import ExpensivesModel from "../models/expensivesModel";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const addExpensive = async (req, res) => {
    const newExpensive = new ExpensivesModel({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price
    })

    try {
        const expensive = await newExpensive.save();
        return res.status(201).json(expensive);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const deleteExpensive = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID unknown");
    }

    ExpensivesModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + err);
        }
    )
};