import mongoose from "mongoose";

const expensivesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const ExpensivesModel = mongoose.model("expensives", expensivesSchema);

export default ExpensivesModel;