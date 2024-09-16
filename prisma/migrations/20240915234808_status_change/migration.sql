/*
  Warnings:

  - The values [PROCESSED] on the enum `RawDataStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RawDataStatus_new" AS ENUM ('PENDING', 'VALIDATED', 'ERROR');
ALTER TABLE "RawData" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "RawData" ALTER COLUMN "status" TYPE "RawDataStatus_new" USING ("status"::text::"RawDataStatus_new");
ALTER TYPE "RawDataStatus" RENAME TO "RawDataStatus_old";
ALTER TYPE "RawDataStatus_new" RENAME TO "RawDataStatus";
DROP TYPE "RawDataStatus_old";
ALTER TABLE "RawData" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
