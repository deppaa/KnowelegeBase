/*
  Warnings:

  - You are about to drop the `Accaunt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Accaunt";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Enum_role" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
