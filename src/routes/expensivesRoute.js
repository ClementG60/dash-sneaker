import express from "express";
import { addExpensive, deleteExpensive, getExpensives } from "../controllers/expensivesController.js";
const router = express.Router();

router.get("/get-expensives", getExpensives);
router.post("/add", addExpensive);
router.delete("/delete/:id", deleteExpensive);

export default router;