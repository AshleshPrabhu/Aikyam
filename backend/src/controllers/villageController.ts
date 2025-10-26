import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';

export const createVillage = async (req: Request, res: Response) => {
    try {
        const { name, regionId } = req.body;
        const village = await prisma.village.create({
        data: { name, regionId },
        include: { region: true },
        });
        res.status(201).json(village);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create village' });
    }
};

export const getAllVillages = async (req: Request, res: Response) => {
    try {
        const villages = await prisma.village.findMany({
        include: { region: true, vendors: true, assignments: true },
        });
        res.json(villages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch villages' });
    }
};

export const getVillageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
        return res.status(400).json({ error: 'Village ID is required' });
        }
        const village = await prisma.village.findUnique({
        where: { id },
        include: { region: true, vendors: true, assignments: true },
        });
        if (!village) {
        return res.status(404).json({ error: 'Village not found' });
        }
        res.json(village);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch village' });
    }
};

export const updateVillage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, regionId } = req.body;
        const village = await prisma.village.update({
        where: { id: id! },
        data: { name, regionId },
        include: { region: true },
        });
        res.json(village);
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
        res.status(404).json({ error: 'Village not found' });
        } else {
        res.status(500).json({ error: 'Failed to update village' });
        }
    }
};

export const deleteVillage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
        return res.status(400).json({ error: 'Village ID is required' });
        }
        await prisma.village.delete({
        where: { id },
        });
        res.status(204).send();
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
        res.status(404).json({ error: 'Village not found' });
        } else {
        res.status(500).json({ error: 'Failed to delete village' });
        }
    }
};