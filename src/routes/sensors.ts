import express, { Request, Response } from "express";
import { z } from "zod";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
    const sensors = await prisma.sensors.findMany();
    res.status(200).json(sensors);
});

router.post("/", async (req: Request, res: Response) => {
    const validation = z
        .object({
            name: z.string().min(1, { message: "Name is required" }),
            type: z.enum(["electric", "condition", "event"]),
        })
        .safeParse(req.body);
    if (!validation.success) {
        return res.status(422).json(validation.error);
    }
    const { name, type } = req.body;
    const sensor = await prisma.sensors.create({
        data: {
            name,
            type,
        },
    });
    res.status(200).json(sensor);
});

export default router;
