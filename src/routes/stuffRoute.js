import express from "express";
import { addStuff, deleteStuff, getStuffs, getStuffsByMonth } from "../controllers/stuffController.js";
const router = express.Router();

//routes
router.get("/get", getStuffs);
router.get("/get-by-month/:type/:month/:year", getStuffsByMonth);
router.post("/add", addStuff);
router.delete("/delete/:id", deleteStuff);

export default router;