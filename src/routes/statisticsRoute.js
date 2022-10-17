import express from "express";
import { getAllSales, getSalesByMonth, getSalesByYear } from "../controllers/statisticsController";
const router = express.Router();

router.get("sales-by-month/:month", getSalesByMonth);
router.get("sales-by-year/:month", getSalesByYear);
router.get("sales", getAllSales);

export default router;