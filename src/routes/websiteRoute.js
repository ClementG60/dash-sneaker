import express from "express";
import { getResellWebsite, getWebsite, addWebsite, addResellWebsite } from "../controllers/websiteController.js";
const router = express.Router();

//retail website
router.get("/get-websites", getWebsite);
router.post("/add-website", addWebsite);


//resell website
router.get("/get-resell-websites", getResellWebsite);
router.post("/add-resell-website", addResellWebsite);

export default router;