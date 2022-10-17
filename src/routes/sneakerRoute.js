import express from "express";
import { addSneaker, deleteSneaker, getSneakers, updateSneaker } from "../controllers/sneakerController.js";
const router = express.Router();

router.get("/get-sneakers", getSneakers);
router.post("/add-sneaker", addSneaker);
router.patch("/update/:id", updateSneaker);
router.delete("/delete/:id", deleteSneaker);

export default router;