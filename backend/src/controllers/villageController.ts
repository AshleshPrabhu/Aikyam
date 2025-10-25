import esamudaay from "../utils/esamudaayClient.js";
import type { Request, Response } from "express";

export const getVillages = async (req: Request, res: Response) => {
    const { regionId } = req.params;
    try {
        const { data } = await esamudaay.get(`/v1/regions/${regionId}/villages`);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching villages" });
    }
};
