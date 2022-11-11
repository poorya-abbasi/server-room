import express from "express";
import type { Request, Response } from "express";
const router = express.Router();
import sensorRouter from "./sensors";

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "API up and running!",
    });
});

router.use("/sensors", sensorRouter);

export default router;
