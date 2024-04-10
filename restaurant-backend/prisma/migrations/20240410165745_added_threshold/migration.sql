/*
  Warnings:

  - Added the required column `threshold` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "threshold" INTEGER NOT NULL
);
INSERT INTO "new_Ingredient" ("id", "name", "price", "quantity") SELECT "id", "name", "price", "quantity" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
