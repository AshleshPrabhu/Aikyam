import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, phone,password } = req.body;
        const user = await prisma.user.create({
        data: { name, email, phone,password: await bcrypt.hash(password, 10) },
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

    export const getUserByPhone = async (req: Request, res: Response) => {
    try {
        const { phone } = req.params;
        if (!phone) {
        return res.status(400).json({ error: 'User phone is required' });
        }
        const user = await prisma.user.findUnique({
        where: { phone },
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
        const { name, email, phone,password } = req.body;
        if (!phone) {
        return res.status(400).json({ error: 'User phone is required' });
        }
        const user = await prisma.user.update({
        where: { phone: phone! },
        data: { name, email, phone,password },
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
        const { phone } = req.params;
        if (!phone) {
        return res.status(400).json({ error: 'User phone is required' });
        }
        await prisma.user.delete({
        where: { phone: phone! },
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