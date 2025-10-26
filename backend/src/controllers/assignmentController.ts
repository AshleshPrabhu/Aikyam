import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';

export const createAssignment = async (req: Request, res: Response) => {
    try {
        const { userId, regionId, villageId, startDate, endDate, tasks } = req.body;
        const assignment = await prisma.assignment.create({
        data: { userId, regionId, villageId, startDate: new Date(startDate), endDate: new Date(endDate), tasks },
        include: { user: true, village: true },
        });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create assignment' });
    }
};

export const getAllAssignments = async (req: Request, res: Response) => {
    try {
        const assignments = await prisma.assignment.findMany({
        include: { user: true, village: true },
        });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};

export const getAssignmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
        return res.status(400).json({ error: 'Assignment ID is required' });
        }
        const assignment = await prisma.assignment.findUnique({
        where: { id },
        include: { user: true, village: true },
        });
        if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
        }
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignment' });
    }
};

export const updateAssignment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId, regionId, villageId, startDate, endDate, tasks } = req.body;
        if (!id) {
        return res.status(400).json({ error: 'Assignment ID is required' });
        }
        const assignment = await prisma.assignment.update({
        where: { id: id! },
        data: { userId, regionId, villageId, startDate: new Date(startDate), endDate: new Date(endDate), tasks },
        include: { user: true, village: true },
        });
        res.json(assignment);
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
        res.status(404).json({ error: 'Assignment not found' });
        } else {
        res.status(500).json({ error: 'Failed to update assignment' });
        }
    }
};

export const deleteAssignment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
        return res.status(400).json({ error: 'Assignment ID is required' });
        }
        await prisma.assignment.delete({
        where: { id: id! },
        });
        res.status(204).send();
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
        res.status(404).json({ error: 'Assignment not found' });
        } else {
        res.status(500).json({ error: 'Failed to delete assignment' });
        }
    }
};