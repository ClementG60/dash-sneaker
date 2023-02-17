import mongoose from "mongoose";
/*
Modèle de la partie site d'achat
*/
const websiteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        img: {
            type: String,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

const websiteModel = mongoose.model("website", websiteSchema);

export default websiteModel;