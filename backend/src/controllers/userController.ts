import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;
        const user = await prisma.user.create({
        data: { name, email, phone },
        include: { assignments: true },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
        include: { assignments: true },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

    export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
        }
        const user = await prisma.user.findUnique({
        where: { id },
        include: { assignments: true },
        });
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
        }
        const user = await prisma.user.update({
        where: { id: id! },
        data: { name, email, phone },
        include: { assignments: true },
        });
        res.json(user);
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
        res.status(404).json({ error: 'User not found' });
        } else {
        res.status(500).json({ error: 'Failed to update user' });
        }
    }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
        const { id } = req.params;
        if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
        }
        await prisma.user.delete({
        where: { id: id! },
        });
        res.status(204).send();
    } catch (error) {
        const err = error as any;
        if (err.code === 'P2025') {
        res.status(404).json({ error: 'User not found' });
        } else {
        res.status(500).json({ error: 'Failed to delete user' });
        }
    }
};