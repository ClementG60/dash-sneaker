import mongoose from "mongoose";
/*
Modèle de la partie suivi de colis
*/
const trackingsSchema = new mongoose.Schema(
    {
        trackingNumber: {
            type: String,
            required: true,
            unique: true,
        },
        transporter: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const trackingsModel = mongoose.model("tracking", trackingsSchema);

export default trackingsModel;