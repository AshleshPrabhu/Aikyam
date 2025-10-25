import type { Request, Response } from "express";
import prisma from "../utils/prisma.js";
export const createAssignment = async (req: Request, res: Response) => {
    try {
        const { userId, regionId, villageId, startDate, endDate, tasks } = req.body;
        const assignment = await prisma.assignment.create({
        data: {
            userId,
            regionId,
            villageId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            tasks
        }
        });
        res.status(201).json(assignment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating assignment" });
    }
};


export const getAssignmentsByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if(!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const assignments = await prisma.assignment.findMany({
            where: { userId },
            orderBy: { startDate: "asc" }
        });
        res.json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching assignments" });
    }
};
