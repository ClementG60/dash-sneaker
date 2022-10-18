import express from "express";
import { getSales } from "../controllers/statisticsController.js";
const router = express.Router();
/*
router.get("/sales-by-month/:month/:year", getSalesByMonth);
router.get("/sales-by-year/:year", getSalesByYear);
router.get("/sales", getAllSales);
*/
router.get("/get-sales/:type?/:year?/:month?", getSales)
export default router;