/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Accaunt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication_tag" (
    "id" SERIAL NOT NULL,
    "publication_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "Publication_tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accaunt_login_key" ON "Accaunt"("login");

-- AddForeignKey
ALTER TABLE "Publication_tag" ADD CONSTRAINT "Publication_tag_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication_tag" ADD CONSTRAINT "Publication_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
