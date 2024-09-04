-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RawData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataSchemaVersion" TEXT NOT NULL,
    "ingestedBy" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "lastAccessed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_RawData" ("createAt", "dataSchemaVersion", "id", "ingestedBy", "lastAccessed", "priority", "updatedAt") SELECT "createAt", "dataSchemaVersion", "id", "ingestedBy", "lastAccessed", "priority", "updatedAt" FROM "RawData";
DROP TABLE "RawData";
ALTER TABLE "new_RawData" RENAME TO "RawData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
