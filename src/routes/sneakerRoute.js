import express from "express";
import {
  addSneaker,
  deleteSneaker,
  getSneakers,
  updateSneaker,
  getSneakersByMonth,
  getSneakerById,
} from "../controllers/sneakerController.js";
const router = express.Router();

router.get("/get", getSneakers);
router.get("/get-by-id/:id", getSneakerById);
router.get("/get-by-month/:type/:month/:year", getSneakersByMonth);
router.post("/add", addSneaker);
router.patch("/update/:id", updateSneaker);
router.delete("/delete/:id", deleteSneaker);

export default router;
