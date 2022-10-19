import express from "express";
import { getStats } from "../controllers/statisticsController.js";
const router = express.Router();
/*
router.get("/sales-by-month/:month/:year", getSalesByMonth);
router.get("/sales-by-year/:year", getSalesByYear);
router.get("/sales", getAllSales);
*/
router.get("/get-stats/:data/:type?/:year?/:month?", getStats)
export default router;