/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username",
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "pictureUrl" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
