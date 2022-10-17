import express from "express";
import { addExpensive, deleteExpensive } from "../controllers/expensivesController";
const router = express.Router();

router.post("add-expensive", addExpensive);
router.delete("delete-expensive", deleteExpensive);

export default router;