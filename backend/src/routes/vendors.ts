import express from "express";
import { createVendor, getVendorsByVillage } from "../controllers/vendorController.js";
const router = express.Router();
router.post("/", createVendor);
router.get("/:villageId", getVendorsByVillage);
export default router;