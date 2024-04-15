/*
  Warnings:

  - The primary key for the `IngredientsOnDishes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `IngredientsOnDishes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IngredientsOnDishes" (
    "dishId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("dishId", "ingredientId"),
    CONSTRAINT "IngredientsOnDishes_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IngredientsOnDishes_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IngredientsOnDishes" ("dishId", "ingredientId", "quantity") SELECT "dishId", "ingredientId", "quantity" FROM "IngredientsOnDishes";
DROP TABLE "IngredientsOnDishes";
ALTER TABLE "new_IngredientsOnDishes" RENAME TO "IngredientsOnDishes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
