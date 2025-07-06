/*
  Warnings:

  - You are about to drop the column `staffRole` on the `Response` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResponseType" AS ENUM ('ADMIN', 'CX', 'AGENT', 'AUDITOR', 'FINANCE', 'SERVICE_PROVIDER');

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "staffRole",
ADD COLUMN     "responseType" "ResponseType";

-- DropEnum
DROP TYPE "StaffRole";
