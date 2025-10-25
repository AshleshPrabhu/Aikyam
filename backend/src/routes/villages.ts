import express from "express";
import { getVillages } from "../controllers/villageController.js";
const router = express.Router();
router.get("/:regionId", getVillages);
export default router;