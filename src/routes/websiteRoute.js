import express from "express";
import {
  getWebsites,
  addWebsite,
  deleteWebsite,
} from "../controllers/websiteController.js";
const router = express.Router();

////routes retail website
router.get("/get/:type", getWebsites);
router.post("/add-website", addWebsite);
router.delete("/delete-website/:type/:id", deleteWebsite);

//routes resell website
//router.get("/get-resell-websites", getResellWebsite);

export default router;
