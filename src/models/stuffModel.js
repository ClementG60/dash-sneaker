import mongoose from "mongoose";

const stuffSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    colorway: {
      type: String,
    },
    size: {
      type: String,
    },
    buyingPrice: {
      type: Number,
      required: true,
    },
    buyingDate: {
      type: Date,
      required: true,
    },
    sold: {
      type: Boolean,
      required: true,
    },
    sellingDate: {
      type: Date,
    },
    resellPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const stuffModel = mongoose.model("stuff", stuffSchema);

export default stuffModel;
