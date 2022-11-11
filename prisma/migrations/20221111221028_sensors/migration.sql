-- CreateTable
CREATE TABLE "ElecMetrics" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sensorID" TEXT NOT NULL,

    CONSTRAINT "ElecMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConditonMetrics" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sensorID" TEXT NOT NULL,

    CONSTRAINT "ConditonMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "value" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sensorID" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Sensors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ElecMetrics" ADD CONSTRAINT "ElecMetrics_sensorID_fkey" FOREIGN KEY ("sensorID") REFERENCES "Sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConditonMetrics" ADD CONSTRAINT "ConditonMetrics_sensorID_fkey" FOREIGN KEY ("sensorID") REFERENCES "Sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_sensorID_fkey" FOREIGN KEY ("sensorID") REFERENCES "Sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
