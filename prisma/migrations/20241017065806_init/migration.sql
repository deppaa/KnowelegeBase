-- CreateEnum
CREATE TYPE "Enum_role" AS ENUM ('user');

-- CreateEnum
CREATE TYPE "Enum_status" AS ENUM ('public', 'private');

-- CreateTable
CREATE TABLE "Accaunt" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Enum_role" NOT NULL DEFAULT 'user',

    CONSTRAINT "Accaunt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desctiption" TEXT NOT NULL,
    "status" "Enum_status" NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);
