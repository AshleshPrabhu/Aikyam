import express from "express";
import { createAssignment, getAssignmentsByUser } from "../controllers/assignmentController.js";
const router = express.Router();
router.post("/", createAssignment);
router.get("/user/:userId", getAssignmentsByUser);
export default router;