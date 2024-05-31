-- CreateTable
CREATE TABLE "Broth" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageInactive" TEXT,
    "imageActive" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Proteins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageInactive" TEXT,
    "imageActive" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
