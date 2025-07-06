/*
  Warnings:

  - You are about to drop the column `profileId` on the `GetHelpQuestion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GetHelpQuestion" DROP CONSTRAINT "GetHelpQuestion_profileId_fkey";

-- AlterTable
ALTER TABLE "GetHelpQuestion" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "GetHelpQuestion" ADD CONSTRAINT "GetHelpQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
