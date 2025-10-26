import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';

export const createVendor = async (req: Request, res: Response) => {
    try {
        const { name, regionId, villageId, categories, summary, phone, isStay } = req.body;
        const vendor = await prisma.vendor.create({
        data: { name, regionId, villageId, categories, summary, phone, isStay },
        include: { village: true },
        });
        res.status(201).json(vendor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create vendor' });
    }
};

export const getAllVendors = async (req: Request, res: Response) => {
    try {
        const vendors = await prisma.vendor.findMany({
        include: { village: true },
        });
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vendors' });
    }
};

export const getVendorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Vendor ID is required' });
        }
        const vendor = await prisma.vendor.findUnique({
            where: { id },
            include: { village: true },
        });
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.json(vendor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vendor' });
    }
};

export const updateVendor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, regionId, villageId, categories, summary, phone, isStay } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Vendor ID is required' });
        }
        const vendor = await prisma.vendor.update({
            where: { id: id! },
            data: { name, regionId, villageId, categories, summary, phone, isStay },
            include: { village: true },
        });
        res.json(vendor);
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
            res.status(404).json({ error: 'Vendor not found' });
        } else {
            res.status(500).json({ error: 'Failed to update vendor' });
        }
    }
};

export const deleteVendor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
        return res.status(400).json({ error: 'Vendor ID is required' });
        }
        await prisma.vendor.delete({
        where: { id: id! },
        });
        res.status(204).send();
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
        res.status(404).json({ error: 'Vendor not found' });
        } else {
        res.status(500).json({ error: 'Failed to delete vendor' });
        }
    }
};