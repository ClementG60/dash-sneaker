import express from "express";
import { addTracking, deleteTracking, getTrackings } from "../controllers/trackingsController.js";
const router = express.Router();

//routes
router.get("/get", getTrackings);
router.post("/add", addTracking);
router.delete("/delete/:id", deleteTracking);

export default router;