/*
  Warnings:

  - The primary key for the `UserFavoriteRestaurants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserFavoriteRestaurants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserFavoriteRestaurants" DROP CONSTRAINT "UserFavoriteRestaurants_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserFavoriteRestaurants_pkey" PRIMARY KEY ("userId", "restaurantId");
