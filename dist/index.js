"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(index_1.default);
const startServer = () => {
    const port = process.env.SERVER_PORT;
    zod_1.z.string().min(1, { message: "You need to specify a port" }).parse(port);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map