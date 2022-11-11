"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sensors_1 = __importDefault(require("./sensors"));
router.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "API up and running!",
    });
});
router.use("/sensors", sensors_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map