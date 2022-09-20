import express from "express";
import { addSneaker, deleteSneaker, getSneakers, updateSneaker } from "../controllers/sneakerController.js";
const router = express.Router();

router.get("/get-sneakers", getSneakers);
router.post("/add-sneaker", addSneaker);
router.patch("/update-sneaker/:id", updateSneaker);
router.delete("/delete-sneaker/:id", deleteSneaker);

export default router;