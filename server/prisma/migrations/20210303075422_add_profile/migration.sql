/*
  Warnings:

  - Made the column `userId` on table `Following` required. The migration will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Following" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Following" ("id", "userId") SELECT "id", "userId" FROM "Following";
DROP TABLE "Following";
ALTER TABLE "new_Following" RENAME TO "Following";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
