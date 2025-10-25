import type { Request, Response } from "express";
import prisma from "../utils/prisma.js";


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;
        const user = await prisma.user.create({
        data: { name, email, phone },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
};


export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { assignments: true },
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user" });
    }
};
