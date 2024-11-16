/*
  Warnings:

  - You are about to drop the column `pictureUrl` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "pictureUrl",
ADD COLUMN     "picture_url" TEXT;
