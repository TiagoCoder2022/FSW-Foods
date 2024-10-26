/*
  Warnings:

  - You are about to drop the column `totalDiscount` on the `Order` table. All the data in the column will be lost.
  - Added the required column `totalDiscounts` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalDiscount",
ADD COLUMN     "totalDiscounts" DECIMAL(10,2) NOT NULL;
