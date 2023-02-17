import mongoose from "mongoose";
/*
Modèle de la partie marques
*/
const brandsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true
    }
);

const brandsModel = mongoose.model("brand", brandsSchema);

export default brandsModel;