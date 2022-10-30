import express from "express";
import { addExpensive, deleteExpensive, getExpensives, getExpensivesByMonth } from "../controllers/expensivesController.js";
const router = express.Router();

router.get("/get", getExpensives);
router.get("/get-by-month/:month/:year", getExpensivesByMonth);
router.post("/add", addExpensive);
router.delete("/delete/:id", deleteExpensive);

export default router;