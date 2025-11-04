import express from "express";
import { getAllMatch, getOneMatchById } from "./controllers";

const router = express.Router();

router.get("/allMatchs", getAllMatch);
router.get("/match/:id", getOneMatchById)

export default router;
