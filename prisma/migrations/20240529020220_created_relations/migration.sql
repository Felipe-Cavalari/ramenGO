/*
  Warnings:

  - You are about to drop the `Broth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Proteins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Broth";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Orders";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Proteins";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "broths" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageInactive" TEXT,
    "imageActive" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "proteins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageInactive" TEXT,
    "imageActive" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "proteinsId" INTEGER NOT NULL,
    "brothId" INTEGER NOT NULL,
    CONSTRAINT "orders_proteinsId_fkey" FOREIGN KEY ("proteinsId") REFERENCES "proteins" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_brothId_fkey" FOREIGN KEY ("brothId") REFERENCES "broths" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
