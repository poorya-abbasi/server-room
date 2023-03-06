import express, { Request, Response } from "express";
import { z } from "zod";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import useValidateByType from "../utils/useValidateByType";
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
    console.log("Query", req.query);
    if (req.query.type) {
        return res.status(200).json(
            await prisma.sensors.findMany({
                where: { type: { equals: req.query.type as string } },
            })
        );
    }
    return res.status(200).json(await prisma.sensors.findMany({}));
});

router.get("/stats", async (req: Request, res: Response) => {
    const stats = {
        condition: await prisma.conditonMetrics.count(),
        event: await prisma.events.count(),
        electric: await prisma.elecMetrics.count(),
    };

    res.status(200).json(stats);
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

router.put("/:id", async (req: Request, res: Response) => {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
        return res.status(404).json(idValidation.error);
    }
    const validation = z
        .object({
            name: z.string().min(1, { message: "Name is required" }),
        })
        .safeParse(req.body);
    const { name } = req.body;
    if (!validation.success) {
        return res.status(422).json(validation.error);
    }
    const sensor = await prisma.sensors.update({
        where: { id: req.params.id },
        data: { name },
    });
    if (!sensor) {
        return res.status(404).json({ message: "Sensor not found" });
    } else {
        return res.status(200).json(sensor);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
        return res.status(404).json(idValidation.error);
    }
    const sensor = await prisma.sensors.findFirst({
        where: { id: req.params.id },
        include: {
            ElecMetrics: { take: 50, orderBy: { createdAt: "desc" } },
            ConditonMetrics: { take: 50, orderBy: { createdAt: "desc" } },
            Events: { take: 50, orderBy: { createdAt: "desc" } },
        },
    });
    if (!sensor) {
        return res.status(404).json({ message: "Sensor not found" });
    } else {
        return res.status(200).json(sensor);
    }
});

router.post("/:id", async (req: Request, res: Response) => {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
        return res.status(404).json(idValidation.error);
    }
    const sensor = await prisma.sensors.findFirst({
        where: { id: req.params.id },
    });
    if (!sensor) {
        return res.status(404).json({ message: "Sensor not found" });
    }
    const validation = useValidateByType(sensor.type, req.body);
    if (!validation.success) {
        return res.status(422).json(validation.error);
    }
    const { value } = req.body;
    if (sensor.type === "electric") {
        const metric = await prisma.elecMetrics.create({
            data: {
                value,
                sensorID: sensor.id,
            },
        });
        return res.status(200).json(metric);
    } else if (sensor.type === "condition") {
        const metric = await prisma.conditonMetrics.create({
            data: {
                value,
                sensorID: sensor.id,
            },
        });
        return res.status(200).json(metric);
    } else if (sensor.type === "event") {
        const metric = await prisma.events.create({
            data: {
                value,
                sensorID: sensor.id,
            },
        });
        return res.status(200).json(metric);
    }
});

export default router;
