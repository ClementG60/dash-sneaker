import express from "express";
import { addStuff, deleteStuff, getStuffs } from "../controllers/stuffController.js";
const router = express.Router();

router.get("/get", getStuffs);
router.post("/add", addStuff);
router.delete("/delete/:id", deleteStuff);

export default router;