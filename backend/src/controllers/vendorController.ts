import type { Request, Response } from "express";
import prisma from "../utils/prisma.js";


export const createVendor = async (req:Request, res:Response) => {
    try {
        const { name, regionId, villageId, categories, isStay, summary, phone } = req.body;
        const vendor = await prisma.vendor.create({
            data: { name, regionId, villageId, categories, isStay, summary, phone },
        });
        res.status(201).json(vendor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating vendor" });
    }
};

export const getVendorsByVillage = async (req: Request, res: Response) => {
    const { villageId } = req.params;
    if(!villageId) {
        return res.status(400).json({ message: "Village ID is required" });
    }
    try {
        const vendors = await prisma.vendor.findMany({
            where: { villageId }
        });
        res.json(vendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching vendors" });
    }
};
