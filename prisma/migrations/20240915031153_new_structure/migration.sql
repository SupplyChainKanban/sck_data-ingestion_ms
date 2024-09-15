-- CreateEnum
CREATE TYPE "DataSourceType" AS ENUM ('MES', 'MANUAL', 'PROJECT');

-- CreateEnum
CREATE TYPE "DataSourceFrequency" AS ENUM ('REAL', 'PERIODIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "DataSourceStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "RawDataPriority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "RawDataStatus" AS ENUM ('PENDING', 'PROCESSED', 'ERROR');

-- CreateTable
CREATE TABLE "DataSource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceType" "DataSourceType" NOT NULL,
    "connectionDetails" JSONB NOT NULL,
    "frequency" "DataSourceFrequency" NOT NULL,
    "status" "DataSourceStatus" NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "lastAccessed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawData" (
    "id" TEXT NOT NULL,
    "dataSchemaVersion" TEXT NOT NULL,
    "dataPayload" JSONB NOT NULL,
    "ingestedBy" TEXT NOT NULL,
    "priority" "RawDataPriority" NOT NULL,
    "status" "RawDataStatus" NOT NULL DEFAULT 'PENDING',
    "available" BOOLEAN NOT NULL DEFAULT true,
    "lastAccessed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dataSourceId" TEXT NOT NULL,

    CONSTRAINT "RawData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DataSource_available_idx" ON "DataSource"("available");

-- CreateIndex
CREATE INDEX "RawData_available_idx" ON "RawData"("available");

-- AddForeignKey
ALTER TABLE "RawData" ADD CONSTRAINT "RawData_dataSourceId_fkey" FOREIGN KEY ("dataSourceId") REFERENCES "DataSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
