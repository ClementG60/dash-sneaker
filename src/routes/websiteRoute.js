import express from "express";
import { getResellWebsite, getWebsite, addWebsite, deleteWebsite } from "../controllers/websiteController.js";
const router = express.Router();

////routes retail website
router.get("/get-websites", getWebsite);
router.post("/add-website", addWebsite);
router.delete("/delete-website/:type/:id", deleteWebsite);


//routes resell website
router.get("/get-resell-websites", getResellWebsite);
//router.delete("/delete-resell-website/:id", deleteResellWebsite);

export default router;