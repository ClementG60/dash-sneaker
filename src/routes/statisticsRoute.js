import express from "express";
import {
  getBuyingStats,
  getSalesStats,
  getExpensivesStats,
  getSumBuyingStats,
  getSums
} from "../controllers/statisticsController.js";
const router = express.Router();
//sales
router.get("/sales/general/:type?/:year?/:month?", getSalesStats);

//buyings
router.get("/buyings/general/:type?/:year?/:month?", getBuyingStats);

//expensives
router.get("/expensives/general/:type?/:year?/:month?", getExpensivesStats);

//sum
router.get("/sums/price/:data/:type?/:year?/:month?", getSums);
router.get("/sums/shoe/:data/:type/:year/:month", getSumBuyingStats);
export default router;
