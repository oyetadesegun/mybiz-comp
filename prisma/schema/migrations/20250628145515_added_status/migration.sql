-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'in_progress', 'resolved', 'closed');

-- AlterTable
ALTER TABLE "GetHelpQuestion" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';
