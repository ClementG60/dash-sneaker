import mongoose from "mongoose";

const expensivesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const expensivesModel = mongoose.model("expensives", expensivesSchema);

export default expensivesModel;