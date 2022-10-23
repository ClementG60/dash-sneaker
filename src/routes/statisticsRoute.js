import express from "express";
import {
  getBuyingStats,
  getSalesStats,
  getExpensivesStats,
  getSums
} from "../controllers/statisticsController.js";
const router = express.Router();
/*
router.get("/sales-by-month/:month/:year", getSalesByMonth);
router.get("/sales-by-year/:year", getSalesByYear);
router.get("/sales", getAllSales);
*/
router.get("/get-sales-stats/:type?/:year?/:month?", getSalesStats);
router.get("/get-buying-stats/:type?/:year?/:month?", getBuyingStats);
router.get("/get-expensives-stats/:type?/:year?/:month?", getExpensivesStats);
router.get("/get-sums/:data/:type?/:year?/:month?", getSums);
export default router;
