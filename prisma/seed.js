"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const sensors = yield prisma.sensors.createMany({
            data: [
                {
                    name: "Voltage Sensor",
                    type: "electric",
                },
                {
                    name: "Current Sensor",
                    type: "electric",
                },
                {
                    name: "Temperature Sensor",
                    type: "condition",
                },
                {
                    name: "Humidity Sensor",
                    type: "conditon",
                },
                {
                    name: "Dust Sensor",
                    type: "condition",
                },
                {
                    name: "Water Leak Sensor",
                    type: "event",
                },
                {
                    name: "Motion Sensor",
                    type: "event",
                },
            ],
        });
        console.log({ sensors });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=seed.js.map