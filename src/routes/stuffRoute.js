import express from "express";
import {
  addStuff,
  deleteStuff,
  getStuffById,
  getStuffs,
  getStuffsByMonth,
  updateStuff,
} from "../controllers/stuffController.js";
const router = express.Router();

//routes
router.get("/get", getStuffs);
router.get("/get-by-month/:type/:month/:year", getStuffsByMonth);
router.get("/get-by-id/:id", getStuffById);
router.post("/add", addStuff);
router.patch("/update/:id", updateStuff);
router.delete("/delete/:id", deleteStuff);

export default router;
