import express, { Request, Response } from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
    const sensors = await prisma.sensors.findMany();
    res.status(200).json(sensors);
});

export default router;
