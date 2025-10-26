import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';

export const createRegion = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const region = await prisma.region.create({
        data: { name },
        });
        res.status(201).json(region);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create region' });
    }
};

export const getAllRegions = async (req: Request, res: Response) => {
    try {
        const regions = await prisma.region.findMany({
        include: { villages: true },
        });
        res.json(regions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch regions' });
    }
};

export const getRegionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Region ID is required' });
        }
        const region = await prisma.region.findUnique({
            where: { id },
            include: { villages: true },
        });
        if (!region) {
            return res.status(404).json({ error: 'Region not found' });
        }
        res.json(region);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch region' });
    }
};

export const updateRegion = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;
    const { name } = req.body;
    if(!id){
        return res.status(400).json({ error: 'Region ID is required' });
    }
    const region = await prisma.region.update({
        where: { id },
        data: { name },
    });
    res.json(region);
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
            res.status(404).json({ error: 'Region not found' });
        } else {
            res.status(500).json({ error: 'Failed to update region' });
        }
    }
};

export const deleteRegion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
        return res.status(400).json({ error: 'Region ID is required' });
        }
        await prisma.region.delete({
        where: { id },
        });
        res.status(204).send();
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
        res.status(404).json({ error: 'Region not found' });
        } else {
        res.status(500).json({ error: 'Failed to delete region' });
        }
    }
};