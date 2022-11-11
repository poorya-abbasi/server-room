import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const sensors = await prisma.sensors.createMany({
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
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
