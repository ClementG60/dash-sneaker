import mongoose from "mongoose";

const sneakerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        buyingPrice: {
            type: Number,
            required: true
        },
        buyingDate: {
            type: Date,
            required: true
        },
        websiteId: {
            type: String,
            required: true
        },
        sold: {
            type: Boolean,
            required: true
        },
        sellingDate: {
            type: Date,
        },
        resellPrice: {
            type: Number
        },
        resellWebsiteId: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const sneakerModel = mongoose.model("sneaker", sneakerSchema);

export default sneakerModel;