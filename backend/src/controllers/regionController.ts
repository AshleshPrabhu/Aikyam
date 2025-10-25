import type { Request, Response } from "express";
import esamudaay from "../utils/esamudaayClient.js";

export const getRegions = async (req: Request, res: Response) => {
    try {
        const { data } = await esamudaay.get("/v1/regions"); 
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching regions" });
    }
};
