import express from "express";
import { getResellWebsite, getWebsite, addWebsite, addResellWebsite, deleteResellWebsite, deleteWebsite } from "../controllers/websiteController.js";
const router = express.Router();

//retail website
router.get("/get-websites", getWebsite);
router.post("/add-website", addWebsite);
router.delete("/delete-website", deleteWebsite);


//resell website
router.get("/get-resell-websites", getResellWebsite);
router.post("/add-resell-website", addResellWebsite);
router.delete("/delete-resell-website", deleteResellWebsite);

export default router;