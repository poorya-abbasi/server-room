import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import routes from "./routes/index";

dotenv.config();
const app = express();
app.use(express.json());
app.use(routes);

const startServer = () => {
    const port = process.env.PORT;
    z.string().min(1, { message: "You need to specify a port" }).parse(port);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
