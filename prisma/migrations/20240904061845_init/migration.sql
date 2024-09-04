/*
  Warnings:

  - You are about to drop the column `connectionDetails` on the `DataSource` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DataSource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastAccessed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_DataSource" ("createAt", "description", "frequency", "id", "lastAccessed", "name", "sourceType", "status", "updatedAt") SELECT "createAt", "description", "frequency", "id", "lastAccessed", "name", "sourceType", "status", "updatedAt" FROM "DataSource";
DROP TABLE "DataSource";
ALTER TABLE "new_DataSource" RENAME TO "DataSource";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
