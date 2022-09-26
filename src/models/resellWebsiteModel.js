import mongoose from "mongoose";

const resellWebsiteSchema = new mongoose.Schema(
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

const resellWebsiteModel = mongoose.model("resellWebsite", resellWebsiteSchema);

export default resellWebsiteModel;