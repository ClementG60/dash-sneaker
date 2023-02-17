import express from "express";
import { addBrand, deleteBrand, getBrands } from "../controllers/brandsController.js";
const router = express.Router();

//routes
router.get("/get", getBrands);
router.post("/add", addBrand);
router.delete("/delete/:id", deleteBrand);

export default router;